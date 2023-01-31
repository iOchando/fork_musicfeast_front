<template>
  <div id="about--artists" class="divcol center">
    <section id="about--home">
      <h1>ABOUT</h1>
      <v-sheet color="transparent" class="content divcol gap1 gap2mobile">
        <div v-for="(item,i) in dataAbout" :key="i" class="content-top divcol">
          <h2 class="tup">{{item.title}}</h2>
          <!-- <p class="p">{{item.description}}</p> -->
          <p class="p" v-html="item.description" />
          <a class="deletemobile" @click="$router.push(localePath('/about'))">More</a>
        </div>
      </v-sheet>
    </section>

    <div v-for="n in 2" :key="n" class="separators" />

    <section id="artists--home">
      <v-slide-group
        id="custome-slider-artists"
        v-model="slider"
        mandatory
        show-arrows
        center-active
      >
        <v-slide-item v-for="(item,i) in dataArtists" :key="i">
          <v-img
            :src="item.image" :alt="`${item.name} image`" transition="fade-transition"
            @click="$store.dispatch('goTo', {key: 'artist', item})">
            <template #default>
              <v-sheet>
                <div class="divcol">
                  <h3>{{item.name}}</h3>
                  <p>{{item.description}}</p>
                </div>
              </v-sheet>
            </template>
            <template #placeholder>
              <v-skeleton-loader width="100%" height="100%" type="card" />
            </template>
          </v-img>
        </v-slide-item>

        <template #prev="{ on, attrs}">
          <v-btn
            icon
            class="reverse"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon x-large>mdi-play</v-icon>
          </v-btn>
        </template>

        <template #next="{on, attrs}">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon x-large>mdi-play</v-icon>
          </v-btn>
        </template>
      </v-slide-group>

      <h1>ARTISTS</h1>
    </section>

    <v-btn class="btn h10_em view-all__btn" :to="localePath('/artists')">View All</v-btn>
    <!-- <div>
      <iframe src="https://discord.com/widget?id=1047939031108952084&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    </div> -->
  </div>
  </template>

<script>
export default {
  name: "AboutXArtistsSection",
  props: {
    dataAbout: {
      type: Array,
      default: undefined
    },
    dataArtists: {
      type: Array,
      default: undefined
    }
  },
  data() {
    return {
      slider: undefined,
    }
  },
  methods: {
  },
};
</script>

<style src="~/assets/styles/components/sections/about--artists.scss" lang="scss" />
