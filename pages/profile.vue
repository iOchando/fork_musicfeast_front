<template>
  <div id="profile" class="divcol">
    <ModalsProfile ref="modal"></ModalsProfile>

    <v-img
      :src="user.banner" transition="fade-transition" class="header"
      :style="`
        --tag-tier: '${
          user.tier===1 ? 'bronze' :
          user.tier===2 ? 'silver' :
          user.tier===3 ? 'gold' :
          user.tier===4 ? 'platinum' :
          user.tier===5 ? 'diamond' :
          user.tier===6 ? 'uranium' : 'user'
        }'
      `">
      <template #default>
        <v-avatar
          width="var(--size)" height="var(--size)" style="--size: 13.954375em"
          @mouseenter="showTag()" @mouseleave="hideTag()">
          <v-img :src="user.avatar" alt="avatar image" transition="fade-transition">
            <template #placeholder>
              <v-skeleton-loader type="avatar" />
            </template>
          </v-img>
        </v-avatar>
        <v-btn :ripple="false" class="btn activeBtn" :to="localePath('/edit-profile')">Edit Profile</v-btn>
      </template>
      <template #placeholder>
        <v-skeleton-loader v-show="user.banner" type="card" />
      </template>
    </v-img>

    <section class="container-user">
      <aside class="container-user--social center gap1">
        <!-- <v-btn icon>
          <v-icon size="clamp(2em, 2.4vw, 2.4em)" style="transform: rotate(-50deg)">mdi-link</v-icon>
        </v-btn> -->
        
        <v-btn v-for="(item,i) in user.dataSocial" :key="i" icon :href="item.link" target="_blank">
          <v-icon size="clamp(2em, 2.4vw, 2.4em)">{{item.icon}}</v-icon>
        </v-btn>
      </aside>

      <h2 class="p">{{user.username}}</h2>

      <section class="container-profit bold fwrap align" style="max-width: 62.616875em">
        <v-sheet color="transparent" class="divcol center">
          <span>Total NFTs</span>
          <span>{{dataProfits.nfts}}</span>
        </v-sheet>
        <v-sheet color="transparent" class="divcol center">
          <span>Chats Enabled</span>
          <span>{{dataProfits.chats}}</span>
        </v-sheet>
        <v-sheet color="transparent" class="divcol center">
          <span>All Time High</span>
          <span>{{dataProfits.high}} Near</span>
          
        </v-sheet>
      </section>

      <p v-show="user.bio" class="p tcenter">{{user.bio}}</p>
    </section>

    <h2 class="Title tup">my nfts</h2>

    <Filters
      :search="search"
      :filter-a="filterA.list"
      :filter-b="filterB.list"
      @search="(model) => search = model"
      @filterA="(model) => filterA.model = model"
      @filterB="(model) => filterB.model = model"
      :hide="[3]"
    />

    <section ref="container" class="container-nfts grid">
      <v-card
        v-for="(item,i) in dataNfts_pagination" :key="i"
        class="card divcol custome"
        :class="{
          uranium: item.tier===6,
          diamond: item.tier===5,
          platinum: item.tier===4,
          gold: item.tier===3,
          silver: item.tier===2,
          bronze: item.tier===1,
        }"
        @click="$store.dispatch('goTo', {key: 'user-nft', item, event: $event})">
        <v-img
          :src="item.img" :alt="`${item.name} image`" transition="fade-transition"
          :style="`
            ${
              item.tier ? `--tag-tier: '${
                item.tier===1 ? 'bronze' :
                item.tier===2 ? 'silver' :
                item.tier===3 ? 'gold' :
                item.tier===4 ? 'platinum' :
                item.tier===5 ? 'diamond' :
                item.tier===6 ? 'uranium' : 'user'
              }'
              `: ''
            };
            ${item.state ? `--tag-state: '${item.state}'` : ''}`
          ">
          <template #placeholder>
            <v-skeleton-loader type="card" />
          </template>
        </v-img>
        
        <div class="container-content tcenter">
          <v-avatar style="border: 2px solid #fff">
            <v-img :src="item.avatar" :alt="`${item.artist} image`" transition="fade-transition">
              <template #placeholder>
                <v-skeleton-loader type="avatar" />
              </template>
            </v-img>
          </v-avatar>
          <a>{{item.name}}</a>
          <!-- <a>{{item.artista.limitString(27)}}</a> -->
          <p>{{item.desc.limitString(27)}}</p>

          <div class="center" style="gap: 6.4px">
            <span class="floor" style="--c: var(--accent)">Floor Price: {{item.floor_price}}</span>
            <img src="@/assets/sources/logos/near-orange.svg" alt="near" style="--w:0.9375em">
          </div>
          <span class="floor" style="--c: var(--accent)">Editions: {{item.editions}}</span>
        </div>
      </v-card>
    </section>

    <Pagination
      :total-pages="pagination_per_page"
      :current-page="currentPage"
      @pagechanged="(page) => currentPage = page"
    />

    <h2 class="Title tup">Offers</h2>
    
    <v-expansion-panels class="custome-expansion not_padding">
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-menu-down" class="bold">My offers</v-expansion-panel-header>

        <v-expansion-panel-content color="rgb(0, 0, 0, .4)" class="container-table--expansion mt-5">
          <v-data-table
            :headers="tableHeadersOffers"
            :items="tableItemsOffersRe"
            :page.sync="currentPageOffers"
            :items-per-page="itemsPerPageOffers"
            hide-default-footer
            mobile-breakpoint="-1"
            :header-props="{sortIcon: 'mdi-menu-down'}"
            style="background: transparent"
            bac
          >
          <template #[`item.nft_media`]="{ item }">
              <center class="center" style="gap:10px">
                <v-avatar style="border: 2px solid #fff">
                  <v-img :src="item.nft_media" alt="artist avatar" transition="fade-transition">
                    <template #placeholder>
                      <v-skeleton-loader type="avatar" />
                    </template>
                  </v-img>
                </v-avatar>
              </center>
            </template>

            <template #[`item.price_near`]="{ item }">
              <center v-if="item.price_near" class="divcol" style="gap: 5px">
                <span>{{item.price_near}} N</span>
                <span class="normal">$ {{dollarConversion(item.price_near)}}</span>
              </center>

              <center v-else class="divcol" style="gap: 5px">
                <span>---</span>
                <span>---</span>
              </center>
            </template>

            <!-- <template #[`item.token_id`]="{ item }">
              <span class="tup" :style="`${item.vault ? '--c: #26A17B' : ''}`">{{item.vault ? "yes" : "no"}}</span>
            </template> -->

            <template #[`item.buyer_id`]="{ item }">
              <center class="center" style="gap:10px">
                <v-avatar style="border: 2px solid #fff">
                  <v-img :src="require('~/assets/sources/avatars/avatar.png')" alt="artist avatar" transition="fade-transition">
                    <template #placeholder>
                      <v-skeleton-loader type="avatar" />
                    </template>
                  </v-img>
                </v-avatar>
                <span :title="item.buyer_id">{{item.buyer_id.limitString(20)}}</span>
              </center>
            </template>

            <template #[`item.actions`]="{ item }">
              <center class="center" style="gap: 30px">
                <!-- <v-btn
                  :disabled="offerBtn"
                  :ripple="false" class="btn activeBtn bold"
                  style="--min-w: 112px; --w: min(100%, 9em); --fs: 16px"
                  @click="acceptOffer(item)"
                >Accept</v-btn> -->
                <v-btn
                  :disabled="offerBtn"
                  :ripple="false" class="btn activeBtn bold"
                  style="--min-w: 112px; --w: min(100%, 9em); --fs: 16px; --bg: #fff; --c: var(--primary)"
                  @click="declineOffer(item)"
                >Cancel Offer</v-btn>
              </center>
            </template>
          </v-data-table>

          <Pagination
            :total-pages="pagination_per_page_offers"
            :current-page="currentPageOffers"
            @pagechanged="(page) => currentPageOffers = page"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-menu-down" class="bold">Offers Received</v-expansion-panel-header>

        <v-expansion-panel-content color="rgb(0, 0, 0, .4)" class="container-table--expansion mt-5">
          <v-data-table
            :headers="tableHeadersOffers"
            :items="tableItemsOffers"
            :page.sync="currentPageOffers"
            :items-per-page="itemsPerPageOffers"
            hide-default-footer
            mobile-breakpoint="-1"
            :header-props="{sortIcon: 'mdi-menu-down'}"
            style="background: transparent"
            bac
          >
          <template #[`item.nft_media`]="{ item }">
              <center class="center" style="gap:10px">
                <v-avatar style="border: 2px solid #fff">
                  <v-img :src="item.nft_media" alt="artist avatar" transition="fade-transition">
                    <template #placeholder>
                      <v-skeleton-loader type="avatar" />
                    </template>
                  </v-img>
                </v-avatar>
              </center>
            </template>

            <template #[`item.price_near`]="{ item }">
              <center v-if="item.price_near" class="divcol" style="gap: 5px">
                <span>{{item.price_near}} N</span>
                <span class="normal">$ {{dollarConversion(item.price_near)}}</span>
              </center>

              <center v-else class="divcol" style="gap: 5px">
                <span>---</span>
                <span>---</span>
              </center>
            </template>

            <!-- <template #[`item.token_id`]="{ item }">
              <span class="tup" :style="`${item.vault ? '--c: #26A17B' : ''}`">{{item.vault ? "yes" : "no"}}</span>
            </template> -->

            <template #[`item.buyer_id`]="{ item }">
              <center class="center" style="gap:10px">
                <v-avatar style="border: 2px solid #fff">
                  <v-img :src="require('~/assets/sources/avatars/avatar.png')" alt="artist avatar" transition="fade-transition">
                    <template #placeholder>
                      <v-skeleton-loader type="avatar" />
                    </template>
                  </v-img>
                </v-avatar>
                <span :title="item.buyer_id">{{item.buyer_id.limitString(20)}}</span>
              </center>
            </template>

            <template #[`item.actions`]="{ item }">
              <center class="center" style="gap: 30px">
                <v-btn
                  :disabled="offerBtn"
                  :ripple="false" class="btn activeBtn bold"
                  style="--min-w: 112px; --w: min(100%, 9em); --fs: 16px"
                  @click="acceptOffer(item)"
                >Accept</v-btn>
                <!-- <v-btn
                  :disabled="offerBtn"
                  :ripple="false" class="btn activeBtn bold"
                  style="--min-w: 112px; --w: min(100%, 9em); --fs: 16px; --bg: #fff; --c: var(--primary)"
                  @click="declineOffer(item)"
                >Decline</v-btn> -->
              </center>
            </template>
          </v-data-table>

          <Pagination
            :total-pages="pagination_per_page_offers"
            :current-page="currentPageOffers"
            @pagechanged="(page) => currentPageOffers = page"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <h2 class="Title tup">chats</h2>

    <!-- <v-expansion-panels class="custome-expansion" style="margin-bottom: 6em">
      <v-expansion-panel v-for="(item,i) in dataChats" :key="i">
        <v-expansion-panel-header expand-icon="mdi-menu-down" class="bold" @click="toLink()">
          <div class="acenter" style="gap:.5em" href="https://discord.gg/9KB3gjJkWJ" target="_blank">
            <v-icon size="1.5em">{{item.icon}}</v-icon>
            <span class="tcap">{{item.chat}}</span>
          </div>
        </v-expansion-panel-header>
      </v-expansion-panel>
    </v-expansion-panels> -->

    <widgetbot
      server="1053340402633150485"
      channel="1053340403086147672"
      width="1560"
      height="1000"
    ></widgetbot>
    <script src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import computeds from '~/mixins/computeds'
import styles from '~/mixins/styles'

export default {
  name: "ProfilePage",
  mixins: [computeds, styles],
  data() {
    return {
      offerBtn: false,
      pageName: 'profile',
      dataProfits: {
        nfts: null,
        chats: "---",
        high: "---",
      },
      search: "",
      filterA: {
        model: "",
        list: [6, 5, 4, 3, 2, 1],
      },
      filterB: {
        model: "",
        list: ["lastest releases", "newest", "oldest", "comming soon", "lorem ipsum", "lorem ipsum"],
      },
      dataNfts: [
        // {
        //   img: require('~/assets/sources/images/img-listed-1.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°1",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   type: "nft",
        //   editions: "250.00",
        //   tier: 3,
        //   state: "sold out",
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-2.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°2",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   type: "nft",
        //   editions: "250.00",
        //   tier: 2,
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-3.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°3",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   type: "nft",
        //   editions: "250.00",
        //   tier: 4,
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-4.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°4",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   type: "nft",
        //   editions: "250.00",
        //   tier: 5,
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-5.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°5",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   type: "nft",
        //   editions: "250.00",
        //   tier: 6,
        //   state: "sold out",
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-6.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°6",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   type: "nft",
        //   editions: "250.00",
        //   tier: 1,
        // },
      ],
      currentPage: 1,
      itemsPerPage: 10,
      dataChats: [
        { icon: "discord", chat: "Chats Artists" },
        // { icon: "discord", chat: "discord artist name 2" },
        // { icon: "discord", chat: "discord artist name 3" },
      ],
      tableHeadersOffers: [
        { value: "nft_media", text: "NFT", align: "start", sortable: false },
        { value: "nft_title", text: "NFT NAME", align: "start", sortable: false },
        { value: "token_id", text: "TOKEN ID", align: "center", sortable: false },
        { value: "buyer_id", text: "BUYER", align: "center", sortable: false },
        { value: "price_near", text: "PRICE", align: "center" },
        { value: "actions", align: "center", sortable: false },
      ],
      tableItemsOffers: [
        // {
        //   name: "Name of NFT",
        //   vault: true,
        //   buyer: "tonystart.near",
        //   buyer_img: require("~/assets/sources/avatars/avatar.png"),
        //   price: 174
        // },
        // {
        //   name: "Name of NFT",
        //   vault: false,
        //   buyer: "tonystart.near",
        //   buyer_img: require("~/assets/sources/avatars/avatar.png"),
        //   price: 174
        // },
      ],
      tableItemsOffersRe: [],
      currentPageOffers: 1,
      itemsPerPageOffers: 10,
      minimumStorage: null
    }
  },
  head() {
    const title = "Profile"
    return {
      title,
    }
  },
  computed: {
    dataNfts_pagination() {
      return this.$store.getters.pagination({
        items: this.dataNfts, currentPage: this.currentPage, itemsPerPage: this.itemsPerPage,
        search: this.search, filterA: this.filterA.model
      })
    },
    pagination_per_page() {
      return Math.ceil(this.dataNfts.length / this.itemsPerPage)
    },
    pagination_per_page_offers() {
      return Math.ceil(this.tableItemsOffers.length / this.itemsPerPageOffers)
    }
  },
  mounted() {
    this.getMyNfts()
    this.getOffers()
    this.getOffersReceived()
    this.storageMini()
    this.getChats()
    // this.setProfile();
  },
  methods: {
    async getChats() {
      const accountId = this.$ramper.getAccountId()
      // get data user
      await this.$axios.post(`${this.baseUrl}api/v1/get-chats-enabled/`, { "wallet": accountId })
      .then(result => {
        this.dataProfits.chats = result.data.length
      }).catch(err => {
        this.$alert("cancel", {desc: err.message})
        console.error(err);
      })
    },
    toLink() {
      window.open("https://discord.gg/9KB3gjJkWJ")
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
    async acceptOffer(item) {
      this.offerBtn = true
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
            price: item.price,
            market_type: "accept_offer",
            ft_token_id: "near",
            buyer_id: item.buyer_id
          }
          const action2 = [
            this.$ramper.functionCall(
              "nft_approve",       
              {
                token_id: item.token_id, 
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
          //     '30000000000000', 
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

          this.offerBtn = false

          if (res && JSON.parse(localStorage.getItem('ramper_loggedInUser')).signupSource === 'near_wallet') {
          localStorage.setItem("transaction_data", JSON.stringify({
            state: "success",
            title: "Success",
            desc: "Your nft has been successfully unlisted.",
            hash: res.txHashes[1]
          }))
          this.$router.push(this.localePath('/redirection'))
        } else if (res && res.result) {
            if (res.result[1].status.SuccessValue || res.result[1].status.SuccessValue === "") {
              // this.$alert("success", {desc: "You have successfully accepted the offer.", hash: res.txHashes[1]})
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "success",
                title: "Success",
                desc: "You have successfully accepted the offer.",
                hash: res.txHashes[1]
              }))
              this.$router.push(this.localePath('/redirection'))
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
    },
    async declineOffer(item) {
      this.offerBtn = true
      if (this.$ramper.getUser()) {
        const action = [
            this.$ramper.functionCall(
              "delete_offer",       
              {
                nft_contract_id: "nft7.musicfeast.testnet", 
                token_id: item.token_id
              }, 
              '200000000000000', 
              '1'
            )
          ]

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

          this.offerBtn = false

          if (res && JSON.parse(localStorage.getItem('ramper_loggedInUser')).signupSource === 'near_wallet') {
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "success",
              title: "Success",
              desc: "Your nft has been successfully unlisted.",
              hash: res.txHashes[0]
            }))
            this.$router.push(this.localePath('/redirection'))
          } else if (res && res.result) {
            if (res.result[0].status.SuccessValue || res.result[0].status.SuccessValue === "") {
              // this.$alert("success", {desc: "You have successfully canceled the offer.", hash: res.txHashes[0]})
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "success",
                title: "Success",
                desc: "You have successfully canceled the offer.",
                hash: res.txHashes[0]
              }))
              this.$router.push(this.localePath('/redirection'))
            } else if (res.result[0].status.Failure) {
              // this.$alert("cancel", {desc: res.result[0].status.Failure.ActionError.kind.FunctionCallError.ExecutionError + ".", hash: res.txHashes[0]})
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
    },
    async getOffers () {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($owner: String) {
          offers(where: {data_nft_: {owner_id: $owner}}) {
            typetoken_id
            serie_id
            token_id
            price
            price_near
            nft_contract_id
            ft_token_id
            buyer_id
            artist_id
            id
            data_nft {
              owner_id
              title
              serie_id
              reference
              media
              id
              fecha
              extra
              description
              artist_id
            }
          }
        }
      `;

      const res = await clientApollo.query({
        query: QUERY_APOLLO,
        variables: {owner: this.$ramper.getAccountId()}
      })

      const data = res.data.offers

      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        item.nft_title = item.data_nft.title
        item.nft_media = item.data_nft.media
        this.tableItemsOffers.push(item)
      }

      console.log("MYOFERST", this.tableItemsOffers)

      // {
      //     name: "Name of NFT",
      //     vault: true,
      //     buyer: "tonystart.near",
      //     buyer_img: require("~/assets/sources/avatars/avatar.png"),
      //     price: 174
      //   },

    },
    async getOffersReceived () {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($owner: String) {
          offers(where: {buyer_id: $owner}) {
            typetoken_id
            serie_id
            token_id
            price
            price_near
            nft_contract_id
            ft_token_id
            buyer_id
            artist_id
            id
            data_nft {
              owner_id
              title
              serie_id
              reference
              media
              id
              fecha
              extra
              description
              artist_id
            }
          }
        }
      `;

      const res = await clientApollo.query({
        query: QUERY_APOLLO,
        variables: {owner: this.$ramper.getAccountId()}
      })

      const data = res.data.offers

      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        item.nft_title = item.data_nft.title
        item.nft_media = item.data_nft.media
        this.tableItemsOffersRe.push(item)
      }

      console.log("FERST", this.tableItemsOffersRe)
    },
    async getMyNfts() {
      const clientApollo = this.$apollo.provider.clients.defaultClient

      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($owner_id: String) {
          nfts(
            where: {owner_id: $owner_id}
          ) {
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
        variables: {owner_id: this.$ramper.getAccountId()},
      })

      const data = res.data.nfts

      this.dataProfits.nfts = data.length

      const arrayIds = []

      let maxPrice = 0

      for (let i = 0; i < data.length; i++) {
        const item = {
          floor_price: null,
          img: data[i].media,
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: data[i].title,
          desc: data[i].description,
          editions: data[i].copies || "Multi",
          tier: Number(data[i].reference),
          typetoken_id: data[i].reference,
          type: "nft",
          token_id: data[i].id,
          supply: data[i].supply,
          state: null,
          type_id: data[i].serie_id,
          artista: "-"
        }

        if (item.tier === 7) {
          item.tier = 3
        } else if (item.tier === 8) {
          item.tier = 4
        } else if (item.tier === 9) {
          item.tier = 5
        } else if (item.tier === 10) {
          item.tier = 2
        } else if (item.tier === 11) {
          item.tier = 2
        } else if (item.tier === 12) {
          item.tier = 5
        }

        const varSplit = item.token_id.split("|")
        const idArtist = varSplit[0]
        const typeToken = varSplit[1].split(":").shift()

        const serie = await this.getSerie(idArtist, typeToken)
        const floor = await this.getFloorPrice(serie.id)

        console.log(serie)

        item.artist_id = serie.artist_id
        item.editions = serie.copies || "Multi"
        item.id_artist = idArtist

        if (floor) {
          if (Number(floor) < Number(serie.price_near)) {
            item.floor_price = floor
          } else {
            item.floor_price = serie.price_near
          }
        } else {
          item.floor_price = serie.price_near
        }
        
        if (maxPrice < item.floor_price) {
          maxPrice = item.floor_price
        }

        arrayIds.push(idArtist)
        this.dataNfts.push(item)
      }
      this.dataProfits.high = maxPrice
      const result = Array.from(new Set(arrayIds));
      
      this.getAvatars(result)
    },
    async getFloorPrice (serieId) {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($serie_id: String) {
          markets(where: {serie_id: $serie_id}, first: 1, orderBy: price_near) {
            id
            typetoken_id
            transaction_fee
            token_id
            started_at
            serie_id
            price_near
            price
            owner_id
            nft_contract_id
            is_auction
            ft_token_id
            ended_at
            end_price
            artist_id
            approval_id
          }
        }
      `;

      const res = await clientApollo.query({
        query: QUERY_APOLLO,
        variables: {serie_id: serieId},
      })

      const data = res.data.markets

      if (data[0]) {
        return data[0].price_near
      } else {
        return false
      }
    },
    async getAvatars(datos) {
      await this.$axios.post(`${this.baseUrl}api/v1/get-avatars/`, { "artists": datos })
      .then(result => {
        const data = result.data
        console.log("ADTA", data)
        if (data[0]) {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.dataNfts.length; j++) {
              if (String(data[i].id_collection) === String(this.dataNfts[j].artist_id)) {
                this.dataNfts[j].avatar = this.baseUrl+data[i].image
                this.dataNfts[j].artista = data[i].name
              }
            }
          }
        }
      }).catch(err => {
        // this.$alert("cancel", {desc: err.message})
        console.error(err);
      })
    },
    async getSerie(idArtist, typeToken) {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($artist_id: String, $typetoken: String) {
          series(where: {artist_id: $artist_id, typetoken_id_in: [$typetoken]}) {
            id
            media
            price
            reference
            title
            typetoken_id
            fecha
            extra
            description
            creator_id
            artist_id
            price_near
            supply
            copies
            desc_series
          }
        }
      `;

      const res = await clientApollo.query({
        query: QUERY_APOLLO,
        variables: {artist_id: String(idArtist), typetoken: String(typeToken)},
      })

      return res.data.series[0]
    },
    // setProfile() {
    //   if (this.$route.path === '/profile') {
    //     this.$router.replace(`${this.$route.path}/:${this.user.username}`)
    //   }
    // },
    showTag() {document.querySelector(".header").classList.add("hover")},
    hideTag() {document.querySelector(".header").classList.remove("hover")},
    dollarConversion(price) {
      return (Number(price) * this.priceNear).toFixed(2)
    },
  }
};
</script>

<style src="~/assets/styles/pages/profile.scss" lang="scss" />
