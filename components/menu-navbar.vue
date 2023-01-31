<template>
  <div id="menuNavbar">
    <!-- drawer -->
    <v-navigation-drawer
      id="drawer-toggle"
      v-model="drawer"
      height="100%"
      fixed left
      temporary
      :overlay-opacity="$store.state.overlay.opacity"
      :overlay-color="$store.state.overlay.color"
      class="font2"
    >
      <section class="v-navigation-drawer__content--header divcol center gap2">
        <v-btn icon class="close" style="--top: 8px; --right: 8px" @click="drawer=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <a class="center" @click="$router.push(localePath('/')); $scrollTo('home')">
          <img src="~/assets/sources/logos/logo.svg" alt="logo" style="--w: 8em">
        </a>
        <v-btn
          v-if="!isLogged"
          class="btn activeBtn"
          style="--w:75%; --min-h: 30px; --p: .5em 2em"
          :ripple="false" @click="$parent.$parent.$parent.$refs.connect.modalConnect = true">Log In</v-btn>

        <v-menu v-else v-model="menuProfile" bottom offset-y :close-on-content-click="false"> 
          <template #activator="{ on, attrs}">
            <v-btn
              class="btn activeBtn"
              style="--w:75%; --min-h: 30px; --p: .5em"
              :ripple="false"
              v-bind="attrs"
              v-on="on">{{user.username || account}}
              <v-icon size="2em">mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <!-- menu profile -->
          <v-list id="menuProfile" class="divcol" color="hsl(0, 84%, 60%)">
            <!-- info profile content -->
            <v-list-item disabled class="divcol" style="gap:3px">
              <div class="space gap1 fill_w">
                <span class="bold">NEAR</span>
                <span class="semibold" style="--c:var(--accent)">{{balanceNear}} N</span>
              </div>
              
              <!-- <div class="space gap1 fill_w">
                <span class="bold">MF</span>
                <span class="semibold" style="--c:var(--accent)">234.72 MF</span>
              </div> -->
            </v-list-item>

            <v-list-item
              :ripple="false"
              @click="$ramper.openWallet()">
              <v-list-item-title class="tcap" :class="{not_transform: false}">
                Open Wallet
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item
              v-for="(item,i) in $parent.dataMenuProfile" :key="i" :disabled="item.to === '/marketplace-vip' && user.tier < 3 ? true : false"
              :ripple="false" :class="{active: item.to === $route.path}"
              @click="menuProfile = false; drawer = false; $router.push(localePath(item.to))">
              <v-list-item-title class="tcap" :class="{not_transform: item.to === '/marketplace-vip'}">
                {{item.title}}
                <v-chip
                  v-show="item.to === '/marketplace-vip'" style="margin-left: 5px; border-radius: 5px"
                  :color="user.tier >= 3 ? '#26A17B' : 'var(--error)'">{{user.tier >= 3 ? 'Activated' : 'disabled'}}</v-chip>
              </v-list-item-title>
            </v-list-item>

            <!-- button logout -->
            <v-btn
              :ripple="false"
              class="btn activeBtn bold"
              style="--fs: 15px;--w:calc(100% - (1em * 2)); margin: 1em"
              @click="$store.commit('signOut'); menuProfile = false; drawer = false">Log out</v-btn>

            <span v-show="user.tier !== 0" class="tag">{{
              user.tier===1 ? 'bronze' :
              user.tier===2 ? 'silver' :
              user.tier===3 ? 'gold' :
              user.tier===4 ? 'platinum' :
              user.tier===5 ? 'diamond' :
              user.tier===6 ? 'uranium' : 'user'
            }}</span>
          </v-list>
        </v-menu>
      </section>

      <section class="v-navigation-drawer__content--content divcol jspace gap2">
        <v-list class="fill_w">
          <v-list-item
            v-for="(item,i) in $parent.dataNavbar" :key="i" :ripple="false" link :class="{active: item.to === $route.path}"
            @click="drawer = false; $router.push(localePath(item.to))">
            <v-list-item-title class="conttitle acenter gap1 h10_em">
              <span style="max-width: max-content" class="tcap">
                {{ item.name }}
              </span>
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <section class="v-navigation-drawer__content--footer divcol center gap1">
          <span class="h10_em">Join us on:</span>

          <div class="center gap2">
            <v-btn v-for="(item,i) in dataSocial" :key="i" icon :href="item.url" target="_blank">
              <v-icon>{{item.icon}}</v-icon>
            </v-btn>
          </div>
        </section>
      </section>
    </v-navigation-drawer>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "NavbarMenuComponent",
  mixins: [computeds],
  data() {
    return {
      balanceNear: 0,
      messages: 1,
      drawer: false,
      menuProfile: false,
      dataSocial: [
        { icon:"mdi-instagram", url:"#" },
        { icon:"mdi-twitter", url:"#" },
        { icon:"mdi-facebook", url:"#" },
        { icon:"discord", url:"#" }
      ],
    };
  },
  // created() {
  //   const theme = localStorage.getItem("theme");
  //   this.overlayMethod(theme);
  // },
  mounted() {
    this.$store.commit('priceNEAR')
    const queryString = window.location.search; // tomo mi url
    const urlParams = new URLSearchParams(queryString); // tomo los paramtros de url

    if (urlParams.get("account_id") !== null && urlParams.get("all_keys") !== null) {
      localStorage.setItem("ramper_loggedInUser", JSON.stringify({
        UID: "near_wallet",
        signupSource: "near_wallet",
        wallets: {
          near: {
            blockchain: "near",
            creationDate: "",
            provider: "near_wallet",
            publicKey: urlParams.get("account_id"),
            walletId: urlParams.get("all_keys")
          }
        }
      }))
      history.replaceState(null, location.href.split("?")[0], window.location.pathname);
      location.reload()
    }
    const act = this.$ramper.getAccountId()

    if (act) {
      this.account = act.substring(0, 20) + "..."
    }

    this.getBalance()
    // this.isScrollTop();
    // window.onscroll = () => this.isScrollTop();
    // set route push to marketplace
  },
  methods: {
    async getBalance () {
      if (this.$ramper.getUser()) {
        const account = await this.$near.account(this.$ramper.getAccountId());
        const response = await account.state();
        const valueStorage = Math.pow(10, 19)
        const valueYocto = Math.pow(10, 24)

        const storage = (response.storage_usage * valueStorage) / valueYocto 
        this.balanceNear = ((response.amount / valueYocto) - storage).toFixed(2)
      }
    },
    // isScrollTop() {
    //   if (this.$route.path === this.localePath('/') {
    //     this.dataDrawer.forEach(e => {
    //       const sections = e.key === 'home' ? document.getElementById('hero') : document.getElementById(e.key);
    //       if (sections) {
    //         const positionsTop = sections.getBoundingClientRect().top + window.scrollY;
    //         const positionsBottom = sections.getBoundingClientRect().bottom + window.scrollY;
    //         const scroll = document.documentElement.scrollTop;
    //         if (scroll >= positionsTop && scroll <= positionsBottom) {
    //           this.dataDrawer.forEach(e => {e.active = false})
    //           this.dataDrawer.find(data => data.key === e.key).active = true
    //         }
    //       }
    //     });
    //   } else {
    //     this.dataDrawer.forEach(e => {e.active = false})
    //   }
    // },
  },
};
</script>

<style src="~/assets/styles/components/navbar.scss" lang="scss" />
