// (c) 2022 lolorenzo777 <lolorenzo777@sunraylab.net>
'use strict';

export let myfavnetworks = [
  // BSC
  {
    chainId: '0x38', // 0x38 = 56
    blockExplorerUrls: ['https://bscscan.com'],
    chainName: 'Binance Smart Chain',
    iconUrls: ['https://cryptologos.cc/logos/binance-coin-bnb-logo.svg'],
    currencyName: 'Binance Smart Chain',
    symbol: 'BNB',
    rpcUrls: ['https://bsc-dataseed4.binance.org'],
    usenet: 'mainnet',
    chaindoc: 'https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain',
    tokens: [
      {
        symbol: 'BAT',
        type: 'ERC20',
        address: '0x101d82428437127bF1608F699CD651e6Abf9766E',
        iconUrl: 'https://cryptologos.cc/logos/basic-attention-token-bat-logo.svg'
      }
    ]
  },
  // Ethereum
  {
    chainId: '0x1', // 0x1 = 1
    blockExplorerUrls: ['https://ethscan.io'],
    chainName: 'Ethereum',
    iconUrls: ['https://cryptologos.cc/logos/ethereum-eth-logo.svg'],
    currencyName: 'Ethereum',
    symbol: 'ETH',
    rpcUrls: ['https://cloudflare-eth.com'],
    usenet: 'mainnet',
    tokens: [
      {
        symbol: 'BAT',
        type: 'ERC20',
        address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
        iconUrl: 'https://cryptologos.cc/logos/basic-attention-token-bat-logo.svg'
      },
      {
        symbol: 'USDT',
        type: 'ERC20',
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        iconUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg'
      }
    ]
  },
  // AVALANCHE C-Chain
  {
    chainId: '0xA86A', // 0xA86A = 43114
    blockExplorerUrls: ['https://snowtrace.io/'],
    chainName: 'Avalanche C-Chain',
    iconUrls: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg',
    currencyName: 'Avalanche AVAX-C',
    symbol: 'AVAX',
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    usenet: 'mainnet',
    chaindoc: 'https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche',
    tokens: [
      {
        symbol: 'BAT',
        type: 'ERC20',
        address: '0x98443B96EA4b0858FDF3219Cd13e98C7A4690588',
        iconUrl: 'https://cryptologos.cc/logos/basic-attention-token-bat-logo.svg'
      }
    ]
  },
  //POLYGON MATIC
  {
    chainId: '0x89', // 0x89 = 137
    blockExplorerUrls: ['https://polygonscan.com/'],
    chainName: 'Polygon',
    iconUrls: ['https://raw.githubusercontent.com/thirdweb-dev/chain-icons/main/svg/polygon.svg'],
    currencyName: 'Polygon MATIC',
    symbol: 'MATIC',
    rpcUrls: ['https://polygon-rpc.com'],
    usenet: 'mainnet',
    chaindoc: 'https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/'
  },
  {
    chainId: '0xA4EC', // 0xA4EC = 42220
    blockExplorerUrls: ['https://explorer.celo.org'],
    chainName: 'Celo',
    iconUrls: ['https://raw.githubusercontent.com/thirdweb-dev/chain-icons/main/svg/celo.svg'],
    currencyName: 'Celo',
    symbol: 'CELO',
    rpcUrls: ['https://forno.celo.org'],
    usenet: 'mainnet',
    chaindoc: 'https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup'
  }
];
