<template>
  <div id="about" class="divcol">
    <div id="about--header" class="center">
      <h2 class="Title tup fill_w">about</h2>
    </div>

    <section class="divcol" style="margin-block: 2.5em; padding-inline: var(--margin-separator); gap: 3em">
      <div v-for="(item,i) in dataAbout" :key="i">
        <h2 class="tup">{{item.title}}</h2>
        <p class="p" v-html="item.description" />
      </div>
    </section>

    <h2 class="Title tup">core team</h2>

    <section v-for="(item,i) in dataTeam" :key="i" class="container-team mobile" :class="{special: i === 1}">
      <template v-if="!isMobile">
        <aside class="container-team--photo">
          <v-sheet color="transparent">
            <div>
              <v-btn
                v-for="(item2,i2) in item.social" :key="i2" icon :href="item2.user" target="_blank"
                :style="`--index: ${i2}; --index-reverse: ${item.social.slice().reverse().indexOf(item2)}`">
                <v-icon color="var(--accent)">{{item2.name}}</v-icon>
              </v-btn>
            </div>
          </v-sheet>

          <div class="wrapper-img">
            <img :src="item.img" :alt="`${item.name}'s image`">
          </div>
        </aside>

        <v-sheet class="container-team--content" color="transparent">
          <div class="div-shaped" />
          
          <h3 class="p">{{item.name}}</h3>
          <span>{{item.position}}</span>
          <p class="p" v-html="item.description" />
        </v-sheet>
      </template>

      <template v-else>
        <aside class="container-team--header" color="transparent">
          <div class="wrapper-img">
            <img :src="item.img" :alt="`${item.name}'s image`">
          </div>

          <div class="divcol center tcenter">
            <h3 class="p">{{item.name}}</h3>
            <span>{{item.position}}</span>
            <div>
              <v-btn
                v-for="(item2,i2) in item.social" :key="i2" icon :href="item2.link" target="_blank"
                :style="`--index: ${i2}; --index-reverse: ${item.social.slice().reverse().indexOf(item2)}`">
                <v-icon color="var(--accent)">{{item2.icon}}</v-icon>
              </v-btn>
            </div>
          </div>
        </aside>

        <p class="p" v-html="item.description" />
      </template>
    </section>
  </div>
</template>

<script>
import isMobile from '~/mixins/isMobile'
import computeds from '~/mixins/computeds'
import styles from '~/mixins/styles'

export default {
  name: "AboutPage",
  mixins: [isMobile, computeds, styles],
  data() {
    return {
      pageName: "about",
      dataAbout: [],
      dataTeam: [],
    }
  },
  head() {
    const title = "About"
    return {
      title,
    }
  },
  mounted() {
    this.getAbout();
    this.getTeam();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.styles)
  },
  methods: {
    styles() {
      if (window.innerWidth > 880) {
        setTimeout(() => {
          const specialContainer = document.querySelector(".container-team.special")
          const special = specialContainer.querySelector(".container-team--content")
          specialContainer.style.setProperty("--h-content", `${special.getBoundingClientRect().height}px`)
        }, 100);
      }
    },
    getAbout() {
      this.$axios.get(`${this.baseUrl}api/v1/get-about`).then(result => {
        for (const item of result.data) { this.dataAbout.push(item) }
      }).catch(err => {
        console.error(err)
      });
    },
    getTeam() {
      this.$axios.get(`${this.baseUrl}api/v1/get-core-team`).then(result => {
        for (const item of result.data) {
          item.img = this.baseUrl + item.img
          item.social.forEach(el => {
            if (el.name === "telegram") {
              // telegram
              el.user = `https://t.me/${el.user}`
            } else if (el.name === "discord") {
              // discord
              el.user = `https://discord.com/channels/${el.user}`
            } else if (el.name === "instagram") {
              // instagram
              el.name = 'mdi-instagram'
              el.user = `https://instagram.com/${el.user}`
            } else if (el.name === "twitter") {
              // twitter
              el.name = 'mdi-twitter'
              el.user = `https://twitter.com/${el.user}`
            } else if (el.name === "facebook") {
              el.user = `https://www.facebook.com/${el.user}`
            }
          })
          this.dataTeam.push(item)
        }
        this.styles()
        window.addEventListener("resize", this.styles)
      }).catch(err => {
        console.error(err)
      });
    },
  }
};
</script>

<style src="~/assets/styles/pages/about.scss" lang="scss" />
