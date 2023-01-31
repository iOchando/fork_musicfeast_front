<template>
  <div id="event" class="divcol">
    <section class="header grid">
      <v-img :src="event.img" class="header-background" transition="fade-transition">
        <template #default>
          <div class="center gap1 alignl">
            <v-avatar style="border: 2px solid #fff">
              <v-img :src="event.artist_data.image || require('~/assets/sources/avatars/avatar.png')" alt="artist image" transition="fade-transition">
                <template #placeholder>
                  <v-skeleton-loader type="avatar" />
                </template>
              </v-img>
            </v-avatar>
            <span class="h9_em">{{event.artist_data.name}}</span>
          </div>
        </template>
        <template #placeholder>
          <v-skeleton-loader type="card" />
        </template>
      </v-img>

      <article class="card divcol" style="gap: 30px">
        <div class="divcol gap1">
          <div class="space gap1">
            <v-btn class="btn" style="--fs: 1.05em">sold out</v-btn>

            <div class="center deletemobile" style="gap: .2em">
              <v-btn v-for="(item,i) in dataSocial" :key="i" icon :href="item.link">
                <v-icon v-if="item.link">{{item.icon}}</v-icon>
              </v-btn>
            </div>
          </div>

          <h2 class="p tup">{{event.name}}</h2>
        </div>

        <span>{{event.artist_data.name}}</span>

        <!-- <p>
          {{event.description}}
        </p> -->

        <p class="p" v-html="event.description" />

        <v-btn :ripple="false" class="btn activeBtn align" style="--w: min(100%, 10em); --fs: 12.8px">Buy</v-btn>

        <div class="center showmobile" style="gap: .2em">
          <v-btn v-for="(item,i) in dataSocial" :key="i" icon :href="item.link">
            <v-icon>{{item.icon}}</v-icon>
          </v-btn>
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
      <!-- <v-sheet color="transparent" class="divcol center">
        <span>Lorem Ipsum</span>
        <span>{{dataProfits.lorem_ipsum}}</span>
      </v-sheet> -->
    </section>

    <h2 id="title">{{convertDate(event.date_event)}}  -  {{event.location_event}}</h2>

    <section class="container-desc grid">
      <article class="card">
        <h3 class="tup">{{event.location_name}}</h3>
        <!-- <p class="p">
          {{event.location_desc}}
        </p> -->
        <p class="p" v-html="event.location_desc" />
      </article>
      <v-img class="map">
        <template #default>
          <iframe
            id="gmap_canvas"
            transition="fade-transition"
            width="100%"
            height="100%"
            src="https://maps.google.com/maps?
              q=2880%20Broadway,%20New%20York
              &t=
              &z=13
              &ie=UTF8
              &iwloc=
              &output=embed
            "
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
          <v-btn
            :ripple="false"
            class="btn bold activeBtn"
            href="https://maps.google.com/maps?ll=40.6892494,-74.0445004&amp;z=13&amp;t=m&amp;hl=es-ES&amp;gl=US&amp;mapclient=embed&amp;q=2880%20Broadway%20New%20York%2C%20NY%2010025%20EE.%20UU."
            target="_blank"
          >open maps</v-btn>
        </template>
        <template #placeholder>
          <v-skeleton-loader type="card" />
        </template>
      </v-img>
    </section>

    <h2 class="Title tup">tickets available</h2>

    <v-carousel
      id="custome-carousel"
      v-model="modelCarousel"
      height="max-content"
      hide-delimiters
      :show-arrows="false"
    >
      <template v-for="(item, index) in dataCarousel">
        <v-carousel-item v-if="(index + 1) % columnsCarousel() === 1 || columnsCarousel() === 1" :key="index">
          <template v-for="(n,i) in columnsCarousel()">
            <template v-if="(+index + i) < dataCarousel.length">
              <v-sheet :key="i" color="transparent" class="divcol gap1">
                <v-card
                  class="card divcol custome"
                  :class="{
                    uranium: dataCarousel[+index + i].tier===6,
                    diamond: dataCarousel[+index + i].tier===5,
                    platinum: dataCarousel[+index + i].tier===4,
                    gold: dataCarousel[+index + i].tier===3,
                    silver: dataCarousel[+index + i].tier===2,
                    bronze: dataCarousel[+index + i].tier===1,
                  }">
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

                    <div class="center" style="gap: 6.4px">
                      <span class="floor" style="--c: var(--accent)">Floor Price: {{dataCarousel[+index + i].floor_price}}</span>
                      <img src="@/assets/sources/logos/near-orange.svg" alt="near" style="--w:0.9375em">
                    </div>
                    <span class="floor" style="--c: var(--accent)">Editions: {{dataCarousel[+index + i].editions}}</span>
                  </div>
                </v-card>

                <v-btn :ripple="false" class="btn activeBtn align" style="--fs: 17.6px; --w: 85%" :disabled="dataCarousel[+index + i].state === 'sold out'" @click="buyNftRamper(dataCarousel[+index + i])">Buy</v-btn>
              </v-sheet>
            </template>
          </template>
        </v-carousel-item>
      </template>
    </v-carousel>

    <Pagination
      :total-pages="pagination_per_page"
      :current-page="modelCarousel+1"
      @pagechanged="(page) => modelCarousel = page-1"
    />
  </div>
</template>

<script>
import moment from 'moment'
import gql from 'graphql-tag'
import computeds from '~/mixins/computeds'
const pageName = 'event';

export default {
  name: "EventPage",
  mixins: [computeds],
  data() {
    return {
      dataSocial: [
        // { icon: "mdi-instagram", link: null },
        // { icon: "mdi-twitter", link: null },
        // { icon: "mdi-facebook", link: null },
        // { icon: "discord", link: "#" },
      ],
      dataProfits: {
        total_tickets: "---",
        owners: "---",
        price: "---" ,
        tickets_sold: "---",
      },
      modelCarousel: 0,
      dataCarousel: [
        // {
        //   img: require('~/assets/sources/images/img-listed-5.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°5",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   editions: "250.00",
        //   tier: 3,
        //   state: "sold out",
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-5.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°5",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   editions: "250.00",
        //   tier: 2,
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-5.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°5",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   editions: "250.00",
        //   tier: 4,
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-5.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°5",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   editions: "250.00",
        //   tier: 5,
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-5.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°5",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   editions: "250.00",
        //   tier: 6,
        //   state: "sold out",
        // },
        // {
        //   img: require('~/assets/sources/images/img-listed-5.jpg'),
        //   avatar: require("~/assets/sources/avatars/avatar.png"),
        //   name: "Artist Name o Collection  n°5",
        //   desc: "Lorem ipsum dolor sit amet,",
        //   floor_price: "250.00",
        //   editions: "250.00",
        //   tier: 1,
        // },
      ],
    }
  },
  head() {
    const title = "Event Details"
    return {
      title,
    }
  },
  computed: {
    pagination_per_page() {
      return Math.ceil(this.dataCarousel.length / this.columnsCarousel())
    }
  },
  created() {
    if (!this.event) {this.$router.push(this.localePath('/'))}
  },
  mounted() {
    this.getSocials()
    this.getEventTickets()
    this.styles();
    
    // resize listener
    window.addEventListener('resize', this.styles);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.styles);
  },
  methods: {
    async buyNftRamper(item) {
      if (this.$ramper.getUser()) {
        const price = Number(item.floor_price) + 0.3
        const action = [this.$ramper.functionCall(
          "nft_buy",       
          {
            token_series_id: item.token_id, 
            receiver_id: this.$ramper.getAccountId(),
          }, 
          '300000000000000', 
          this.$utils.format.parseNearAmount(String(price))
        )]
        const res = await this.$ramper.sendTransaction({
          transactionActions: [
            {
              receiverId: 'nft7.musicfeast.testnet',
              actions: action,
            },
          ],
          network: 'testnet',
        })
        console.log("Transaction Result: ", res)

        if (res && JSON.parse(localStorage.getItem('ramper_loggedInUser')).signupSource === 'near_wallet') {
          localStorage.setItem("transaction_data", JSON.stringify({
            state: "success",
            title: "Success",
            desc: "Your nft has been successfully purchased, in a few minutes you will be able to see it on your profile.",
            hash: res.txHashes[0]
          }))
          this.$router.push(this.localePath('/redirection'))
        } else if (res && res.result) {
          if (res.result[0].status.SuccessValue || res.result[0].status.SuccessValue === '') {
            // this.$alert("success", {desc: "Your nft has been successfully purchased, in a few minutes you will be able to see it on your profile.", hash: res.txHashes[0]})
            localStorage.setItem("transaction_data", JSON.stringify({
              state: "success",
              title: "Success",
              desc: "Your nft has been successfully purchased, in a few minutes you will be able to see it on your profile.",
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
    getEventTickets() {
      this.$axios.post(`${this.baseUrl}api/v1/get-event-tickets/`, {"event_id": Number(this.event.id)})
        .then(response => {
          console.log("Tickets",response.data)
          if (response.data[0]) {
            const seriesArray = []
            for (let i = 0; i < response.data.length; i++) {
              seriesArray.push(response.data[i].serie_id)
            }
            this.getTicketsSeries(seriesArray)
          }
         }).catch(err => {
          // this.$alert("cancel", {desc: err.message})
          console.error(err);
        })
    },
    async getTicketsSeries(items) {
      const clientApollo = this.$apollo.provider.clients.defaultClient
      const QUERY_APOLLO = gql`
        query QUERY_APOLLO($series_ids: [String]) {
          series(where: {id_in: $series_ids}) {
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
        variables: {series_ids: items},
      })

      const data = res.data.series

      for (let i = 0; i < data.length; i++) {
        const item = {
          token_id: data[i].id,
          artist: this.event.artist_data.name,
          img: data[i].media,
          avatar: this.event.artist_data.image,
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
        } else if (item.tier === 12) {
          item.tier = 5
        }

        if (item.copies !== 0 && Number(item.supply) >= Number(item.copies)) {
          item.state = "sold out"
        }

        this.dataCarousel.push(item)
      }

      this.dataProfits.total_tickets = this.dataCarousel.length

      // dataCarousel: [
      //   {
      //     img: require('~/assets/sources/images/img-listed-5.jpg'),
      //     avatar: require("~/assets/sources/avatars/avatar.png"),
      //     name: "Artist Name o Collection  n°5",
      //     desc: "Lorem ipsum dolor sit amet,",
      //     floor_price: "250.00",
      //     editions: "250.00",
      //     tier: 3,
      //     state: "sold out",
      //   },
    },
    getSocials() {
      const datos = []
      if (this.event.link_instagram) {
        datos.push({ icon: "mdi-instagram", link: this.event.link_instagram })
      }
      if (this.event.link_twitter) {
        datos.push({ icon: "mdi-twitter", link: this.event.link_twitter })
      }
      if (this.event.link_facebook) {
        datos.push({ icon: "mdi-facebook", link: this.event.link_facebook })
      }
      this.dataSocial = datos
    },
    convertDate(item) {
      return moment(item).format('YYYY / MM / DD')
    },
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

<style src="~/assets/styles/pages/event-details.scss" lang="scss" />
