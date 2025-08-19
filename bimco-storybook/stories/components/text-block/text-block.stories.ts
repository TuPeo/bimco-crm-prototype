import { Meta, StoryObj } from "@storybook/html";
import { TextBlockComponent } from "./text-block";

// Metadata for Storybook
const meta: Meta<typeof TextBlockComponent> = {
  title: "Components/Text/Text Block Component",
  component: TextBlockComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    asymmetrical: {
      control: "boolean",
      description: "Enable or disable the asymmetrical layout",
    },
    eyebrow: {
      control: "text",
      description: "Optional eyebrow text to be displayed above the headline",
    },
    headline: {
      control: "text",
      description: "Main headline text for the block",
    },
    abstract: {
      control: "text",
      description: "Abstract description for the block",
    },
    headlineButtons: {
      control: "object",
      description:
        "List of buttons for the headline section with type and label",
    },
    columns: {
      control: "object",
      description:
        "List of columns, each with an optional title, content, and buttons",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextBlockComponent>;

// Story with 1 column
export const OneColumnTextBlock: Story = {
  args: {
    headline: "Headline",
    eyebrow: "Eyebrow",
    abstract:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultricies quam vel magna vestibulum, non consequat dolor vehicula. Pellentesque sit amet felis nulla. Vivamus varius dictum orci, nec vestibulum neque fermentum id.",
    columns: [
      {
        title: "Single Column Focus",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum, sem vel consectetur feugiat, lectus ligula hendrerit nunc, ac convallis purus eros vel nunc. Aenean tincidunt posuere ligula id vestibulum. Pellentesque fermentum dui vitae leo tincidunt aliquam.",
      },
    ],
    asymmetrical: false,
  },
};

// Story with 1 column and no headline elements
export const OneColumnTextBlockNoHeadline: Story = {
  args: {
    columns: [
      {
        title: "Single Column Focus",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum, sem vel consectetur feugiat, lectus ligula hendrerit nunc, ac convallis purus eros vel nunc. Aenean tincidunt posuere ligula id vestibulum. Pellentesque fermentum dui vitae leo tincidunt aliquam.",
      },
    ],
    asymmetrical: false,
  },
};

// Story with 2 columns (with buttons in second column)
export const TwoColumnTextBlock: Story = {
  args: {
    headline: "Headline",
    eyebrow: "Eyebrow",
    abstract:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt tristique ante, vel auctor eros vestibulum ac. Sed elementum varius nisl vel interdum. Aenean suscipit odio nec eros vestibulum condimentum.",
    columns: [
      {
        title: "",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim, ex a auctor pretium, mauris sem venenatis sapien, vel tincidunt nunc leo vitae ante. Nulla dictum mi nec ex volutpat scelerisque. Pellentesque eu est a libero congue efficitur.",
      },
      {
        title: "",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan nisi quis urna iaculis, non auctor velit finibus. Suspendisse potenti. Fusce ac ex leo. Duis tincidunt orci a felis varius, et feugiat dui auctor.",
        buttons: [
          { label: "Explore", type: "primary" },
          { label: "Contact Us", type: "secondary" },
        ],
      },
    ],
    asymmetrical: false,
  },
};

// Story with 2 columns and no headline elements (with buttons in second column)
export const TwoColumnTextBlockNoHeadline: Story = {
  args: {columns: [
      {
        title: "",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim, ex a auctor pretium, mauris sem venenatis sapien, vel tincidunt nunc leo vitae ante. Nulla dictum mi nec ex volutpat scelerisque. Pellentesque eu est a libero congue efficitur.",
      },
      {
        title: "",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan nisi quis urna iaculis, non auctor velit finibus. Suspendisse potenti. Fusce ac ex leo. Duis tincidunt orci a felis varius, et feugiat dui auctor.",
        buttons: [
          { label: "Explore", type: "primary" },
          { label: "Contact Us", type: "secondary" },
        ],
      },
    ],
    asymmetrical: false,
  },
};

// Story with 3 columns (with buttons in first and third columns)
export const ThreeColumnTextBlock: Story = {
  args: {
    headline: "Headline",
    eyebrow: "Eyebrow",
    abstract:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat eros eu massa tristique, vitae pharetra lacus tincidunt. Quisque in justo nec libero feugiat aliquet ac sed nisl. Mauris facilisis massa sed ante pellentesque malesuada.",
    headlineButtons: [
      { label: "Learn More", type: "primary" },
      { label: "Get Started", type: "secondary" },
    ],
    columns: [
      {
        title: "Column title 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Morbi suscipit, elit at posuere ullamcorper, purus mi iaculis odio, sed cursus augue risus sed ante. Nunc id vulputate odio. Nam vel sollicitudin augue.",
        buttons: [{ label: "Read More", type: "primary" }],
      },
      {
        title: "Column title 2",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus ipsum et magna finibus, id dignissim sem fermentum. Cras id sem a mauris sollicitudin suscipit non a mi. In auctor ac metus sit amet efficitur.",
      },
      {
        title: "Column title 3",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus elit non enim viverra, quis bibendum velit posuere. Phasellus non ex nec velit interdum facilisis ut eget risus. Nullam eu diam metus.",
        buttons: [{ label: "Get Started", type: "secondary" }],
      },
    ],
    asymmetrical: false,
  },
};

// Story with 4 columns (with buttons in all columns)
export const FourColumnTextBlock: Story = {
  args: {
    headline: "Headline",
    eyebrow: "Eyebrow",
    abstract:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat, purus vel hendrerit placerat, felis risus interdum leo, ac dapibus neque odio vel odio. Ut pretium euismod libero sit amet fermentum. Sed convallis ex eget metus dapibus luctus.",
    columns: [
      {
        title: "Column title 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dapibus neque ac erat bibendum, eget fermentum velit auctor. Nulla venenatis ligula in dolor suscipit vehicula. Fusce malesuada tincidunt est, vel lobortis ex.",
        buttons: [{ label: "Strategy", type: "primary" }],
      },
      {
        title: "Column title 2",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Aliquam varius, nisi ac fringilla viverra, metus libero auctor risus, ut efficitur mi lacus vel eros. Vivamus hendrerit metus eget orci consectetur aliquet.",
        buttons: [{ label: "Technology", type: "primary" }],
      },
      {
        title: "Column title 3",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit libero eget ligula dictum pharetra. Morbi nec lacus vel est facilisis cursus id eget enim. Suspendisse id nulla erat.",
        buttons: [{ label: "Marketing", type: "secondary" }],
      },
      {
        title: "Column title 4",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus eros in nulla malesuada, in eleifend lorem rutrum. Fusce eget purus convallis, lacinia augue non, pharetra sem. Sed eu nunc id quam malesuada lacinia.",
        buttons: [{ label: "Operations", type: "secondary" }],
      },
    ],
    asymmetrical: false,
  },
};
