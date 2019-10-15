import PropTypes from 'prop-types';

const colorScale = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string)
]);

const data = PropTypes.oneOfType([
  PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      y: PropTypes.number
    })
  ),
  PropTypes.arrayOf(PropTypes.number)
]);

export default {
  ...PropTypes,
  data,
  groupedData: PropTypes.oneOfType([data, PropTypes.arrayOf(data)]),
  reference: PropTypes.oneOfType([
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      y: PropTypes.number
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            y: PropTypes.number
          })
        ),
        style: PropTypes.shape({})
      })
    )
  ]),
  theme: PropTypes.shape({
    bullet: PropTypes.shape({}),
    proportionalArea: PropTypes.shape({}),
    breakpoints: PropTypes.shape({
      sm: PropTypes.number
    }),
    axis: PropTypes.shape({
      labelWidth: PropTypes.number
    }),
    bar: PropTypes.shape({}),
    pie: PropTypes.shape({}),
    group: PropTypes.shape({
      colorScale
    })
  }),
  colorScale
};
