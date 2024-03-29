// (c) 2022 lolorenzo777 <lolorenzo777@sunraylab.net>
'use strict';

// detectBrowser provide a way to easily detect most used browser
// recommended to user navigator.userAgentData.brands since 2021
export default async function detectBrowser() {
  function match(str) {
    if (str.match(/opr\//i)) {
      return 'Opera';
    } else if (str.match(/edg/i)) {
      return 'Edge';
    } else if (str.match(/safari/i)) {
      return 'Safari';
    } else if (str.match(/chrome/i)) {
      return 'Chrome';
    } else if (str.match(/firefox|fxios/i)) {
      return 'Firefox';
    }
  }

  if ((navigator.brave && (await navigator.brave.isBrave())) || false) {
    return 'Brave';
  }

  let browser;
  if (navigator.userAgentData) {
    console.log(navigator.userAgentData);
    for (var i in navigator.userAgentData.brands) {
      browser = match(navigator.userAgentData.brands[i].brand);
      if (browser) {
        break;
      }
    }
  } else {
    // some browsers do not support yet navigator.userAgentData
    browser = match(navigator.userAgent);
  }
  if (!browser) {
    browser = 'Undefined';
  }
  return browser;
}
