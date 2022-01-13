import { MapContainer, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import cx from 'classnames';
import bn from 'utils/bemNames';

// Leaflet configuration for the images
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require('assets/icons/leaflet/marker-icon-2x.png').default,
  iconUrl: require('assets/icons/leaflet/marker-icon.png').default,
  shadowUrl: require('assets/icons/leaflet/marker-shadow.png').default,
});

const bem = bn('leaflet-container');

const LeafletMap = ({ children, className, mapProps = {}, tileProps = {} }) => {
  return (
    <MapContainer {...mapProps} className={cx(bem.b(), className)}>
      <TileLayer
        {...tileProps}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default LeafletMap;
