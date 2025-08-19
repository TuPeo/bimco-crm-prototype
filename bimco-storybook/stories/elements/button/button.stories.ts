import type { StoryObj, Meta } from '@storybook/html';
import { Button, ButtonProps } from "./button";

const meta = {
  title: 'Elements/Buttons/Button',
  tags: ['autodocs'],
  component: Button,
  argTypes: {
    label: { control: 'text' },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'link', 'icon-full', 'icon-subtle', 'icon-empty', 'icon-tag', 'success', 'danger', 'link']
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'large', 'fill']
    },
    iconBefore: { control: 'text' },
    iconAfter: { control: 'text' },
    iconStyle: {
      control: 'select',
      options: ['regular', 'solid']
    },
    isDisabled: { control: 'boolean' }
  }
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const ButtonDefault: Story = {
  
};

export const ButtonPrimary: Story = {
  args: {
    type: "primary",
  }
};

export const ButtonPrimaryWithIcon: Story = {
  args: {
    type: "primary",
    iconAfter: "arrow-right"
  }
};

export const ButtonSecondary: Story = {
  args: {
    type: "secondary"
  }
};

export const ButtonSecondaryWithIcon: Story = {
  args: {
    type: "secondary",
    iconAfter: "arrow-right"
  }
};

export const ButtonSuccess: Story = {
  args: {
    type: "success"
  }
};

export const ButtonDanger: Story = {
  args: {
    type: "danger"
  }
};

export const ButtonIconFull: Story = {
  args: {
    type: "icon-full",
    iconBefore: "arrow-down"
  }
}

export const ButtonIconSubtle: Story = {
  args: {
    type: "icon-subtle",
    iconBefore: "arrow-down"
  }
}

export const Link: Story = {
  args: {
    type: "link"
  }
}

export const LinkWithIcons: Story = {
  args: {
    type: "link",
    iconBefore: "check-circle",
    iconAfter: "arrow-right"
  }
}

export const ToggleButton: Story = {
  args: {
    type: "toggle",
    iconBefore: "bookmark",
  }
}

export const Card: Story = {
  args: {
    type: "card",
    label: "Read more",
    iconAfter: "arrow-right"
  }
}