// (c) 2022 lolorenzo777 <lolorenzo777@sunraylab.net>
'use strict';

export function cardnetwork_template(net) {
  return `<div class="col d-flex justify-content-center g-3">\
    <div class="card text-center mb-3" style="width: 18rem;">\
        <span class="position-absolute top-0 end-0 badge rounded-pill text-bg-${
          net.usenet === 'mainnet' ? `success` : `dark`
        }" style="transform: translateX(-10px) translateY(-50%)">\
            ${net.usenet}</span>\
        <span class="position-absolute top-0 start-0 badge text-bg-light" style="transform: translateX(10px) translateY(10px)">\
            <span class="text-muted">ChainID</span><br />${net.chainId}</span>\
        <img src="${net.iconUrls}" class="mx-auto d-block mt-3" style="height: 4rem;" alt="blockchain-icon">\
        <div class="card-body">\
            <h5 class="card-title">${net.chainName}</h5>\
            <h6 class="card-subtitle mb-2 text-muted text-center">${net.symbol}</h6>\
            <p class="card-text small">\
                RPC URLs: <br /><code>${net.rpcUrls}</code></p>\
            <p class="card-text small">\
                Block Explorer URLs:<br /> <code>${net.blockExplorerUrls}</code>\
            </p>\
            <button type="button" onclick="clickAddNetwork(\'${net.chainId}\')" class="btn btn-primary" disabled>Add\
                Network</button>\
                ${
                  net.chaindoc
                    ? `<p class="mt-2 mb-0"><a href="` +
                      net.chaindoc +
                      `">Chain Doc <i class="bi bi-box-arrow-up-right"></i></a></p>`
                    : ``
                }
        </div>\
    </div>\
  </div>\
`;
}
