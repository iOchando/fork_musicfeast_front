import html2canvas from 'html2canvas';

export const state = () => ({
  theme: "dark",
  overlay: { opacity: 0.2, color: "black" },
  dataUser: {
    banner: undefined,
    avatar: undefined,
    accountId: undefined,
    accountName: undefined,
    username: undefined,
    email: undefined,
    discord: undefined,
    instagram: undefined,
    twitter: undefined,
    telegram: undefined,
    tier: 1,
    balance: 0,
    dataSocial: [],
  },
  buyDirect: null
});

export const mutations = {
  switchTheme(state, theme) {
    // theme
    state.theme = theme
    localStorage.setItem("theme", theme)
    document.documentElement.className = theme;
    // overlay
    if (theme === "light") { state.overlay.opacity = 0.2; state.overlay.color = "white" }
    else { state.overlay.opacity = 0.5; state.overlay.color = "black" }
  },
  setData(state, data) {
    const user = window.$nuxt.$ramper.getUser()
    let accountName
    if (user) {
      if (user.email) {
        accountName = user.email
      } else {
        accountName = user.wallets.near.publicKey
      }
    }
    
    if (window.$nuxt.$ramper.getUser() && typeof data === 'string') {
      state.dataUser.avatar = require('~/assets/sources/avatars/avatar.png');
      state.dataUser.accountId = data;
      state.dataUser.accountName = accountName;
    } else if (window.$nuxt.$ramper.getUser() && typeof data === 'object') {
      state.dataUser.accountId = data.wallet;
      state.dataUser.accountName = accountName;
      state.dataUser.banner = data.banner ? this.$axios.defaults.baseURL+data.banner : undefined;
      state.dataUser.avatar = data.avatar ? this.$axios.defaults.baseURL+data.avatar : require('~/assets/sources/avatars/avatar.png');
      state.dataUser.username = data.username || data.wallet;
      state.dataUser.email = data.email;
      state.dataUser.bio = data.bio;
      // find socials
      const arrSocials = Object.entries(data).filter(arr =>
        arr[0] === 'telegram' && arr[1] || arr[0] === 'discord' && arr[1]
        || arr[0] === 'instagram' && arr[1] || arr[0] === 'twitter' && arr[1]
      )
      // set data socials
      for (let [keys, values] of arrSocials) {
        // properties <--
        state.dataUser[keys] = values
        
        // icons <--
        if (keys === "telegram") {
          // telegram
          values = `https://t.me/${values}`
        } else if (keys === "discord") {
          // discord
          values = `https://discord.com/channels/${values}`
        } else if (keys === "instagram") {
          // instagram
          keys = 'mdi-instagram'
          values = `https://instagram.com/${values}`
        } else if (keys === "twitter") {
          // twitter
          keys = 'mdi-twitter'
          values = `https://twitter.com/${values}`
        } else if (keys === "facebook") {
          values = `https://www.facebook.com/${values}`
        }
        // push data socials
        state.dataUser.dataSocial.push({ icon: keys, link: values })
      }
    };
  },
  async signIn(state, key) {
    const nearWallet = "https://wallet.testnet.near.org"
    const myNearWallet = "https://testnet.mynearwallet.com"
    if (key === 'ramper') {
      const login = await window.$nuxt.$ramper.signIn()
      if (login) {
        if (login.user) {
          // this.$router.go()
          location.reload()
        }
      }
    }
    else if (key === 'myNear') {
      localStorage.setItem("walletUrl", myNearWallet)
      window.$nuxt.$wallet._walletBaseUrl = myNearWallet
      window.$nuxt.$wallet.requestSignIn(
        'nft7.musicfeast.testnet',
        location.href,
        location.href,
        location.href,
      );
    } else if (key === 'near') {
      localStorage.setItem("walletUrl", nearWallet)
      window.$nuxt.$wallet._walletBaseUrl = nearWallet
      window.$nuxt.$wallet.requestSignIn(
        'nft7.musicfeast.testnet',
        location.href,
        location.href,
        location.href,
      );
    }
  },
  signOut() {
    window.$nuxt.$ramper.signOut();
    setTimeout(() => this.$router.go(0), 100);
    this.$router.push(this.localePath('/'));
  },
  priceNEAR(state, key){
    this.$axios.get("https://api.binance.com/api/v3/ticker/24hr?symbol=NEARUSDT")
      .then((response) => {
        if (response.data) {
          localStorage.priceNear = response.data.lastPrice
        }
      })
      .catch((e) => {
        console.log(e)
      })
  },
  async sendTransactionRamper() {
    const actions2 = [window.$nuxt.$ramper.functionCall(
      "nft_buy",       
      {
        token_series_id: "1|1", 
        receiver_id: "c9ec2aeeaaba6154ac224ebfa27d50615d1d0699ce539d1ea4da7136b8f350de",
      }, 
      '300000000000000', 
      '1500000000000000000000000'
    )]
    const res = await window.$nuxt.$ramper.sendTransaction({
      transactionActions: [
        {
          receiverId: 'nft7.musicfeast.testnet',
          actions: actions2,
        },
      ],
      network: 'testnet',
    })
    console.log("Transaction Result: ", res)
  }
};

export const actions = {
  modalConnect() {
    const layout = this.$router.app.$children.find(data=>data.$el === document.getElementById("layout"));
    layout.$refs.connect.modalConnect = true
  },
  getData({state, commit}) {
    try {
      const user = window.$nuxt.$ramper.getUser()
      // get data user
      this.$axios.post(`${this.$axios.defaults.baseURL}api/v1/get-perfil-data/`, { "wallet": user ? user.wallets.near.publicKey : "" })
      .then(result => {
        // set data profile
        result.data[0] ? commit("setData", result.data[0]) : commit("setData", user ? user.wallets.near.publicKey : "");
      // catch error django
      }).catch(err => {
        console.error(err);
        // this.$alert("cancel", {desc: err.message})
      })
    // catch error near
    } catch (err) {
      console.error(err);
      // this.$alert("cancel", {desc: err.message})
    }
  },
  goTo({commit, state}, {key, item, event, buyDirect}) { if (key === 'nft' || key === 'user-nft') {
      const target = event.target.parentNode.parentNode
      this.$loadCursor(true);
      // html2canvas(target, { allowTaint: true, backgroundColor: "#000" }).then((data) => {
      html2canvas(target, { backgroundColor: "#000" }).then((data) => {
        const canvas = data.toDataURL('image/png')
        item.canvas = canvas
        localStorage.setItem(key, JSON.stringify(item))
        this.$loadCursor(false);
      }).then(() => {
        if (buyDirect) {
          localStorage.buyDirect = true
        }
        this.$router.push(
          this.localePath(key === 'nft'
            ? `/nft-details`
            : state.dataUser.tier < 3
            ? `/user-nft-details`
            : `/user-nft-details-vip`
          )
        );
      }).catch(err => {
        // this.$alert("cancel", {desc: err.message})
        this.$loadCursor(false)
        console.error(err);
      })
    } else {
      console.log(item)
      if (key === 'artist') {
        localStorage.setItem(key, JSON.stringify(item.id))
        this.$router.push(this.localePath(`/${key}-details`));
      } else {
        localStorage.setItem(key, JSON.stringify(item))
        this.$router.push(this.localePath(`/${key}-details`));
      }
    }
  },
};

export const getters = {
  pagination: () => ({items, currentPage, itemsPerPage, search, filterA, filterB}) => {
    let filters = [...items]

    // search
    if (search) filters = filters.filter(data => (data.name.toLowerCase()).includes(search.toLowerCase()))
    // filter A (tier)
    if (filterA) filters = filters.filter(data => data.tier === filterA)
    // filter B (comming)
    if (filterB === 'comming soon') filters = filters.filter(data => data.comming)
    else if (filterB === 'lastest releases') filters = filters.sort((a, b) => {
      const sortA = a.created.toUpperCase();
      const sortB = b.created.toUpperCase();
      if (sortA > sortB) {
        return -1;
      }
      if (sortA < sortB) {
        return 1;
      }
      return 0;
    })
    else if (filterB === 'oldest') filters = filters.sort((a, b) => {
      const sortA = a.created.toUpperCase();
      const sortB = b.created.toUpperCase();
      if (sortA < sortB) {
        return -1;
      }
      if (sortA > sortB) {
        return 1;
      }
      return 0;
    })

    // console.log(filters.map(e => e.name), filters.map(e => e.created))   for test filter B

    // if mobile
    if (window.innerWidth <= 880) itemsPerPage = itemsPerPage / 2;

    return filters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  }
};

export const modules = {
};
