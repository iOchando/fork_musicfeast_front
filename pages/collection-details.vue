<template>
  <div id="collection-details" class="divcol">
    <v-img
      :src="profileBanner" transition="fade-transition" class="header"
      :class="{
        uranium: collection.tier===6,
        diamond: collection.tier===5,
        platinum: collection.tier===4,
        gold: collection.tier===3,
        silver: collection.tier===2,
        bronze: collection.tier===1,
      }"
      :style="`
        --tag-tier: '${
          collection.tier===1 ? 'bronze' :
          collection.tier===2 ? 'silver' :
          collection.tier===3 ? 'gold' :
          collection.tier===4 ? 'platinum' :
          collection.tier===5 ? 'diamond' :
          collection.tier===6 ? 'uranium' : 'user'
        }'
      `">
      <template #default>
        <v-avatar
          width="var(--size)" height="var(--size)" style="--size: 13.954375em"
          @mouseenter="showTag()" @mouseleave="hideTag()">
          <v-img :src="collection.avatar" alt="avatar image" transition="fade-transition">
            <template #placeholder>
              <v-skeleton-loader type="avatar" />
            </template>
          </v-img>
        </v-avatar>
      </template>
      <template #placeholder>
        <v-skeleton-loader type="card" />
      </template>
    </v-img>

    <section class="container-user">
      <aside class="container-user--social center gap1">
        <v-btn v-for="(item,i) in dataSocial" :key="i" icon :href="item.link">
          <v-icon size="clamp(2em, 2.4vw, 2.4em)">{{item.icon}}</v-icon>
        </v-btn>
      </aside>

      <h2 class="p">Name Collections #35461</h2>

      <p style="margin-block: 2em 2.5em">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam 
        erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo 
        consequat.
      </p>
      
      <section class="container-profit bold fwrap align" style="--margin-block: 0">
        <v-sheet color="transparent" class="divcol center">
          <span>Total NFTs</span>
          <span>{{dataProfits.editions}}</span>
        </v-sheet>
        <v-sheet color="transparent" class="divcol center">
          <span>Owners</span>
          <span>{{dataProfits.owners}}</span>
        </v-sheet>
        <v-sheet color="transparent" class="divcol center">
          <span>Floor Price</span>
          <span>$ {{dataProfits.floor_price}}</span>
        </v-sheet>
        <v-sheet color="transparent" class="divcol center">
          <span>Listing</span>
          <span>{{dataProfits.listing}}</span>
        </v-sheet>
        <v-sheet color="transparent" class="divcol center">
          <span>All Time High</span>
          <span>$ {{dataProfits.high}}K</span>
        </v-sheet>
      </section>
    </section>

    <h2 class="Title fwrap" style="--fb: 200px; gap: 5px clamp(1em, 2vw, 2em)">
      <Filters
        contents
        :search="search"
        :filter-a="filterA.list"
        :filter-b="filterB.list"
        @search="(model) => search = model"
        @filterA="(model) => filterA.model = model"
        @filterB="(model) => filterB.model = model"
      />
    </h2>

    <section class="container-nfts grid">
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
          <p>{{item.desc}} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga minus aut porro laboriosam saepe dolores, perspiciatis officiis soluta impedit dolorem nesciunt consequuntur corporis explicabo itaque dolore iste quas placeat esse?</p>

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

    <h2 class="Title tup">chat</h2>

    <v-expansion-panels class="custome-expansion" style="margin-bottom: 6em">
      <v-expansion-panel v-for="(item,i) in dataChats" :key="i">
        <v-expansion-panel-header expand-icon="mdi-menu-down" class="bold">
          <div class="acenter" style="gap:.5em">
            <v-icon size="1.5em">{{item.icon}}</v-icon>
            <span class="tcap">{{item.chat}}</span>
          </div>
        </v-expansion-panel-header>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'
import styles from '~/mixins/styles'

export default {
  name: "CollectionPage",
  mixins: [computeds, styles],
  data() {
    return {
      pageName: 'collection-details',
      profileBanner: require('~/assets/sources/images/img-header-profile.jpg'),
      dataSocial: [
        { icon: "mdi-share-variant" },
      ],
      dataProfits: {
        editions: 7659,
        owners: 1256,
        floor_price: 1206,
        listing: 205,
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
      dataNfts: [
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "nft",
          editions: "250.00",
          tier: 3,
          state: "sold out",
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "nft",
          editions: "250.00",
          tier: 2,
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "nft",
          editions: "250.00",
          tier: 4,
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "nft",
          editions: "250.00",
          tier: 5,
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "nft",
          editions: "250.00",
          tier: 6,
          state: "sold out",
        },
        {
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          avatar: require("~/assets/sources/avatars/avatar.png"),
          name: "Artist Name o Collection  n°5",
          desc: "Lorem ipsum dolor sit amet,",
          floor_price: "250.00",
          type: "nft",
          editions: "250.00",
          tier: 1,
        },
      ],
      currentPage: 1,
      itemsPerPage: 10,
      dataChats: [
        { icon: "discord", chat: "discord artist name 1" },
        { icon: "discord", chat: "discord artist name 2" },
        { icon: "discord", chat: "discord artist name 3" },
      ],
    }
  },
  head() {
    const title = "Collection Details"
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
    }
  },
  created() {
    if (!this.collection) {this.$router.push(this.localePath('/marketplace'))}
  },
  methods: {
    showTag() {document.querySelector(".header").classList.add("hover")},
    hideTag() {document.querySelector(".header").classList.remove("hover")},
  }
};
</script>

<style src="~/assets/styles/pages/collection-details.scss" lang="scss" />
