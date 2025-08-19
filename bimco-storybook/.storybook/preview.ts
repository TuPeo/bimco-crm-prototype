import type { Preview } from '@storybook/html';
import { withThemeByClassName } from '@storybook/addon-themes';

import '../stories/preview/global.scss';
import '../stories/preview/main';

export const decorators = [
  withThemeByClassName({
    themes: {
      'White': 'theme theme--white',
      'Light': 'theme theme--light',
      'Dark': 'theme theme--dark',
      'Brand': 'theme theme--brand',
    },
    defaultTheme: 'White',
  }),
];

const preview: Preview = {
  decorators: decorators,
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      source: {
        format: 'html'
      }
    },
    options: {
      storySort: {
        method: 'alphabetical'
      }
    }
  }
};

export default preview;
