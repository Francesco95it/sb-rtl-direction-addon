import type {
  Renderer,
  PartialStoryFn as StoryFunction,
  StoryContext,
} from "@storybook/types";
import {
  useRef,
  useEffect,
  useGlobals,
  useParameter,
} from "@storybook/preview-api";

interface Settings {
  // Collection for locales (e.g. "en", "en-US", "ar")
  autoLocales?: string[];
  // Condition to refresh page
  reload?: boolean;
}

const updateHtmlLang = (locale?: string, settings?: Settings) => {
  const lang = document.documentElement.getAttribute("lang");
  if (!locale || !settings) return lang;
  if (lang !== locale) {
    document.documentElement.setAttribute("lang", locale);
  }
  return locale;
};

export const withGlobals = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => {
  const [{ locale, rtlDirection }, updateGlobals] = useGlobals();
  const settings: Settings = useParameter("rtlDirection");
  const { current: htmlLang } = useRef(updateHtmlLang(locale, settings));

  useEffect(() => {
    const direction = rtlDirection ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", direction);
  }, [rtlDirection]);

  useEffect(() => {
    // Check url and find
    const urlParams = new URLSearchParams(window.location.search);
    const globals = urlParams.get("globals");
    if (!globals) return;
    const [dir] = globals
      .split(";")
      .map((params) => {
        return params.indexOf("rtlDirection:") === 0 && params.split(":")[1];
      })
      .filter(Boolean);
    if (dir === "true") updateGlobals({ rtlDirection: true });
  }, []);

  useEffect(() => {
    if (
      !locale ||
      !settings ||
      !settings.autoLocales ||
      !settings.autoLocales.length
    ) {
      return;
    }
    const { autoLocales, reload } = settings;
    const lang = locale.substring(0, 2);
    const isRtl = autoLocales.some((l) => {
      return l.indexOf("-") === -1 ? l === lang : l === locale;
    });

    if (isRtl && !rtlDirection) {
      updateGlobals({ rtlDirection: true });
    }

    // If reload is true and locale is different than html lang, refresh page
    if (reload && htmlLang !== locale) {
      // Add delay to make sure to update rtlDirection to global variables
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  }, [locale]);

  return StoryFn();
};
