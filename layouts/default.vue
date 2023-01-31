<template>
  <v-app
    id="layout" class="relative" :style="$route.path==='/about'?'overflow:hidden':''"
    :class="{
      vip: $route.path.includes('-vip'),
      uranium: user.tier === 6,
      diamond: user.tier === 5,
      platinum: user.tier === 4,
      gold: user.tier === 3,
      silver: user.tier === 2,
      bronze: user.tier === 1,
      variant: $route.path === '/artist-details',
    }">
    <ModalsAlertEmergent ref="alerts"></ModalsAlertEmergent>
    <ModalsConnect ref="connect"></ModalsConnect>
    <ModalsVerifyDiscord ref="verify-discord"></ModalsVerifyDiscord>
    <Navbar ref="navbar" />
    
    <v-main :class="wrapperSpace?'with':'without'" class="parent">
      <nuxt-child />
    </v-main>
    <Footer ref="footer"></Footer>
  </v-app>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "DefaultLayout",
  mixins: [computeds],
  // middleware: ['authenticated'],
  data() {
    return {
      wrapperSpace: true,
    }
  },
  created() {
    // get data profile
    this.$store.dispatch("getData");
  },
  mounted() {
    this.footerHeightListener();
    
    // resize listener
    window.addEventListener("resize", this.footerHeightListener);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.footerHeightListener);
  },
  methods: {
    footerHeightListener() {
      setTimeout(() => {
        const footer = document.querySelector('#footer');
        document.documentElement.style.setProperty(
          '--h-footer', `${footer.getBoundingClientRect().height}px`
        );
      }, 400);
    },
  }
}
</script>

<style src="~/assets/styles/layouts/default.scss" lang="scss" />
