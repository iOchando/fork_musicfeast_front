<template>
  <div id="profile-modals">
    <v-dialog v-model="modalOffer" max-width="500px" content-class="nft-dialog" persistent>
      <v-btn icon class="close" @click="clearOffer()">
        <v-icon large>mdi-close</v-icon>
      </v-btn>

      <v-window touchless>
        <v-window-item>
          <v-card id="modalProfileOffer" class="nft-dialog--content">
            <h3>Decline The offer?</h3>
            <v-form ref="formOffer" class="divcol gap2" @submit.prevent="submitOffer()">
              <p class="p">You are declining the offer "{{nft ? nft.name : ""}}".</p>

              <v-sheet color="transparent">
                <label for="amount">Amount in
                  <img src="~/assets/sources/logos/near.svg" alt="near" style="--w: 1em">
                </label>
                <v-text-field
                  id="amount"
                  v-model="form_offer.offerPrice"
                  disabled solo filled
                  background-color="rgba(0, 0, 0, .2)"
                  placeholder="1,345.67"
                  type="number"
                  style="--o-disabled: 1; --fs: 1.3em"
                >
                <template #append>
                  <img src="~/assets/sources/logos/near.svg" alt="near" style="--w: 1.3em">
                </template>
              </v-text-field>

                <div class="space gap2" style="margin-bottom: 10px">
                  <span>Your Balance</span>
                  <span>{{user.balance ?? 0}}</span>
                </div>
              </v-sheet>

              <p class="p tcenter">You will be redirected to your wallet to confirm your transaction.</p>
            </v-form>

            <div class="fwrap gap2 bold" style="margin-top: 4em">
              <v-btn
                :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 16px; --bg: #fff; --c: var(--primary)"
                @click="clearOffer()">Cancel</v-btn>
              <v-btn
                :ripple="false" class="btn activeBtn" style="--w: min(100%, 12em); --fs: 16px"
                @click="submitOffer()">Decline Offer</v-btn>
            </div>
          </v-card>
        </v-window-item>
      </v-window>
    </v-dialog>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "ProifleModals",
  mixins: [computeds],
  data() {
    return {
      modalOffer: false,
      form_offer: { offerPrice: null },
    };
  },
  mounted() {
  },
  methods: {
    clearOffer() {
      Object.keys(this.form_offer).forEach(key => {this.form_offer[key] = null});
      this.modalOffer = false; this.windowOffer = 1;
    },
    submitOffer() {
      if (this.$refs.formOffer.validate()) {this.windowOffer++}
    },
  }
};
</script>

<style src="~/assets/styles/components/modals.scss" lang="scss" />
