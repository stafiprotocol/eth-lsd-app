import appConfig from "config/appConf/app.json";

export function getTokenIcon() {
  return appConfig.token.ETHImg;
}

export function getLsdTokenIcon() {
  return appConfig.token.lsdETHImg;
}
