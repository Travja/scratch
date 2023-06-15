export enum BROWSER_ENUM {
  EDGE,
  INTERNET_EXPLORER,
  FIRE_FOX,
  OPERA,
  UC_BROWSER,
  SAMSUNG_BROWSER,
  CHROME,
  SAFARI,
  UNKNOWN
}

const testUserAgent = (regexp: RegExp): boolean => regexp.test(window.navigator.userAgent);

export const detectBrowser = (): BROWSER_ENUM => {
  switch (true) {
    case testUserAgent(/edg/i):
      return BROWSER_ENUM.EDGE;
    case testUserAgent(/trident/i):
      return BROWSER_ENUM.INTERNET_EXPLORER;
    case testUserAgent(/firefox|fxios/i):
      return BROWSER_ENUM.FIRE_FOX;
    case testUserAgent(/opr\//i):
      return BROWSER_ENUM.OPERA;
    case testUserAgent(/ucbrowser/i):
      return BROWSER_ENUM.UC_BROWSER;
    case testUserAgent(/samsungbrowser/i):
      return BROWSER_ENUM.SAMSUNG_BROWSER;
    case testUserAgent(/safari/i):
      return BROWSER_ENUM.SAFARI;
    case testUserAgent(/chrome|chromium|crios/i):
      return BROWSER_ENUM.CHROME;
    default:
      return BROWSER_ENUM.UNKNOWN;
  }
};
