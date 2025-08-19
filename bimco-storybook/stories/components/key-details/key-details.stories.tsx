import * as React from "jsx-dom";
import type { StoryObj, Meta } from '@storybook/html';
import { KeyDetails, KeyDetailsProps } from './key-details';

const meta = {
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Listings/Key Details',
  tags: ['autodocs'],
  component: KeyDetails
} satisfies Meta<KeyDetailsProps>;

export default meta;
type Story = StoryObj<KeyDetailsProps>;

export const CardDetails = {
  args: {
    details: [
      {
        iconStyle: "solid",
        icon: "location-dot",
        title: "Panama City",
        content: "Panama"
      },
      {
        iconStyle: "solid",
        icon: "calendar",
        title: "01 Oct - 03 Oct 2024",
        content: "3 days"
      },
      {
        iconStyle: "solid",
        icon: "user-tie",
        title: "Thomas Daamsgard",
        content: "Head of Americas, BIMCO"
      },
      {
        iconStyle: "solid",
        icon: "keynote",
        title: "Conference",
        content: "Maritime Digitalisation, Ports"
      },
      {
        iconStyle: "solid",
        icon: "user",
        title: "6 Available Seats",
      },
    ]
  }
} satisfies Story;

export const EventDetails = {
  args: {
    details: [
      {
        iconStyle: "solid",
        icon: "location-dot",
        title: "BIMCO",
        link: "https://www.google.co.uk/maps/place/BIMCO/@55.7649166,12.4657313,17z/data=!3m1!4b1!4m6!3m5!1s0x46524e33fb630231:0x7ededa4863e9a77a!8m2!3d55.7649166!4d12.4683062!16s%2Fg%2F1td46kwy?entry=ttu&g_ep=EgoyMDI0MTExMS4wIKXMDSoASAFQAw%3D%3D",
        content: [
          <address>
          Bagsværdvej 161, 2880 Bagsværd<br />
          Denmark
          </address>
        ]
      },
      {
        iconStyle: "solid",
        icon: "calendar",
        title: "01 Oct - 03 Oct 2024",
        content: "3 days"
      },
      {
        iconStyle: "solid",
        icon: "clock",
        title: "9:00 - 17:00",
        content: "GMT+1"
      },
      {
        iconStyle: "solid",
        icon: "user",
        title: "Thomas Daamsgard",
        content: "Head of Americas, BIMCO",
        link: "mailto:email@domain.com"
      },
      {
        iconStyle: "solid",
        icon: "tags",
        title: "Event Type",
        content: "Tags"
      },
      {
        iconStyle: "solid",
        icon: "cart-shopping",
        title: "From EUR 1234",
        content: [
          <i class="fa-brands fa-cc-visa" aria-hidden="true"></i>,
          <i class="fa-brands fa-cc-mastercard" aria-hidden="true"></i>,
          <i class="fa-brands fa-cc-amex" aria-hidden="true"></i>,
          <i class="fa-solid fa-sharp fa-file-invoice" aria-hidden="true"></i>,
        ]
      },
      {
        iconStyle: "solid",
        icon: "users-line",
        title: "6 Available Seats",
      },
    ]
  }
} satisfies Story;