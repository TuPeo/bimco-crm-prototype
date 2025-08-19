import type { StoryObj, Meta } from '@storybook/html';

import { NewsSocialShare } from "./news-social-share";

const meta: Meta<typeof NewsSocialShare> = {
  title: "Components/News/News Social Share",
  component: NewsSocialShare,
  argTypes: {
    icons: { control: "object" }, // Control icons as an object in Storybook
  },
}

export default meta;
type Story = StoryObj<typeof NewsSocialShare>;

export const DefaultShare: Story = {
  args: {
    icons: [
      {
        platform: "Twitter",
        shared: false,
        icon: "x-twitter",
        isBrand: true,
        iconLibrary: "regular",
      },
      {
        platform: "Facebook",
        shared: true,
        icon: "facebook-f",
        isBrand: true,
      },
      {
        platform: "LinkedIn",
        shared: false,
        icon: "linkedin-in",
        isBrand: true,
      },
      {
        platform: "Email",
        shared: false,
        icon: "envelope",
        isBrand: false,
        iconLibrary: "regular",
      },
    ],
  }
}
