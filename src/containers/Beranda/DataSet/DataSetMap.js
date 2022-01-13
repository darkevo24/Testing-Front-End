import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Leaflet from 'leaflet';
import { LeafletMap, MapTile } from 'components';
import IdStates from './IdStates.json';
import { getMapFillColor } from 'utils/helper';

import 'leaflet-draw';

const DataSetMap = ({ bem, onUpdateRegion = () => {} }) => {
  const { t } = useTranslation();
  const [map, setMap] = useState(null);
  const [drawnItems, setDrawnItems] = useState(null);

  const handleRegionClick = (_) => {
    // Getting the click event but currently not supporting it as backend does not support filter through regions
  };

  const getStyles = (feature) => {
    return {
      fillColor: getMapFillColor(feature.properties.kode),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (_, layer) => {
    layer.on({ click: handleRegionClick });
  };

  const handleDraw = ({ layer, layerType }) => {
    // Clearing the existing layers on the map
    drawnItems.clearLayers();

    if (layerType === 'rectangle') {
      onUpdateRegion(layer.getLatLngs());
      drawnItems.addLayer(layer);
    }
  };

  const handleDrawEdit = ({ layers }) => {
    layers.eachLayer(function (layer) {
      if (layer instanceof Leaflet.Rectangle) {
        // Update the region lat longs with the updated rectangle
        onUpdateRegion(layer.getLatLngs());
      }
    });
  };

  const handleDrawDeleted = ({ layers }) => {
    layers.eachLayer(function (layer) {
      // Checking if the layer removed is the rectangle one
      if (layer instanceof Leaflet.Rectangle) {
        // Update the region lat longs with the updated rectangle
        onUpdateRegion(null);
      }
    });
  };

  const handleMapCreated = (map) => {
    Leaflet.geoJson(IdStates, { style: getStyles, onEachFeature }).addTo(map);

    const drawnItems = new Leaflet.FeatureGroup();
    map.addLayer(drawnItems);
    const drawControl = new Leaflet.Control.Draw({
      draw: {
        polygon: false,
        polyline: false,
        rectangle: true,
        circle: false,
        circlemarker: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItems,
        edit: true,
      },
    });
    map.addControl(drawControl);

    setDrawnItems(drawnItems);
    setMap(map);
  };

  useEffect(() => {
    if (map) {
      map.on('draw:created', handleDraw);
      map.on('draw:edited', handleDrawEdit);
      map.on('draw:deleted	', handleDrawDeleted);
    }
  }, [map]);

  const mapConfig = {
    mapProps: {
      center: [0.7893, 113.9213],
      zoom: 4,
      minZoom: 4,
      maxBounds: [
        [7.535454, 93.149646],
        [-12.484996, 143.051476],
      ],
      maxBoundsViscosity: 1.0,
      whenCreated: handleMapCreated,
    },
    className: bem.e('map'),
  };
  return (
    <MapTile
      title={t('beranda.dataset.filterLocation')}
      description={
        <>
          Map tiles by <span className="text-hightlighted"> Badan Informasi Geospasial</span>
        </>
      }
      map={<LeafletMap {...mapConfig} />}
    />
  );
};

export default DataSetMap;
