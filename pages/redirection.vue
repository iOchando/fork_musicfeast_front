<template>
  <div id="redirection" class="divcol tcenter center" style="gap:2.8em">
    <template v-if="transaction_data">
      <div class="divcol">
        <v-icon size="80px" :color="transaction_data.state === 'cancel' ? 'var(--error)' : 'var(--success)'">
          mdi-{{transaction_data.state === 'success' ? 'check' : 'close'}}-circle
        </v-icon>
        <h3>{{transaction_data.title}}</h3>
        <p class="p">{{transaction_data.desc}}</p>
        <p v-if="transaction_data.desc2" class="p">{{transaction_data.desc2}}</p>
      </div>

      <div class="space" style="gap: 20px">
        <v-btn v-if="transaction_data.state === 'success'" class="btn activeBtn" :ripple="false" @click="$router.push(localePath('/'))">
          Home
        </v-btn>

        <v-btn v-if="transaction_data.state === 'success'" class="btn activeBtn" :ripple="false" @click="$router.push(localePath('/profile'))">
          Profile
        </v-btn>

        <v-btn v-if="transaction_data.state === 'success' && transaction_data.burn !== true" class="btn activeBtn" :ripple="false" @click="$router.push(localePath('/artist-details'))">
          Artist Page
        </v-btn>

        <v-btn v-if="transaction_data.state !== 'success'" class="btn activeBtn" :ripple="false" @click="$router.go(-1)">
          Go back
        </v-btn>
      </div>

      <a class="center" style="gap: 5px; --c: #b9b9b9" :href="'https://explorer.testnet.near.org/transactions/' + transaction_data.hash" target="_blank">
        See Transaction <v-icon size="1.1em">mdi-open-in-new</v-icon>
      </a>
    </template>


    <div v-else>
      <h3>No data Available</h3>
      <v-btn
        class="btn activeBtn" :ripple="false" style="--fs: 18px; --h: 46px; --w: 120px"
        @click="$router.go(-1)">
        Go back
      </v-btn>
    </div>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "RedirectionPage",
  mixins: [computeds],
  data() {
    return {
      transaction_data: null
    }
  },
  head() {
    // const title = this.transaction_data.state === 'success' ? 'success transaction' : 'error transaction';
    const title = 'Result'
    return {
      title,
    }
  },
  // computed: {
  //   transaction_data() {
  //     return JSON.parse(localStorage.getItem("transaction_data"))
  //   }
  // },
  created() {
    
  },
  mounted() {
    this.transaction_data = JSON.parse(localStorage.getItem("transaction_data"))
    console.log("REDI",this.transaction_data)
    if (!this.transaction_data) {
      this.$router.push(this.localePath('/'))
    }
    localStorage.removeItem("transaction_data")
    
  },
  methods: {
  }
};
</script>

<style lang="scss">
#redirection {
  height: calc(100vh - var(--h-navbar));
}
</style>
