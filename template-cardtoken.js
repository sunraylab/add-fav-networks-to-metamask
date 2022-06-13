// (c) 2022 lolorenzo777 <lolorenzo777@sunraylab.net>
'use strict';

/* template_cardtoken
 * use template strings
 */
export function template_cardtoken(network, token) {
  return `
<div class="col d-flex justify-content-center p-0 m-2">
    <div class="card">
        <div class="row p-0 m-0">
            <div class="col-1 py-0 px-2 mx-0 my-2 d-block" style="width: 5rem;">
                <div class="row p-0 mx-0 my-2">
                    <img src="${token.iconUrl}" class="m-auto w-auto p-0 d-block" style="height: 3rem;" alt="tokenlogo">
                </div>
                <div class="row p-0 mx-0 my-2">
                    <span class="badge rounded-pill text-bg-dark text-center mx-auto">
                        <small>${token.type}</small>
                    </span>
                </div>
            </div>
            <div class="col">
                <div class="card-body ps-2">
                    <div class="row">
                        <div class="col-auto">
                            <h4 class="card-title">${token.symbol}</h4>
                        </div>
                        <div class="col-auto">
                            <button id="btnwim_${network.chainId}${token.symbol}" type="button" class="btn btn-outline-primary btn-sm" onclick="clickWatchInMetamask(\'${network.chainId}\', \'${token.symbol}\')" >Watch in Metamask</button>
                        </div>
                    </div>
                    <p class="card-text"><small>Smart contract address</small><br />
                        <a href="${network.blockExplorerUrls[0]}">${token.address}</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

`;
}
