<template>
  <div id="news-details">
    <h2 class="Title tup">press &amp; news</h2>

    <section class="container-press-and-news grid">
      <v-img :src="dataNews.image" class="container-press-and-news--background" transition="fade-transition">
        <template #placeholder>
          <v-skeleton-loader type="card" />
        </template>
      </v-img>

      <article class="divcol gap1">
        <v-btn icon class="share">
          <v-icon size="clamp(2em, 2.4vw, 2.4em)">mdi-share-variant</v-icon>
        </v-btn>

        <h3 class="bold">{{dataNews.title}}</h3>
        <span class="tcap">{{dataNews.title2}}</span>
        <!-- <p class="p">{{dataNews.description}}</p> -->
        <p class="p" v-html="dataNews.description" />

        <!-- <div class="container-press-and-news--social center gap1">
          <v-btn v-for="(item,i) in dataSocial" :key="i" icon>
            <v-icon size="clamp(2em, 2.4vw, 2.4em)">{{item.icon}}</v-icon>
          </v-btn>
        </div> -->
      </article>
    </section>

    <blockquote class="divcol" style="margin-block: 3em; padding-inline: var(--margin-separator)">
      <h2 class="tup" style="text-decoration: underline">{{dataNews.title2}}</h2>
      <!-- <p>{{dataNews.desc_long}}</p> -->
      <p v-html="dataNews.desc_long" />
    </blockquote>

    <h2 class="Title tup">other news</h2>

    <v-slide-group
      v-model="slider"
      mandatory
      show-arrows
      class="custome-slider"
    >
      <v-slide-item
        v-for="(item,i) in dataOtherNews"
        v-show="item.created !== dataNews.created"
        :key="i" v-slot="{ toggle }"
      >
        <v-card class="card tcentermobile" :ripple="false" @click="toggle; selectNews(item)">
          <v-img :src="item.image" :alt="`${item.title} image`" style="--w: 100%; --h: 23em; --br: 5px" transition="fade-transition">
            <template #placeholder>
              <v-skeleton-loader type="card" />
            </template>
          </v-img>
          <h3 class="p">{{item.title}}</h3>
          <!-- <p class="p">
            {{item.description}}
          </p> -->
          <p class="p" v-html="dataNews.description" />
        </v-card>
      </v-slide-item>
      
      <template #prev="{ on, attrs}">
        <v-btn icon class="reverse" v-bind="attrs" v-on="on">
          <v-icon x-large>mdi-play</v-icon>
        </v-btn>
      </template>
      <template #next="{on, attrs}">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon x-large>mdi-play</v-icon>
        </v-btn>
      </template>
    </v-slide-group>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'
import styles from '~/mixins/styles'

export default {
  name: "NewsDetailsPage",
  mixins: [computeds, styles],
  data() {
    return {
      pageName: 'news-details',
      dataSocial: [
        { icon: "mdi-instagram", link: "#" },
        { icon: "mdi-twitter", link: "#" },
        { icon: "mdi-facebook", link: "#" },
        { icon: "discord", link: "#" },
      ],
      slider: null,
      dataNews: {},
      dataOtherNews: [],
    }
  },
  head() {
    const title = "News Details"
    return {
      title,
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      // get news
      await this.$axios.get(`${this.baseUrl}api/v1/get-news`)
        .then(result => {
          result.data.forEach(e => {e.image = this.baseUrl+e.image});
          this.dataOtherNews = result.data
          if (localStorage.getItem("validator-news") === "pages") { this.dataNews = this.news }
          else if (localStorage.getItem("validator-news") === "navbar") {
            this.dataNews = this.dataOtherNews[this.dataOtherNews.length - 1]
          }
        }).catch(err => {
          this.$alert("cancel", {desc: err.message})
          console.error(err);
        }
      );
    },
    selectNews(item) {
      this.dataNews = item;
      this.$scrollTo('top');
    }
  }
};
</script>

<style src="~/assets/styles/pages/news-details.scss" lang="scss" />
