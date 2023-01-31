<template>
  <div id="marketplace" class="divcol">
    <h2 class="Title tup">collections</h2>
    <v-carousel
      id="custome-carousel"
      v-model="modelCarousel"
      height="max-content"
      hide-delimiter-background
    >
      <template v-for="(item, index) in dataCarousel">
        <v-carousel-item v-if="(index + 1) % columnsCarousel() === 1 || columnsCarousel() === 1" :key="index">
          <template v-for="(n,i) in columnsCarousel()">
            <template v-if="(+index + i) < dataCarousel.length">
              <v-card
                :key="i" class="card divcol custome"
                @click="$store.dispatch('goTo', {key: 'collection', item: dataCarousel[+index + i]})">
                <v-img
                  :src="dataCarousel[+index + i].img" :alt="`${dataCarousel[+index + i].name} image`" transition="fade-transition"
                  :style="`
                    ${
                      dataCarousel[+index + i].tier ? `--tag-tier: '${
                        dataCarousel[+index + i].tier===1 ? 'bronze' :
                        dataCarousel[+index + i].tier===2 ? 'silver' :
                        dataCarousel[+index + i].tier===3 ? 'gold' :
                        dataCarousel[+index + i].tier===4 ? 'platinum' :
                        dataCarousel[+index + i].tier===5 ? 'diamond' :
                        dataCarousel[+index + i].tier===6 ? 'uranium' : 'user'
                      }'
                      `: ''
                    };
                    ${dataCarousel[+index + i].state ? `--tag-state: '${dataCarousel[+index + i].state}'` : ''}`
                  ">
                  <template #placeholder>
                    <v-skeleton-loader type="card" />
                  </template>
                </v-img>

                <div class="container-content tcenter">
                  <v-avatar style="border: 2px solid #fff">
                    <v-img :src="dataCarousel[+index + i].avatar" :alt="`${dataCarousel[+index + i].artist} image`" transition="fade-transition">
                      <template #placeholder>
                        <v-skeleton-loader type="avatar" />
                      </template>
                    </v-img>
                  </v-avatar>
                  <a>{{dataCarousel[+index + i].name}}</a>
                  <p>{{dataCarousel[+index + i].desc}}</p>

                  <div class="center bold" style="gap: 6.4px">
                    <span class="floor" style="--c: var(--accent)">Floor Price: 250.00</span>
                    <img src="@/assets/sources/logos/near-orange.svg" alt="near" style="--w:0.9375em">
                  </div>
                </div>
              </v-card>
            </template>
          </template>
        </v-carousel-item>
      </template>
      
      <template #prev="{on, attrs}">
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
    </v-carousel>

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
        <span>Total Artists</span>
        <span>{{dataProfits.artists}}</span>
      </v-sheet>
      <v-sheet color="transparent" class="divcol center">
        <span>All Collections</span>
        <span>{{dataProfits.collections}}</span>
      </v-sheet>
      <v-sheet color="transparent" class="divcol center">
        <span>All Time High</span>
        <span>$ {{dataProfits.high}}K</span>
      </v-sheet>
    </section>

    <Filters
      :search="search"
      :filter-a="filterA.list"
      :filter-b="filterB.list"
      @search="(model) => search = model"
      @filterA="(model) => filterA.model = model"
      @filterB="(model) => filterB.model = model"
    />

    <div class="separator" />

    <section class="container-listed grid">
      <v-card
        v-for="(item,i) in dataListed_pagination" :key="i" class="card divcol custome"
        :class="{
          uranium: item.tier===6,
          diamond: item.tier===5,
          platinum: item.tier===4,
          gold: item.tier===3,
          silver: item.tier===2,
          bronze: item.tier===1,
        }"
        @click="$store.dispatch('goTo', {key: 'collection', item})">
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
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'
const pageName = 'marketplace';

export default {
  name: "CollectionsPage",
  mixins: [computeds],
  data() {
    return {
      modelCarousel: 0,
      dataCarousel: [
        {
          img: require('~/assets/sources/images/img-listed-1.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°1",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          state: "live",
        },
        {
          img: require('~/assets/sources/images/img-listed-2.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°2",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          state: "sold out",
        },
        {
          img: require('~/assets/sources/images/img-listed-3.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°3",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          state: "comming soon",
        },
        {
          img: require('~/assets/sources/images/img-listed-4.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°4",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          state: "live",
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          state: "sold out",
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          state: "sold out",
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          state: "sold out",
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          state: "sold out",
        },
      ],
      dataProfits: {
        nfts: 7659,
        owners: 1256,
        artists: 1206,
        collections: 205,
        high: 120.45,
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
      dataListed: [
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          editions: "250.00",
          tier: 3,
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          editions: "250.00",
          tier: 2,
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          editions: "250.00",
          tier: 4,
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          editions: "250.00",
          tier: 5,
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          editions: "250.00",
          tier: 6,
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "collection",
          editions: "250.00",
          tier: 1,
        },
      ],
      currentPage: 1,
      itemsPerPage: 10,
    }
  },
  head() {
    const title = "Marketplace"
    return {
      title,
    }
  },
  computed: {
    dataListed_pagination() {
      return this.$store.getters.pagination({
        items: this.dataListed, currentPage: this.currentPage, itemsPerPage: this.itemsPerPage,
        search: this.search, filterA: this.filterA.model
      })
    },
    pagination_per_page() {
      return Math.ceil(this.dataListed.length / this.itemsPerPage)
    }
  },
  created() {
    if (this.user.tier >= 3) {this.$router.push(this.localePath("/marketplace-vip"))}
  },
  mounted() {
    this.styles();
    
    // resize listener
    window.addEventListener('resize', this.styles);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.styles);
  },
  methods: {
    styles() {
      const page = document.querySelector(`#${pageName}`);
      // height h2
      document.querySelectorAll('h2.Title').forEach(h2 => {
        page.style.setProperty('--h-title', `${h2.getBoundingClientRect().height}px`)
      });
      // reload carousel
      const reload = this.modelCarousel;
      this.modelCarousel = -1;
      this.modelCarousel = reload;
    },
    columnsCarousel() {
      if (window.innerWidth >= 1600) {
        return 5
      } else if (window.innerWidth >= 1345) {
        return 4
      } else if (window.innerWidth >= 1000) {
        return 3
      } else if (window.innerWidth >= 500) {
        return 2
      } else {
        return 1
      }
    },
  }
};
</script>

<style src="~/assets/styles/pages/marketplace.scss" lang="scss" />
