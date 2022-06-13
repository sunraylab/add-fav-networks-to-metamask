// (c) 2022 lolorenzo777 <lolorenzo777@sunraylab.net>
'use strict';

import { METAMASK_STATUS, MMProvider, QueryMetamaskStatus } from './querymetamaskstatus.js';
import { myfavnetworks } from './myfav.js';
import { template_cardnetwork } from './template-cardnetwork.js';
import { template_cardtoken } from './template-cardtoken.js';

/***********************************************************
 * disableAppFeatures
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

/***********************************************************
 * onload
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
    let netdata = {
      chainId: '0x0',
      blockExplorerUrls: [],
      chainName: 'EVM blockchain',
      iconUrls: ['https://raw.githubusercontent.com/thirdweb-dev/chain-icons/main/svg/ethereum.svg'],
      currencyName: '',
      symbol: 'TOKEN',
      rpcUrls: [],
      usenet: 'usenet',
      chaindoc: '',
      nbtokens: 0
    };

    // check myfavs entries
    let err;
    myfavnetworks[i].usenet
      ? (netdata.usenet = myfavnetworks[i].usenet)
      : (err = 'missing usenet parameter in favorite network definition');
    myfavnetworks[i].chainId
      ? (netdata.chainId = myfavnetworks[i].chainId)
      : (err = 'missing chainId parameter in favorite network definition');
    myfavnetworks[i].chainName
      ? (netdata.chainName = myfavnetworks[i].chainName)
      : (err = 'missing chainName parameter in favorite network definition');
    myfavnetworks[i].iconUrls ? (netdata.iconUrls = myfavnetworks[i].iconUrls) : err;
    myfavnetworks[i].symbol
      ? (netdata.symbol = myfavnetworks[i].symbol)
      : (err = 'missing nativeCurrency.symbol parameter in favorite network definition');
    myfavnetworks[i].rpcUrls
      ? (netdata.rpcUrls = myfavnetworks[i].rpcUrls)
      : (err = 'missing rpcUrls parameter in favorite network definition');
    myfavnetworks[i].blockExplorerUrls
      ? (netdata.blockExplorerUrls = myfavnetworks[i].blockExplorerUrls)
      : (err = 'missing blockExplorerUrls parameter in favorite network definition');
    netdata.chaindoc = myfavnetworks[i].chaindoc;
    if (myfavnetworks[i].tokens) netdata.nbtokens = myfavnetworks[i].tokens.length;
    if (err) {
      showMessage('alert-danger', err, true);
      return;
    }

    // feed the page with all networks
    // this will remove the template
    document.getElementById('networks').innerHTML += template_cardnetwork(netdata);
  }
  CloseSectionTokens();
};

/***********************************************************
 * clickAddNetwork
 * lookfor selected network data and call wallet_addEthereumChain API
 */
window.clickAddNetwork = (chainid) => {
  if (!MMProvider) {
    console.log('missing MMProvider');
    return;
  }
  disableAppFeatures(true);

  // lookup chainid in myfavnetworks
  let favnet;
  for (let i = 0; i < myfavnetworks.length; i++) {
    if (myfavnetworks[i].chainId === chainid) {
      favnet = myfavnetworks[i];
      break;
    }
  }

  if (favnet === undefined) {
    showMessage('alert-danger', "unable to proceed. missing network data for '" + favnet.chainId + '"', true);
    disableAppFeatures(false);
    return;
  }

  // fix request params structure
  let netparams = [{}];
  netparams[0]['chainId'] = favnet.chainId;
  netparams[0]['blockExplorerUrls'] = favnet.blockExplorerUrls;
  netparams[0]['chainName'] = favnet.chainName;
  netparams[0]['iconUrls'] = favnet.iconUrls;
  netparams[0]['nativeCurrency'] = {};
  netparams[0]['nativeCurrency']['name'] = favnet.currencyName;
  netparams[0]['nativeCurrency']['symbol'] = favnet.symbol;
  favnet.decimals
    ? (netparams[0]['nativeCurrency']['decimals'] = favnet.decimals)
    : (netparams[0]['nativeCurrency']['decimals'] = 18);
  netparams[0]['rpcUrls'] = favnet.rpcUrls;

  // if the chain is not in metamask, then open metamask and ask (1) to add the chain, (2) to switch to the chain
  // if the chain is already in metamask but not selected, then open metamask and ask to switch to the chain
  // if the chain is already selected, then success ending without UI interactions
  MMProvider.request({ method: 'wallet_addEthereumChain', params: netparams })
    .then(() => {
      showMessage('alert-success', 'Success<br/>The network is setup in your metamask extension.', true);
      disableAppFeatures(false);
    })
    .catch((err) => {
      showMessage('alert-danger', err.message, true);
      disableAppFeatures(false);
    });
};

/***********************************************************
 * clickTokens
 * collapse non selected networks then open the token section
 * and feed the token section
 */
window.clickTokens = (chainid) => {
  if (!MMProvider) {
    console.log('missing MMProvider');
    return;
  }

  // lookup chainid in myfavnetworks
  let favnet;
  for (let i = 0; i < myfavnetworks.length; i++) {
    if (myfavnetworks[i].chainId === chainid) {
      favnet = myfavnetworks[i];
      break;
    }
  }
  if (favnet === undefined || typeof favnet.tokens === 'undefined' || favnet.tokens.length === 0) {
    showMessage('alert-danger', "unable to proceed. missing network data for '" + favnet.chainId + '"', true);
    disableAppFeatures(false);
    return;
  }

  // hide all network cards unless the selected one
  document.querySelectorAll('#networks .cardnetwork').forEach(function (card) {
    if (card.id && card.id.substring(8) !== chainid) {
      card.classList.remove('d-flex');
      card.classList.add('d-none');
    }
  });

  // show the section tokens
  // remove any hidden HTML templates
  document.getElementById('section_tokens').innerHTML = `
    <h4>
      <button id="btnCloseSectionTokens" onclick="clickCloseTokens()" class="btn btn-info position-absolute top-0 start-50 translate-middle"><i class="bi bi-chevron-left"></i>
        Tokens
      </button>
    </h4>
  `;
  document.getElementById('section_tokens').classList.add('show');

  // loop overs tokens and display
  for (let i = 0; i < favnet.tokens.length; i++) {
    document.getElementById('section_tokens').innerHTML += template_cardtoken(favnet, favnet.tokens[i]);
  }
};

/***********************************************************
 *  clickWatchInMetamask
 *
 */
window.clickWatchInMetamask = (chainid, tokensymbol) => {
  const btn = document.getElementById('btnCloseSectionTokens');
  btn.focus();

  if (!MMProvider) {
    console.log('missing MMProvider');
    return;
  }
  disableAppFeatures(true);

  // console.log(chainid, tokensymbol);

  // lookup chainid and tokensymbol in myfavnetworks
  let favnet;
  for (let i = 0; i < myfavnetworks.length; i++) {
    if (myfavnetworks[i].chainId === chainid) {
      favnet = myfavnetworks[i];
      break;
    }
  }
  if (favnet === undefined || typeof favnet.tokens === 'undefined' || favnet.tokens.length === 0) {
    showMessage('alert-danger', "unable to proceed. missing network data for '" + favnet.chainId + '"', true);
    disableAppFeatures(false);
    return;
  }
  let token;
  for (let i = 0; i < favnet.tokens.length; i++) {
    if (favnet.tokens[i].symbol === tokensymbol) {
      token = favnet.tokens[i];
      break;
    }
  }
  if (token === undefined) {
    showMessage('alert-danger', "unable to proceed. missing token data for '" + tokensymbol + '"', true);
    disableAppFeatures(false);
    return;
  }

  // call metamask API, swithing to the right network first
  MMProvider.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: chainid }]
  })
    .then(() => {
      console.log(`chainid ${chainid} is selected`);
      // ok, the chain is selected
      // try to add the token
      const params = {
        type: token.type,
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: 18,
          image: token.iconUrl
        }
      };

      setTimeout(() => {
        MMProvider.request({ method: 'wallet_watchAsset', params })
          // the token request has been successful (but we don't know if process is terminated in metamask)
          .then((data) => {
            console.log(data);
            disableAppFeatures(false);
          })
          // not possible to add the token
          .catch((err) => {
            console.error(err);
            showMessage('alert-danger', err.message, true);
            disableAppFeatures(false);
          });
      }, 2000);
    })
    // the chain is not selected, not possible to add the token
    .catch((err) => {
      console.error(err);
      showMessage('alert-danger', err.message, true);
      disableAppFeatures(false);
    });
};

/***********************************************************
 * clickCloseTokens() & CloseSectionTokens()
 * collapse the token section and show all network cards
 */
window.clickCloseTokens = () => {
  CloseSectionTokens();
};

function CloseSectionTokens() {
  // collapse the section
  document.getElementById('section_tokens').innerHTML = ``;
  document.getElementById('section_tokens').classList.remove('show');
  // show all networks
  document.querySelectorAll('#networks .cardnetwork').forEach(function (card) {
    card.classList.remove('d-none');
    card.classList.add('d-flex');
  });
  //console.log('close token section terminated');
}

/***********************************************************
 * showMessage
 * helper to display the message box
 */
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
  box.focus();
}
