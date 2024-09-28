import { useEffect, useState } from "react";

type BrowserName =
  | "Firefox"
  | "Opera"
  | "Internet Explorer"
  | "Microsoft Edge"
  | "Chrome"
  | "Samsung Internet Browser"
  | "Safari"
  | "Unknown";
type OSName =
  | "Windows"
  | "MacOS"
  | "UNIX"
  | "Linux"
  | "Android"
  | "iOS"
  | "Unknown";

interface DeviceInfo {
  isMobile: boolean;
  browserName: BrowserName;
  osName: OSName;
}

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    browserName: "Unknown",
    osName: "Unknown",
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isMobile = /Mobi|Android/i.test(userAgent);

    const getBrowserName = () => {
      if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
      } else if (
        userAgent.indexOf("Opera") > -1 ||
        userAgent.indexOf("OPR") > -1
      ) {
        return "Opera";
      } else if (userAgent.indexOf("Trident") > -1) {
        return "Internet Explorer";
      } else if (userAgent.indexOf("Edg") > -1) {
        return "Microsoft Edge";
      } else if (userAgent.indexOf("SamsungBrowser") > -1) {
        return "Samsung Internet Browser";
      } else if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
      } else if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      }
      return "Unknown";
    };

    const getOSName = () => {
      if (userAgent.indexOf("Win") > -1) {
        return "Windows";
      } else if (userAgent.indexOf("Mac") > -1) {
        return "MacOS";
      } else if (userAgent.indexOf("X11") > -1) {
        return "UNIX";
      } else if (userAgent.indexOf("Linux") > -1) {
        return "Linux";
      } else if (/Android/i.test(userAgent)) {
        return "Android";
      } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        return "iOS";
      }
      return "Unknown";
    };

    setDeviceInfo({
      isMobile: isMobile,
      browserName: getBrowserName(),
      osName: getOSName(),
    });
  }, []);

  return deviceInfo;
};
