import { WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { MapOptions, PathOptions, TileLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';
declare const styles: Record<"root", import("@material-ui/styles").CSSProperties | (() => import("@material-ui/styles").CSSProperties)>;
interface Area {
    id: string;
    name: string;
    generation_high: number;
    generation_low: number;
    all_names: {};
    codes: {
        [key: string]: string;
    };
    country: string;
    country_name: string;
    type_name: string;
    type: string;
}
interface MapItProps extends WithStyles<typeof styles>, MapOptions {
    id?: string;
    url?: string;
    drawChildren?: boolean;
    drawProfile?: boolean;
    geoLevel?: string;
    geoCode?: string;
    codeType?: string;
    filterCountries?: string[];
    generation?: string;
    tileLayer?: TileLayer;
    geoLayerFocusStyle?: PathOptions;
    geoLayerBlurStyle?: PathOptions;
    geoLayerHoverStyle?: {};
    onClickGeoLayer?: (area: Area) => void;
}
declare const _default: React.ComponentType<Pick<MapItProps, "id" | "zoom" | "center" | "url" | "generation" | "drawChildren" | "drawProfile" | "geoCode" | "geoLevel" | "codeType" | "filterCountries" | "tileLayer" | "geoLayerFocusStyle" | "geoLayerBlurStyle" | "geoLayerHoverStyle" | "onClickGeoLayer" | "preferCanvas" | "attributionControl" | "zoomControl" | "closePopupOnClick" | "zoomSnap" | "zoomDelta" | "trackResize" | "boxZoom" | "doubleClickZoom" | "dragging" | "crs" | "minZoom" | "maxZoom" | "layers" | "maxBounds" | "renderer" | "fadeAnimation" | "markerZoomAnimation" | "transform3DLimit" | "zoomAnimation" | "zoomAnimationThreshold" | "inertia" | "inertiaDeceleration" | "inertiaMaxSpeed" | "easeLinearity" | "worldCopyJump" | "maxBoundsViscosity" | "keyboard" | "keyboardPanDelta" | "scrollWheelZoom" | "wheelDebounceTime" | "wheelPxPerZoomLevel" | "tap" | "tapTolerance" | "touchZoom" | "bounceAtZoomLimits"> & import("@material-ui/core").StyledComponentProps<"root">>;
export default _default;
