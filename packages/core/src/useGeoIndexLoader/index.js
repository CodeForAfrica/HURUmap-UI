import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import buildGeoIndexQuery from "./buildGeoIndexQuery";

export default ({ indexTable, indexField, countryCode }) => {
  const client = useApolloClient();
  const [indexMapping, setIndexMapping] = useState({
    isLoading: true,
  });

  useEffect(() => {
    if (indexTable) {
      (async () => {
        setIndexMapping({
          isLoading: true,
        });

        const {
          data: {
            geoIndex: { nodes: indeces },
          },
        } = await client.query({
          query: buildGeoIndexQuery(indexTable, indexField, countryCode),
          variables: { countryCode },
        });
        setIndexMapping({
          isLoading: false,
          indeces,
        });
      })();
    }
  }, [client, indexTable, countryCode]);

  return indexMapping;
};
