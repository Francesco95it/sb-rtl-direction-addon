import { IconButton } from "@storybook/components";
import { useGlobals } from "@storybook/manager-api";
import React, { memo, useCallback } from "react";
import { TOOL_ID } from "./constants";

export const Tool = memo(function MyAddonSelector() {
  const [globals, updateGlobals] = useGlobals();

  const toggleMyTool = useCallback(
    () =>
      updateGlobals({
        rtlDirection: globals.rtlDirection ? undefined : true,
      }),
    [globals.rtlDirection],
  );

  return (
    <IconButton
      key={TOOL_ID}
      active={globals.rtlDirection}
      title={`Turn ${globals.rtlDirection ? "off" : "on"} RTL`}
      onClick={toggleMyTool}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14"
        width="14"
        height="14"
        fill="currentColor"
      >
        <path
          d={
            globals.rtlDirection
              ? `M4.2 10.9 2.9 7.4H2v3.5H1V3.1h2.9l.6.4.5.6a3.1 3.1 0 0 1 .1 1A2.8 2.8 0 0 1 5 6l-.3.6-.4.4-.5.2 1.5 3.7zm0-5.6a1.4 1.4 0 0 0-.2-.7.5.5 0 0 0-.2-.4L3.4 4H2v2.6h.9a1.2 1.2 0 0 0 .9-.3 1.8 1.8 0 0 0 .4-1zM7.7 4v6.9h-1V4H5.2v-.9h4V4zm2.1 6.9V3.1h1V10H13v.9z`
              : `M1.3 10.9V3.1h.9V10h2.2v.9zM6.4 4v6.9h-1V4H4v-.9h3.9V4zm5.3 6.9-1.3-3.5h-.9v3.5h-1V3.1h2.8l.7.4.4.6a3 3 0 0 1 .2 1 2.8 2.8 0 0 1-.1.9l-.3.6-.5.3-.4.2 1.4 3.7zm-.1-5.6a1.5 1.5 0 0 0-.1-.7l-.3-.4-.4-.2H9.5v2.6h.9l.9-.3a1.7 1.7 0 0 0 .3-1z`
          }
        />
      </svg>
    </IconButton>
  );
});
