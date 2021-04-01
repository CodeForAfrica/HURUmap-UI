import React from "react";
import { storiesOf } from "@storybook/react";
import {
  boolean,
  number,
  object,
  select,
  text,
  withKnobs,
} from "@storybook/addon-knobs";

import {
  BarChart,
  BulletChart,
  LineChart,
  PieChart,
  NestedProportionalAreaChart,
  ComparisonBarChart,
} from "@hurumap-ui/charts";
import { labels } from "@hurumap-ui/charts/utils";

import theme from "./theme";
import { CenterDecorator } from "./common";

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf("HURUmap UI/Charts/BarChart", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Default", () => {
    const horizontal = boolean("horizontal", false);
    const data = Array(number("data", 3)).fill(null);
    const height = number("height", undefined) || 350;
    const width = number("width", undefined) || 350;

    return (
      <div style={{ height, width }}>
        <BarChart
          horizontal={horizontal}
          width={width}
          height={height}
          data={data.map((_, index) => {
            const y = rand();
            const x = `${index}-${index} Employment Status`;
            return {
              x,
              y,
            };
          })}
          alignment={select("alignment", ["start", "middle", "end"], "middle")}
          barWidth={number("barWidth", undefined)}
          domainPadding={object("domainPadding", { x: 20 })}
          parts={{
            axis: {
              dependent: {
                tickValues: [10, 50, 90],
                tickFormat: ["10%", "50%", "90%"],
              },
            },
          }}
          theme={theme.chart}
        />
      </div>
    );
  })
  .add("Grouped", () => {
    const groups = Array(number("groups", 3)).fill(null);
    const dataCount = Array(number("data", 3)).fill(null);
    const horizontal = boolean("horizontal", false);
    const offset = number("offset", 12);
    const data = dataCount.map((_d, dataIndex) =>
      groups.map((_g, groupIndex) => {
        const x = `Group ${groupIndex + 1} TickLabel`;
        const y = rand();
        return {
          // Starting with 0 seems to trigger domainPadding coercion. See the comment below.
          tooltip: `Bar ${dataIndex + 1}: ${y}\n${x}`,
          x,
          y,
        };
      })
    );
    // Include bottom legend
    const height = number("height", 400) || 350;
    const width = number("width", 350) || 450;

    return (
      <div style={{ height, width, overflow: "hidden" }}>
        <BarChart
          horizontal={horizontal}
          width={width}
          height={height}
          /*
            Victory requires data to be in the following format:
            [
              [group0bar0, group1bar0, group2bar0, ...etc],
              [group0bar1, group1bar1, group2bar1, ...etc],
              [group0bar2, group1bar2, group2bar2, ...etc],
              ...etc
            ]
          */
          data={data}
          barWidth={number("barWidth", 10)}
          offset={offset}
          // domainPadding value may be coerced. See 2nd note: https://formidable.com/open-source/victory/docs/common-props/#domainpadding
          domainPadding={object("domainPadding", { x: offset * data.length })}
          parts={{
            parent: {
              padding: { top: 50, left: 50, bottom: 50, right: 50 },
            },
            legend: {
              data: data.map((d, i) => ({
                name: `Bar ${i + 1}`,
                label: d.reduce((a, c) => `${a && `${a}\n`}${c.x}`, ""),
              })),
              rowGutter: { top: 20 },
              x: 70,
            },
            tooltip: { style: { textAnchor: "start" } },
          }}
        />
      </div>
    );
  });

storiesOf("HURUmap UI/Charts/Bullet Chart", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div>
      <BulletChart
        data={object("data", [
          { x: "Male", y: 49, unit: "%" },
          { x: "Female", y: 51, unit: "%" },
        ])}
        height={number("height", 100)}
        reference={number("reference", 50)}
        width={number("width", 350)}
        total={100}
      />
    </div>
  ))
  .add("Comparison", () => (
    <div>
      <BulletChart
        data={object("data", [
          [
            { x: "Male", y: 49, unit: "%" },
            { x: "Female", y: 51, unit: "%" },
          ],
          [
            { x: "Male", y: 49, unit: "%" },
            { x: "Female", y: 51, unit: "%" },
          ],
        ])}
        height={number("height", 100)}
        reference={number("reference", 50)}
        total={[100, 100]}
        width={number("width", 700)}
      />
    </div>
  ));

storiesOf("HURUmap UI/Charts/ComparisonBarChart", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Default", () => {
    return (
      <div>
        <ComparisonBarChart
          data={object("data", [
            {
              x: "Ilala",
              y: 22,
            },
            {
              x: "Kinondoni",
              y: 17,
            },
          ])}
          reference={object("reference", [{ x: "Dar es Salaam", y: 28 }])}
        />
      </div>
    );
  });

storiesOf("HURUmap UI/Charts/LineChart", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div>
      <LineChart
        data={object("data", [
          { x: 1, y: -3 },
          { x: 2, y: 5 },
          { x: 3, y: 3 },
          { x: 4, y: 0 },
          { x: 5, y: -2 },
          { x: 6, y: -2 },
          { x: 7, y: 5 },
        ])}
        parts={object("parts", {
          container: {
            labels: ({ datum }) => `y: ${datum.x}`,
          },
          scatter: { size: 5 },
          parent: {
            minDomain: {
              y: 0,
            },
          },
        })}
      />
    </div>
  ))
  .add("Multiple/Comparison", () => (
    <div>
      <LineChart
        data={object("data", [
          [
            { x: "2013", y: 2, geo: "Dar es Salaam" },
            { x: "2014", y: -2, geo: "Dar es Salaam" },
            { x: "2015", y: -1, geo: "Dar es Salaam" },
            { x: "2016", y: 2, geo: "Dar es Salaam" },
            { x: "2017", y: 3, geo: "Dar es Salaam" },
          ],
          [
            { x: "2013", y: 3, geo: "Kagera" },
            { x: "2014", y: 0, geo: "Kagera" },
            { x: "2015", y: -2, geo: "Kagera" },
            { x: "2016", y: -2, geo: "Kagera" },
            { x: "2017", y: 5, geo: "Kagera" },
          ],
        ])}
        parts={{
          container: {
            labels: ({ datum }) => `${datum.geo}: ${datum.y}`,
          },
          legend: {
            data: [
              {
                name: "Male",
                description: "Male\n \nDar es Salaam vs Kagera",
              },
              {
                name: "Female",
                description: "Female\n \nDar es Salaam vs Kagera",
              },
            ],
            x: number("Legend x", 90),
          },
          scatter: [
            { size: 5, symbol: "circle" },
            { size: 5, symbol: "plus" },
          ],
          tooltip: { style: { textAnchor: "start" } },
        }}
      />
    </div>
  ));

storiesOf("HURUmap UI/Charts/PieChart", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Default", () => {
    const height = number("height", undefined) || 350;
    const width = number("width", undefined) || 350;
    const legendWidth = number("Legend width", 100);
    return (
      <div style={{ height, width }}>
        <PieChart
          data={object("data", [
            {
              x: "Place to Wash Hands",
              y: 22,
              donutLabel: "Place to Wash Hands\n22%",
              name: "Place to Wash Hands",
            },
            {
              x: "No Place to Wash Hands",
              y: 78,
              donutLabel: "No Place to Wash Hands\n78%",
              name: "No Place to Wash Hands",
            },
          ])}
          sortKey={text("sortKey", "x")}
          sortOrder={text("sortOrder", "descending")}
          donut={boolean("donut", true)}
          donutLabelKey={object("donutLabelKey", {
            dataIndex: 0,
            columnIndex: 0,
            sortKey: "value",
          })}
          height={height}
          labels={({ datum }) => labels(datum)}
          legendWidth={legendWidth}
          parts={{
            legend: {
              rowGutter: number("Legend row spacing", 20),
              style: {
                labels: object("Legend style", undefined),
              },
            },
          }}
          responsive={boolean("responsive", true)}
          standalone={boolean("standalone", true)}
          width={width}
        />
      </div>
    );
  })
  .add("Comparison", () => {
    const height = number("height", undefined) || 350;
    const width = number("width", undefined) || 350;

    return (
      <div style={{ height, width }}>
        <PieChart
          data={object("data", [
            [
              {
                x: "A",
                y: 6,
                donutLabel: "A\nDar es Salaam 6",
                label: "A: Dar es Salaam 6",
              },
              {
                x: "B",
                y: 1,
                donutLabel: "B\nDar es Salaam 1",
                label: "B: Dar es Salaam 1",
              },
              {
                x: "C",
                y: 3,
                donutLabel: "C\nDar es Salaam 3",
                label: "C: Dar es Salaam 3",
              },
              {
                x: "D",
                y: 1,
                donutLabel: "D\nDar es Salaam 1",
                label: "D: Dar es Salaam 1",
              },
              {
                x: "E",
                y: 12,
                donutLabel: "E\nDar es Salaam 12",
                label: "E: Dar es Salaam 12",
              },
            ],
            [
              { x: "A", y: 3, donutLabel: "A\nKagera 3", label: "A: Kagera 3" },
              { x: "B", y: 1, donutLabel: "B\nKagera 1", label: "B: Kagera 1" },
              { x: "C", y: 2, donutLabel: "C\nKagera 2", label: "C: Kagera 2" },
              { x: "D", y: 2, donutLabel: "D\nKagera 2", label: "D: Kagera 2" },
              { x: "E", y: 5, donutLabel: "E\nKagera 5", label: "E: Kagera 5" },
            ],
          ])}
          donut={boolean("donut", true)}
          donutLabelKey={object("donutLabelKey", {
            dataIndex: 0,
            columnIndex: 0,
            sortKey: "value",
          })}
          groupSpacing={number("groupSpacing", 4)}
          height={height}
          parts={{
            legend: {
              align: select(
                "Legend align",
                ["top", "right", "bottom", "left"],
                "right"
              ),
              data: object("Legend data", [
                {
                  name: "A",
                  tooltip: "Dar es Salaam: 6\nKagera: 3",
                },
                {
                  name: "B",
                  tooltip: "Dar es Salaam: 1\nKagera: 1",
                },
                {
                  name: "C",
                  tooltip: "Dar es Salaam: 3\nKagera: 2",
                },
                {
                  name: "D",
                  tooltip: "Dar es Salaam: 1\nKagera: 2",
                },
                {
                  name: "E",
                  tooltip: "Dar es Salaam: 12\nKagera: 5",
                },
              ]),
              gutter: number("Legend column spacing", 10),
              orientation: select(
                "Legend orientation",
                ["horizontal", "vertical"],
                "vertical"
              ),
              rowGutter: number("Legend row spacing", 20),
              size: number("Legend size", 100),
              style: {
                labels: object("Legend style", undefined),
              },
            },
          }}
          responsive={boolean("responsive", true)}
          standalone={boolean("standalone", true)}
          width={width}
        />
      </div>
    );
  });

const formatter = new Intl.NumberFormat("en-GB");

storiesOf("HURUmap UI/Charts/NestedProportionalAreaChart", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <div>
      <NestedProportionalAreaChart
        formatNumberForLabel={(x) => formatter.format(x)}
        square={boolean("square", false)}
        height={number("height", 350)}
        width={number("width", 350)}
        data={object("data", [{ x: "City", y: 39626, label: "People" }])}
        reference={object("reference", [
          { x: "Country", y: 947303, label: "Country" },
        ])}
      />
    </div>
  ))
  .add("Comparison", () => (
    <div>
      <NestedProportionalAreaChart
        formatNumberForLabel={(x) => formatter.format(x)}
        square={boolean("square", false)}
        height={number("height", 350)}
        width={number("width", 650)}
        data={object("data", [
          { x: "City 1", y: 76151, label: "People" },
          { x: "City 2", y: 39626, label: "People" },
        ])}
        reference={object("reference", [
          { x: "Country", y: 947303, label: "Country" },
        ])}
        groupSpacing={number("groupSpacing", 8)}
      />
    </div>
  ));
