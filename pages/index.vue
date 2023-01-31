<template>
  <div id="home" class="divcol" style="gap:4em">
    <SectionsHero :data-hero="dataHero"></SectionsHero>
    <SectionsAboutArtists :data-about="dataAbout" :data-artists="dataArtists"></SectionsAboutArtists>
    <SectionsJoin></SectionsJoin>
    <SectionsLastestReleases :data-lastest-releases="dataLastestReleases"></SectionsLastestReleases>
    <SectionsNews :data-news="dataNews"></SectionsNews>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "HomePage",
  mixins: [computeds],
  data() {
    return {
      dataHero: [],
      dataAbout: [],
      dataArtists: [],
      dataLastestReleases: [
        {
          avatar: require("~/assets/sources/avatars/avatar.png"),
          artist: "Artist n°1",
          img: require('~/assets/sources/images/img-listed-1.jpg'),
          title: "Lorem ipsum dolor sit amet,",
          desc: "Lorem ipsum dolor sit amet,",
          state: "live",
          event: "toronto",
        },
        {
          avatar: require("~/assets/sources/avatars/avatar.png"),
          artist: "Artist n°2",
          img: require('~/assets/sources/images/img-listed-2.jpg'),
          title: "Lorem ipsum dolor sit amet,",
          desc: "Lorem ipsum dolor sit amet,",
          state: "live",
          event: "miami",
        },
        {
          avatar: require("~/assets/sources/avatars/avatar.png"),
          artist: "Artist n°3",
          img: require('~/assets/sources/images/img-listed-3.jpg'),
          title: "Lorem ipsum dolor sit amet,",
          desc: "Lorem ipsum dolor sit amet,",
          state: "sold out",
          event: "madrid",
        },
        {
          avatar: require("~/assets/sources/avatars/avatar.png"),
          artist: "Artist n°4",
          img: require('~/assets/sources/images/img-listed-4.jpg'),
          title: "Lorem ipsum dolor sit amet,",
          desc: "Lorem ipsum dolor sit amet,",
          state: "live",
          event: "toronto",
        },
        {
          avatar: require("~/assets/sources/avatars/avatar.png"),
          artist: "Artist n°5",
          img: require('~/assets/sources/images/img-listed-5.jpg'),
          title: "Lorem ipsum dolor sit amet,",
          desc: "Lorem ipsum dolor sit amet,",
          state: "sold out",
          event: "madrid",
        },
        {
          avatar: require("~/assets/sources/avatars/avatar.png"),
          artist: "Artist n°6",
          img: require('~/assets/sources/images/img-listed-6.jpg'),
          title: "Lorem ipsum dolor sit amet,",
          desc: "Lorem ipsum dolor sit amet,",
          state: "live",
          event: "miami",
        },
        {
          avatar: require("~/assets/sources/avatars/avatar.png"),
          artist: "Artist n°7",
          img: require('~/assets/sources/images/img-listed-7.jpg'),
          title: "Lorem ipsum dolor sit amet,",
          desc: "Lorem ipsum dolor sit amet,",
          state: "sold out",
          event: "madrid",
        },
        {
          avatar: require("~/assets/sources/avatars/avatar.png"),
          artist: "Artist n°8",
          img: require('~/assets/sources/images/img-listed-8.jpg'),
          title: "Lorem ipsum dolor sit amet,",
          desc: "Lorem ipsum dolor sit amet,",
          state: "sold out",
          event: "toronto",
        },
      ],
      dataNews: [],
    }
  },
  head() {
    const title = 'Home';
    return {
      title,
    }
  },
  mounted() {
    
    // get carousel
    this.$axios.get(`${this.baseUrl}api/v1/get-carousel`)
      .then(result => {
        result.data.forEach(e => {
          e.image = this.baseUrl+e.image
          e.image_mobile = this.baseUrl+e.image_mobile
        });
        this.dataHero = result.data
      }).catch(err => {
        // this.$alert("cancel", {desc: err.message})
        console.error(err);
      }
    );
    
    // get about
    this.$axios.get(`${this.baseUrl}api/v1/get-about`).then(result => {
      for (const item of result.data) { this.dataAbout.push(item) }
    }).catch((err) => {
      console.error(err)
    });
    
    // get artists
    this.$axios.get(`${this.baseUrl}api/v1/get-artists-home`)
      .then(result => {
        result.data.forEach(e => {
          e.banner = this.baseUrl+e.banner;
          e.image = e.image ? this.baseUrl+e.image : require('~/assets/sources/avatars/avatar.png');
        });
        this.dataArtists = result.data
      }).catch(err => {
        // this.$alert("cancel", {desc: err.message})
        console.error(err);
      }
    );
    
    // get news
    this.$axios.get(`${this.baseUrl}api/v1/get-news`)
      .then(result => {
        result.data.forEach(e => {e.image = this.baseUrl+e.image});
        this.dataNews = result.data
      }).catch(err => {
        // this.$alert("cancel", {desc: err.message})
        console.error(err);
      }
    );
  },
  methods: {
  }
};
</script>
