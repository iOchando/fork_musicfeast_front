<template>
  <div>
    <MenuNavbar ref="menu"></MenuNavbar>
    
    <v-app-bar id="navbar" fixed class="font2 isolate" color="transparent">
      <a id="logoApp" class="center" @click="$router.push(localePath('/'))">
        <img src="~/assets/sources/logos/logo.svg" alt="logo" class="deletemobile" style="--w: 100%">
        <img src="~/assets/sources/logos/logo-mobile.svg" alt="logo" class="showmobile" style="--w: 100%">
      </a>

      <section class="center gap2 deletemobile">
        <a
          v-for="(item,i) in dataNavbar" :key="i" class="tcap"
          @click="goTo(item.to)"
          >{{item.name}}</a>
      </section>

      <section class="center">

        <!-- <v-btn
          :ripple="false"
          class="btn activeBtn deletemobile"
          style="--p: .5em clamp(1em, 3vw, 2.5em);"
          @click="$parent.$parent.$refs.connect.modalConnect = true">Connect Near</v-btn> -->
        <!-- button connect -->
        <v-btn
          v-if="!isLogged"
          :ripple="false"
          class="btn activeBtn deletemobile"
          style="--p: .5em clamp(1em, 3vw, 2.5em);"
          @click="$parent.$parent.$refs.connect.modalConnect = true">Log In</v-btn>
        
        <v-menu v-else v-model="menuProfile" bottom offset-y :close-on-content-click="false">
          <template #activator="{ on, attrs }">
            <!-- button profile -->
            <v-btn
              :ripple="false"
              class="btn activeBtn deletemobile"
              style="--p: .5em; --tt-first: none" v-bind="attrs" v-on="on">
              <span class="tlow">{{user.username || account}}</span>
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

            <!-- <v-list-item
              v-if="user.username == 'juanochando'"
              :ripple="false"
              @click="$store.commit('sendTransactionRamper')">
              <v-list-item-title class="tcap" :class="{not_transform: false}">
                Buy Nft
              </v-list-item-title>
            </v-list-item> -->
            
            <v-list-item
              v-for="(item,i) in dataMenuProfile" :key="i" :disabled="false && user.tier < 3 ? true : false"
              :ripple="false" :class="{active: item.to === $route.path}"
              @click="menuProfile = false; drawer = false; $router.push(localePath(item.to))">
              <v-list-item-title class="tcap" :class="{not_transform: false}">
                {{item.title}}
                <!-- <v-chip
                  v-show="item.to === '/marketplace-vip'" style="margin-left: 5px; border-radius: 5px"
                  :color="user.tier >= 3 ? '#26A17B' : 'var(--error)'">{{user.tier >= 3 ? 'Activated' : 'disabled'}}</v-chip> -->
              </v-list-item-title>
            </v-list-item>

            <!-- button logout -->
            <v-btn
              :ripple="false"
              class="btn activeBtn bold"
              style="--fs: 15px;--w:calc(100% - (1em * 2)); margin: 1em"
              @click="$store.commit('signOut'); menuProfile = false">Log out</v-btn>

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

        <v-btn icon class="showmobile" @click="$refs.menu.drawer = true">
          <v-icon large>mdi-menu</v-icon>
        </v-btn>
      </section>
    </v-app-bar>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "NavbarComponent",
  mixins: [computeds],
  data() {
    return {
      balanceNear: 0,
      account: null,
      menuProfile: false,
      dataMenuProfile: [
        {
          title: "my profile",
          to: "/profile"
        },
        // {
        //   title: "special marketplace",
        //   to: "/marketplace-vip"
        // },
      ],
      dataNavbar: [
        { name: "home", to: "/" },
        { name: "about", to: "/about" },
        { name: "artists", to: "/artists" },
        { name: "news", to: "/news-details" },
        // { name: "marketplace", to: "" },
        { name: "contact", to: "/contact" },
      ],
    };
  },
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
    // localStorage.setItem("transaction_data", JSON.stringify({
    //   state: "success",
    //   title: "Success",
    //   desc: "Your transaction was successfull",
    //   hash: "asd1223asd1asd"
    // }))
    // this.$router.push(this.localePath('/redirection'))
    const act = this.$ramper.getAccountId()

    if (act) {
      this.account = act.substring(0, 20) + "..."
    }

    this.getBalance()

    const navbar = document.querySelector("#navbar");
    
    // tier loading data
    // this.user.tier < 3 
    // ? this.dataNavbar.find(data=>data.name==='marketplace').to = '/marketplace'
    // : this.dataNavbar.find(data=>data.name==='marketplace').to = '/marketplace-vip'

    // mobile listener scroll
    window.onscroll = () => {
      if (document.documentElement.scrollTop >= 80) {navbar.classList.add("navbar-transparent")}
      else {navbar.classList.remove("navbar-transparent")}
    }
  },
  // created() {
  //   const theme = localStorage.getItem("theme");
  //   if (theme) {
  //     setTimeout(() => {
  //       this.$store.commit("switchTheme", theme);
  //     }, 100);
  //   }
  //   if (theme === "light") {this.themeButton = true}
  //   else {this.themeButton = false}
  // },
  methods: {
    signIn(){
      this.$wallet.requestSignIn(
        'nft7.musicfeast.testnet'
      );
    },
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
    goTo(to) {
      this.$router.push(this.localePath(to))
      if (to === '/news-details') { localStorage.setItem("validator-news", "navbar") }
    }
    // changeTheme(theme) {
    //   this.$store.commit("switchTheme", theme);
    //   this.themeButton = !this.themeButton;
    // },
  },
};
</script>

<style src="~/assets/styles/components/navbar.scss" lang="scss" />
