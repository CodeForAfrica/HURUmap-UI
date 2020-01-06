import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { buildProfileQuery } from './queries';
import visualLoader from './visualLoader';

export default ({ geoId, comparisonGeoId, visuals, populationTables }) => {
  const client = useApolloClient();
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

  const chartData = visualLoader({
    geoId,
    comparisonGeoId,
    visuals,
    parent: profiles.parent
  });

  return { profiles, chartData };
};
