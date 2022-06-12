// (c) 2022 lolorenzo777 <lolorenzo777@sunraylab.net>
'use strict';

import detectBrowser from './detectbrowser.js';
import * as _ from 'https://unpkg.com/@metamask/detect-provider@1.2.0/dist/detect-provider.min.js';

export const METAMASK_STATUS = {
  ENABLED: 0b00000011,
  ENABLED_METAMASK: 0b00000001,
  ENABLED_COMPATIBLE: 0b00000010,

  NOT_FOUND: 0b11110000,
  NOT_COMPATIBLE_BROWSER: 0b00010000,
  NOT_FOUND_ON_CHROME: 0b00100000,
  NOT_FOUND_ON_BRAVE: 0b01000000,
  NOT_FOUND_ON_FIREFOX: 0b01100000,

  PROVIDER_ISSUE: 0b00000100
};

export let MMProvider;

// return a METAMASK_STATUS code
export async function QueryMetamaskStatus() {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // able to access window.ethereum
    MMProvider = await detectEthereumProvider();
    if (MMProvider) {
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (MMProvider !== window.ethereum) {
        return PROVIDER_ISSUE;
      } else {
        if (MMProvider.isMetaMask) {
          return METAMASK_STATUS.ENABLED_METAMASK;
        } else {
          return METAMASK_STATUS.ENABLED_COMPATIBLE;
        }
      }
    } else {
      return METAMASK_STATUS.PROVIDER_ISSUE;
    }
  }

  // unable to access window.ethereum
  switch (await detectBrowser()) {
    case 'Chrome':
      return METAMASK_STATUS.NOT_FOUND_ON_CHROME;
    case 'Firefox':
      return METAMASK_STATUS.NOT_FOUND_ON_FIREFOX;
    case 'Brave':
      return METAMASK_STATUS.NOT_FOUND_ON_BRAVE;
  }
  return METAMASK_STATUS.NOT_COMPATIBLE_BROWSER;
}
