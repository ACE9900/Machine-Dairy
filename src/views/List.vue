<template>
  <v-card class="ma-5" elevation="5">
    <v-card-title>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
          ></v-text-field
        ></v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6">
          <v-menu
            v-model="menu2"
            v-if="sendSearch"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="เลือกวันที่ในการค้นหา"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data_doc"
      :search="search"
      :items-per-page="15"
      @click:row="selectDoc"
      class="mx-4 elevation-1"
    >
      <template v-slot:[`item.doc_shift`]="{ item }">
        <v-chip :color="getColor(item.doc_shift)" dark>
          {{ item.doc_shift }}
        </v-chip>
      </template>
    </v-data-table></v-card
  >
</template>

<script>
import axios from "axios";
import store from "../vuex/store";

export default {
  store,
  data() {
    return {
      url: "https://hook.zubbsteel.com/line-ci/machine/",
      search: "",
      date: localStorage.getItem("filter_search"),
      menu: false,
      menu2: false,
      data_doc: [],
    };
  },
  methods: {
    //แสดงสีตามเงื่อนไข
    getColor(doc_shift) {
      if (doc_shift == "A") return "red";
      else if (doc_shift == "C") return "orange";
      else if (doc_shift == "B") return "green";
      else return "transparent";
    },
    //เลือกรายการที่ต้องการดู
    selectDoc(item) {
      const data_store = {
        get_doc_id: item.doc_id,
        get_doc_shift: item.doc_shift,
        get_doc_date: item.doc_date,
        isTest: true,
      };
      this.$store.commit("setDoc", data_store);
      //เงื่อนไขการเข้าไปยังรายการนั้นๆ
      if (item.form_id == 1) this.$router.replace({ name: "Machine" });
      else if (item.form_id == 3)
        this.$router.replace({ name: "Machine_temp" });
      else if (item.form_id == 4) this.$router.replace({ name: "Photocell" });
    },
  },
  computed: {
    //เก็บข้อมูลการค้นหาในตารางตามวันที่
    sendSearch(search_filter) {
      if (
        localStorage.getItem("filter_search") == null ||
        localStorage.getItem("filter_search") == ""
      ) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.date = new Date().toISOString().substr(0, 10);
        search_filter = this.date;
        this.$store.commit("setFilter", search_filter);
      } else {
        search_filter = this.date;
        this.$store.commit("setFilter", search_filter);
      }
      return true;
    },
    //หัวตาราง
    headers() {
      return [
        { text: "Doc_ID", value: "doc_id" },
        {
          text: "Form_ID",
          align: "center",
          sortable: false,
          value: "form_id",
        },
        { text: "User", value: "user" },
        { text: "Doc_Shift", value: "doc_shift" },
        {
          text: "Doc_Date",
          value: "doc_date",
          filter: (value) => {
            if (!this.date) return true;

            return value == this.date;
          },
        },
      ];
    },
  },
  created() {
    console.log("List - "+localStorage.getItem("localUser"))
    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล user
    /* let localUser = localStorage.getItem("localUser");
    if (localUser == null || localUser == "") {
      this.$router.replace({
        name: "Home",
        params: { next_page: this.$route.name },
      }); 
    } */
    //แสดงข้อมูลจาก table header
    axios.get(this.url + "tester/").then((response) => {
      this.data_doc = response.data;
      //console.log(this.data_doc);
    });
  },
};
</script>