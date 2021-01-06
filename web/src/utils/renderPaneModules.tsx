import React from "react";
import { PaneModules } from "../components/paneModules";

export const RenderPaneModules = (modules: [], specs = false) => {
  if (modules) {
    return modules.map((module: { _key: string; _type: string }) => {
      return (
        <React.Fragment key={module._key}>
          <PaneModules specs={specs} type={module._type} reactModule={module} />
        </React.Fragment>
      );
    });
  }
};
