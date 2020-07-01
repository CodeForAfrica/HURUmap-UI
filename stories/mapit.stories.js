import React, { useCallback, useRef } from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  text,
  object,
  number,
  array,
  boolean,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { TileLayer } from "leaflet";
import countries from "@hurumap-ui/content/countries";
import MapIt from "@hurumap-ui/core/MapIt";
import { CenterDecorator } from "./common";

import "leaflet/dist/leaflet.css";

storiesOf("HURUmap UI/MapIt/Geography", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("ContinentRoot", () => (
    <MapIt
      height="100vh"
      tolerance={number("tolerance", 0.01)}
      url={text("url", "https://mapit.hurumap.org")}
      drawChildren={boolean("drawChildren", true)}
      filterCountries={array(
        "filterCountries",
        countries.map((c) => c.iso_code)
      )}
      drawProfile={boolean("drawProfile", false)}
      codeType={text("codeType", "AFR")}
      geoLevel={text("geoLevel", "continent")}
      geoCode={text("geoCode", "AFR")}
      zoom={number("zoom", 3)}
      center={array("center", [8.7832, 34.5085])}
      tileLayer={
        new TileLayer(
          text(
            "tileLayer",
            "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          )
        )
      }
      geoLayerBlurStyle={object("geoLayerBlurStyle", {
        color: "#00d",
        fillColor: "#ccc",
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3,
      })}
      onClickGeoLayer={action("onClickGeoLayer")}
    />
  ))
  .add("CountryRoot", () =>
    React.createElement(() => {
      /**
       * If tileLayer keeps changing it will trigger rerender
       */
      const tileLayer = useRef(
        new TileLayer(
          text(
            "tileLayer",
            "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          )
        )
      );
      /**
       * If onClickLayer keeps changing it will trigger rerender
       */
      const onClickLayer = useCallback(() => action("onClickGeoLayer")(), []);
      return (
        <MapIt
          height="100vh"
          tolerance={number("tolerance", 0.001)}
          url={text("url", "https://mapit.hurumap.org")}
          drawChildren={boolean("drawChildren", true)}
          filterCountries={array("filterCountries", [])}
          drawProfile={boolean("drawProfile", false)}
          codeType={text("codeType", "KEN")}
          geoLevel={text("geoLevel", "country")}
          geoCode={text("geoCode", "KE")}
          zoom={number("zoom", 3)}
          center={array("center", [8.7832, 34.5085])}
          tileLayer={tileLayer.current}
          geoLayerBlurStyle={object("geoLayerBlurStyle", {
            color: "#00d",
            fillColor: "#ccc",
            weight: 1.0,
            opacity: 0.3,
            fillOpacity: 0.3,
          })}
          onClickGeoLayer={onClickLayer}
        />
      );
    })
  )
  .add("DefaultProfile", () => (
    <MapIt
      height="100vh"
      tolerance={number("tolerance", 0.001)}
      url={text("url", "https://mapit.hurumap.org")}
      drawChildren={boolean("drawChildren", false)}
      filterCountries={array("filterCountries", [])}
      drawProfile={boolean("drawProfile", true)}
      codeType={text("codeType", "AFR")}
      geoLevel={text("geoLevel", "level1")}
      geoCode={text("geoCode", "KE_1_008")}
      zoom={number("zoom", 3)}
      center={array("center", [8.7832, 34.5085])}
      tileLayer={
        new TileLayer(
          text(
            "tileLayer",
            "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          )
        )
      }
      geoLayerBlurStyle={object("geoLayerBlurStyle", {
        color: "#00d",
        fillColor: "#ccc",
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3,
      })}
      onClickGeoLayer={action("onClickGeoLayer")}
    />
  ))
  .add("ProfileChildren", () => (
    <MapIt
      height="100vh"
      tolerance={number("tolerance", 0.001)}
      url={text("url", "https://mapit.hurumap.org")}
      drawChildren={boolean("drawChildren", true)}
      filterCountries={array("filterCountries", [])}
      drawProfile={boolean("drawProfile", true)}
      codeType={text("codeType", "TZA")}
      geoLevel={text("geoLevel", "district")}
      geoCode={text("geoCode", "85")}
      zoom={number("zoom", 6)}
      center={array("center", [-6.1523563, 35.6754813])}
      tileLayer={
        new TileLayer(
          text(
            "tileLayer",
            "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          )
        )
      }
      geoLayerBlurStyle={object("geoLayerBlurStyle", {
        color: "#00d",
        fillColor: "#ccc",
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3,
      })}
      onClickGeoLayer={action("onClickGeoLayer")}
    />
  ))
  .add("Colour Map", () => (
    <MapIt
      height="100vh"
      indexColor={object("indexColor", {
        "very high": "#8ed3a5",
        high: "#29a87c",
        moderate: "#223a07",
        low: "#7d8c6c",
        "very low": "#5bc17d",
      })}
      scoreLabel={text("scoreLabel", "All Section Vulnerability Score")}
      geoIndexMapping={object("geoIndexMapping", [
        {
          geoCode: "ZA_1_001",
          geoLevel: "level1",
          score: "0.25",
          index: "low",
        },
        {
          geoCode: "ZA_1_002",
          geoLevel: "level1",
          score: "0.875",
          index: "very high",
        },
        {
          geoCode: "ZA_1_003",
          geoLevel: "level1",
          score: "0",
          index: "very low",
        },
        {
          geoCode: "ZA_1_004",
          geoLevel: "level1",
          score: "0.25",
          index: "low",
        },
        {
          geoCode: "ZA_1_005",
          geoLevel: "level1",
          score: "1",
          index: "very high",
        },
        {
          geoCode: "ZA_1_006",
          geoLevel: "level1",
          score: "0.25",
          index: "low",
        },
        {
          geoCode: "ZA_1_007",
          geoLevel: "level1",
          score: "0.125",
          index: "very low",
        },
        {
          geoCode: "ZA_1_008",
          geoLevel: "level1",
          score: "0.625",
          index: "high",
        },
        {
          geoCode: "ZA_1_009",
          geoLevel: "level1",
          score: "0.75",
          index: "high",
        },
        {
          geoCode: "ZA_2_00101",
          geoLevel: "level2",
          score: "0.6863",
          index: "high",
        },
        {
          geoCode: "ZA_2_00102",
          geoLevel: "level2",
          score: "0.1961",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00103",
          geoLevel: "level2",
          score: "0.8824",
          index: "very high",
        },
        {
          geoCode: "ZA_2_00104",
          geoLevel: "level2",
          score: "0.7255",
          index: "high",
        },
        {
          geoCode: "ZA_2_00105",
          geoLevel: "level2",
          score: "0.1176",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00191",
          geoLevel: "level2",
          score: "0.6078",
          index: "high",
        },
        {
          geoCode: "ZA_2_00210",
          geoLevel: "level2",
          score: "0.6275",
          index: "high",
        },
        {
          geoCode: "ZA_2_00212",
          geoLevel: "level2",
          score: "0.9608",
          index: "very high",
        },
        {
          geoCode: "ZA_2_00213",
          geoLevel: "level2",
          score: "0.6863",
          index: "high",
        },
        {
          geoCode: "ZA_2_00214",
          geoLevel: "level2",
          score: "0.2745",
          index: "low",
        },
        {
          geoCode: "ZA_2_00215",
          geoLevel: "level2",
          score: "0.3922",
          index: "low",
        },
        {
          geoCode: "ZA_2_00244",
          geoLevel: "level2",
          score: "0.9216",
          index: "very high",
        },
        {
          geoCode: "ZA_2_00292",
          geoLevel: "level2",
          score: "0.5294",
          index: "moderate",
        },
        {
          geoCode: "ZA_2_00293",
          geoLevel: "level2",
          score: "0.3725",
          index: "low",
        },
        {
          geoCode: "ZA_2_00306",
          geoLevel: "level2",
          score: "0.0588",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00307",
          geoLevel: "level2",
          score: "0.2353",
          index: "low",
        },
        {
          geoCode: "ZA_2_00308",
          geoLevel: "level2",
          score: "0.1569",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00309",
          geoLevel: "level2",
          score: "0.0196",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00345",
          geoLevel: "level2",
          score: "0.7843",
          index: "high",
        },
        {
          geoCode: "ZA_2_00416",
          geoLevel: "level2",
          score: "0.6471",
          index: "high",
        },
        {
          geoCode: "ZA_2_00418",
          geoLevel: "level2",
          score: "0.5294",
          index: "moderate",
        },
        {
          geoCode: "ZA_2_00420",
          geoLevel: "level2",
          score: "0.902",
          index: "very high",
        },
        {
          geoCode: "ZA_2_00494",
          geoLevel: "level2",
          score: "0.3529",
          index: "low",
        },
        {
          geoCode: "ZA_2_00521",
          geoLevel: "level2",
          score: "0.9804",
          index: "very high",
        },
        {
          geoCode: "ZA_2_00522",
          geoLevel: "level2",
          score: "0.3333",
          index: "low",
        },
        {
          geoCode: "ZA_2_00523",
          geoLevel: "level2",
          score: "0.4314",
          index: "moderate",
        },
        {
          geoCode: "ZA_2_00524",
          geoLevel: "level2",
          score: "0.5098",
          index: "moderate",
        },
        {
          geoCode: "ZA_2_00525",
          geoLevel: "level2",
          score: "0.098",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00526",
          geoLevel: "level2",
          score: "0.7451",
          index: "high",
        },
        {
          geoCode: "ZA_2_00527",
          geoLevel: "level2",
          score: "0.8235",
          index: "very high",
        },
        {
          geoCode: "ZA_2_00528",
          geoLevel: "level2",
          score: "0.5294",
          index: "moderate",
        },
        {
          geoCode: "ZA_2_00529",
          geoLevel: "level2",
          score: "1",
          index: "very high",
        },
        {
          geoCode: "ZA_2_00543",
          geoLevel: "level2",
          score: "0.4902",
          index: "moderate",
        },
        {
          geoCode: "ZA_2_00595",
          geoLevel: "level2",
          score: "0.8627",
          index: "very high",
        },
        {
          geoCode: "ZA_2_00637",
          geoLevel: "level2",
          score: "0.8039",
          index: "very high",
        },
        {
          geoCode: "ZA_2_00638",
          geoLevel: "level2",
          score: "0.4118",
          index: "moderate",
        },
        {
          geoCode: "ZA_2_00639",
          geoLevel: "level2",
          score: "0.5882",
          index: "moderate",
        },
        {
          geoCode: "ZA_2_00640",
          geoLevel: "level2",
          score: "0.0392",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00742",
          geoLevel: "level2",
          score: "0.1765",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00748",
          geoLevel: "level2",
          score: "0.2157",
          index: "low",
        },
        {
          geoCode: "ZA_2_00797",
          geoLevel: "level2",
          score: "0.8431",
          index: "very high",
        },
        {
          geoCode: "ZA_2_00798",
          geoLevel: "level2",
          score: "0.2549",
          index: "low",
        },
        {
          geoCode: "ZA_2_00799",
          geoLevel: "level2",
          score: "0.1176",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00830",
          geoLevel: "level2",
          score: "0.4314",
          index: "moderate",
        },
        {
          geoCode: "ZA_2_00831",
          geoLevel: "level2",
          score: "0.4706",
          index: "moderate",
        },
        {
          geoCode: "ZA_2_00832",
          geoLevel: "level2",
          score: "0.0784",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00933",
          geoLevel: "level2",
          score: "0.3137",
          index: "low",
        },
        {
          geoCode: "ZA_2_00934",
          geoLevel: "level2",
          score: "0.6667",
          index: "high",
        },
        {
          geoCode: "ZA_2_00935",
          geoLevel: "level2",
          score: "0.2941",
          index: "low",
        },
        {
          geoCode: "ZA_2_00936",
          geoLevel: "level2",
          score: "0",
          index: "very low",
        },
        {
          geoCode: "ZA_2_00947",
          geoLevel: "level2",
          score: "0.9412",
          index: "very high",
        },
      ])}
      tolerance={number("tolerance", 0.01)}
      url={text("url", "https://mapit.hurumap.org")}
      drawChildren={boolean("drawChildren", true)}
      drawGrandChildren={boolean("drawGrandChildren", true)}
      filterCountries={array("filterCountries", [])}
      drawProfile={boolean("drawProfile", true)}
      codeType={text("codeType", "AFR")}
      geoLevel={text("geoLevel", "country")}
      geoCode={text("geoCode", "ZA")}
      zoom={number("zoom", 6)}
      // center={array("center", [8.7832, 34.5085])}
      tileLayer={
        new TileLayer(
          text(
            "tileLayer",
            "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          )
        )
      }
      geoLayerBlurStyle={object("geoLayerBlurStyle", {
        color: "#00d",
        fillColor: "#ccc",
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3,
      })}
      geoLayerFocustyle={object("geoLayerFocusStyle", {
        color: "#8ed3a5",
        fillColor: "#ccc",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5,
      })}
      onClickGeoLayer={action("onClickGeoLayer")}
    />
  ));
