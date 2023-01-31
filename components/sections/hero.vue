<template>
  <div id="hero" class="divcol center overflow">
    <v-carousel
      id="custome-carousel"
      height="max-content"
    >
      <v-carousel-item v-for="(item,i) in dataHero" :key="i">
        <v-img :src="isMobile ? item.image_mobile : item.image" alt="carousel image" transition="fade-transition">
          <template #placeholder>
            <v-skeleton-loader type="card" />
          </template>
        </v-img>
      </v-carousel-item>

      <template #prev="{on, attrs}">
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
    </v-carousel>
  </div>
</template>

<script>
import isMobile from '~/mixins/isMobile'
export default {
  name: "HeroSection",
  mixins: [isMobile],
  props: {
    dataHero: {
      type: Array,
      default: null,
    }
  },
  methods: {
  }
};
</script>

<style src="~/assets/styles/components/sections/hero.scss" lang="scss" />
