import * as nearAPI from 'near-api-js'
import Vue from 'vue'

export default async function NearApi() {
  const
    { connect, keyStores, WalletConnection, utils, Contract } = nearAPI,
    keyStore = new keyStores.BrowserLocalStorageKeyStore(),
    config = {
      networkId: "testnet",
      keyStore, 
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: localStorage.getItem("walletUrl"), 
      // walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    },
    // connect to NEAR
    near = await connect(config),
    // create wallet connection
    wallet = new WalletConnection(near);
  
  Vue.prototype.$wallet = wallet
  Vue.prototype.$contract = Contract
  Vue.prototype.$utils = utils
  Vue.prototype.$near = near
}

/*   when need buy
// create contract connection
const contract = new Contract(wallet.account(), item.contract_market, {
  changeMethods: ["buy"],
  sender: wallet.account(),
})
*/
