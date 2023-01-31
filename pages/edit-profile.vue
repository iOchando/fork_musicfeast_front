<template>
  <div id="profile" class="divcol">
    <v-img
      :src="imgBanner" transition="fade-transition" class="header"
      :style="`
        --tag-tier: '${
          user.tier===1 ? 'bronze' :
          user.tier===2 ? 'silver' :
          user.tier===3 ? 'gold' :
          user.tier===4 ? 'platinum' :
          user.tier===5 ? 'diamond' :
          user.tier===6 ? 'uranium' : 'user'
        }'
      `"
    >
      <template #default>
        <v-avatar
          width="var(--size)" height="var(--size)" style="--size: 13.954375em"
          @mouseenter="showTag()" @mouseleave="hideTag()">
          <label for="avatar" title="change avatar">
            <v-img :src="imgAvatar" alt="avatar image" transition="fade-transition">
              <template #placeholder>
                <v-skeleton-loader type="avatar" />
              </template>
            </v-img>
          </label>
        </v-avatar>
        <v-file-input
          id="avatar"
          v-model="avatar_model"
          style="display:none"
          accept="image/png, image/jpeg"
          @change="previewFile('avatar', avatar_model)"
        ></v-file-input>

        <label for="bannerBtn" class="btn activeBtn" style="--p: 0 2em">Upload</label>
        <v-file-input
          id="bannerBtn"
          v-model="banner_model"
          style="display:none"
          accept="image/png, image/jpeg"
          @change="previewFile('banner', banner_model)"
        ></v-file-input>
      </template>
      <template #placeholder>
        <v-skeleton-loader v-show="imgBanner" type="card" />
      </template>
    </v-img>

    <v-form ref="form" class="grid" @submit.prevent="saveForm()">
      <section class="card">
        <label for="name">full name</label>
        <v-text-field
          id="name"
          v-model="form.full_name"
          placeholder="Mario Perez"
          :rules="rules.required"
        ></v-text-field>
        
        <label for="username">username</label>
        <v-text-field
          id="username"
          v-model="form.username"
          placeholder="username123"
          :rules="rules.repeatedUsername"
          @input="clearRepeted('username')"
        ></v-text-field>
        
        <label for="email">email</label>
        <v-text-field
          id="email"
          v-model="form.email"
          placeholder="example@domain.com"
          :rules="rules.repeatedEmail"
          @input="clearRepeted('email')"
        ></v-text-field>
        
        <label for="discord">discord</label>
        <v-text-field
          id="discord"
          v-model="form.discord"
          placeholder="username#321"
          :rules="rules.repeatedDiscord"
          @input="clearRepeted('discord')"
        ></v-text-field>
        
        <label for="instagram">instagram account</label>
        <v-text-field
          id="instagram"
          v-model="form.instagram"
          placeholder="@username#321"
          :rules="rules.repeatedInstagram"
          @input="clearRepeted('instagram')"
        ></v-text-field>
        
        <label for="twitter">twitter account</label>
        <v-text-field
          id="twitter"
          v-model="form.twitter"
          placeholder="@username"
          :rules="rules.repeatedTwitter"
          @input="clearRepeted('twitter')"
        ></v-text-field>
        
        <label for="telegram">telegram account</label>
        <v-text-field
          id="telegram"
          v-model="form.telegram"
          placeholder="@username45"
          :rules="rules.repeatedTelegram"
          @input="clearRepeted('telegram')"
        ></v-text-field>
        
        <label for="bio">bio</label>
        <v-textarea
          id="bio"
          v-model="form.bio"
          placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
          no-resize
        ></v-textarea>
      </section>

      <h2 class="tup p">address<sup class="relative" style="top: calc(clamp(15px, 2vw, 30px) * -1)">
          <v-tooltip
            right color="rgba(0, 0, 0, .4)" transition="slide-x-transition"
            :open-delay="100" :close-delay="100">
            <template #activator="{ on, attrs}">
              <img src="~/assets/sources/icons/info.svg" alt="info" style="--w: clamp(12px, 1.5vw, 21px)" v-bind="attrs" v-on="on">
            </template>
            <span>(optional) Apply to redeem physical products</span>
          </v-tooltip>
        </sup>
      </h2>

      <section class="card">
        <label for="country">country</label>
        <v-select
          id="country"
          v-model="form.address.country"
          :items="dataCountries" solo
          :rules="Object.keys(form.address).find(e => form.address[e]) ? rules.required : undefined"
          placeholder="Select The Country"
          style="--fs-place: 16px"
          clearable clear-icon="mdi-close"
        ></v-select>
        
        <label for="street">street address</label>
        <v-text-field
          id="street"
          v-model="form.address.street_address"
          placeholder="Street Address, P.O, box, lorem ipsum"
          :rules="Object.keys(form.address).find(e => form.address[e]) ? rules.required : undefined"
        ></v-text-field>
        
        <label for="apartment">Apartment, Suite, Etc</label>
        <v-text-field
          id="apartment"
          v-model="form.address.street_address2"
          placeholder="Street Address 2, P.O, box, lorem ipsum "
          :rules="Object.keys(form.address).find(e => form.address[e]) ? rules.required : undefined"
        ></v-text-field>
        
        <label for="city">city</label>
        <v-text-field
          id="city"
          v-model="form.address.city"
          placeholder="Lorem ipsum"
          :rules="Object.keys(form.address).find(e => form.address[e]) ? rules.required : undefined"
        ></v-text-field>
        
        <label for="state">State / Province / Region</label>
        <v-text-field
          id="state"
          v-model="form.address.state"
          placeholder="Lorem ipsum"
          :rules="Object.keys(form.address).find(e => form.address[e]) ? rules.required : undefined"
        ></v-text-field>

        <label for="postal">Postal / Zip Code</label>
        <v-text-field
          id="postal"
          v-model="form.address.postal"
          placeholder="Lorem ipsum"
          :rules="Object.keys(form.address).find(e => form.address[e]) ? rules.required : undefined"
        ></v-text-field>
      </section>

      <div class="center fill_w wrap fwrapmobile bold" style="gap:2em; --fb: 200px">
        <v-btn :ripple="false" class="btn activeBtn" @click="$router.push(localePath('/profile'))">Cancel</v-btn>
        <v-btn :ripple="false" class="btn activeBtn" @click="saveForm()">Save</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import computeds from '~/mixins/computeds'

export default {
  name: "EditProfilePage",
  mixins: [computeds],
  data() {
    return {
      userExist: undefined,
      imgBanner: undefined,
      imgAvatar: undefined,
      avatar_model: [],
      banner_model: [],
      form: {
        avatar: "",
        banner: "",
        wallet: null,
        full_name: null,
        username: null,
        email: null,
        discord: null,
        instagram: null,
        twitter: null,
        telegram: null,
        bio: null,
        address: {
          country: null,
          street_address: null,
          street_address2: null,
          city: null,
          state: null,
          postal: null,
        }
      },
      dataCountries: [ "canada", "EEUU", "united kingdom", "spain", "lorem ipsum", "lorem ipsum" ],
      djangoExistenceList: {
        username: undefined,
        email: undefined,
        discord: undefined,
        instagram: undefined,
        twitter: undefined,
        telegram: undefined,
      },
      rules: {
        required: [(v) => !!v || "Field required"],
        repeatedUsername: [
          (v) => !!v || "Field required",
          () => !(this.djangoExistenceList.username) || "Username is already taken"
        ],
        repeatedEmail: [
          (v) => !!v || "Field required",
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          () => !(this.djangoExistenceList.email) || "Email is already used"
        ],
        repeatedDiscord: [
          () => !(this.djangoExistenceList.discord) || "Discord account is already used"
        ],
        repeatedInstagram: [
          () => !(this.djangoExistenceList.instagram) || "Instagram account is already used"
        ],
        repeatedTwitter: [
          () => !(this.djangoExistenceList.twitter) || "Twitter account is already used"
        ],
        repeatedTelegram: [
          () => !(this.djangoExistenceList.telegram) || "Telegram account is already used"
        ],
      },
    }
  },
  head() {
    const title = "Edit Profile"
    return {
      title,
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.EnterKeyboardListener();
  },
  methods: {
    async getData() {
      const accountId = this.$ramper.getAccountId()
      // get data user
      await this.$axios.post(`${this.baseUrl}api/v1/get-perfil-data/`, { "wallet": accountId })
      .then(result => {
        const data = result.data[0]
        if (result.data[0]) {
          this.$equalData(this.form, data)
          this.form.id = data.id
          this.imgBanner = data.banner ? this.baseUrl+data.banner : this.user.banner
          this.imgAvatar = data.avatar ? this.baseUrl+data.avatar : this.user.avatar
          this.userExist = true
        } else {
          this.form.wallet = accountId
          this.imgBanner = this.user.banner
          this.imgAvatar = this.user.avatar
          this.userExist = false
        }
      }).catch(err => {
        this.$alert("cancel", {desc: err.message})
        console.error(err);
      })
    },
    clearRepeted(key) {
      if (this.djangoExistenceList[key]) this.djangoExistenceList[key] = undefined
    },
    EnterKeyboardListener() {
      // keyboard enter listener
      this.$refs.form.$el.querySelectorAll("input").forEach(input => {
        input.addEventListener("keypress", event => {
          if (event.key === "Enter") { this.saveForm() }
        })
      })
    },
    saveForm() {
      // verification ⭐
      const consult = {
        username: this.form.username,
        email: this.form.email,
        twitter: this.form.twitter,
        discord: this.form.discord,
        instagram: this.form.instagram,
        telegram: this.form.telegram,
        wallet: this.form.wallet,
      }
      // checkout no repeated info
      this.$axios.post(`${this.baseUrl}api/v1/validate-perfil/`, consult).then(result => {
        this.djangoExistenceList = result.data
        
        if (!this.$refs.form.validate()) return this.$alert('cancel', {title: 'Failed request', desc: 'Need fill all required fields'})
        
        // save form ✔️
        if (this.userExist) {
          this.$axios.put(`${this.baseUrl}api/v1/perfil/${this.form.id}/`, this.$formData(this.form))
          .then(() => this.goBack()).catch(err => {
            // this.$alert("cancel", {desc: err.message})
            console.error(err);
          })
        } else {
          this.$axios.post(`${this.baseUrl}api/v1/perfil/`, this.$formData(this.form))
          .then(() => this.goBack()).catch(err => {
            this.$alert("cancel", {desc: err.message})
            console.error(err);
          })
        }
      // catch error repeated values consult
      }).catch(err => {
        // this.$alert("cancel", {desc: err.message})
        console.error(err)
      })
    },
    goBack() {
      this.$alert({title: "Success!", desc: "Your data has been saved successfully."})
      setTimeout(() => this.$router.go(0), 400);
      this.$router.go(-1)
      
      // this.$alert("success", {desc: "Your data has been saved successfully."})   
      // setTimeout(() => this.$alert({title: "Success!", desc: "Your data has been saved successfully."}), 500);
    },
    showTag() {document.querySelector(".header").classList.add("hover")},
    hideTag() {document.querySelector(".header").classList.remove("hover")},
    previewFile(key, file) {
      this.form[key] = file;
      if (key === 'avatar') { this.imgAvatar = URL.createObjectURL(file) }
      else { this.imgBanner = URL.createObjectURL(file) }
    },
  }
};
</script>

<style src="~/assets/styles/pages/profile.scss" lang="scss" />
