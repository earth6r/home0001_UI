import React from "react";
import { Modules } from "../components/modules";

export const RenderModules = (modules: [], specs = false) => {
  if (modules) {
    return modules.map((module: { _key: string; _type: string }) => {
      return (
        <React.Fragment key={module._key}>
          <Modules specs={specs} type={module._type} reactModule={module} />
        </React.Fragment>
      );
    });
  }
};
