<template>
  <div
    id="nft-details" class="divcol vip"
    :class="{
      uranium: nft.tier===6,
      diamond: nft.tier===5,
      platinum: nft.tier===4,
      gold: nft.tier===3,
      silver: nft.tier===2,
      bronze: nft.tier===1,
    }">
    <ModalsNftDetails ref="modal"></ModalsNftDetails>
    
    <section class="header grid">
      <v-img :src="nft.img" class="header-background" transition="fade-transition">
        <template #default>
          <div class="center gap1 alignl">
            <v-avatar style="border: 2px solid #fff">
              <v-img :src="nft.avatar" alt="artist image" transition="fade-transition">
                <template #placeholder>
                  <v-skeleton-loader type="avatar" />
                </template>
              </v-img>
            </v-avatar>
            <span class="h9_em">Artist Name</span>
          </div>
        </template>
        <template #placeholder>
          <v-skeleton-loader type="card" />
        </template>
      </v-img>

      <article class="card divcol" style="gap: 30px">
        <div class="divcol gap1">
          <v-btn class="tag btn" style="--fs: 1.05em">{{
            nft.tier===1 ? 'bronze' :
            nft.tier===2 ? 'silver' :
            nft.tier===3 ? 'gold' :
            nft.tier===4 ? 'platinum' :
            nft.tier===5 ? 'diamond' :
            nft.tier===6 ? 'uranium' : 'user'
          }}</v-btn>

          <h2 class="p tup">Name of the NFT artist or collection</h2>
        </div>

        <span>Name of the artist</span>

        <p class="p">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna 
          aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip 
          ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore 
          eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue 
          duis dolore te feugait nulla
        </p>

        <div class="spacea">
          <span class="bold" style="--c:var(--accent)">Price</span>
          <div class="divcol aend" style="gap: .5em">
            <span class="bold" style="--c: var(--accent)">{{nft.floor_price}}
              <img src="~/assets/sources/logos/near-orange.svg" alt="near" style="--w: .9em">
            </span>
            <span style="font-size: calc(var(--font-text) / 1.2)">$ {{dollarConversion(nft.floor_price)}}</span>
          </div>
        </div>

        <div class="center gap2 wrap bold">
          <v-btn
            :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 14px; --bg: #fff; --c: var(--primary)"
            @click="$refs.modal.modalSell = true">sell</v-btn>
          <v-btn
            :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 14px"
            @click="$refs.modal.modalRedemption = true">Redeem</v-btn>
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
      <v-sheet color="transparent" class="divcol center">
        <span>Tickets Sold</span>
        <span>{{dataProfits.tickets_sold}}</span>
      </v-sheet>
      <v-sheet color="transparent" class="divcol center">
        <span>Lorem Ipsum</span>
        <span>{{dataProfits.lorem_ipsum}}</span>
      </v-sheet>
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
          <span>{{item.seller}}</span>
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
      
      <template #[`item.buy`]>
        <v-btn
          :ripple="false" class="btn activeBtn bold" style="--min-w: 112px; --w: min(100%, 8em); --fs: 14px"
          @click="$refs.modal.modalBuy = true">Buy</v-btn>
      </template>
      
      <template #[`item.offer`]>
        <v-btn
          :ripple="false" class="btn activeBtn bold" style="--min-w: 112px; --w: min(100%, 8em); --fs: 14px; --bg: #fff; --c: var(--primary)"
          @click="$refs.modal.modalOffer = true"
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
import computeds from '~/mixins/computeds'

export default {
  name: "CollectionDetailsPage",
  mixins: [computeds],
  data() {
    return {
      dataSocial: [
        { icon: "mdi-instagram", link: "#" },
        { icon: "mdi-twitter", link: "#" },
        { icon: "mdi-facebook", link: "#" },
        { icon: "discord", link: "#" },
      ],
      dataProfits: {
        total_tickets: 125,
        owners: 85,
        price: 520.00 ,
        tickets_sold: 100,
        lorem_ipsum: 205,
      },
      tableHeaders: [
        { value: "number", text: "edition number", align: "center" },
        { value: "vault", text: "vault item", align: "center", sortable: false },
        { value: "seller", text: "seller", align: "center", sortable: false },
        { value: "price", text: "price", align: "center" },
        { value: "buy", align: "center", sortable: false },
        { value: "offer", align: "center", sortable: false },
      ],
      tableItems: [
        {
          number: "#1",
          vault: true,
          seller: "tonystark.near",
          seller_avatar: require("~/assets/sources/avatars/avatar.png"),
          price: "174",
        },
        {
          number: "#123",
          vault: false,
          seller: "tonystark.near",
          seller_avatar: require("~/assets/sources/avatars/avatar.png"),
          price: "174",
        },
        {
          number: "#123",
          vault: false,
          seller: "tonystark.near",
          seller_avatar: require("~/assets/sources/avatars/avatar.png"),
        },
      ],
      currentPage: 1,
      itemsPerPage: 10,
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
    if (this.user.tier < 3) {this.$router.push(this.localePath("/user-nft-details"))}
  },
  mounted() {
  },
  methods: {
    dollarConversion(price) {
      return (Number(price) * this.priceNear).toFixed(2)
    },
  }
};
</script>

<style src="~/assets/styles/pages/nft-details.scss" lang="scss" />
