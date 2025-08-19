import type { StoryObj, Meta } from '@storybook/html';
import { GoogleMapProps, GoogleMap } from './google-map';

const meta = {
  title: 'Components/Map/Google Map',
  tags: ['autodocs'],
  component: GoogleMap
} satisfies Meta<GoogleMapProps>;

export default meta;
type Story = StoryObj<GoogleMapProps>;

export const Default: Story = {
  args: {
    mapParams: {
      mapId: '6d8adb5c10ac5ea0',
      zoom: 4,
      controls: false,
      markers: [
        {
          url: "https://www.example.com",
          markerOptions: {
            title: 'Denmark',
            position: {
              lat: 53.80907556036666,
              lng: 8.898731787188304
            }
          }
        },
        {
          markerOptions: {
            title: 'France',
            position: {
              lat: 49.634924206601035,
              lng: -1.6060842182894066
            }
          }
        },
        {
          markerOptions: {
            title: 'UK',
            position: {
              lat: 49.41777468710221,
              lng: 2.834771818517212
            }
          }
        }
      ]
    }
  }
};
