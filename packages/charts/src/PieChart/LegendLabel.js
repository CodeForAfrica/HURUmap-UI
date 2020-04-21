import React from "react";

import LegendLabel from "../LegendLabel";

/**
 * LegendLabel *without* any events is needed for shared events on the pie chart
 * to work.
 * see: https://formidable.com/open-source/victory/guides/tooltips/#tooltips-with-other-events
 */
function Label(props) {
  return <LegendLabel {...props} />;
}

export default Label;
