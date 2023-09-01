import lsdETHImg from "public/images/token/lsdETH.svg";
import ETHImg from "public/images/token/ETH.svg";
import peckShieldImg from "public/images/audit/peck_shield.svg";
import peckShieldDarkImg from "public/images/audit/peck_shield_dark.svg";
import blockSecImg from "public/images/audit/block_sec.svg";
import blockSecDarkImg from "public/images/audit/block_sec_dark.svg";

export function getTokenIcon() {
  return ETHImg;
}

export function getLsdTokenIcon() {
  return lsdETHImg;
}

export function getAuditIcon(name: string, darkMode?: boolean) {
  if (name === "PeckShield") {
    return darkMode ? peckShieldDarkImg : peckShieldImg;
  }
  if (name === "BlockSec") {
    return darkMode ? blockSecDarkImg : blockSecImg;
  }
}
