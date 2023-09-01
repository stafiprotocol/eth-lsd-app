import IcomoonReact from "icomoon-react";

const iconSet = require("../../icomoon-selection.json");

export const Icomoon = (props: any) => (
  <IcomoonReact iconSet={iconSet} {...props} />
);
