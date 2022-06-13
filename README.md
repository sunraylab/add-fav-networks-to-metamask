# Add favorite EVM networks to Metamask wallet or Brave wallet

Very simple frontend webapp to add favorite EVM compatible networks to metamask or brave wallet.

This program is based on the ethereum API injected in the DOM of any page when the metamask extension is installed of brave wallet is enabled.

Installation of metamask extension or brave wallet is checked during page load. A customized message is displayed according to check results.

## How to use

Running at https://sunraylab.github.io/add-fav-networks-to-metamask/ with some top EVM networks.

Clone this repo then run liveserver. Open http://localhost:5500 on the Brave browser or where metamask extension in installed. Then simply click on add button to the selected network.

To make your own favorite list, then fork this repo and update the list of favorite networks in ``myfav.js``. Then you got your own page. You can publish it as a Github-Pages working at `/root`

Any entry must follow this structure :

```json
{
    chainId: "0x1", 
    blockExplorerUrls: ["https://ethscan.io"],
    chainName: "Ethereum",
    iconUrls: ["https://cryptologos.cc/logos/ethereum-eth-logo.svg"],
    currencyName: "Ethereum",
    symbol: "ETH",
    rpcUrls: ["https://cloudflare-eth.com"],
    usenet: "mainnet",
    chaindoc: "https://officialdoc.net", // optional
    tokens: [ // optional
      {
        symbol: "BAT",
        type: "ERC20",
        address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
        iconUrl: "https://cryptologos.cc/logos/basic-attention-token-bat-logo.svg"
      }
    ]
},
```

## References

- Some network logos URLs are available here https://cryptologos.cc. 
- Usefull data available here https://github.com/MetaMask/contract-metadata.
- The most updated list of chain ID with their param is here https://github.com/ethereum-lists/chains

## Licence 

[MIT Licence](LICENSE)

(c) 2022 lolorenzo777 <lolorenzo777@sunraylab.net>
