import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    rtlDirection: {
      autoLocales: ["ar", "ar-OM", "pa-PK"],
    },
  },
  globals: {
    rtlDirection: false,
  },
  globalTypes: {
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
          { value: "ar-OM", right: "RTL", title: "Arabic (Oman) RTL" },
          { value: "pa-IN", right: "LTR", title: "Punjabi (India)" },
          { value: "pa-PK", right: "RTL", title: "Punjabi (Pakistan)" },
        ],
      },
    },
  },
};

export default preview;
