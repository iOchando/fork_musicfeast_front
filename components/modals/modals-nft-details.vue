<template>
  <div id="nft-details-modals">
    <!-- modal sell -->
    <v-dialog v-model="modalSell" max-width="500px" content-class="nft-dialog" persistent>
      <v-btn icon class="close" @click="clearSell()">
        <v-icon large>mdi-close</v-icon>
      </v-btn>

      <v-window v-model="windowSell" touchless>
        <v-window-item :value="1">
          <v-card id="modalSell" class="nft-dialog--content">
            <h3>sell</h3>
            <v-form ref="formSell" class="divcol gap2" @submit.prevent="putSale()">
              <p class="p">You are about to sell "{{nft.name}}".</p>

              <v-sheet color="transparent">
                <v-select
                  id="country"
                  v-model="valueNft"
                  :items="dataNfts" 
                  item-text="id"
                  solo
                  :rules="[v => !!v || 'required field']"
                  placeholder="Select the id token to sell"
                  style="--fs-place: 16px; flex-grow: 0"
                ></v-select>
                <label for="amount">Amount in
                  <img src="~/assets/sources/logos/near.svg" alt="near" style="--w: 1em">
                </label>
                <v-text-field
                  id="amount"
                  v-model="form_sell.sellPrice"
                  filled dense
                  background-color="rgba(0, 0, 0, .2)"
                  placeholder="123.45"
                  type="number"
                  :rules="[v => !!v || 'required field']"
                ></v-text-field>

                <div class="divcol" style="gap: 4px; margin-bottom: 10px">
                  <div class="space gap2">
                    <span>Your Storage</span>
                    <span>{{this.myStorage ?? 0}}</span>
                  </div>
                  
                  <div class="space gap2">
                    <span>Minimum Storage</span>
                    <span>{{this.minimumStorage || '---'}}</span>
                  </div>
                </div>
              </v-sheet>

              <p class="p tcenter">You will be redirected to your wallet to confirm your transaction.</p>
            </v-form>

            <div class="fwrap gap2 bold" style="margin-top: 4em">
              <v-btn
                :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 16px; --bg: #fff; --c: var(--primary)"
                @click="clearSell()">Cancel</v-btn>
              <v-btn
                :disabled="btnSale"
                :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 16px"
                @click="putSale()">Put On Sale</v-btn>
            </div>
          </v-card>
        </v-window-item>


        <v-window-item :value="2">
          <v-card id="modalSell" class="nft-dialog--content">
            <h3>Offer Success</h3>

            <section class="divcol" style="gap: 1.5em">
              <p class="p">Successfully offered sale "{{valueNft}}" for</p>

              <v-text-field
                v-model="form_sell.sellPrice"
                disabled solo
                filled
                hide-details
                style="--o-disabled: 1; --fs: 1.3em"
              >
                <template #append>
                  <img src="~/assets/sources/logos/near.svg" alt="near" style="--w: 1.3em">
                </template>
              </v-text-field>

              <v-sheet class="card bold">
                <v-btn v-if="!copyBtn" @click="copyHash(hash_sell)" icon class="close" width="max-content" height="max-content">
                  <v-icon color="var(--accent)" size="1.2em">mdi-content-copy</v-icon>
                </v-btn>

                <v-btn v-else disabled icon class="close" width="max-content" height="max-content">
                  <v-icon color="var(--accent)" size="1.2em">mdi-check-circle</v-icon>
                </v-btn>

                <span style="--c: var(--accent)">Transaction Hash</span>
                <a :href="'https://explorer.testnet.near.org/transactions/' + hash_sell" target="_blank">{{hash_sell.limitString(28)}}</a>
              </v-sheet>
            </section>

            <v-btn
              :ripple="false" class="btn activeBtn" style="--w: 100%; --fs: 16px; margin-top: 4em"
              @click="closeSell()">Close</v-btn>
          </v-card>
        </v-window-item>
      </v-window>
    </v-dialog>



    <!-- modal buy -->
    <v-dialog v-model="modalBuy" max-width="500px" content-class="nft-dialog" persistent>
      <v-btn icon class="close" @click="clearBuy()">
        <v-icon large>mdi-close</v-icon>
      </v-btn>

      <v-window v-model="windowBuy" touchless>
        <v-window-item :value="1">
          <v-card id="modalBuy" class="nft-dialog--content">
            <h3>comming soon</h3>
          </v-card>
        </v-window-item>
      </v-window>
    </v-dialog>



    <!-- modal offer -->
    <v-dialog v-model="modalOffer" max-width="500px" content-class="nft-dialog" persistent>
      <v-btn icon class="close" @click="clearOffer()">
        <v-icon large>mdi-close</v-icon>
      </v-btn>

      <v-window v-model="windowOffer" touchless>
        <v-window-item :value="1">
          <v-card id="modalOffer" class="nft-dialog--content">
            <h3>place an offer</h3>
            <v-form ref="formOffer" class="divcol gap2" @submit.prevent="submitOffer()">
              <p class="p">You are about to bid on "{{offer_main.token}}".</p>

              <v-sheet color="transparent">
                <label for="amount">Amount in
                  <img src="~/assets/sources/logos/near.svg" alt="near" style="--w: 1em">
                </label>
                <v-text-field
                  id="amount"
                  v-model="form_offer.offerPrice"
                  filled dense
                  background-color="rgba(0, 0, 0, .2)"
                  placeholder="123.45"
                  type="number"
                  :rules="[v => !!v || 'required field']"
                ></v-text-field>
<!-- 
                <div class="divcol" style="gap: 4px; margin-bottom: 10px">
                  <div class="space gap2">
                    <span>Your Balance</span>
                    <span>{{user.balance ?? 0}}</span>
                  </div>
                  
                  <div class="space gap2">
                    <span>Total Offer</span>
                    <span>{{form_offer.offerPrice || '---'}}</span>
                  </div>
                </div> -->
              </v-sheet>

              <p class="p tcenter">You will be redirected to your wallet to confirm your transaction.</p>
            </v-form>

            <div class="fwrap gap2 bold" style="margin-top: 4em">
              <v-btn
                :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 16px; --bg: #fff; --c: var(--primary)"
                @click="clearOffer()">Cancel</v-btn>
              <v-btn
              :disabled="btnOffer"
                :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 16px"
                @click="submitOffer()">Submit Offer</v-btn>
            </div>
          </v-card>
        </v-window-item>


        <v-window-item :value="2">
          <v-card id="modalSell" class="nft-dialog--content">
            <h3>Offer Success</h3>

            <section class="divcol" style="gap: 1.5em">
              <p class="p">Successful bid "{{offer_main.token}}" for</p>

              <v-text-field
                v-model="form_offer.offerPrice"
                disabled solo
                filled
                hide-details
                style="--o-disabled: 1; --fs: 1.3em"
              >
                <template #append>
                  <img src="~/assets/sources/logos/near.svg" alt="near" style="--w: 1.3em">
                </template>
              </v-text-field>

              <v-sheet class="card bold">
                <v-btn v-if="!copyBtn" @click="copyHash(hash_offer)" icon class="close" width="max-content" height="max-content">
                  <v-icon color="var(--accent)" size="1.2em">mdi-content-copy</v-icon>
                </v-btn>

                <v-btn v-else disabled icon class="close" width="max-content" height="max-content">
                  <v-icon color="var(--accent)" size="1.2em">mdi-check-circle</v-icon>
                </v-btn>

                <span style="--c: var(--accent)">Transaction Hash</span>
                <a :href="('https://explorer.testnet.near.org/transactions/' + hash_offer)" target="_blank">{{hash_offer.limitString(28)}}</a>
              </v-sheet>
            </section>

            <v-btn
              :ripple="false" class="btn activeBtn" style="--w: 100%; --fs: 16px; margin-top: 4em"
              @click="closeSell()">Close</v-btn>
          </v-card>
        </v-window-item>
      </v-window>
    </v-dialog>



    <!-- modal redemption -->
    <v-dialog v-model="modalRedemption" width="800px" content-class="nft-dialog" persistent>
      <v-btn icon class="close" @click="clearRedemption()">
        <v-icon large>mdi-close</v-icon>
      </v-btn>

      <v-window v-model="windowRedemption" touchless>
        <v-window-item :value="1">
          <v-card id="modalRedemption" class="nft-dialog--content">
            <h3>redemption summary</h3>
            <v-form ref="formRedemption" class="divcol" style="gap: 2em" @submit.prevent="nextRedemption($refs.formRedemption)">
              <section class="fwrap jcenter" style="gap: 20px">
                <img :src="nft.canvas" alt="canvas nft" style="--br: 10px; --f: brightness(80%) contrast(145%); max-width: 12.5em !important">
                
                <div class="divcol jspace" style="flex: 1 1 200px">
                  <span
                    class="btn center tcenter bold mb-3"
                    style="--bs: none; --br: 2px; --bg: rgba(0,0,0,.4); --p: .7em 1em; font-size: calc(var(--font-size) / 3);"
                  >"{{nft.name}}"</span>

                  <label for="amount">ID</label>
                  <!-- <v-text-field
                    id="amount"
                    v-model="form_redemption.redeemPrice"
                    filled dense
                    placeholder="2"
                    :rules="[v => !!v || 'required field']"
                    background-color="rgba(0,0,0,.4)"
                    style="flex-grow: 0"
                  ></v-text-field> -->

                  <span
                    class="btn center tcenter bold mb-3"
                    style="--bs: none; --br: 2px; --bg: rgba(0,0,0,.4); --p: .7em 1em; font-size: calc(var(--font-size) / 3);"
                  >"{{nft.token_id}}"</span>
                  <span class="mb-3">Quantity Available: {{ quantityNfts }}</span>

                  <label for="country">Country</label>
                  <v-select
                    id="country"
                    v-model="form_redemption.country"
                    :items="dataCountries" solo
                    :rules="[v => !!v || 'required field']"
                    placeholder="Select The Country"
                    style="--fs-place: 16px; flex-grow: 0"
                  ></v-select>
                </div>
              </section>

              <section>
                <h6 class="space gap2">
                  <span class="bold">estimated ship date</span>
                  <span>december / 2022</span>
                </h6>
                <h6 class="space gap2">
                  <span class="bold">shipping method</span>
                  <span>delivery duty paid</span>
                </h6>
              </section>

              <section class="bold">
                <h6 class="space gap2">
                  <span>number of items</span>
                  <span>1</span>
                </h6>
                <h6 class="space gap2">
                  <span>shipping</span>
                  <span>$ 40</span>
                </h6>
                <h6 class="space gap2">
                  <span>discount</span>
                  <span>$ 10</span>
                </h6>
                <span
                  class="btn space gap2"
                  style="--bs: none; --br: 2px; --bg: rgba(0,0,0,.4); --p: .7em 1em; font-size: calc(var(--font-size) / 3);"
                >
                  <span class="tup">estimated total</span>
                  <span>$ 30</span>
                </span>
              </section>
            </v-form>

            <div class="fwrap gap2 bold" style="margin-top: 4em">
              <v-btn
                :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 16px; --bg: #fff; --c: var(--primary)"
                @click="clearRedemption()">Cancel</v-btn>
              <v-btn
                :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 16px"
                @click="nextRedemption($refs.formRedemption)">Add Address</v-btn>
            </div>
          </v-card>
        </v-window-item>


        <v-window-item :value="2">
          <v-card id="modalRedemption" class="nft-dialog--content">
            <h3>address form</h3>
            <v-form ref="formRedemptionAddress" class="divcol" style="gap: 2em" @submit.prevent="nextRedemption($refs.formRedemptionAddress)">
              <span
                class="btn center tcenter bold"
                style="--bs: none; --br: 2px; --bg: rgba(0,0,0,.4); --p: .7em 1em; font-size: calc(var(--font-size) / 3);"
              >"{{nft.name}}"</span>

              <section class="divcol">
                <v-checkbox
                  v-model="check"
                  label="Use profile address"
                  class="align" dense
                  off-icon="mdi-checkbox-blank"
                  @change="changeCheck()"
                ></v-checkbox>
                
                <label for="street">Street Address</label>
                <v-text-field
                  id="street"
                  v-model="form_redemption.address.street"
                  filled dense
                  background-color="transparent"
                  placeholder="Street Address, P.O, box, lorem ipsum"
                  :rules="[v => !!v || 'required field']"
                ></v-text-field>
                
                <label for="apartment">Apartment, Suite, Etc</label>
                <v-text-field
                  id="apartment"
                  v-model="form_redemption.address.apartment"
                  filled dense
                  background-color="transparent"
                  placeholder="Street Address 2, P.O, box, lorem ipsum"
                  :rules="[v => !!v || 'required field']"
                ></v-text-field>
                
                <label for="city">City</label>
                <v-text-field
                  id="city"
                  v-model="form_redemption.address.city"
                  filled dense
                  background-color="transparent"
                  placeholder="Lorem ipsum"
                  :rules="[v => !!v || 'required field']"
                ></v-text-field>
                
                <label for="state">State / Province / Region</label>
                <v-text-field
                  id="state"
                  v-model="form_redemption.address.state"
                  filled dense
                  background-color="transparent"
                  placeholder="Lorem ipsum"
                  :rules="[v => !!v || 'required field']"
                ></v-text-field>
                
                <label for="postal">Postal / Zip Code</label>
                <v-text-field
                  id="postal"
                  v-model="form_redemption.address.postal"
                  filled dense
                  background-color="transparent"
                  placeholder="Lorem ipsum"
                  :rules="[v => !!v || 'required field']"
                ></v-text-field>
              </section>

              <section class="divcol">
                <p class="tcenter p">
                  By proceeding you acknowledge that all Redemption Tokens used in this transaction will be destroyed on the blockchain. 
                  This transaction is Irreversible and non-refundable.
                </p>
                <v-checkbox
                  :rules="[v => !!v || 'required field']"
                  label="I acknowledge"
                  class="align" dense
                  off-icon="mdi-checkbox-blank"
                ></v-checkbox>
              </section>
            </v-form>

            <div class="fwrap gap2 bold" style="margin-top: 4em">
              <v-btn
                :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 16px; --bg: #fff; --c: var(--primary)"
                @click="clearRedemption()">Cancel</v-btn>
              <v-btn
                :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 16px"
                @click="burnNft($refs.formRedemptionAddress)">Confirm</v-btn>
            </div>
          </v-card>
        </v-window-item>


        <v-window-item :value="3">
          <v-card id="modalSell" class="nft-dialog--content divcol">
            <h3>Successful Redemption</h3>

            <section class="divcol" style="gap: 1.5em">
              <span
                class="btn center tcenter bold"
                style="--bs: none; --br: 2px; --bg: rgba(0,0,0,.4); --p: .7em 1em; font-size: calc(var(--font-size) / 3);"
              >"{{nft.name}}"</span>

              <p class="tcenter">Your redemption has been completed successfully. Soon you will have your order</p>

              <v-sheet class="card bold">
                <v-btn v-if="!copyBtn" @click="copyHash(hash_redemption)" icon class="close" width="max-content" height="max-content">
                  <v-icon color="var(--accent)" size="1.2em">mdi-content-copy</v-icon>
                </v-btn>

                <v-btn v-else disabled icon class="close" width="max-content" height="max-content">
                  <v-icon color="var(--accent)" size="1.2em">mdi-check-circle</v-icon>
                </v-btn>

                <span style="--c: var(--accent)">Transaction Hash</span>
                <!-- <span>{{hash_redemption}}</span> -->
                <a :href="'https://explorer.testnet.near.org/transactions/' + hash_redemption" target="_blank">{{hash_redemption.limitString(50)}}</a>
              </v-sheet>
            </section>

            <v-btn
              :ripple="false" class="btn activeBtn align" style="--w: min(100%, 10em); --fs: 16px; margin-top: 4em"
              :to="localePath('/profile')" @click="clearRedemption()">Confirm</v-btn>
          </v-card>
        </v-window-item>
      </v-window>
    </v-dialog>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import computeds from '~/mixins/computeds'

export default {
  name: "NftDetailsModals",
  mixins: [computeds],
  data() {
    return {
      check: false,
      disabledAddress: true,
      addressUser: {},
      offer_main: {},
      copyBtn: false,
      myStorage: null,
      minimumStorage: null,
      btnSale: false,
      btnOffer: false,
      valueNft: null,
      dataNfts: [],
      modalSell: false,
      quantityNfts: 0,
      modalBuy: false,
      modalOffer: false,
      modalRedemption: false,
      windowSell: 1,
      windowBuy: 1,
      windowOffer: 1,
      windowRedemption: 1,
      form_sell: { sellPrice: null },
      hash_sell: "5xfi6WGSb6XTnjjd7686vIJP98ypPL988Nnmjiklh65GT54...",
      form_buy: {},
      hash_buy: "5xfi6WGSb6XTnjjd7686vIJP98ypPL988Nnmjiklh65GT54...",
      form_offer: { offerPrice: null },
      hash_offer: "5xfi6WGSb6XTnjjd7686vIJP98ypPL988Nnmjiklh65GT54...",
      form_redemption: {
        redeemPrice: null,
        country: null,
        address: {
          street: null,
          apartment: null,
          city: null,
          state: null,
          postal: null,
        }
      },
      hash_redemption: "",
      dataCountries: [ "Canada", "EEUU", "United Kingdom", "Spain", "Lorem ipsum", "Lorem ipsum" ],
    };
  },
  mounted() {
    this.getDataNfts()
    this.storageMini()
    this.mystorage()

    this.nft_main = this.nft

    this.dataRedeem()
    this.getDataNft()
    this.getAddress()
  },
  methods: {
    async burnNft (ref) {
      if (ref.validate()) {
        
        if (this.$ramper.getUser()) {
          const action = [
            this.$ramper.functionCall(
              "nft_burn",       
              {
                token_id: this.nft.token_id,
                reedemer: true 
              }, 
              '300000000000000', 
              '1'
            )
          ]

          const res = await this.$ramper.sendTransaction({
            transactionActions: [
              {
                receiverId: 'nft7.musicfeast.testnet',
                actions: action,
              }
            ],
            network: 'testnet',
          })
          console.log("Transaction Result: ", res)

          if (res && JSON.parse(localStorage.getItem('ramper_loggedInUser')).signupSource === 'near_wallet' && res.txHashes.length > 0) {
        
            this.hash_redemption = res.txHashes[0]
            this.windowRedemption++
          } else if (res && res.result && res.txHashes.length > 0) {
            if (res.result[0].status.SuccessValue || res.result[0].status.SuccessValue === "") {
              this.hash_redemption = res.txHashes[0]
              this.windowRedemption++
              // this.$alert("success", {desc: "Your nft has been successfully purchased, in a few minutes you will be able to see it on your profile.", hash: res.txHashes[1]})
            } else if (res.result[0].status.Failure) {
              // this.$alert("cancel", {desc: res.result[1].status.Failure.ActionError.kind.FunctionCallError.ExecutionError + ".", hash: res.txHashes[1]})
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "cancel",
                title: "Error",
                desc: res.result[0].status.Failure.ActionError.kind.FunctionCallError.ExecutionError + ".",
                hash: res.txHashes[0]
              }))
              this.$router.push(this.localePath('/redirection'))
            }
          }
        }
      }
    },
    changeCheck() {
      if (this.check) {
        // this.form_redemption.country = this.addressUser.address.country
        this.form_redemption.address.street = this.addressUser.address.street_address
        this.form_redemption.address.postal = this.addressUser.address.postal
        this.form_redemption.address.state = this.addressUser.address.state
        this.form_redemption.address.city = this.addressUser.address.city
        this.form_redemption.address.apartment = this.addressUser.address.street_address2
      } else {
        this.form_redemption.address = {
          street: null,
          apartment: null,
          city: null,
          state: null,
          postal: null,
        }
      }
    },
    async getAddress() {
      const accountId = this.$ramper.getAccountId()
      // get data user
      await this.$axios.post(`${this.baseUrl}api/v1/get-perfil-data/`, { "wallet": accountId })
      .then(result => {
        if (result.data[0]) {
          if (result.data[0].address.city) {
            this.addressUser = result.data[0]
            this.disabledAddress = false
          } else {
            this.addressUser = {}
            this.disabledAddress = true
          }
        }
        console.log("ADDRESS", this.addressUser)
      }).catch(err => {
        this.$alert("cancel", {desc: err.message})
        console.error(err);
      })
    },
    async getDataNft() {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($owner_id: String, $serie_id: String) {
          nfts(where: {owner_id: $owner_id, serie_id: $serie_id}) {
            title
            serie_id
            reference
            owner_id
            media
            id
            fecha
            extra
            description
            artist_id
          }
        }
      `;

      const res = await clientApollo.query({
        query: QUERY_APOLLO,
        variables: {owner_id: this.$ramper.getAccountId(), serie_id: String(this.nft_main.type_id)},
      })

      const data = res.data.nfts

      this.quantityNfts = data.length
    },
    dataRedeem() {
      this.form_redemption.redeemPrice = this.nft_main.token_id
    },
    copyHash(item) {
      this.copyBtn = true
      navigator.clipboard.writeText(item)
      setTimeout(() => {this.copyBtn = false}, 3000)
    },
    async storageMini(){
      const account = await this.$near.account(this.$ramper.getAccountId());

      const contract = new this.$contract(account, "market2.musicfeast.testnet", {
        viewMethods: ["storage_minimum_balance"],
        sender: account,
      })
      await contract.storage_minimum_balance()
      .then((response) => {
        this.minimumStorage = this.$utils.format.formatNearAmount(response)
      }).catch(err => {
        console.log(err)
      })
    },
    async mystorage(){
      const account = await this.$near.account(this.$ramper.getAccountId());

      const contract = new this.$contract(account, "market2.musicfeast.testnet", {
        viewMethods: ["storage_balance_of"],
        sender: account,
      })
      await contract.storage_balance_of({
        account_id: this.$ramper.getAccountId()
      })
      .then((response) => {
        this.myStorage = this.$utils.format.formatNearAmount(response)
      }).catch(err => {
        console.log(err)
      })
    },
    async getDataNfts() {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($artist_id: String, $owner_id: String, $serie_id: String) {
          nfts(
            where: {owner_id: $owner_id, artist_id: $artist_id, serie_id: $serie_id}
          ) {
            artist_id
            description
            extra
            fecha
            id
            media
            owner_id
            reference
            serie_id
            title
          }
        }
      `;


      const res = await clientApollo.query({
        query: QUERY_APOLLO,
        variables: {artist_id: String(this.nft.artist_id), owner_id: this.$ramper.getAccountId(), serie_id: String(this.nft.type_id)},
      })

      const data = res.data.nfts

      this.dataNfts = data

    },
    // sell
    clearSell() {
      Object.keys(this.form_sell).forEach(key => {this.form_sell[key] = null});
      this.modalSell = false; this.windowSell = 1;
      this.valueNft = null
    },
    closeSell() {
      location.reload();
    },
    async putSale() {
      if (this.$refs.formSell.validate()) {
        this.btnSale = true
        if (this.$ramper.getUser()) {
          const action1 = [
            this.$ramper.functionCall(
              "storage_deposit",       
              {
                account_id: this.$ramper.getAccountId(),
              }, 
              '50000000000000', 
              this.$utils.format.parseNearAmount(this.minimumStorage)
            )
          ]
          const msgs = {
            price: String(this.$utils.format.parseNearAmount(this.form_sell.sellPrice)),
            market_type: "sale",
            ft_token_id: "near"
          }
          const action2 = [
            this.$ramper.functionCall(
              "nft_approve",       
              {
                token_id: this.valueNft, 
                account_id: "market2.musicfeast.testnet",
                msg: JSON.stringify(msgs)
              }, 
              '200000000000000', 
              '500000000000000000000'
            )
          ]
          // const action3 = [
          //   this.$ramper.functionCall(
          //     "storage_withdraw",       
          //     '50000000000000', 
          //     '1'
          //   )
          // ]

          const res = await this.$ramper.sendTransaction({
            transactionActions: [
              {
                receiverId: 'market2.musicfeast.testnet',
                actions: action1,
              },
              {
                receiverId: 'nft7.musicfeast.testnet',
                actions: action2,
              },
              // {
              //   receiverId: 'market2.musicfeast.testnet',
              //   actions: action3,
              // },
            ],
            network: 'testnet',
          })
          console.log("Transaction Result: ", res)

          this.btnSale = false

          if (res && JSON.parse(localStorage.getItem('ramper_loggedInUser')).signupSource === 'near_wallet' && res.txHashes.length > 0) {
        
            this.hash_sell = res.txHashes[1]
            this.windowSell++
          } else if (res && res.result && res.txHashes.length > 0) {
            if (res.result[1].status.SuccessValue || res.result[1].status.SuccessValue === "") {
              this.hash_sell = res.txHashes[1]
              this.windowSell++
              // this.$alert("success", {desc: "Your nft has been successfully purchased, in a few minutes you will be able to see it on your profile.", hash: res.txHashes[1]})
            } else if (res.result[1].status.Failure) {
              // this.$alert("cancel", {desc: res.result[1].status.Failure.ActionError.kind.FunctionCallError.ExecutionError + ".", hash: res.txHashes[1]})
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "cancel",
                title: "Error",
                desc: res.result[1].status.Failure.ActionError.kind.FunctionCallError.ExecutionError + ".",
                hash: res.txHashes[1]
              }))
              this.$router.push(this.localePath('/redirection'))
            }
          }
          
        } else {
          await this.$ramper.signIn()
          location.reload();
        }
        // this.windowSell++
      }
    },
    // buy
    clearBuy() {
      Object.keys(this.form_buy).forEach(key => {this.form_buy[key] = null});
      this.modalBuy = false; this.windowBuy = 1;
    },
    nextBuy() {
      if (this.$refs.formBuy.validate()) {this.windowBuy++}
    },
    // offer
    clearOffer() {
      Object.keys(this.form_offer).forEach(key => {this.form_offer[key] = null});
      this.modalOffer = false; this.windowOffer = 1;
      this.offer_main = {}
    },
    async submitOffer() {
      if (this.$refs.formOffer.validate()) {
        this.btnOffer = true
        if (this.$ramper.getUser()) {
          const action = [this.$ramper.functionCall(
            "add_offer",       
            {
              nft_contract_id: "nft7.musicfeast.testnet", 
              token_id: this.offer_main.token,
              ft_token_id: "near",
              price: this.$utils.format.parseNearAmount(String(this.form_offer.offerPrice))
            }, 
            '300000000000000', 
            this.$utils.format.parseNearAmount(String(this.form_offer.offerPrice))
          )]
          const res = await this.$ramper.sendTransaction({
            transactionActions: [
              {
                receiverId: 'market2.musicfeast.testnet',
                actions: action,
              },
            ],
            network: 'testnet',
          })
          console.log("Transaction Result: ", res)

          this.btnOffer = false

          if (res && JSON.parse(localStorage.getItem('ramper_loggedInUser')).signupSource === 'near_wallet' && res.txHashes.length > 0 ) {
            this.hash_offer = res.txHashes[0]
            this.windowOffer++
          } else if (res && res.result && res.txHashes.length > 0 ) {
            if (res.result[0].status.SuccessValue || res.result[0].status.SuccessValue === "") {
              this.hash_offer = res.txHashes[0]
              this.windowOffer++
              // this.$alert("success", {desc: "Your nft has been successfully purchased, in a few minutes you will be able to see it on your profile.", hash: res.txHashes[1]})
            } else if (res.result[0].status.Failure) {
              // this.$alert("cancel", {desc: res.result[1].status.Failure.ActionError.kind.FunctionCallError.ExecutionError + ".", hash: res.txHashes[1]})
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "cancel",
                title: "Error",
                desc: res.result[0].status.Failure.ActionError.kind.FunctionCallError.ExecutionError + ".",
                hash: res.txHashes[0]
              }))
              this.$router.push(this.localePath('/redirection'))
            }
          }
        } else {
          await this.$ramper.signIn()
          location.reload();
        }
        // this.windowOffer++
      }
    },
    // redemption
    clearRedemption() {
      const form1 = this.form_redemption;
      const form2 = this.form_redemption.address;
      Object.keys(form1).forEach(key => {
        if (key !== 'address') {form1[key] = null}
        else {Object.keys(form2).forEach(key2 => {form2[key2] = null})}
      });
      this.modalRedemption = false; this.windowRedemption = 1;
    },
    nextRedemption(ref) {
      if (ref.validate()) {
        this.windowRedemption++
      }
    },
  }
};
</script>

<style src="~/assets/styles/components/modals.scss" lang="scss" />
