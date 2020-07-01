import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, object } from "@storybook/addon-knobs";

import Snippet from "@hurumap-ui/core/Snippet";
import { CenterDecorator } from "./common";

function decodeHTML(str) {
  const doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent;
}
storiesOf("HURUmap UI/Snippets/Default", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Snippet
      width={text("width", undefined)}
      share={object("share", {
        facebook: {},
        twitter: {},
      })}
      post={{
        title: "Development context but with added words to show long title",
        content: decodeHTML(
          text(
            "Content (ReadMore split; <p><!--more--></p>)",
            `
<p><span style="font-weight: 400;">We’ve put together a list of some sources to go to for mapping data but there is very little specific information available on vulnerable communities. Let us know if you have anything to share.&nbsp;</span></p>
<p><b>GRID3, which provides geo-references infrastructure and demographic data for development has been mapping settlements to support COVID-19 responses.&nbsp;</b></p>
<p><!--more--></p>
<p><a href="https://grid3.org/news/settlement-extents-to-support-covid19-response-efforts" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://grid3.org/news/settlement-extents-to-support-covid19-response-efforts</span></a></p>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Population data are available for DRC, Nigeria, South Sudan and Zambia at </span><a href="https://grid3.org/resources/data" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://grid3.org/resources/data</span></a><span style="font-weight: 400;">, which connects to WorldPop Open Population Repository: </span><a href="https://wopr.worldpop.org/" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://wopr.worldpop.org/</span></a></li>
<li style="font-weight: 400;"><span style="font-weight: 400;">Settlements data are available for 26 African countries</span></li>
<li style="font-weight: 400;"><span style="font-weight: 400;">Points of interest data are available in Nigeria, linking to a number of datasets from churches to laboratories,&nbsp; markets to primary schools, public water points to vaccine cold storage facilities. </span><a href="https://grid3.gov.ng/datasets" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://grid3.gov.ng/datasets</span></a></li>
<li style="font-weight: 400;"><span style="font-weight: 400;">Administrative boundaries data sets are also available for Nigeria</span></li>
</ul>
<p><b>Ushahdi has a number of maps available on its COVID site: </b><a href="https://www.ushahidi.com/covid" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://www.ushahidi.com/covid</span></a></p>
<p><span style="font-weight: 400;">For example, monitoring and mapping the virus in:</span></p>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Kenya – </span><a href="https://ushahidi.covid-19.ke/views/map" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://ushahidi.covid-19.ke/views/map</span></a></li>
<li style="font-weight: 400;"><span style="font-weight: 400;">Nigeria – </span><a href="https://covid19nigeria.ushahidi.io/views/map" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://covid19nigeria.ushahidi.io/views/map</span></a></li>
</ul>
<p><b>Humanitarian Data Exchange has a COVID response mapping the pandemic in locations with a Humanitarian Response Plan, </b><span style="font-weight: 400;">using data sourced from WHO.&nbsp;</span></p>
<p><a href="https://data.humdata.org/event/covid-19" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://data.humdata.org/event/covid-19</span></a></p>
<p><span style="font-weight: 400;">Other data sets available include:</span></p>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">The #COVID19 Government Measures Dataset (Social distancing, Movement restrictions, Public health measures, Social and economic measures, Lockdowns) (source: ACAPS)</span></li>
<li style="font-weight: 400;"><span style="font-weight: 400;">The INFORM COVID-19 Risk Index is a composite index that identifies: “countries at risk from health and humanitarian impacts of COVID-19 that could overwhelm current national response (source: INFORM)</span></li>
<li style="font-weight: 400;"><a href="https://data.humdata.org/dataset/global-school-closures-covid19" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">Global School Closures COVID-19</span></a><span style="font-weight: 400;"> (source: UNESCO)</span></li>
<li style="font-weight: 400;"><span style="font-weight: 400;">Community knowledge and perceptions of the recent coronavirus outbreak in South Africa, Kenya, and Nigeria. (source: GeoPoll)</span></li>
</ul>
<p><b>WorldPop has put together a new&nbsp;portal to make visualizing and accessing global population demographics data&nbsp;more easily</b><span style="font-weight: 400;">. Particularly useful for NGOs serving specific communities, and as the COVID-19 fatality and hospitalization rates seem strongly influenced by age and sex.&nbsp; </span><a href="https://www.portal.worldpop.org/demographics/" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://www.portal.worldpop.org/demographics/</span></a></p>
<p><span style="font-weight: 400;">Select a country and a demographic group and WorldPop overlays data on a map to show density of numbers.&nbsp;</span></p>
<p><b>ESRI is hosting an interactive map gallery,</b><span style="font-weight: 400;"> which includes dashboards for a number of African countries: </span><a href="https://www.esri.com/en-us/covid-19/community-maps/gallery#/" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://www.esri.com/en-us/covid-19/community-maps/gallery#/</span></a></p>
<p><span style="font-weight: 400;">Its COVID hub lists a number of additional datasets: </span><a href="https://coronavirus-disasterresponse.hub.arcgis.com/" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://coronavirus-disasterresponse.hub.arcgis.com/</span></a></p>
<p><b>91-DIVOC&nbsp;is an interactive visualization of the exponential spread of COVID-19.</b><span style="font-weight: 400;"> You can select a country to highlight the virus’ growth against global tracking, looking at cases, deaths, recoveries by day, week or average.&nbsp;</span></p>
<p><a href="http://91-divoc.com/pages/covid-visualization/" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">http://91-divoc.com/pages/covid-visualization/</span></a></p>
<p><b>This&nbsp;COVID-19 Interactive Map is tracking total confirmed cases, deaths, and recoveries in near real-time.</b><span style="font-weight: 400;"> Part of&nbsp;Johns Hopkins University &amp; Medicine’s Coronavirus Resource Center, many data sets are taking baseline numbers from here: </span><a href="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6</span></a></p>
<p><b>Data.World</b><span style="font-weight: 400;">, which collates open source data to create a unified body of knowledge anyone can find, understand, and use, has a COVID response offering. The data sets are very US centric but Data.World also lists other places to find data at the bottom of the resource page.</span> <a href="https://data.world/resources/coronavirus/" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://data.world/resources/coronavirus/</span></a></p>
<p><b>There are also communities you can join to contribute mapping data to the larger COVID effort:</b></p>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Humanitarian OpenStreetMap is mapping hospitals, pharmacies, clinics, and roads to help communities and health workers respond quickly.</span><span style="font-weight: 400;">&nbsp;</span><a href="https://www.hotosm.org/projects/hot-covid-19-response" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://www.hotosm.org/projects/hot-covid-19-response</span></a></li>
<li style="font-weight: 400;"><span style="font-weight: 400;">COVID Data Map&nbsp;is a data aggregation and mapping platform for organizations to share and display relevant data – they want you to join them.&nbsp;</span><a href="https://coviddatamap.org/" target="_blank" rel="noopener noreferrer"><span style="font-weight: 400;">https://coviddatamap.org/</span></a></li>
</ul>
            `
          )
        ),
      }}
    />
  ))
  .add("Link", () => (
    <Snippet
      link="#"
      share={object("share", {
        facebook: {},
        twitter: {},
      })}
      post={{
        title: "Development Context",
        content: decodeHTML(
          text(
            "Content (ReadMore split; <p><!--more--></p>)",
            `<p>
          <img class="alignnone size-full wp-image-72" src="https://www.soulschoolonline.com/wp-content/uploads/2012/05/ButterflyLifeCycle.gif" alt="" style="object-fit: cover;" width="100%" height="214" />
      </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p><!--more--></p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
          )
        ),
      }}
    />
  ));
