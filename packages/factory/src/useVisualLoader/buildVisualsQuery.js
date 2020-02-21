// A file that defines needed graphql queries
import gql from 'graphql-tag';

export default (visuals, parent) => gql`
query charts($geoCode: String!, $geoLevel: String!, $countryCode: String!) {
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
  ${visual.queryAlias}Source: allSources(
    condition: {
      geoLevel: $geoLevel
      countryCode: $countryCode
      tableName: "${visual.table}"
    }
  ) {
    nodes {
      title: sourceTitle
      href: sourceLink
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
