// (c) 2022 lolorenzo777 <lolorenzo777@sunraylab.net>
'use strict';

import { METAMASK_STATUS, MMProvider, QueryMetamaskStatus } from './querymetamaskstatus.js';
import { myfavnetworks } from './myfav.js';
import { cardnetwork_template } from './cardnetwork-template.js';

/* disableAppFeatures
 * enable/disable app features and clear messagebox
 */
function disableAppFeatures(fDisable) {
  document.querySelectorAll('#networks button').forEach(function (btn) {
    btn.disabled = fDisable;
  });
  // clear messagebox
  if (fDisable) {
    document
      .getElementById('msgbox')
      .classList.remove('alert-primary', 'alert-success', 'alert-danger', 'alert-warning', 'show');
  }
}

/* onload
 * check metamask status and build the favorite network sections
 */
window.onload = () => {
  // display messages if metamask can't be used
  // and enable/disable app features according to metamask status
  QueryMetamaskStatus()
    .then((mmstatus) => {
      if (mmstatus & METAMASK_STATUS.ENABLED) {
        disableAppFeatures(false);
      } else {
        disableAppFeatures(true);
        if (mmstatus === METAMASK_STATUS.PROVIDER_ISSUE) {
          showMessage('alert-danger', 'Unable to access Metamask on your browser', false);
        } else if (mmstatus === METAMASK_STATUS.NOT_COMPATIBLE_BROWSER) {
          showMessage(
            'alert-danger',
            'Your browser is not compatible with MetaMask or an equivalent wallet extension.<hr>Metamask works only with Chrome, Brave or Firefox browser.',
            false
          );
        } else if (mmstatus === METAMASK_STATUS.NOT_FOUND_ON_CHROME) {
          showMessage(
            'alert-warning',
            "MetaMask is not installed or it's disabled!<br /><a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'>Install it on Chrome</a> or check extension settings to enable it.",
            false
          );
        } else if (mmstatus === METAMASK_STATUS.NOT_FOUND_ON_BRAVE) {
          showMessage(
            'alert-warning',
            "Brave Wallet is not enabled!<br /><a href='https://brave.com/fr/wallet/'>Enable Brave Wallet</a> or check settings (brave://settings/wallet) to enable it.",
            false
          );
        } else if (mmstatus === METAMASK_STATUS.NOT_FOUND_ON_FIREFOX) {
          showMessage(
            'alert-warning',
            "MetaMask is not installed or it's disabled!<br /><a href='https://addons.mozilla.org/fr/firefox/addon/ether-metamask'>Install it on Firefox</a> or check extension settings to enable it.",
            false
          );
        }
      }
    })
    .catch((err) => {
      console.error('catch ' + err);
    });

  // build the favorite network section with myfavnetworks entries
  document.getElementById('networks').innerHTML = '';
  if (myfavnetworks.length === 0) {
    showMessage('alert-danger', "unable to proceed. no network data'", false);
    return;
  }

  for (let i = 0; i < myfavnetworks.length; i++) {
    // initialise a default object for HTML templating
    let net = {
      params: {
        chainId: '0x0',
        blockExplorerUrls: [],
        chainName: 'EVM blockchain',
        iconUrls: ['https://raw.githubusercontent.com/thirdweb-dev/chain-icons/main/svg/ethereum.svg'],
        nativeCurrency: {
          name: '',
          symbol: 'TOKEN',
          decimals: 18
        },
        rpcUrls: []
      },
      usenet: 'usenet',
      chaindoc: ''
    };

    // check myfavs entries
    let err;
    myfavnetworks[i].usenet
      ? (net.usenet = myfavnetworks[i].usenet)
      : (err = 'missing usenet parameter in favorite network definition');
    myfavnetworks[i].params.chainId
      ? (net.params.chainId = myfavnetworks[i].params.chainId)
      : (err = 'missing chainId parameter in favorite network definition');
    myfavnetworks[i].params.chainName
      ? (net.params.chainName = myfavnetworks[i].params.chainName)
      : (err = 'missing chainName parameter in favorite network definition');
    myfavnetworks[i].params.iconUrls ? (net.params.iconUrls = myfavnetworks[i].params.iconUrls) : err;
    myfavnetworks[i].params.nativeCurrency.symbol
      ? (net.params.nativeCurrency.symbol = myfavnetworks[i].params.nativeCurrency.symbol)
      : (err = 'missing nativeCurrency.symbol parameter in favorite network definition');
    myfavnetworks[i].params.rpcUrls
      ? (net.params.rpcUrls = myfavnetworks[i].params.rpcUrls)
      : (err = 'missing rpcUrls parameter in favorite network definition');
    myfavnetworks[i].params.blockExplorerUrls
      ? (net.params.blockExplorerUrls = myfavnetworks[i].params.blockExplorerUrls)
      : (err = 'missing blockExplorerUrls parameter in favorite network definition');
    net.chaindoc = myfavnetworks[i].chaindoc;
    if (err) {
      showMessage('alert-danger', err, true);
      return;
    }

    // feed the page with all networks
    document.getElementById('networks').innerHTML += cardnetwork_template(net);
  }
};

/* clickAddNetwork
 * lookfor selected network data and call wallet_addEthereumChain API
 */
window.clickAddNetwork = (chainid) => {
  if (!MMProvider) {
    console.log('missing MMProvider');
    return;
  }
  disableAppFeatures(true);

  // lookup chainid in myfavnetworks
  let params;
  for (let i = 0; i < myfavnetworks.length; i++) {
    if (myfavnetworks[i].params.chainId === chainid) {
      params = new Array(myfavnetworks[i].params);
      break;
    }
  }

  if (!params || params.length === 0) {
    console.log(params);
    showMessage('alert-danger', "unable to proceed. missing network data for '" + chainid + '"', true);
    disableAppFeatures(false);
    return;
  }

  // fix request params structure
  if (params[0].nativeCurrency.decimals === undefined) {
    params[0].nativeCurrency['decimals'] = 18;
  }

  // if the chain is not in metamask, then open metamask and ask (1) to add the chain, (2) to switch to the chain
  // if the chain is already in metamask but not selected, then open metamask and ask to switch to the chain
  // if the chain is already selected, then call onSuccessfulAddChain without UI interactions
  // a success trigger the chainChanged event
  MMProvider.request({ method: 'wallet_addEthereumChain', params })
    .then(() => {
      showMessage('alert-success', 'network added', true);
      disableAppFeatures(false);
    })
    .catch((err) => {
      showMessage('alert-danger', err.message, true);
      disableAppFeatures(false);
    });
};

/**************************************
 * UI
 */

// helper to display the message box
function showMessage(alerttype, msg, fclose) {
  const box = document.getElementById('msgbox');
  box.classList.remove('alert-primary', 'alert-success', 'alert-danger', 'alert-warning');
  box.classList.add('show', alerttype);
  // add the close button if requested
  if (fclose === true) {
    msg +=
      '<button type="button" class="btn-close" data-bs-toggle="collapse" data-bs-target="#msgbox" aria-label="Close"></button>';
  }
  // feed the message itself
  box.innerHTML = msg;
}
