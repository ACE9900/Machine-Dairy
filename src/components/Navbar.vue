<template>
  <div>
    <v-app-bar color="primary accent-4" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      {{Test}}
      <v-app-bar-nav-icon
        small
        dense
        color="teal accent-2"
        :to="Test"
        v-show="back_button"
      >
        <v-icon>mdi-arrow-left</v-icon></v-app-bar-nav-icon
      >
      <!-- Home -->
      <v-app-bar-nav-icon small dense color="error" to="/" v-show="menu_button">
        <v-icon>mdi-home</v-icon>
      </v-app-bar-nav-icon>
      <!-- Photocell -->
      <v-app-bar-nav-icon
        small
        dense
        color="warning"
        to="/Photocell"
        v-show="menu_button"
      >
        <v-icon>mdi-state-machine</v-icon></v-app-bar-nav-icon
      >
      <!-- Machine -->
      <v-app-bar-nav-icon
        small
        dense
        color="amber"
        to="/Machine"
        v-show="menu_button"
      >
        <v-icon>mdi-robot-industrial</v-icon></v-app-bar-nav-icon
      >
      <!-- Machine_temp -->
      <v-app-bar-nav-icon
        small
        dense
        color="white"
        to="/Machine_temp"
        v-show="menu_button"
      >
        <v-icon>mdi-thermometer-lines</v-icon></v-app-bar-nav-icon
      >
      <v-app-bar-nav-icon small dense color="white" to="/QR" v-show="qr_button">
        <v-icon>mdi-qrcode-scan</v-icon></v-app-bar-nav-icon
      >
      <v-app-bar-nav-icon
        small
        dense
        color="cyan accent-2"
        to="/test_2"
        v-show="menu_button"
      >
        <v-icon>mdi-crosshairs-gps</v-icon></v-app-bar-nav-icon
      >
      <v-spacer></v-spacer>
      <h3 v-show="qr_text">ให้ตำแหน่ง QR code อยู่ตรงกลางภาพ</h3>
      <v-spacer></v-spacer>

      <!-- Show user login -->
      <div v-if="isLogin" class="mr-3">
        <v-row align="center"
          ><v-icon>mdi-account</v-icon>
          <h4>{{ firstname }}</h4></v-row
        >
      </div>
      <v-btn
        fab
        small
        class="ml-1"
        v-if="isLogin"
        color="error"
        @click="logOut"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- แสดงส่วนของ shift และ date -->
    <v-app-bar color="blue-grey lighten-1" v-show="doc_shift_bar" dense dark>
      <h4 class="white--text">Shift :</h4>
      <v-col cols="xs-only-4">
        <v-select
          :items="shift"
          v-if="sendShift"
          v-model="doc_shift"
          label="เลือก"
          solo
          dense
          hide-details="auto"
        ></v-select>
      </v-col>
      <h4 class="white--text">Date : {{ doc_date }}</h4>
    </v-app-bar>
    <v-btn
      id="top"
      v-scroll="onScroll"
      fab
      dark
      fixed
      bottom
      right
      color="pink"
      v-if="top_button"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </div>
</template>

<script>
import store from "../vuex/store";

export default {
  store,
  data() {
    return {
      //firstname: "",
      //current_page: false,
      shift: ["A", "B", "C"],
      doc_shift: localStorage.getItem("docShift"),
      to_home: "/",
      to_list: "/List",
      Test: '',
      /* menu_button: true,
      back_button: true,
      qr_button: true,
      top_button: true,
      qr_text: false, */
    };
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.replace({ name: "Home" });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    //get date current
    getTime() {
      var months_arr = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      var date = new Date(Date.now());
      var year = date.getFullYear();
      var month = months_arr[date.getMonth()];
      var day = date.getDate();
      if (
        day == 1 ||
        day == 2 ||
        day == 3 ||
        day == 4 ||
        day == 5 ||
        day == 6 ||
        day == 7 ||
        day == 8 ||
        day == 9
      ) {
        day = "0" + day;
      }
      this.doc_date = day + "/" + month + "/" + year;
    },
  },
  watch: {
    /* Test() {
      if (
        localStorage.getItem("localUser") == null ||
        localStorage.getItem("localUser") == ""
      ) {
        this.Test = this.to_home
      } else {
        this.Test = this.to_list
      }
    }, */
    /* firstname() {
      this.firstname = localStorage.getItem("localUser")
    }, */
  },
  computed: {
    check_page() {
      return this.$route.name;
    },
    menu_button() {
      if (
        this.check_page == "Photocell" ||
        this.check_page == "Machine" ||
        this.check_page == "Machine_temp" ||
        this.check_page == "Machine_rolling" ||
        this.check_page == "List" ||
        this.check_page == "Home" ||
        this.check_page == "QR"
      ) {
        return false;
      } else {
        return true;
      }
    },
    qr_button() {
      if (this.check_page == "QR") {
        return false;
      } else {
        return true;
      }
    },
    back_button() {
      if (this.check_page == "Home" || this.check_page == "List") {
        if(this.check_page == "Home") {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.Test = this.to_home
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.Test = this.to_list
        }
        //return this.Test;
        return false;
      } else {
        return true;
      }
    },
    top_button() {
      if (
        this.check_page == "Home" ||
        this.check_page == "List" ||
        this.check_page == "QR"
      ) {
        return false;
      } else {
        return true;
      }
    },
    /* firstname() {
      return localStorage.getItem("localUser")
    }, */
    isLogin() {
      if (this.check_page == "Home" || this.check_page == "QR") {
        return false;
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.firstname = localStorage.getItem("localUser");
        return this.firstname
        //return true
      }
    },
    qr_text() {
      if (
        this.check_page == "Photocell" ||
        this.check_page == "Machine" ||
        this.check_page == "Machine_temp" ||
        this.check_page == "Machine_rolling" ||
        this.check_page == "List" ||
        this.check_page == "Home"
      ) {
        return false;
      } else {
        return true;
      }
    },
    doc_shift_bar() {
      //console.log(localStorage.getItem("watch_doc"))
      if (
        this.check_page == "Photocell" ||
        this.check_page == "Machine" ||
        this.check_page == "Machine_temp" ||
        this.check_page == "Machine_rolling" ||
        this.check_page == "List" ||
        this.check_page == "Home" ||
        this.check_page == "QR"
      ) {
        if (
          localStorage.getItem("watch_doc") == null ||
          localStorage.getItem("watch_doc") == ""
        ) {
          return true;
        } else {
          return false;
        }
        //return false;
      } else {
        return true;
      }
    },
    /* Test() {
      if (
        localStorage.getItem("localUser") == null ||
        localStorage.getItem("localUser") == ""
      ) {
        console.log(localStorage.getItem("localUser"))
        console.log("Home");
        return this.to_home;
      } else {
        console.log(localStorage.getItem("localUser"))
        console.log("List");
        return this.to_list;
      }
    }, */
    sendShift(doc_shift) {
      if (
        localStorage.getItem("docShift") != null ||
        localStorage.getItem("docShift") != ""
      ) {
        doc_shift = this.doc_shift;
        //console.log("Navbar : " + doc_shift);
        //this.$router.replace({ name: this.$route.name ,params: { doc_shift: doc_shift}});

        this.$store.commit("setShift", doc_shift);
        //console.log("state :" + store.state.doc_shift);
      }
      return true;
    },
  },
  created() {
    //เรียกใช้ function แสดงเวลา
    this.getTime();
    //console.log(this.check_page);
  },
};
</script>
