import React from "react";

import { VictoryTooltip } from "victory";

/**
 * Tooltip *without* any events is needed for shared events on the pie chart
 * to work.
 * see: https://formidable.com/open-source/victory/guides/tooltips/#tooltips-with-other-events
 */
function Tooltip(props) {
  return <VictoryTooltip {...props} />;
}

export default Tooltip;
