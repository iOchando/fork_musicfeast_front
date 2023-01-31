<template>
  <v-dialog v-model="varDialog" content-class="modal-verify divcol relative isolate" persistent>
    <aside class="space" style="gap: 10px">
      <span class="h9_em bold">{{
        resultOperation === 'success' ? 'Synchronization Successful!'
        : resultOperation === 'cancel' ? 'Error Synchronization!'
        : 'Accept Synchronization'}}</span>
      
      <v-btn icon :disabled="connectBtn" @click="closeDialog()">
        <v-icon size="1.5em">mdi-close</v-icon>
      </v-btn>
    </aside>

    <v-sheet v-if="!resultOperation" color="transparent" class="divcol" style="gap: 15px">
      <div class="divcol center" style="gap: 5px">
        <img :src="userAvatar" alt="avatar" class="aspect" style="--w: 6em; --of: cover; --br: 50%; --b: 1.5px solid #fff; --p: .5px">
        <span class="h11_em bold">{{ userDc.username }}#{{ userDc.discriminator }}</span>
      </div>
      
      <v-card class="card" style="--bg: hsl(0 0% 60% / .4)">
        <p class="p h11_em center">Hey there {{ user.username || account }}</p>
        <p class="p h11_em center">Ready to sync with discord?</p>
      </v-card>
      
      <v-btn class="btn activeBtn align" :disabled="connectBtn" plain color="hsl(0 0% 0% / .5)" @click="connectDiscord()">
        <span class="h11_em bold">Connect</span>
        <v-progress-circular
          v-if="connectBtn"
          :size="21"
          indeterminate
        ></v-progress-circular>
        <!-- <span class="h13_em">ramper.xyz</span> -->
      </v-btn>
    </v-sheet>

    <v-icon v-else-if="resultOperation === 'success'" size="7em" style="color: var(--success) !important">
      mdi-check-circle</v-icon>
    <v-icon v-else-if="resultOperation === 'cancel'" size="7em" style="color: var(--error) !important">
      mdi-close-circle</v-icon>
  </v-dialog>
</template>

<script>
import computeds from '~/mixins/computeds'
export default {
  name: "VerifyModal",
  mixins: [computeds],
  data() {
    return {
      connectBtn: false,
      varDialog: false,
      userDc: {},
      userAvatar: require("~/assets/sources/avatars/avatar.png"),
      resultOperation: undefined,
      account: null
    };
  },
  mounted() {
    const act = this.$ramper.getAccountId()

    if (act) {
      this.account = act.substring(0, 20) + "..."
    }

    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken] = [fragment.get('access_token'), fragment.get('token_type')];

    if (accessToken) {
      const item = {
        access_token: fragment.get('access_token'),
        token_type: fragment.get('token_type')
      }
      localStorage.setItem('discord_sinc', JSON.stringify(item))
      history.replaceState(null, location.href.split("#")[0], '/');
    }

    if (JSON.parse(localStorage.getItem('discord_sinc'))) {
      if (this.$ramper.getUser()) {
        const itemDiscord = JSON.parse(localStorage.getItem('discord_sinc'))
        fetch('https://discord.com/api/users/@me', {
          headers: {
            authorization: `${itemDiscord.token_type} ${itemDiscord.access_token}`,
          },
        })
        .then(result => result.json())
        .then(response => {
          console.log(response)
          const avatar = `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png`

          this.userAvatar = avatar

          this.userDc = response

          this.varDialog = true
        })
        .catch(console.error);
      } else {
        this.$parent.$parent.$refs.connect.modalConnect = true
      }
    }
  },
  methods: {
    closeDialog() {
      this.varDialog = false
      if (JSON.parse(localStorage.getItem('discord_sinc'))) {
        localStorage.removeItem('discord_sinc')
      }
    },
    connectDiscord () {
      this.connectBtn = true
      const accountId = this.$ramper.getAccountId()
      this.$axios.post(`${this.baseUrl}api/v1/save-user-discord/`, { "wallet": accountId, "discord_id": this.userDc.id })
        .then(result => {
          this.$axios.post("https://www.musicfeast.io:3070/api/v1/active-rol", { "wallet": accountId })
            .then(result => {
              console.log("SUCCESS")
              console.log(result)
              this.resultOperation = "success"
              this.connectBtn = false
              localStorage.removeItem('discord_sinc')
            }).catch(err => {
              console.error(err);
              this.resultOperation = "cancel"
              localStorage.removeItem('discord_sinc')
              // this.$alert("cancel", {desc: err.message})
              this.connectBtn = false
            })
        }).catch(err => {
          this.$alert("cancel", {desc: err.message})
          console.error(err);
          localStorage.removeItem('discord_sinc')
          this.connectBtn = false
        })
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
