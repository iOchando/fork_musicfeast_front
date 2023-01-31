<template>
  <div>
    <v-dialog
      v-for="(item,i) in dataAlerts" :key="i"
      v-model="item.model" persistent
      content-class="modal-verify divcol relative isolate"
    >
      <aside class="space" style="gap: 10px">
        <span class="h9_em bold">{{item.title}}</span>
        
        <v-btn icon @click="closeDialog(i)">
          <v-icon size="1.5em">mdi-close</v-icon>
        </v-btn>
      </aside>

      <v-icon size="6em" :style="`color: ${item.color} !important`">{{item.icon}}</v-icon>

      <v-card class="card" style="--bg: hsl(0 0% 60% / .4)">
        <p class="p h11_em center">{{item.desc}}</p>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AlertEmergentModal",
  data() {
    return {
      dataAlerts: []
    };
  },
  mounted() {
  },
  methods: {
    closeDialog(i) {
      this.dataAlerts.splice(i, 1)
    },
    GenerateAlert(
      title = "title",
      desc = "message",
      color = '#A4FDDF',
      icon = 'mdi-check-circle'
    ) {
      // // create alert
      const alert = {title, desc, color, icon, model: true}
      this.dataAlerts.push(alert)
      // clear alerts
      setTimeout(() => this.dataAlerts.shift(), 7000);
    },
  }
};
</script>

<style lang="scss">
.modal-verify {
  @include card;
  // --min-w: 330px;
  --w: max-content;
  --br: 30px;
  --bg: #272727;
  --p: 30px;
  --tt: capitalize;
  gap: 10px;
  overflow-x: hidden;
  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background-clip: content-box, border-box;
    background-image: linear-gradient(var(--bg),var(--bg)),
      linear-gradient(135deg, rgba($primary,.2), rgba($accent,.2));
    z-index: -1;
  }

  i {color: hsl(225 225% 225% / .5) !important}
}
</style>
