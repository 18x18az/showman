import type { Decorator, Preview } from '@storybook/react';
/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import '../src/app/globals.css';
import { ThemeProvider } from 'next-themes';
import React from 'react';

const customViewports = {
  fire7: {
    name: 'Fire 7',
    styles: {
      width: '600px',
      height: '1024px',
    },
  },
  pixel: {
    name: 'Pixel 6',
    styles: {
      width: '412px',
      height: '915px',
    },
  },
  stream: {
    name: 'Stream Output',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
};

const withTheme: Decorator = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme
  return (
    <ThemeProvider attribute="class" forcedTheme={theme}>
      <StoryFn />
    </ThemeProvider>
  )
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
      ],
      showName: true,
    },
  },
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    viewport: { viewports: customViewports },
  },

  decorators: [
    withTheme
  ],
};

export default preview;
