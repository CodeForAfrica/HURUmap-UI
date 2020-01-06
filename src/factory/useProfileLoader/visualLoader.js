import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { buildVisualsQuery } from './queries';

export default ({ geoId, comparisonGeoId, visuals, parent }) => {
  const client = useApolloClient();
  const [chartData, setChartsData] = useState({
    isLoading: true
  });

  useEffect(() => {
    if (visuals && visuals.length) {
      (async () => {
        setChartsData({
          isLoading: true
        });

        const { data: visualsData } = await client.query({
          query: buildVisualsQuery(visuals, parent),
          variables: {
            geoCode: geoId.split('-')[1],
            geoLevel: geoId.split('-')[0]
          }
        });

        let comparisonVisualsData;
        if (comparisonGeoId) {
          const { data } = await client.query({
            query: buildVisualsQuery(visuals, parent),
            variables: {
              geoCode: comparisonGeoId.split('-')[1],
              geoLevel: comparisonGeoId.split('-')[0]
            }
          });
          comparisonVisualsData = data;
        }
        setChartsData({
          isLoading: false,
          visualsData,
          comparisonVisualsData
        });
      })();
    }
  }, [client, comparisonGeoId, geoId, parent, visuals]);

  return chartData;
};
