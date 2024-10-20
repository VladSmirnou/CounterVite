import type { Preview } from '@storybook/react';

const preview: Preview = {
    /** @type { import('@storybook/react').Preview } */
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
