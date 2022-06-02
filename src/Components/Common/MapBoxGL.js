import React, { Fragment, useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import { MAPBOXGL_KEY, TOAST_DISTANCE } from "../../store/Constants/Constants";
import Tooltip from '../Common/Tooltip';
import ReactDOM from 'react-dom';
import { toast } from "react-toastify";

import { Container } from "../../Styles";
import "mapbox-gl/dist/mapbox-gl.css";
import "../../Styles/Map.css";

const MapBoxGL = ({
  markers,
  lng = -115.606391900599817,
  lat = 32.673693943392962,
  zm = 5,
  nearTechnician
}) => {
  mapboxgl.accessToken = MAPBOXGL_KEY;
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [longitude, setLongitude] = useState(lng);
  const [latitude, setLatitude] = useState(lat);
  const [zoom, setZoom] = useState(zm);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  const renderMap = () => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: zoom,
    });

    setMap(map.current);

    map.on("move", () => {
      setLongitude(map.getCenter().lng.toFixed(4));
      setLatitude(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // change cursor to pointer when user hovers over a clickable feature
    map.on('mouseenter', e => {
      if (e.features.length) {
        map.getCanvas().style.cursor = 'pointer';
      }
    });

    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on('mouseleave', () => {
      map.getCanvas().style.cursor = '';
    });

    // add tooltip when users mouse move over a point
    map.on('mousemove', e => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];
        const { bearing, tsecs } = feature.properties;

        if(bearing && tsecs){
          // Create tooltip node
          const tooltipNode = document.createElement('div');
          ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

          // Set tooltip on map
          tooltipRef.current
            .setLngLat(e.lngLat)
            .setDOMContent(tooltipNode)
            .addTo(map);
        }
      }
    });

    map.on("load", () => {
      // Add an image to use as a custom marker
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error) throw error;
          map.addImage("custom-marker", image);
          // Add a GeoJSON source with 2 points
          map.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: markers,
            },
          });

          // Add a symbol layer
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "name"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });

    if(nearTechnician && nearTechnician.length > 0){
      nearTechnician.forEach(near => {
        toast(`From: ${near.from} 
        To: ${near.to} 
        Distance between: ${near.distance} mts`, TOAST_DISTANCE);
      })
    }

    // const distance = distanceTwoPoints({lon1: -0.119824, lat1: 51.5112139, lon2: 2.3508, lat2: 48.8567, unit: 'K'})
    // if(0.3048 < distance){
    //   toast("Lorem ipsum dolor sit amet, consectetur adipiscing elit");
    // }

    // Clean up on unmount
    return () => map.remove();
  };

  useEffect(() => {
    if (map) return null;
    renderMap();
  }, [map, markers]);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <Container>
        Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}
      </Container>
      <Container>
        <div ref={mapContainer} className="map-container" />
      </Container>
    </Fragment>
  );
};

export default MapBoxGL;
