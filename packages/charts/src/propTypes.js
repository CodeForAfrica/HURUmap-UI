import PropTypes from "prop-types";

// This is a factory function (also called a higher-order function)
const createTwoNodeArrayType = (isRequired) => {
  // The factory returns a custom prop type
  return (props, propName, componentName) => {
    const childrenNodes = {
      children: PropTypes.arrayOf(PropTypes.node),
    };
    const { [propName]: prop } = props;
    if (prop == null && isRequired) {
      // Prop is required but wasn't specified. Throw an error.
      return new Error(`${propName} in ${componentName} isRequired`);
    }
    // check if not node types or not length == 2 return error
    const notNode = !PropTypes.checkPropTypes(
      childrenNodes,
      props,
      propName,
      componentName
    );
    if (prop.length !== 2 || notNode) {
      return new Error(
        `${propName} in ${componentName} needs to be an array of two node`
      );
    }
    return null;
  };
};

// Using the factory, create two different versions of your prop type
const twoNodeArrayType = createTwoNodeArrayType(false);
twoNodeArrayType.isRequired = createTwoNodeArrayType(true);

const colorScale = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
]);

const data = PropTypes.oneOfType([
  PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      y: PropTypes.number,
      label: PropTypes.string,
      tooltip: PropTypes.string,
    })
  ),
  PropTypes.arrayOf(PropTypes.number),
]);

export default {
  ...PropTypes,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  graphQlData: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      groupBy: PropTypes.string,
    })
  ),
  twoNodeArrayType,
  data,
  groupedData: PropTypes.oneOfType([data, PropTypes.arrayOf(data)]),
  reference: PropTypes.oneOfType([
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.number,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            y: PropTypes.number,
          })
        ),
        style: PropTypes.shape({}),
      })
    ),
  ]),
  singleRefrence: PropTypes.shape({
    data: PropTypes.number,
    style: PropTypes.shape({}),
  }),
  theme: PropTypes.shape({
    bullet: PropTypes.shape({}),
    proportionalArea: PropTypes.shape({}),
    breakpoints: PropTypes.shape({
      sm: PropTypes.number,
    }),
    axis: PropTypes.shape({
      labelWidth: PropTypes.number,
    }),
    bar: PropTypes.shape({}),
    pie: PropTypes.shape({}),
    group: PropTypes.shape({
      colorScale,
    }),
    line: PropTypes.shape({}),
  }),
  colorScale,
};
