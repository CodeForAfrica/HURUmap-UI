import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/react-hooks";
import buildGeoIndexQuery from "./buildGeoIndexQuery";

export default ({ indexTable, indexField, countryCode, scoreField }) => {
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
          query: buildGeoIndexQuery(
            indexTable,
            indexField,
            countryCode,
            scoreField
          ),
          variables: { countryCode },
        });
        setIndexMapping({
          isLoading: false,
          indeces,
        });
      })();
    }
  }, [client, indexTable, countryCode, indexField, scoreField]);

  return indexMapping;
};
