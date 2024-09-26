import { useState, useEffect } from "react";

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

export const useScrollbarWidth = () => {
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(0);

  useEffect(() => {
    const getScrollbarWidth = () => {
      // Create a temporary element
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll"; // forces scrollbar to appear
      outer.style.width = "100px"; // set a fixed width
      document.body.appendChild(outer);

      // Create an inner element and append it to the outer
      const inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);

      // Calculate the width difference between the outer and the inner
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      // Clean up
      outer.parentNode?.removeChild(outer);

      return scrollbarWidth;
    };

    // Set the scrollbar width in state
    const width = getScrollbarWidth();
    setScrollbarWidth(width);

    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${width}px`
    );
  }, []); // Run once on component mount

  return scrollbarWidth;
};
