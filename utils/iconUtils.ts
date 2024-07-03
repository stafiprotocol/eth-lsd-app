import appConfig from "config/appConf/app.json";

export function getTokenIcon() {
  return appConfig.token.tokenIcon;
}

export function getLsdTokenIcon() {
  return appConfig.token.lsdTokenIcon;
}
