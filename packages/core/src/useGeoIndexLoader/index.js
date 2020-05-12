import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import buildGeoIndexQuery from "./buildGeoIndexQuery";

export default ({ indexTable, countryCode }) => {
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

        const { data: { geoIndex: { nodes: indeces}  } } = await client.query({
          query: buildGeoIndexQuery(indexTable, countryCode),
          variables: { countryCode }
        });
        setIndexMapping({
          isLoading: false,
          indeces,
        });
      })();
    }
  }, [client, indexTable, countryCode ]);

  return indexMapping;
};
