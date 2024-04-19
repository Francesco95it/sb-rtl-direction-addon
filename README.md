# Storybook RTL direction addon

A Storybook tool add-on to toggle html dir attribute between LTR and RTL.

- `dir="ltr"` or `dir="rtl"` style will be added to `html` tag with `LTR/RTL` icon in tool section.

## Installation

First, install the package.

```sh
npm install --save-dev sb-rtl-direction-addon
# using yarn
yarn add --dev sb-rtl-direction-addon
# using pnpm
pnpm add --save-dev sb-rtl-direction-addon
```

Then, register it as an addon in `.storybook/main.js`.

```js
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials'
    'sb-rtl-direction-addon', // 👈 register the addon here
  ],
};

export default config;
```

## Usage

The addon will be available in the toolbar section of the Storybook UI.

## With locale

You can sync with locale to set default direction.

```js
// preview.js

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en-US", right: "LTR", title: "English (United States)" },
        { value: "es", right: "LTR", title: "Spanish" },
        { value: "ar", right: "RTL", title: "Arabic" },
        { value: "ar-OM", right: "RTL", title: "Arabic (Oman)" },
        { value: "pa-IN", right: "LTR", title: "Punjabi (India)" },
        { value: "pa-PK", right: "RTL", title: "Punjabi (Pakistan)" },
      ],
    },
  },
};

export const parameters = {
  rtlDirection: {
    // Collection to set as RTL (You can add language or with add country code specifically)
    autoLocales: ["ar", "pa-PK"],
    // Condition to reload the page each time locale is updated
    reload: true,
  },
};
```