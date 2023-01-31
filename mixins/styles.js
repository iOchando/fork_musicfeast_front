export default {
  data() {
    return {
      pageName: undefined
    }
  },
  mounted() {
    this.heightH2();

    // resize listener
    window.addEventListener('resize', this.heightH2);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.heightH2);
  },
  methods: {
    heightH2() {
      const page = document.querySelector(`#${this.pageName}`);
      document.querySelectorAll('h2.Title').forEach(h2 => {
        page.style.setProperty('--h-title', `${h2.getBoundingClientRect().height}px`)
      });
    },
  }
}
