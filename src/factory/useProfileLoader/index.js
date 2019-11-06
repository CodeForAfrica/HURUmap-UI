import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { buildVisualsQuery, buildProfileQuery } from './queries';

export default ({ geoId, comparisonGeoId, visuals, populationTables }) => {
  const client = useApolloClient();
  const [chartData, setChartsData] = useState({
    isLoading: true
  });
  const [profiles, setProfiles] = useState({
    isLoading: true
  });

  useEffect(() => {
    if (geoId) {
      (async () => {
        setProfiles({
          isLoading: true
        });

        const query = buildProfileQuery(populationTables || []);

        const {
          data: { geo: profile, ...populations }
        } = await client.query({
          query,
          variables: {
            geoCode: geoId.split('-')[1],
            geoLevel: geoId.split('-')[0]
          }
        });

        const population = Object.values(populations).find(
          p => p.nodes.length > 0
        );
        profile.totalPopulation = population
          ? population.nodes.reduce((a, b) => a + b.total, 0)
          : 0;

        const {
          data: { geo: parent }
        } = await client.query({
          query,
          variables: {
            geoCode: profile.parentCode,
            geoLevel: profile.parentLevel
          }
        });

        let comparison;
        if (comparisonGeoId) {
          const {
            data: { geo: g, ...pps }
          } = await client.query({
            query,
            variables: {
              geoCode: comparisonGeoId.split('-')[1],
              geoLevel: comparisonGeoId.split('-')[0]
            }
          });

          comparison = g;

          const ppl = Object.values(pps).find(p => p.nodes.length > 0);
          comparison.totalPopulation = ppl
            ? ppl.nodes.reduce((a, b) => a + b.total, 0)
            : 0;
        }

        setProfiles({
          isLoading: false,
          profile,
          parent,
          comparison
        });
      })();
    }
  }, [client, geoId, comparisonGeoId, populationTables]);

  useEffect(() => {
    if (!profiles.isLoading && visuals && visuals.length) {
      (async () => {
        setChartsData({
          isLoading: true
        });

        const { data: profileVisualsData } = await client.query({
          query: buildVisualsQuery(visuals, profiles.parent),
          variables: {
            geoCode: profiles.profile.geoCode,
            geoLevel: profiles.profile.geoLevel
          }
        });

        let comparisonVisualsData;
        if (profiles.comparison) {
          const { data } = await client.query({
            query: buildVisualsQuery(visuals, profiles.parent),
            variables: {
              geoCode: profiles.comparison.geoCode,
              geoLevel: profiles.comparison.geoLevel
            }
          });
          comparisonVisualsData = data;
        }
        setChartsData({
          isLoading: false,
          profileVisualsData,
          comparisonVisualsData
        });
      })();
    }
  }, [profiles, client, visuals]);

  return { profiles, chartData };
};
