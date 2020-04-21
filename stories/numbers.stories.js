import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import { NumberVisuals } from "@hurumap-ui/charts";
import { CenterDecorator } from "./common";

storiesOf("HURUmap UI/NumberVisuals", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Default", () => {
    return (
      <NumberVisuals
        subtitle={text("Subtitle", "Income")}
        statistic={text("Statistic", "$60,336")}
        statisticDeviation={text("Statistic Deviation", "±0.1% ")}
        secondaryDeviation={text(
          "Secondary Deviation",
          "(194, 667, 872 ±241, 381.6)"
        )}
        description={text("Description", "Median household income")}
        comparisonData={object("Comparison Data", [
          {
            id: 0,
            parentComparison: "about 90 percent",
            parentDescription: "of the amount in United States: $32,397",
            parentDeviation: "±0.24%",
          },
          {
            id: 1,
            parentComparison: "about 60 percent",
            parentDescription: "of the amount in United States: $32,397",
            parentDeviation: "±0.13%",
          },
        ])}
      />
    );
  });
