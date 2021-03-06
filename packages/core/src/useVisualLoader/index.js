import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import buildVisualsQuery from "./buildVisualsQuery";

export default ({ geoId, comparisonGeoId, visuals, parent }) => {
  const client = useApolloClient();
  const [visualsData, setVisualsData] = useState({
    isLoading: true,
  });

  useEffect(() => {
    if (visuals && visuals.length) {
      (async () => {
        setVisualsData({
          isLoading: true,
        });

        const { data: profileVisualsData } = await client.query({
          query: buildVisualsQuery(visuals, parent),
          variables: {
            geoCode: geoId.split("-")[1],
            geoLevel: geoId.split("-")[0],
            countryCode: geoId.split("-")[1].slice(0, 2),
          },
        });

        let comparisonVisualsData;
        if (comparisonGeoId) {
          const { data } = await client.query({
            query: buildVisualsQuery(visuals, parent),
            variables: {
              geoCode: comparisonGeoId.split("-")[1],
              geoLevel: comparisonGeoId.split("-")[0],
              countryCode: comparisonGeoId.split("-")[1].slice(0, 2),
            },
          });
          comparisonVisualsData = data;
        }

        setVisualsData({
          isLoading: false,
          profileVisualsData,
          comparisonVisualsData,
        });
      })();
    }
  }, [client, comparisonGeoId, geoId, parent, visuals]);

  return visualsData;
};
