<template>
  <v-form
    :ref="'loginForm'"
    v-on:submit.prevent="checkValidate() && login($event)"
  >
    <span class="bg"></span>
    <div class="pa-16 grey darken-3 white--text" height="489">
      <v-img
        alt="Vue logo"
        src="../assets/ZUBB-LOGO-2020.jpg"
        height="100"
        align="center"
        class="mt-16"
        contain
      ></v-img>
      <!--Login Username and Password-->
      <v-row>
        <v-card
          outlined
          max-width="500"
          align="center"
          justify="center"
          class="mx-auto mt-6 my-16 white"
        >
          <v-card-text>
            <v-text-field
              prepend-inner-icon="mdi-account-circle"
              :rules="[rules.require]"
              v-model="username"
              label="Username"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.require]"
              v-model="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              required
              outlined
              dense
            >
            </v-text-field>
            <!--Login button-->
            <v-card-actions class="justify-center px-4">
              <v-btn
                block
                rounded
                dark
                color="info"
                type="submit"
                @click="login"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-row>
    </div>
  </v-form>
</template>

<script>
import axios from "axios";
import store from "../vuex/store"; // import the store we just created

export default {
  name: "Home",
  store,
  theme: { dark: true },
  data() {
    return {
      url: "https://hook.zubbsteel.com/line-ci/machine",
      data_login: [],
      username: "",
      password: "",
      //firstname: "",
      next_page: "",
      id: "",
      showPassword: false,
      rules: {
        require: (value) => !!value || "This field is required",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    // login เข้าสู่ระบบด้วย username และ password
    async login(firstname, doc_watch) {
      await this.checkValidate();
      // กด Enter เพื่อ Login
      event.preventDefault();
      // เรียกใช้งาน function postUser
      await this.postUser();
      //ถ้า username และ password ไม่ถูกต้อง
      if (
        this.username == null ||
        this.username == "" ||
        this.password == null ||
        this.password == ""
      ) {
        alert("กรอกข้อมูลไม่ครบ !");
      } else if (this.data_login == null) {
        alert("Username หรือ Password ไม่ถูกต้อง !");
      } else if (
        this.username == this.data_login.username &&
        this.password == this.data_login.password
      ) {
        firstname = this.data_login.firstname;
        await this.setName(firstname)
        //เก็บค่า firstname ไว้ใน state
        console.log(localStorage.getItem("localUser"))
        // รับค่าหน้าถัดไป เพื่อตรวจสอบ
        this.next_page = this.$route.params.next_page;
        //console.log("route : " + this.$route.params.next_page);
        if (this.next_page == null || this.next_page == "") { 
          doc_watch = null
          //เก็บค่า doc_watch ไว้ใน state
          this.$store.commit("setWatch", doc_watch);
          this.$router.replace({ name: "List" });
          this.$fire({
            title: localStorage.getItem("current_lat"),
            type: "success",
            timer: 2000,
          })
          //alert(localStorage.getItem("current_lat") + "\n" + localStorage.getItem("current_long"))
        } else {
          this.$router.replace({ name: this.next_page });
        }
      }
    },
    async setName(firstname) {
      await this.$store.commit("setFirstname", firstname);
    },
    //ส่ง username และ password ไปเพื่อรับข้อมูลกลับมา
    postUser() {
      const user_login = {
        username: this.username,
        password: this.password,
      };
      return axios.post(this.url + "/model", user_login).then((response) => {
        this.data_login = response.data[0];
      });
    },
    //check validation
    checkValidate() {
      if (this.$refs.loginForm.validate()) {
        //console.log("validation success");
      } else {
        console.log("กรุณากรอกข้อมูล !");
      }
    },
    getDeviceType(device) {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        device = "tablet";
        this.$store.commit("setDevice", device);
        return console.log("tablet");
      }
      if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua
        )
      ) {
        device = "mobile";
        this.$store.commit("setDevice", device);
        return console.log("mobile");
      }
      device = "desktop";
      this.$store.commit("setDevice", device);
      return console.log("desktop");
    },
  },
  created() {
    console.log("User - home_page : "+localStorage.getItem("localUser"))
    this.getDeviceType();
  },
};
</script>

<style scoped>
.bg {
  width: 96%;
  height: 85%;
  position: absolute;
  top: 11%;
  bottom: 50%;
  background-color: #424242;
  transform: scale(1.1);
}
</style>