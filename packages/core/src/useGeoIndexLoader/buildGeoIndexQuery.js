// A file that defines needed graphql queries
import gql from "graphql-tag";

export default (indexTable, indexField, scoreField) => gql`
query indeces ($countryCode: String!) {
  geoIndex: ${indexTable} (condition: { country: $countryCode }
    ) {
      nodes {
        geoCode: geoCode,
        geoLevel: geoLevel,
        index: ${indexField},
        score: ${scoreField}
      }
  }
}`;
