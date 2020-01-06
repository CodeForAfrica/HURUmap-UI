// A file that defines needed graphql queries
import gql from 'graphql-tag';

/**
 * `populationTables` can the array of strings [...`tableName`] or array [...[`tableName` , {`conditions`}]]
 */
export const buildProfileQuery = populationTables => gql`
query profile($geoCode: String!, $geoLevel: String!) {
  geo: wazimapGeographyByGeoLevelAndGeoCodeAndVersion(
    geoLevel: $geoLevel
    geoCode: $geoCode
    version: "2009"
  ) {
    geoLevel
    geoCode
    squareKms
    parentLevel
    parentCode
    longName
    name
  }
  ${populationTables.map(
    (table, i) => `population${i}: ${Array.isArray(table) ? table[0] : table}(
    ${
      Array.isArray(table) && table[1]
        ? JSON.stringify(
            Object.assign(table[1], {
              condition: {
                ...table[1].condition,
                geoCode: '$geoCode',
                geoLevel: '$geoLevel'
              }
            })
          )
            /**
             * Remove root curly brackets `{...}`
             */
            .slice(1, -1)
            /**
             * Replace quotes around keys from json stringify
             */
            .replace(/"([^(")"]+)":/g, '$1:')
            /**
             * Replace quotes from json stringify for:
             *  - defined terms
             *  - variables which start with $
             */
            .replace(/:"([^(")"][A-Z_]+)"/g, ': $1')
            .replace(/:"([^(")"][$a-zA-Z]+)"/g, ': $1')
        : 'condition: { geoCode: $geoCode, geoLevel: $geoLevel }'
    }
  ) {
    nodes {
      total
    }
  }`
  )}
}
`;

export const buildVisualsQuery = (visuals, parent) => gql`
query charts($geoCode: String!, $geoLevel: String!) {
  ${visuals
    .map(
      visual => `${visual.queryAlias}: ${visual.table} (
    condition: { geoCode: $geoCode, geoLevel: $geoLevel }
  ) {
    nodes {
      ${
        visual.label && visual.label[0] === '$'
          ? `label: ${visual.label.slice(1)}`
          : ''
      }
      ${visual.groupBy ? `groupBy: ${visual.groupBy}` : ''}
      x: ${visual.x}
      y: ${visual.y}
    }
  }
  ${
    visual.reference && parent && parent.geoLevel && parent.geoCode
      ? `${visual.queryAlias}Reference: ${visual.reference.table ||
          visual.table} (
    condition: ${JSON.stringify(
      visual.reference.condition || {
        geoLevel: parent.geoLevel,
        geoCode: parent.geoCode
      }
    )

      /**
       * Replace quotes around keys from json stringify
       */
      .replace(/"([^(")"]+)":/g, '$1:')}
  ) {
    nodes {
      ${
        (visual.reference.label || visual.label) &&
        (visual.reference.label || visual.label)[0] === '$'
          ? `label: ${(visual.reference.label || visual.label).slice(1)}`
          : ''
      }
      x: ${visual.reference.x || visual.x}
      y: ${visual.reference.y || visual.y}
    }
  }`
      : ''
  }
  `
    )
    .join('')}
}
`;
