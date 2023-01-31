<template>
  <div id="artist-details" class="divcol">
    <v-img :src="artist.banner" class="header" transition="fade-transition">
      <template #default>
        <aside class="header-title">
          <h2>{{artist.name}}</h2>
          <v-img :src="artist.image" alt="avatar image" transition="fade-transition">
            <template #placeholder>
              <v-skeleton-loader type="avatar" />
            </template>
          </v-img>
        </aside>

        <aside class="header-social">
          <div class="center" style="gap:clamp(1em, 2.5vw, 2.5em)">
            <v-btn v-for="(item,i) in dataSocial" :key="i" icon :href="item.link" target="_blank">
              <v-icon size="clamp(2em, 2.8vw, 2.8em)">{{item.icon}}</v-icon>
            </v-btn>
          </div>
        </aside>
      </template>
      <template #placeholder>
        <v-skeleton-loader v-show="artist.banner" type="card" />
      </template>
    </v-img>
    
    <section class="container-profit bold fwrap">
      <v-sheet color="transparent" class="divcol center">
        <span>Total NFTs</span>
        <span>{{dataProfits.nfts}}</span>
      </v-sheet>
      <v-sheet color="transparent" class="divcol center">
        <span>Owners</span>
        <span>{{dataProfits.owners}}</span>
      </v-sheet>
      <v-sheet color="transparent" class="divcol center">
        <span>Total Events</span>
        <span>{{dataProfits.events}}</span>
      </v-sheet>
      <v-sheet color="transparent" class="divcol center">
        <span>All Collections</span>
        <span>{{dataProfits.collections}}</span>
      </v-sheet>
      <v-sheet color="transparent" class="divcol center">
        <span>All Time High</span>
        <span v-if="dataProfits.high === '---'">{{dataProfits.high}}</span>
        <span v-else>$ {{dataProfits.high}}K</span>
      </v-sheet>
    </section>

    <v-expansion-panels id="artist-about" class="custome-expansion">
      <v-expansion-panel>
        <v-expansion-panel-header expand-icon="mdi-menu-down" class="bold">Nutritional Facts</v-expansion-panel-header>

        <v-expansion-panel-content>
          <p v-html="artist.about" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>



  <v-slide-group
    id="custome-slider"
    v-model="slider"
    mandatory
    show-arrows
    center-active
  >
    <v-slide-item v-for="(item,i) in dataSlider" :key="i" v-slot="{ active, toggle }">
      <v-sheet :key="i" color="rgba(0, 0, 0, .4)" class="divcol" @click="toggle">
        <v-card
          v-if="!item.validate"
          class="card divcol custome"
          :class="{
            uranium: item.tier===6,
            diamond: item.tier===5,
            platinum: item.tier===4,
            gold: item.tier===3,
            silver: item.tier===2,
            bronze: item.tier===1,
            active: active
          }"
          @click="$store.dispatch('goTo', {key: 'nft', item, event: $event})">
          <v-img
            :src="item.img" :alt="`${item.name} image`" transition="fade-transition"
            :style="`--tag-tier: '${
              item.tier===1 ? 'bronze' :
              item.tier===2 ? 'silver' :
              item.tier===3 ? 'gold' :
              item.tier===4 ? 'platinum' :
              item.tier===5 ? 'diamond' :
              item.tier===6 ? 'uranium' : 'user'
            }';
            ${item.state ? `--tag-state: '${item.state}'` : ''}`">
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
            <p>{{item.desc}}</p>

            <div class="center" style="gap: 6.4px">
              <span class="floor" style="--c: var(--accent)">Price: {{item.floor_price}}</span>
              <img src="@/assets/sources/logos/near-orange.svg" alt="near" style="--w:0.9375em">
            </div>
            <span class="floor" style="--c: var(--accent)">Editions: {{item.editions}}</span>
          </div>
        </v-card>

        <v-card
          v-else
          class="card divcol custome"
          :class="{
            uranium: item.tier===6,
            diamond: item.tier===5,
            platinum: item.tier===4,
            gold: item.tier===3,
            silver: item.tier===2,
            bronze: item.tier===1,
            active: active
          }">
          <v-img
            :src="item.img" :alt="`${item.name} image`" transition="fade-transition"
            :style="`--tag-tier: '${
              item.tier===1 ? 'bronze' :
              item.tier===2 ? 'silver' :
              item.tier===3 ? 'gold' :
              item.tier===4 ? 'platinum' :
              item.tier===5 ? 'diamond' :
              item.tier===6 ? 'uranium' : 'user'
            }';
            ${item.state ? `--tag-state: '${item.state}'` : ''}`">
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
            <p>{{item.desc}}</p>

            <div class="center" style="gap: 6.4px">
              <span class="floor" style="--c: var(--accent)">Price: {{item.floor_price}}</span>
              <img src="@/assets/sources/logos/near-orange.svg" alt="near" style="--w:0.9375em">
            </div>
            <span class="floor" style="--c: var(--accent)">Editions: {{item.editions}}</span>
          </div>
        </v-card>

        <div class="tier-desc divcol">
          <a class="tup bold" style="cursor:default">{{item.name}} {{
            item.tier==='bronze' ? 1 :
            item.tier==='silver' ? 2 :
            item.tier==='gold' ? 3 :
            item.tier==='platinum' ? 4 :
            item.tier==='diamond' ? 5 :
            item.tier==='uranium' ? 6 : ''
          }}</a>
          <ul>
            <li v-show="item.description">{{item.description}}</li>
            <!-- <li v-show="item.tier">Access to special membership perks.</li>
            <li v-show="item.tier">Access to more valuable NFT’s and collectables.</li> -->
          </ul>
        </div>

        <div class="container-actions divcol">
          <a v-if="!item.validate" @click="$store.dispatch('goTo', {key: 'nft', item, event: $event})">More Details</a>
          <a v-else>More Details</a>
          <v-btn
            v-if="!item.state" 
            :disabled="item.validate"
            :ripple="false" class="btn activeBtn align" style="--w: calc(100% - 1em)"
            @click="$store.dispatch('goTo', {key: 'nft', item, event: $event, buyDirect: true})">Go to Buy Page</v-btn>
            <v-btn
            v-else
            :disabled="item.validate"
            :ripple="false" class="btn activeBtn align" style="--w: calc(100% - 1em)"
            @click="$store.dispatch('goTo', {key: 'nft', item, event: $event})">Go to Buy Page</v-btn>
        </div>
      </v-sheet>
    </v-slide-item>
    
    <template #prev="{ on, attrs}">
      <v-btn
        icon
        class="reverse"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon x-large>mdi-play</v-icon>
      </v-btn>
    </template>

    <template #next="{on, attrs}">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon x-large>mdi-play</v-icon>
      </v-btn>
    </template>
  </v-slide-group>


    <h2 class="Title tup">events</h2>

    <v-expansion-panels class="custome-expansion">
      <v-expansion-panel v-for="(item,i) in dataEvents" :key="i">
        <v-expansion-panel-header
          expand-icon="mdi-menu-down" class="bold tcap"
          @click="$store.dispatch('goTo', {key: 'event', item})">
          {{item.name}}
        </v-expansion-panel-header>
      </v-expansion-panel>
    </v-expansion-panels>

    <h2 class="Title fwrap" style="--fb: 200px; gap: 5px clamp(1em, 2vw, 2em)">
      <span class="tup" style="--fb: max-content">nft &amp; collections</span>

      <Filters
        contents
        :hide="[3]"
        :search="search"
        :filter-a="filterA.list"
        @search="(model) => search = model"
        @filterA="(model) => filterA.model = model"
      />
      <!-- <Filters
        :search="search"
        :filter-a="filterA.list"
        :filter-b="filterB.list"
        @search="(model) => search = model"
        @filterA="(model) => filterA.model = model"
        @filterB="(model) => filterB.model = model"
        :hide="[3]"
      /> -->
    </h2>

    <section class="container-collections grid">
      <div v-for="(item,i) in dataCollections_pagination" :key="i">
        <v-card
          v-if="!item.state"
          class="card divcol custome"
          :class="{
            uranium: item.tier===6,
            diamond: item.tier===5,
            platinum: item.tier===4,
            gold: item.tier===3,
            silver: item.tier===2,
            bronze: item.tier===1,
          }"
          @click="$store.dispatch('goTo', {key: 'nft', item, event: $event})">
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
            <p>{{item.desc}}</p>

            <div class="center bold" style="gap: 6.4px">
              <span class="floor" style="--c: var(--accent)">Price: {{item.floor_price}}</span>
              <img src="@/assets/sources/logos/near-orange.svg" alt="near" style="--w:15px">
            </div>
            <span class="floor" style="--c: var(--accent)">Editions: {{item.editions}}</span>
          </div>
        </v-card>
        <v-card
          v-else
          class="card divcol custome"
          :class="{
            uranium: item.tier===6,
            diamond: item.tier===5,
            platinum: item.tier===4,
            gold: item.tier===3,
            silver: item.tier===2,
            bronze: item.tier===1,
          }"
          >
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
            <p>{{item.desc}}</p>

            <div class="center bold" style="gap: 6.4px">
              <span class="floor" style="--c: var(--accent)">Price: {{item.floor_price}}</span>
              <img src="@/assets/sources/logos/near-orange.svg" alt="near" style="--w:15px">
            </div>
            <span class="floor" style="--c: var(--accent)">Editions: {{item.editions}}</span>
          </div>
        </v-card>
      </div>
    </section>

    <Pagination
      :total-pages="pagination_per_page"
      :current-page="currentPage"
      @pagechanged="(page) => currentPage = page"
    />

    <h2 class="Title tup">chats</h2>
    <widgetbot
      server="1053340402633150485"
      channel="1053340403086147672"
      width="1560"
      height="1000"
    ></widgetbot>
    <script src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>

    <!-- <v-expansion-panels class="custome-expansion">
      <v-expansion-panel v-for="(item,i) in dataChats" :key="i">
        <v-expansion-panel-header expand-icon="mdi-menu-down" class="bold" @click="toLink()">
          <div class="acenter" style="gap:.5em">
            <v-icon size="1.5em">{{item.icon}}</v-icon>
            <span class="tcap">{{item.chat}}</span>
          </div>
        </v-expansion-panel-header>
      </v-expansion-panel>
    </v-expansion-panels> -->
  </div>
</template>

<script>
import gql from 'graphql-tag'
import computeds from '~/mixins/computeds'
const pageName = 'artist-details';

export default {
  name: "CollectionDetailsPage",
  mixins: [computeds],
  data() {
    return {
      artistId: null,
      dia: false,
      ownerTiers: [],
      artist: {},
      validateTier: false,
      dataSocial: [
        { icon: "mdi-instagram", link: "#" },
        { icon: "mdi-twitter", link: "#" },
        { icon: "mdi-facebook", link: "#" },
        { icon: "discord", link: "#" },
      ],
      tiers: [
        { tier: "1", validate: false },
        { tier: "2", validate: false },
        { tier: "3", validate: false },
        { tier: "4", validate: false },
        { tier: "5", validate: false },
        { tier: "6", validate: false },
      ],
      dataProfits: {
        nfts: null,
        owners: null,
        events: null,
        collections: null,
        high: null,
      },
      slider: 0,
      dataSlider: [
        // {
        //   img: require('~/assets/sources/images/img-listed-1.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artistt Name o Collection  n°5",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   editions: "250.00",
        //   tier: 1,
        //   type: "nft",
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-2.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°5",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   editions: "250.00",
        //   tier: 2,
        //   type: "nft",
        // },
      ],
      dataEvents: [
        // { event: "toronto" },
        // { event: "miami" },
        // { event: "madrid" },
      ],
      search: "",
      filter: {
        model: "",
        list: [6, 5, 4, 3, 2, 1],
      },
      filterA: {
        model: "",
        list: [6, 5, 4, 3, 2],
      },
      filterB: {
        model: "",
        list: ["lastest releases", "newest", "oldest", "comming soon", "lorem ipsum", "lorem ipsum"],
      },
      dataCollections: [
        // {
        //   img: require('~/assets/sources/images/img-listed-1.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°1",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   state: "live",
        //   type: "nft",
        //   tier: 3,
        // },
      ],
      currentPage: 1,
      itemsPerPage: 10,
      dataChats: [
        { icon: "discord", chat: "discord" },
      ],
    }
  },
  head() {
    const title = "Artist Details"
    return {
      title,
    }
  },
  computed: {
    dataCollections_pagination() {
      return this.$store.getters.pagination({
        items: this.dataCollections, currentPage: this.currentPage, itemsPerPage: this.itemsPerPage,
        search: this.search, filterA: this.filterA.model
      })
    },
    pagination_per_page() {
      return Math.ceil(this.dataCollections.length / this.itemsPerPage)
    }
  },
  created() {
    if (!this.artist) {this.$router.push(this.localePath('/artists'))}
  },
  async mounted() {
    this.artistId = JSON.parse(localStorage.getItem("artist"))
    await this.getCurrentArtist()
    
    this.styles();
    

    // resize listener
    window.addEventListener('resize', this.styles);
    
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.styles);
  },
  methods: {
    toLink() {
      window.open("https://discord.gg/9KB3gjJkWJ")
    },
    getEventsArtist() {
      this.$axios.post(`${this.baseUrl}api/v1/get-events/`, {"artist_id": Number(this.artist.id_collection)})
        .then(response => {
          console.log("EVENTS",response.data)
          // this.dataEvents = response.data.reverse()
          
          if (response.data[0]) {
            const data = []
            for (let i = 0; i < response.data.length; i++) {
              const item = response.data[i]
              item.artist_data = this.artist
              item.img = this.baseUrl+item.img;
              data.push(item)
            }
            this.dataEvents = data
          }
          this.dataProfits.events = this.dataEvents.length
        }).catch(err => {
          this.$alert("cancel", {desc: err.message})
          console.error(err);
        })
    },
    getCurrentArtist() {
      this.$axios.post(`${this.baseUrl}api/v1/get-artist/`, {"id": Number(this.artistId)})
        .then(async response => {
          const data = response.data[0]
          if (data) {
            this.artist = data
            this.artist.banner = this.baseUrl+this.artist.banner;
            this.artist.image = this.artist.image ? this.baseUrl+this.artist.image : require('~/assets/sources/avatars/avatar.png');

            // await this.validateTierOne()
            await this.validateTiers()
            this.getDataHeader()
            this.dataSocials()
            this.getTiers()
            this.getEventsArtist()
          } else {
            // this.$alert("cancel", {desc: "The artist does not exist"})
            // this.$router.push(this.localePath("/artists"))
          }
        }).catch(err => {
          // this.$alert("cancel", {desc: err.message})
          console.error(err);
        })
    },
    async getOwners() {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($artist_id: String) {
          nfts(where: {artist_id: $artist_id}) {
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
        variables: {artist_id: String(this.artist.id_collection)},
      })

      const data = res.data.nfts

      const ownersArray = []

      for (let i = 0; i < data.length; i++) {
        ownersArray.push(data[i].owner_id)
      }

      const owners = Array.from(new Set(ownersArray));

      this.dataProfits.owners = owners.length
    },
    async validateTierOne() {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($artist_id: String, $owner_id: String) {
          nfts(
            where: {owner_id: $owner_id, artist_id: $artist_id, reference: "1"}
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
        variables: {artist_id: String(this.artist.id_collection), owner_id: this.$ramper.getAccountId()},
      })

      const data = res.data.nfts

      if (data.length > 0) {
        this.validateTier = false
      } else {
        this.validateTier = true
      }
    },
    async validateTiers() {
      for (let i = 0; i < this.tiers.length; i++) {
        this.tiers[i].validate = await this.validateTierFn(i+1)
        if (this.tiers[i].validate) {
          this.ownerTiers.push(this.tiers[i].tier)
        }
        if (this.tiers[i].tier === '1') {
          if (this.tiers[i].validate) {
            this.validateTier = false
          } else {
            this.validateTier = true
          }
        }
      }
      this.getDataNfts()
    },
    async getDataNfts() {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($artist_id: String, $typetoken: [String]) {
          series(where: {artist_id: $artist_id, typetoken_id_in: $typetoken}) {
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
        variables: {artist_id: String(this.artist.id_collection), typetoken: ['7', '8', '9', '10', '11']},
      })

      const data = res.data.series

      console.log("DATANFTS", data)


      this.dataCollections = []

      for (let i = 0; i < data.length; i++) {
        const item = {
          token_id: data[i].id,
          artist: this.artist.name,
          img: data[i].media,
          avatar: this.artist.image,
          name: data[i].title,
          desc: data[i].description,
          floor_price: data[i].price_near,
          price: data[i].price,
          copies: data[i].copies || 0,
          editions: data[i].copies || "Multi",
          supply: data[i].supply,
          artist_id: data[i].artist_id,
          // state: "live",
          state: null,
          activate: false,
          type: "nft",
          tier: Number(data[i].typetoken_id),
          type_id: data[i].id,
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
        }

        if (item.tier === 2) {
          if (this.tiers[1].validate === false) {
            item.state = "locked"
            item.activate = true
          }
        } else if (item.tier === 3) {
          if (this.tiers[2].validate === false) {
            item.state = "locked"
            item.activate = true
          }
        } else if (item.tier === 4) {
          if (this.tiers[3].validate === false) {
            item.state = "locked"
            item.activate = true
          }
        } else if (item.tier === 5) {
          if (this.tiers[4].validate === false) {
            item.state = "locked"
            item.activate = true
          }
        }

        this.dataCollections.push(item)
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
        variables: {artist_id: String(this.artist.id_collection), owner_id: this.$ramper.getAccountId(), reference: String(tierId)},
      })

      const data = res.data.nfts

      if (data.length > 0) {
        return true
      } else {
        return false
      }
    },
    async getDataHeader() {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($artist_id: String) {
          artists(where: {id: $artist_id}) {
            total_nft
            total_event
            total_collection
            name
            id
            fecha
          }
        }
      `;

      const res = await clientApollo.query({
        query: QUERY_APOLLO,
        variables: {artist_id: String(this.artist.id_collection)},
      })

      const data = res.data.artists[0]

      this.dataProfits.nfts = data.total_nft
      this.dataProfits.owners = "---"
      this.dataProfits.collections = data.total_collection
      this.dataProfits.high = "---"

      // this.dataProfits = {
      //   nfts: data.total_nft,
      //   owners: "---",
      //   events: data.total_event,
      //   collections: data.total_collection,
      //   high: "---",
      // }

      this.getOwners()
    },
    async getTiers() {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($artist_id: String) {
          series(where: {artist_id: $artist_id, typetoken_id_in: ["1", "2", "3", "4", "5"]}) {
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
        variables: {artist_id: String(this.artist.id_collection)},
      })

      const data = res.data.series

      console.log("DATA", data)

      for (let i = 0; i < data.length; i++) {
        const item = {
          img: data[i].media,
          avatar: this.artist.image,
          name: data[i].title.toUpperCase(),
          artist: this.artist.name,
          artist_id: data[i].artist_id,
          desc: this.artist.name,
          description: data[i].description,
          floor_price: data[i].price_near,
          price: data[i].price,
          editions: data[i].copies || "Multi",
          tier: Number(data[i].reference),
          type_id: data[i].id,
          type: "nft",
          token_id: data[i].id,
          supply: data[i].supply,
          copies: data[i].copies || 0,
          state: null,
          validate: this.validateTier
        }

        if (item.validate && item.tier !== 1) {
          item.state = "locked"
        }

        if (item.tier === 1) {
          item.validate = false
        }

        if (item.tier === 1) {
          if (this.tiers[0].validate === true) {
            item.state = "owned"
            item.activate = false
          }
        } else if (item.tier === 2) {
          if (this.tiers[1].validate === true) {
            item.state = "owned"
            item.activate = false
          }
        } else if (item.tier === 3) {
          if (this.tiers[2].validate === true) {
            item.state = "owned"
            item.activate = false
          }
        } else if (item.tier === 4) {
          if (this.tiers[3].validate === true) {
            item.state = "owned"
            item.activate = false
          }
        } else if (item.tier === 5) {
          if (this.tiers[4].validate === true) {
            item.state = "owned"
            item.activate = false
          }
        } else if (item.tier === 6) {
          if (this.tiers[5].validate === true) {
            item.state = "owned"
            item.activate = false
          }
        }
        if (item.copies !== 0 && Number(item.supply) >= Number(item.copies)) {
          item.state = "sold out"
        }
        this.dataSlider.push(item)
      }
    },
    dataSocials() {
      const social = []
      if (this.artist.instagram) {
        social.push({ icon: "mdi-instagram", link: `https://instagram.com/${this.artist.instagram}` },)
      }
      if (this.artist.twitter) {
        social.push({ icon: "mdi-twitter", link: `https://twitter.com/${this.artist.twitter}` },)
      }
      if (this.artist.facebook) {
        social.push({ icon: "mdi-facebook", link: `https://www.facebook.com/${this.artist.facebook}` },)
      }
      if (this.artist.discord) {
        social.push({ icon: "mdi-discord", link: `https://discord.com/channels/${this.artist.discord}` },)
      }
      this.dataSocial = social
    },
    styles() {
      const page = document.querySelector(`#${pageName}`);
      // title height
      const titleHeight = document.querySelector(".header-title").getBoundingClientRect().height;
      page.style.setProperty('--h-header-title', `${titleHeight}px`);
      // title width
      const socialWidth = document.querySelector(".header-social div.center").getBoundingClientRect().width;
      page.style.setProperty('--w-header-social', `${socialWidth}px`);
      // social height
      const socialHeight = document.querySelector(".header-social").getBoundingClientRect().height;
      page.style.setProperty('--h-header-social', `${socialHeight}px`);
      // avatar width
      const avatarWidth = document.querySelector(".header-title .v-image").getBoundingClientRect().width;
      page.style.setProperty('--w-avatar', `${avatarWidth}px`);
      // height h2
      document.querySelectorAll('h2.Title').forEach(h2 => {
        page.style.setProperty('--h-title', `${h2.getBoundingClientRect().height}px`)
      });
    },
  }
};
</script>

<style src="~/assets/styles/pages/artist-details.scss" lang="scss" />
