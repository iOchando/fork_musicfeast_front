<template>
  <div id="join" class="center">
    <article class="divcol center gap2">
      <h2>Join the community</h2>
      <p class="tcentermobile">
        {{join_data}}
      </p>
      <div class="center wrap fill_w" style="gap: clamp(2em, 4vw, 4em)">
        <!-- <v-btn class="btn" style="--bg: #fff; --c: var(--primary); --w: 8.5em">Join</v-btn> -->
        <v-btn
          class="btn" style="--w: 8.5em"
          href="https://discord.com/invite/N7agx9n5" target="_blank"
          >Join</v-btn>
      </div>
    </article>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "JoinSection",
  mixins: [computeds],
  data() {
    return {
      join_data: "",
    }
  },
  mounted() {
    this.getDataSocial()
  },
  methods: {
    async getDataSocial() {
      await this.$axios.get(`${this.baseUrl}api/v1/get-info-mf`)
      .then(result => {
        const data = result.data
        if (data[0]) {
          if (data[0].join_community) {
            this.join_data = data[0].join_community
          }
        }
      }).catch(err => {
        this.$alert("cancel", {desc: err.message})
        console.error(err);
      })
    },
  }
};
</script>

<style src="~/assets/styles/components/sections/join.scss" lang="scss" />
