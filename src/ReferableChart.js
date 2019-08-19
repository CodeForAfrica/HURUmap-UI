import PropTypes from 'prop-types';

import Chart from './Chart';

const toReferenceProps = ref => {
  return Array.isArray(ref) ? { data: ref } : ref;
};

toReferenceProps.propTypes = {
  ref: PropTypes.oneOf(
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  )
};

export { toReferenceProps };

export default Chart;
