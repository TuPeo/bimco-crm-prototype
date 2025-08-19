import { AlpineComponent } from 'alpinejs';

export interface GoogleMapMarker {
  url?: string;
  target?: string;
  markerOptions: google.maps.marker.AdvancedMarkerElementOptions;
}

export interface GoogleMapParams {
  mapId: string;
  zoom: number;
  controls: boolean;
  markers: GoogleMapMarker[];
}

interface GoogleMapData {
  initMap(): void;
}

export default function googleMap(): AlpineComponent<GoogleMapData> {
  return {
    init() {
      this.initMap();
    },

    async initMap() {
      const mapContainer = this.$refs.mapContainer;
      const mapParamsInput: HTMLInputElement = this.$refs.mapParamsInput;
      const mapParams: GoogleMapParams = JSON.parse(mapParamsInput.value);

      const { Map } = await google.maps.importLibrary('maps')  as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary;
      const { LatLngBounds } = await google.maps.importLibrary('core') as google.maps.CoreLibrary;

      const map = new Map(mapContainer, {
        mapId: mapParams.mapId,
        disableDefaultUI: !mapParams.controls
      });

      mapParams.markers.forEach(markerItem => {

        const markerImg = document.createElement('img');
        markerImg.src = '/icons/mapmarker.svg';
        markerImg.role = 'presentation';
        markerImg.classList.add('google-map__marker-graphic');

        const clickable: boolean = markerItem.url?.length && true;

        const marker = new AdvancedMarkerElement({
          ...markerItem.markerOptions,
          map: map,
          content: markerImg,
          gmpClickable: clickable
        });

        if (clickable) {        
          const infowindow = new google.maps.InfoWindow({
            content: `<div class="google-map__marker-info-window"><p><a href="${markerItem.url}" target="${markerItem.target}">${markerItem.markerOptions.title}</a></p></div>`,
            ariaLabel: markerItem.markerOptions.title,
          });
          marker.addListener('gmp-click', () => {
            infowindow.open({
              anchor: marker,
              map: map
            });
          })
        }
      });

      if (mapParams.markers.length > 1) {
        const bounds = new LatLngBounds();
        mapParams.markers.forEach(markerItem => {
          bounds.extend(markerItem.markerOptions.position);
        });
        map.fitBounds(bounds);
      }
      else {
        map.setCenter(mapParams.markers[0].markerOptions.position);
        map.setZoom(mapParams.zoom > 0 ? mapParams.zoom : 4);
      }
    }
  }
}
