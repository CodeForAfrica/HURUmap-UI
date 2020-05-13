// A file that defines needed graphql queries
import gql from "graphql-tag";

export default (indexTable) => gql`
query indeces ($countryCode: String!) {
  geoIndex: ${indexTable} (condition: { country: $countryCode }
    ) {
      nodes {
        geoCode,
        geoLevel,
        rating
      }
  }
}`;
