<template>
  <div>
    <!--Area Machine-->
    <v-card class="mx-4 my-1" elevation="4" outlined>
      <v-card-title class="d-block grey darken-3 white--text"
        >AREA : JC31 : MOTOR CHANGING</v-card-title
      >
      <v-col cols="12" class="py-1">
        <h3 class="subtitle-1 text-left">{{ machine }} ({{ motor_id }})</h3>
      </v-col>
      <v-divider></v-divider>
      <v-row class="mx-3">
        <v-col cols="12" sm="6" class="py-1 my-0">
          <v-row align="center">
            <v-col cols="5" sm="6" class="pa-0 my-0">
              <p class="my-0 subtitle-2 text-left">สภาพทั่วไป</p></v-col
            >
            <v-col cols="7" sm="6" class="pa-0 my-0">
              <v-btn-toggle v-model="status" :readonly="isTest" mandatory>
                <v-btn :color="Stat_Btn1()">
                  <v-icon :color="Stat_Icon1()">mdi-radiobox-blank</v-icon>
                </v-btn>
                <v-btn :color="Stat_Btn2()">
                  <v-icon :color="Stat_Icon2()"
                    >mdi-check-circle-outline</v-icon
                  >
                </v-btn>
                <v-btn :color="Stat_Btn3()">
                  <v-icon :color="Stat_Icon3()"
                    >mdi-close-circle-outline</v-icon
                  >
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" class="py-1 my-0">
          <v-row align="center">
            <v-col cols="5" class="pa-0 my-0">
              <p class="my-0 subtitle-2 text-left">การหมุน</p></v-col
            >
            <v-col cols="5" class="pa-0 my-0">
              <v-btn-toggle :readonly="isTest" v-model="rotation" mandatory>
                <v-btn :color="Rote_Btn1()">
                  <v-icon :color="Rote_Icon1()">mdi-radiobox-blank</v-icon>
                </v-btn>
                <v-btn :color="Rote_Btn2()">
                  <v-icon :color="Rote_Icon2()"
                    >mdi-check-circle-outline</v-icon
                  >
                </v-btn>
                <v-btn :color="Rote_Btn3()">
                  <v-icon :color="Rote_Icon3()"
                    >mdi-close-circle-outline</v-icon
                  >
                </v-btn>
              </v-btn-toggle></v-col
            >
          </v-row>
        </v-col>
      </v-row>
      <v-col cols="12" class="py-1">
        <v-textarea
          class="ma-0"
          dense
          auto-grow
          filled
          rows="1"
          v-model="comment"
          label="หมายเหตุ"
          :disabled="isTest"
          counter
          maxlength="250"
          required
        ></v-textarea>
      </v-col>
    </v-card>
    <v-card class="mx-4 my-2" elevation="4" outlined>
      <v-card-title class="d-block grey darken-3 white--text title"
        ><v-icon color="white">mdi-file-document</v-icon>
        หมายเหตุเอกสาร</v-card-title
      >
      <v-col cols="12" class="py-1">
        <v-textarea
          class="my-1"
          auto-grow
          filled
          v-model="ex_comment"
          label="หมายเหตุ"
          counter
          maxlength="250"
          :disabled="isTest"
          required
        ></v-textarea>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-btn
          block
          color="success"
          elevation="2"
          @click="saveData()"
          >SAVE</v-btn
        >
      </v-col>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import store from "../vuex/store";

export default {
  name: "Machine",
  store,
  data() {
    return {
      url: "https://hook.zubbsteel.com/line-ci/machine/",
      isTest: false,
      ex_comment: "",
      doc_date: "",
      times: "",
      put_step1: false,
      current_date: "",
      machine: "ตรวจเช็คสภาพของมอเตอร์",
      motor_id: "JC31F01VEF-M001",
      status: "",
      rotation: "",
      comment: "",
      //check_btn: false,
      //next_btn: false,
      data_machine: [],
      rules: {
        require: (value) => !!value || "ข้อมูลนี้จำเป็นต้องกรอก",
        counter: (value) => value <= 1000 || "ใส่ค่า 0-1000 เท่านั้น",
      },
    };
  },
  methods: {
    //Change Color Status
    Stat_Btn1() {
      return this.status == 0 ? "grey" : "white";
    },
    Stat_Btn2() {
      return this.status == 1 ? "green accent-3" : "white";
    },
    Stat_Btn3() {
      return this.status == 2 ? "red accent-3" : "white";
    },
    Stat_Icon1() {
      return this.status == 0 ? "white" : "black";
    },
    Stat_Icon2() {
      return this.status == 1 ? "white" : "black";
    },
    Stat_Icon3() {
      return this.status == 2 ? "white" : "black";
    },
    //Change Color Rotation
    Rote_Btn1() {
      return this.rotation == 0 ? "grey" : "white";
    },
    Rote_Btn2() {
      return this.rotation == 1 ? "green accent-3" : "white";
    },
    Rote_Btn3() {
      return this.rotation == 2 ? "red accent-3" : "white";
    },
    Rote_Icon1() {
      return this.rotation == 0 ? "white" : "black";
    },
    Rote_Icon2() {
      return this.rotation == 1 ? "white" : "black";
    },
    Rote_Icon3() {
      return this.rotation == 2 ? "white" : "black";
    },
    //nextStep 1
    async nextStep_1() {
      await this.check_Stat_Rote();
      this.data = {
        status: this.status,
        rotation: this.rotation,
        comment: this.comment,
      };
      console.log(this.data);
      this.putData_Step1();
    },
    //ตรวจสอบสภาพทั่วไป และการหมุน
    async check_Stat_Rote() {
      //ตรวจสอบสภาพทั่วไป
      if (this.status == 0) this.status = "UNCHECK";
      if (this.status == 1) this.status = "OK";
      if (this.status == 2) this.status = "NO";
      //ตรวจสอบการหมุน
      if (this.rotation == 0) this.rotation = "UNCHECK";
      if (this.rotation == 1) this.rotation = "OK";
      if (this.rotation == 2) this.rotation = "NO";
    },
    //post data step 1 ไปยัง table
    async putData_Step1() {
      await this.getData();
      await this.getMachine();
      //กำหนด id เพื่อเป็น key ในการอัพเดทข้อมูล
      this.data_machine = {
        id: this.machine_length + 1,
        motor_id: 3,
        status: this.data.status,
        rotation: this.data.rotation,
        comment: this.data.comment,
        doc_id: this.doc_length + 1,
        form_id: 1,
      };
      console.log(this.data_machine);
      axios.post(this.url + "machine_insert", this.data_machine);
    },
    //บันทึกข้อมูลไป table header
    async saveData() {
      await this.getData();
      await this.getMachine();
      //กำหนด id เพื่อเป็น key ในการอัพเดทข้อมูล
      await this.nextStep_1()
      //กำหนด object เพื่อเก็บข้อมูล
      const data_insert = {
        doc_id: this.doc_length + 1,
        form_id: 1,
        lat: localStorage.getItem("current_lat"),
        long: localStorage.getItem("current_long"),
        user: localStorage.getItem("localUser"),
        doc_shift: localStorage.getItem("localUser"),
        ex_comment: this.ex_comment,
      };
      //console.log(data_insert);
      axios.post(this.url + "header_insert", data_insert);
      console.log("SAVE");
      this.$fire({
        title: "สแกนสำเร็จ",
        type: "success",
        timer: 2000,
      }).then((r) => {
        console.log(r.value);
        //location.reload();
      });
    },
    //รับค่าจำนวนของ table machine_header เพื่อใช้เป็น Runtime
    async getData() {
      return axios
        .get(this.url + "header")
        .then((response) => (this.doc_length = response.data.length));
    },
    //รับค่าจำนวนของ table machine เพื่อใช้เป็น Runtime
    async getMachine() {
      return axios
        .get(this.url + "machine")
        .then((response) => (this.machine_length = response.data.length));
    },
    //รับค่า id จากฟอร์ม List
    getID() {
      //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล
      let current_doc = localStorage.getItem("current_doc");
      current_doc = JSON.parse(current_doc);
      //console.log("ID");
      //console.log(current_doc);
      //แสดงข้อมูลตาม id ที่ได้จากการเลือก list
      return axios
        .get(this.url + "machine_id/" + current_doc.get_doc_id)
        .then(
          (response) => (
            (this.machine_data = response.data), console.log(this.machine_data)
          )
        );
    },
    //รับค่า id จากฟอร์ม List
    get_headerID() {
      //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล
      let current_doc = localStorage.getItem("current_doc");
      current_doc = JSON.parse(current_doc);
      //console.log("Header");
      //console.log(current_doc);
      //แสดงข้อมูลตาม id ที่ได้จากการเลือก list
      return axios
        .get(this.url + "header_id/" + current_doc.get_doc_id)
        .then(
          (response) => (
            (this.header_data = response.data[0]), console.log(this.header_data)
          )
        );
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

      var hours = date.getHours(); // => 9
      var minutes = date.getMinutes(); // =>  30
      var seconds = date.getSeconds(); // => 51
      this.times = hours + ":" + minutes + ":" + seconds;
      console.log(this.times);
      if(hours >= 8 && hours <= 15 ){
          console.log("Shift : A")
      }
      if(hours >= 12 && hours <= 17 ){
          console.log("Shift : B")
      }
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    check_button() {
      //ตรวจสอบการกดปุ่ม
      if (this.put_step1 == true) {
        return true;
      }
    },
  },
  created() {
    console.log("Machine - " + localStorage.getItem("localUser"));
    //เรียกใช้ function แสดงเวลา
    this.getTime();
    
    this.motor_id = this.$route.params.motor_name;
    alert(this.motor_id)
    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูลของ document
    /* let current_doc = localStorage.getItem("current_doc");
    current_doc = JSON.parse(current_doc); */

    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล user
    /* let localUser = localStorage.getItem("localUser");
    if (localUser == null || localUser == "") {
      this.$router.replace({
        name: "Home",
        params: { next_page: this.$route.name },
      });
    } else {
      // รับค่าที่ได้จากฟอร์ม List ไปแสดง
      this.current_shift = current_doc.get_doc_shift;
      this.current_date = current_doc.get_doc_date;
      this.isTest = current_doc.isTest;
    } */

    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล
    let watch_doc = localStorage.getItem("watch_doc");
    if (watch_doc == null || watch_doc == "") {
      //console.log("ok");
    } else {
      //this.showData();
    }
  },
};
</script>