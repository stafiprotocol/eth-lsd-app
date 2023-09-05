import appConfig from "config/appConf/app.json";

export function getTokenIcon() {
  return appConfig.token.ETHImg;
}

export function getLsdEthIcon() {
  return appConfig.token.lsdETHImg;
}
