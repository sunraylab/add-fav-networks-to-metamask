// (c) 2022 lolorenzo777 <lolorenzo777@sunraylab.net>
'use strict';

export let myfavnetworks = [
  {
    params: {
      chainId: '0x38', // 0x38 = 56
      blockExplorerUrls: ['https://bscscan.com'],
      chainName: 'Binance Smart Chain',
      iconUrls: ['https://cryptologos.cc/logos/binance-coin-bnb-logo.svg'],
      nativeCurrency: {
        name: 'Binance Smart Chain',
        symbol: 'BNB'
      },
      rpcUrls: ['https://bsc-dataseed4.binance.org']
    },
    usenet: 'mainnet',
    chaindoc: 'https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain'
  },
  {
    params: {
      chainId: '0x1', // 0x1 = 1
      blockExplorerUrls: ['https://ethscan.io'],
      chainName: 'Ethereum',
      iconUrls: ['https://cryptologos.cc/logos/ethereum-eth-logo.svg'],
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH'
      },
      rpcUrls: ['https://cloudflare-eth.com']
    },
    usenet: 'mainnet'
  },
  {
    params: {
      chainId: '0xA86A', // 0xA86A = 43114
      blockExplorerUrls: ['https://snowtrace.io/'],
      chainName: 'Avalanche C-Chain',
      iconUrls: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg',
      nativeCurrency: {
        name: 'Avalanche AVAX-C',
        symbol: 'AVAX'
      },
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc']
    },
    usenet: 'mainnet',
    chaindoc: 'https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche'
  },
  {
    params: {
      chainId: '0x89', // 0x89 = 137
      blockExplorerUrls: ['https://polygonscan.com/'],
      chainName: 'Polygon',
      iconUrls: ['https://raw.githubusercontent.com/thirdweb-dev/chain-icons/main/svg/polygon.svg'],
      nativeCurrency: {
        name: 'Polygon MATIC',
        symbol: 'MATIC'
      },
      rpcUrls: ['https://cloudflare-eth.com']
    },
    usenet: 'mainnet',
    chaindoc: 'https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
  },
  {
    params: {
      chainId: '0xA4EC', // 0xA4EC = 42220
      blockExplorerUrls: ['https://explorer.celo.org'],
      chainName: 'Celo',
      iconUrls: ['https://raw.githubusercontent.com/thirdweb-dev/chain-icons/main/svg/celo.svg'],
      nativeCurrency: {
        name: 'Celo',
        symbol: 'CELO'
      },
      rpcUrls: ['https://forno.celo.org']
    },
    usenet: 'mainnet',
    chaindoc: 'https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup'
  }
];
