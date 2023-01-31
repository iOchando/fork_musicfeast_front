<template>
  <div
    id="nft-details" class="divcol"
    :class="{
      uranium: nft_main.tier===6,
      diamond: nft_main.tier===5,
      platinum: nft_main.tier===4,
      gold: nft_main.tier===3,
      silver: nft_main.tier===2,
      bronze: nft_main.tier===1,
    }">
    <ModalsNftDetails ref="modal"></ModalsNftDetails>

    <section class="header grid">
      <!-- <v-img :src="nft_main.img" class="header-background" transition="fade-transition">
        <template #default>
          <div class="center gap1 alignl">
            <v-avatar style="border: 2px solid #fff">
              <v-img :src="nft_main.avatar" alt="artist image" transition="fade-transition">
                <template #placeholder>
                  <v-skeleton-loader type="avatar" />
                </template>
              </v-img>
            </v-avatar>
            <span class="h9_em">{{nft.artist}}</span>
          </div>
        </template>
        <template #placeholder>
          <v-skeleton-loader type="card" />
        </template>
      </v-img> -->

      <v-sheet class="header-background--wrapper" color="transparent">
        <div class="header--head start gap1">
          <button class="center" style="gap: 2px" @click="$router.go(-1)">
            <v-icon>mdi-chevron-left</v-icon>
            
            <v-avatar style="border: 2px solid #fff">
              <v-img :src="nft_main.avatar" alt="artist image" transition="fade-transition">
                <template #placeholder>
                  <v-skeleton-loader type="avatar" />
                </template>
              </v-img>
            </v-avatar>
          </button>
          <!-- <span class="h9_em">{{nft_main.artist}}</span> -->
        </div>

        <v-img v-show="!media" :src="nft_main.img" class="header-background" transition="fade-transition">
        </v-img>

        <!-- if audio -->
        <v-img v-show="media == 'audio'" :src="nft_main.img" class="header-background" transition="fade-transition">
          <template #default>
            <audio ref="track" :src="mediaUrl" type="audio/mpeg"></audio>
          </template>
          <template #placeholder>
            <v-skeleton-loader type="card" />
          </template>
        </v-img>
        

        <!-- params="controls=0&start=10&end=30&modestbranding=2&rel=0&enablejsapi=1" -->
        <lite-youtube
            v-if="media == 'video'"    
            :videoid="mediaUrl"
            :playlabel="labelYoutube"
            style="max-width: 100% !important; width: 100% !important; height: 100% !important;"
        />

        <!-- if video -->
        <!-- <video
          v-show="media == 'video'" ref="track" :src="mediaUrl"
          @pause="reloadButton = false; reloadButton = true"
          @play="reloadButton = false; reloadButton = true"
        ></video>  -->


        <div v-show="media == 'audio'" class="header-controls grid">
          <aside class="center" style="gap: 3em">
            <button @click="backTrack()">
              <img src="~/assets/sources/icons/back-track.svg" alt="back 10 seconds" style="--w: 2.5em">
            </button>
            
            <button v-show="reloadButton" @click="playPauseTrack()">
              <img
                :src="require(`~/assets/sources/icons/${$refs.track?.paused ? 'play' : 'pause'}-track.svg`)"
                alt="play / pause" style="--w: 4em"
              >
            </button>
            
            <button @click="advanceTrack()">
              <img src="~/assets/sources/icons/advance-track.svg" alt="advance 10 seconds" style="--w: 2.5em">
            </button>
          </aside>

          <v-slider
            v-model="sliderTrack"
            color="#fff"
            thumb-color="#000"
            messages="always"
            :min="0"
            :max="$refs.track?.duration"
            @mousedown="slideTrack('down')"
            @mouseup="slideTrack('up')"
          >
            <template #message>
              <span class="media-label">{{$refs.track?.currentTime.formatTime()}}</span>
              <span class="media-label">{{$refs.track?.duration.formatTime()}}</span>
            </template>
          </v-slider>
        </div>
      </v-sheet>

      <article class="card divcol" style="gap: 30px">
        <div class="divcol gap1">
          <v-btn class="tag btn" style="--fs: 1.05em">{{
            nft_main.tier===1 ? 'bronze' :
            nft_main.tier===2 ? 'silver' :
            nft_main.tier===3 ? 'gold' :
            nft_main.tier===4 ? 'platinum' :
            nft_main.tier===5 ? 'diamond' :
            nft_main.tier===6 ? 'uranium' : 'user'
          }}</v-btn>

          <h2 class="p tup">{{nft_main.name}}</h2>
        </div>

        <!-- <span>Name of the artist</span> -->

        <p class="p">
          {{nft_main.desc}}
        </p>

        <div class="spacea">
          <span class="bold" style="--c:var(--accent)">Price</span>
          <div class="divcol aend" style="gap: .5em">
            <span class="bold" style="--c: var(--accent)">{{nft_main.floor_price}}
              <img src="~/assets/sources/logos/near-orange.svg" alt="near" style="--w: .9em">
            </span>
            <span style="font-size: calc(var(--font-text) / 1.2)">$ {{dollarConversion(nft_main.floor_price)}}</span>
          </div>
        </div>

        <div class="center gap2 wrap bold">
          <v-btn
            :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 14px; --bg: #fff; --c: var(--primary)"
            @click="$refs.modal.modalSell = true">sell</v-btn>
          <v-btn
            v-if="!redeemBtn"
            :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 14px"
            @click="redeemFn()">Redeem</v-btn>
            <v-btn
            :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 14px"
            @click="burnNft()">Burn</v-btn>
        </div>
      </article>
    </section>

    <section class="container-profit bold fwrap">
      <v-sheet color="transparent" class="divcol center">
        <span>Total Tickets</span>
        <span>{{dataProfits.total_tickets}}</span>
      </v-sheet>
      <v-sheet color="transparent" class="divcol center">
        <span>Owners</span>
        <span>{{dataProfits.owners}}</span>
      </v-sheet>
      <v-sheet color="transparent" class="divcol center">
        <span>Price</span>
        <div class="acenter" style="gap: .5em">
          <span>{{dataProfits.price}}</span>
          <img src="@/assets/sources/logos/near-orange.svg" alt="near" style="--w: 1.833125em">
        </div>
      </v-sheet>
      <!-- <v-sheet color="transparent" class="divcol center">
        <span>Tickets Sold</span>
        <span>{{dataProfits.tickets_sold}}</span>
      </v-sheet>
      <v-sheet color="transparent" class="divcol center">
        <span>Lorem Ipsum</span>
        <span>{{dataProfits.lorem_ipsum}}</span>
      </v-sheet> -->
    </section>

    <h2 id="buy">Buy NFT</h2>

    <v-data-table
      :headers="tableHeaders"
      :items="tableItems"
      :page.sync="currentPage"
      :items-per-page="itemsPerPage"
      hide-default-footer
      mobile-breakpoint="-1"
      :header-props="{sortIcon: 'mdi-menu-down'}"
    >
      <template #[`item.vault`]="{ item }">
        <span :style="`--c:${item.vault ? '#26A17B' : ''}`">{{item.vault ? 'Yes' : 'No'}}</span>
      </template>
      
      <template #[`item.seller`]="{ item }">
        <center class="center" style="gap:10px">
          <v-avatar style="border: 2px solid #fff">
            <v-img :src="item.seller_avatar" alt="artist avatar" transition="fade-transition">
              <template #placeholder>
                <v-skeleton-loader type="avatar" />
              </template>
            </v-img>
          </v-avatar>
          <span :title="item.seller">{{item.seller.limitString(25)}}</span>
        </center>
      </template>
      
      <template #[`item.price`]="{ item }">
        <center v-if="item.price" class="divcol" style="gap: 5px">
          <span>{{item.price}} N</span>
          <span class="normal">$ {{dollarConversion(item.price)}}</span>
        </center>

        <center v-else class="divcol" style="gap: 5px">
          <span>---</span>
          <span>---</span>
        </center>
      </template>
      
      <template #[`item.buy`]="{ item }">
        <v-btn
          v-if="!item.owned"
          :disabled="btnBuy"
          :ripple="false" class="btn activeBtn bold" style="--min-w: 112px; --w: min(100%, 8em); --fs: 14px"
          @click="buyMarketRamper(item)">Buy</v-btn>
          <v-btn
          v-if="item.owned"
          :disabled="btnBuy"
          :ripple="false" class="btn activeBtn bold" style="--min-w: 112px; --w: min(100%, 8em); --fs: 14px"
          @click="unlistNft(item)">Unlist</v-btn>
      </template>
      
      <template #[`item.offer`]="{ item }">
        <v-btn
          v-if="!item.owned"
          :disabled="btnBuy"
          :ripple="false" class="btn activeBtn bold" style="--min-w: 112px; --w: min(100%, 8em); --fs: 14px; --bg: #fff; --c: var(--primary)"
          @click="makeOffer(item)"
        >Make an Offer</v-btn>
      </template>
    </v-data-table>

    <Pagination
      :total-pages="pagination_per_page"
      :current-page="currentPage"
      @pagechanged="(page) => currentPage = page"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import computeds from '~/mixins/computeds'

export default {
  name: "CollectionDetailsPage",
  mixins: [computeds],
  data() {
    return {
      media: false,
      mediaUrl: null,
      reloadButton: true,
      trackInterval: null,
      sliderTrackState: false,
      sliderTrack: 0,
      nft_main: {},
      dataSocial: [
        { icon: "mdi-instagram", link: "#" },
        { icon: "mdi-twitter", link: "#" },
        { icon: "mdi-facebook", link: "#" },
        { icon: "discord", link: "#" },
      ],
      dataProfits: {
        total_tickets: null,
        owners: null,
        price: null,
        tickets_sold: null,
        lorem_ipsum: null,
      },
      tableHeaders: [
        { value: "number", text: "edition number", align: "center" },
        { value: "token", text: "token id", align: "center", sortable: false },
        { value: "seller", text: "seller", align: "center", sortable: false },
        { value: "price", text: "price", align: "center" },
        { value: "buy", align: "center", sortable: false },
        { value: "offer", align: "center", sortable: false },
      ],
      tableItems: [
        // {
        //   number: "#1",
        //   vault: true,
        //   seller: "tonystark.near",
        //   seller_avatar: require("~/assets/sources/avatars/avatar.png"),
        //   price: "174",
        // },
        // {
        //   number: "#123",
        //   vault: false,
        //   seller: "tonystark.near",
        //   seller_avatar: require("~/assets/sources/avatars/avatar.png"),
        //   price: "174",
        // },
        // {
        //   number: "#123",
        //   vault: false,
        //   seller: "tonystark.near",
        //   seller_avatar: require("~/assets/sources/avatars/avatar.png"),
        // },
      ],
      currentPage: 1,
      itemsPerPage: 10,
      ownedTier1: false,
      ownedTier2: false,
      labelYoutube: "",
      redeemBtn: true,
    }
  },
  head() {
    const title = "Nft Details"
    return {
      title,
    }
  },
  computed: {
    pagination_per_page() {
      return Math.ceil(this.tableItems.length / this.itemsPerPage)
    }
  },
  created() {
    if (!this.nft) {this.$router.push(this.localePath('/profile'))}
    if (this.user.tier >= 3) {this.$router.push(this.localePath("/user-nft-details-vip"))}
    this.nft_main = this.nft
  },
  async mounted() {
    this.ownedTier1 = true // await this.validateTierFn(1)
    this.ownedTier2 = await this.validateTierFn(2)
    this.nft_main = this.nft
    if (this.nft_main.typetoken_id === '7' || this.nft_main.typetoken_id === '8' || this.nft_main.typetoken_id === '9') {
      this.redeemBtn = false
    } 
    this.getSerie()
    this.getDataNft()

    console.log("NFT", this.nft_main)
  },
  methods: {
    async burnNft() {
      if (this.$ramper.getUser()) {
        const action = [
          this.$ramper.functionCall(
            "nft_burn",       
            {
              token_id: this.nft_main.token_id,
              reedemer: false 
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
          // this.$router.push(this.localePath('/profile'))
          // setTimeout(() => this.$alert({title: "Success!", desc: "Your nft has been successfully burned."}), 800);
          // this.$alert({title: "Success!", desc: "Your data has been saved successfully."})
          localStorage.setItem("transaction_data", JSON.stringify({
            state: "success",
            title: "Success",
            desc: "Your nft has been successfully burned.",
            hash: res.txHashes[0],
            burn: true
          }))

          this.$router.push(this.localePath('/redirection'))
          
        } else if (res && res.result && res.txHashes.length > 0) {
          if (res.result[0].status.SuccessValue || res.result[0].status.SuccessValue === "") {
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "success",
              title: "Success",
              desc: "Your nft has been successfully burned.",
              hash: res.txHashes[0],
              burn: true
            }))
            this.$router.push(this.localePath('/redirection'))
          } else if (res.result[0].status.Failure) {
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "cancel",
              title: "Error",
              desc: res.result[0].status.Failure.ActionError.kind.FunctionCallError.ExecutionError + ".",
              hash: res.txHashes[0],
              burn: true
            }))
            this.$router.push(this.localePath('/redirection'))
          }
        }
      }
    },
    redeemFn() {
      localStorage.setItem("nft", JSON.stringify(this.nft_main))
      this.$refs.modal.modalRedemption = true
    },
    dollarConversion(price) {
      return (Number(price) * this.priceNear).toFixed(2)
    },
    async getDataNft() {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($serie_id: String) {
          nfts(where: {serie_id: $serie_id}) {
            description
            extra
            fecha
            id
            media
            owner_id
            reference
            serie_id
            title
            artist_id
          }
        }
      `;

      const res = await clientApollo.query({
        query: QUERY_APOLLO,
        variables: {serie_id: String(this.nft_main.type_id)},
      })

      const data = res.data.nfts

      const ownersArray = []

      for (let i = 0; i < data.length; i++) {
        ownersArray.push(data[i].owner_id)
      }

      const owners = Array.from(new Set(ownersArray));

      this.dataProfits.total_tickets = data.length
      this.dataProfits.owners = owners.length
      // this.dataProfits.price = this.nft_main.floor_price

      const floor = await this.getFloorPrice()
      
      if (floor) {
        if (Number(floor) < Number(this.nft_main.floor_price)) {
          this.dataProfits.price = floor
        } else {
          this.dataProfits.price = this.nft_main.floor_price
        }
      } else {
        this.dataProfits.price = this.nft_main.floor_price
      }

      this.getNftsMarket()
    },
    async getSerie() {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($serie_id: String) {
          series(where: {id: $serie_id}) {
            artist_id
            copies
            creator_id
            desc_series
            description
            extra
            fecha
            id
            media
            price
            price_near
            reference
            supply
            title
            typetoken_id
          }
        }
      `;

      const res = await clientApollo.query({
        query: QUERY_APOLLO,
        variables: {serie_id: String(this.nft_main.type_id)},
      })

      if (res.data.series[0]) {
        const data = res.data.series[0]  

        console.log(data.typetoken_id, this.ownedTier2)

        if (data.typetoken_id === '1' && this.ownedTier1) {
          await this.getMedia('audio')
          this.media = 'audio'
        } else if (data.typetoken_id === '2' && this.ownedTier2) {
          await this.getMedia('video')
          this.media = 'video'
        }
      }
    },
    async getMedia(media) {
      console.log("MEDIA", media, "ARTIST", this.nft_main.artist_id)
      await this.$axios.post(`${this.baseUrl}api/v1/get-media/`, { "media": String(media), "artist": Number(this.nft_main.artist_id) })
      .then(result => {
        const data = result.data
        if (data.media) {
          if (media === 'audio') {
            this.mediaUrl = this.baseUrl+data.media
          } else if (media === 'video') {
            console.log("SIIIIUUUU")
            this.mediaUrl = data.media
          }
        }
        console.log(this.mediaUrl)
      }).catch(err => {
        // this.$alert("cancel", {desc: err.message})
        console.error(err);
      })
    },
    async getFloorPrice () {
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
        variables: {serie_id: String(this.nft_main.type_id)},
      })

      const data = res.data.markets

      if (data[0]) {
        return data[0].price_near
      } else {
        return false
      }
    },
    async validateTierFn(tierId) {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($artist_id: String, $owner_id: String, $reference: String) {
          nfts(
            where: {owner_id: $owner_id, artist_id: $artist_id, reference: $reference}
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
        variables: {artist_id: String(this.nft_main.artist_id), owner_id: this.$ramper.getAccountId(), reference: String(tierId)},
      })

      const data = res.data.nfts

      if (data.length > 0) {
        return true
      } else {
        return false
      }
    },
    async unlistNft(item) {
      console.log(item)
      this.btnBuy = true
      if (this.$ramper.getUser()) {
        const action1 = [
          this.$ramper.functionCall(
            "delete_market_data",       
            {
              nft_contract_id: "nft7.musicfeast.testnet",
              token_id: item.token
            }, 
            '100000000000000', 
            '1'
          )
        ]
        const action2 = [
          this.$ramper.functionCall(
            "nft_revoke",       
            {
              token_id: item.token, 
              account_id: "market2.musicfeast.testnet",
            }, 
            '100000000000000', 
            '1'
          )
        ]

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
          ],
          network: 'testnet',
        })
        console.log("Transaction Result: ", res)

        this.btnBuy = false

        if (res && JSON.parse(localStorage.getItem('ramper_loggedInUser')).signupSource === 'near_wallet' && res.txHashes.length > 0) {
          localStorage.setItem("transaction_data", JSON.stringify({
            state: "success",
            title: "Success",
            desc: "Your nft has been successfully unlisted.",
            hash: res.txHashes[0]
          }))
          this.$router.push(this.localePath('/redirection'))
        } else if (res && res.result) {
          if (res.result[0].status.SuccessValue || res.result[0].status.SuccessValue === "" && res.result[1].status.SuccessValue || res.result[1].status.SuccessValue === "") {
            this.getNftsMarket()
            // this.$alert("success", {desc: "Your nft has been successfully purchased, in a few minutes you will be able to see it on your profile.", hash: res.txHashes[0]})   
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "success",
              title: "Success",
              desc: "Your nft has been successfully unlisted.",
              hash: res.txHashes[0]
            }))
            this.$router.push(this.localePath('/redirection'))
          } else if (res.result[0].status.Failure) {
            // this.$alert("cancel", {desc: res.result[1].status.Failure.ActionError.kind.FunctionCallError.ExecutionError + ".", hash: res.txHashes[0]})
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
    async buyMarketRamper(item) {
      const balance = await this.getBalance()
      if (balance < Number(this.nft_main.floor_price) + 0.3) {
        this.$alert({title: "WARNING!", desc: "Insufficient Balance.", icon: "alert"})  
        return
      }

      this.btnBuy = true
      if (this.$ramper.getUser()) {
        const price = Number(item.price)
        const action = [this.$ramper.functionCall(
          "buy",       
          {
            nft_contract_id: "nft7.musicfeast.testnet", 
            token_id: item.token,
          }, 
          '300000000000000', 
          this.$utils.format.parseNearAmount(String(price))
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

        this.btnBuy = false

        if (res && JSON.parse(localStorage.getItem('ramper_loggedInUser')).signupSource === 'near_wallet' && res.txHashes.length > 0) {
          if (this.nft_main.tier === 1) {
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "success",
              title: "Success",
              desc: "You have successfully acquired your community access pass. Community chat can be found on the artist page. ",
              hash: res.txHashes[0]
            }))
          } else if (this.nft_main.tier === 2) {
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "success",
              title: "Success",
              desc: "You have successfully acquired your exclusive video pass. Video can be accessed on the page where pass was purchased..",
              hash: res.txHashes[0]
            }))
          } else if (this.nft_main.tier === 3) {
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "success",
              title: "Success",
              desc: "You have successfully acquired your physical merchandise pass. Your order can be placed under the collections section of the artists main page.",
              hash: res.txHashes[0]
            }))
          } else if (this.nft_main.tier === 4) {
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "success",
              title: "Success",
              desc: "You have successfully acquired your physical merchandise pass. Your order can be placed under the collections section of the artists main page.",
              hash: res.txHashes[0]
            }))
          } else if (this.nft_main.tier === 5) {
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "success",
              title: "Success",
              desc: "You have successfully purchased a portion of the songs traditional revenue.  You can now request payouts on a quarterly basis.",
              hash: res.txHashes[0]
            }))
          } else if (this.nft_main.tier === 6) {
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "success",
              title: "Success",
              desc: "You have successfully acquired your auction pass.  Your order can be placed under the collections section of the artists main page.",
              hash: res.txHashes[0]
            }))
          }
          this.$router.push(this.localePath('/redirection'))
          // if (this.nft_main.tier === 1) {
          //   setTimeout(() => this.$alert({title: "Successfully acquired your membership pass!", desc: "Access the discord community on the artist homepage."}), 900);
          // } else if (this.nft_main.tier === 2) {
          //   setTimeout(() => this.$alert({title: "Successfully acquired your exclusive video access pass!", desc: "Enter the pass page to see the exclusive video."}), 900)
          // }
        } else if (res && res.result) {
          if (res.result[0].status.SuccessValue || res.result[0].status.SuccessValue === '') {
            if (this.nft_main.tier === 1) {
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "success",
                title: "Success",
                desc: "You have successfully acquired your community access pass. Community chat can be found on the artist page. ",
                hash: res.txHashes[0]
              }))
            } else if (this.nft_main.tier === 2) {
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "success",
                title: "Success",
                desc: "You have successfully acquired your exclusive video pass. Video can be accessed on the page where pass was purchased..",
                hash: res.txHashes[0]
              }))
            } else if (this.nft_main.tier === 3) {
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "success",
                title: "Success",
                desc: "You have successfully acquired your physical merchandise pass. Your order can be placed under the collections section of the artists main page.",
                hash: res.txHashes[0]
              }))
            } else if (this.nft_main.tier === 4) {
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "success",
                title: "Success",
                desc: "You have successfully acquired your physical merchandise pass. Your order can be placed under the collections section of the artists main page.",
                hash: res.txHashes[0]
              }))
            } else if (this.nft_main.tier === 5) {
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "success",
                title: "Success",
                desc: "You have successfully purchased a portion of the songs traditional revenue.  You can now request payouts on a quarterly basis.",
                hash: res.txHashes[0]
              }))
            } else if (this.nft_main.tier === 6) {
              localStorage.setItem("transaction_data", JSON.stringify({
                state: "success",
                title: "Success",
                desc: "You have successfully acquired your auction pass.  Your order can be placed under the collections section of the artists main page.",
                hash: res.txHashes[0]
              }))
            }
            this.$router.push(this.localePath('/redirection'))
            // if (this.nft_main.tier === 1) {
            //   setTimeout(() => this.$alert({title: "Successfully acquired your membership pass!", desc: "Access the discord community on the artist homepage."}), 900);
            // } else if (this.nft_main.tier === 2) {
            //   setTimeout(() => this.$alert({title: "Successfully acquired your exclusive video access pass!", desc: "Enter the pass page to see the exclusive video."}), 900)
            // }
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
    makeOffer(item) {
      localStorage.setItem("offer", JSON.stringify(item))
      this.$refs.modal.modalOffer = true
    },
    async getNftsMarket () {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($serie_id: String) {
          markets(where: {serie_id: $serie_id}) {
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
        variables: {serie_id: String(this.nft_main.type_id)},
      })

      const data = res.data.markets

      const accountId = this.$ramper.getAccountId()

      this.tableItems = []

      for (let i = 0; i < data.length; i++) {
        const edition = data[i].token_id.split(":")
        const item = {
          number: "#" + edition[1],
          token: data[i].token_id,
          seller: data[i].owner_id,
          seller_avatar: require("~/assets/sources/avatars/avatar.png"),
          price: data[i].price_near,
          price_yocto: data[i].price,
          owned: false
        }

        if (accountId === item.seller) {
          item.owned = true
        }

        this.tableItems.push(item)
      }
    },
    backTrack() {
      this.sliderTrack -= 10;
      this.$refs.track.currentTime -= 10
      if (this.sliderTrack < 0) this.sliderTrack = 0
    },
    advanceTrack() {
      this.sliderTrack += 10;
      this.$refs.track.currentTime += 10
      if (this.sliderTrack > 100) this.sliderTrack = 100
    },
    slideTrack(key) {
      if (key === 'down') {
        clearInterval(this.trackInterval)
      } else if (key === 'up') {
        this.$refs.track.currentTime = this.sliderTrack;
        this.playPauseTrack()
      }
    },
    playPauseTrack() {
      if (this.$refs.track?.paused) {
        this.$refs.track.play()
        this.trackInterval = setInterval(() => {
          const audioTime = Math.round(this.$refs.track.currentTime);
          this.sliderTrack = audioTime;
        }, 10)
      }
      else {
        this.$refs.track.pause()
        clearInterval(this.trackInterval)
      }
    },
  }
};
</script>

<style src="~/assets/styles/pages/nft-details.scss" lang="scss" />
