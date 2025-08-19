import * as React from 'jsx-dom';
import { GoogleMapParams } from './google-map.alpine';
import './google-map.scss';

export interface GoogleMapProps {
  mapParams: GoogleMapParams;
}

export const GoogleMap = ({
  mapParams
}: GoogleMapProps) => {
  return (
    <div class="google-map"
      x-load
      x-data="googleMap">

      <div class="google-map__map-container" x-ref="mapContainer"></div>
      <input type="hidden" value={ JSON.stringify(mapParams) } x-ref="mapParamsInput" />
    </div>
  )
};
