<template>
  <div>
    <!-- Number Document --> 
    <v-card v-if="show_report"
      ><v-row align="center">
        <v-col cols="12" sm="6" class="py-0"
          ><v-card-title hide-details="auto"
            >Shift : {{ current_shift }}</v-card-title
          ><v-card-subtitle hide-details="auto"
            >Date : {{ current_date }}</v-card-subtitle
          > </v-col
        ><v-col cols="12" sm="6" class="py-0">
          <v-btn block elevation="1" x-large hide-details="auto" color="error">
            PDF - <v-icon large>mdi-printer</v-icon>
          </v-btn>
        </v-col>
      </v-row></v-card
    >
    <!--Area Photocell-->
    <v-stepper v-model="e6" vertical>
      <!--AREA : JC31-->
      <v-stepper-step editable :complete="e6 > 1" step="1">
        <h3>AREA : JC31</h3>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card class="mx-2 my-1" elevation="2" outlined>
          <v-row class="mx-2" v-for="(item, n) in area1" :key="n">
            <v-col cols="12">
              <v-row class="text-left">
                <h2>{{ item.head }}</h2>
                <small class="text-left my-auto">{{ item.photocell }}</small>
              </v-row>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="6" class="py-0 my-0">
              <v-switch
                class="text-center caption mx-1 py-0 my-0"
                v-model="item.status"
                color="info"
                :label="`สภาพทั่วไป`"
                :readonly="isTest"
                inset
              >
              </v-switch>
            </v-col>
            <v-col cols="6" class="py-0 my-0">
              <v-switch
                class="text-center caption mx-1 py-0 my-0"
                v-model="item.cleaning"
                color="success"
                :label="`ทำความสะอาด`"
                :readonly="isTest"
                inset
              >
              </v-switch>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-btn block color="primary" :disabled="isTest" @click="nextStep()">
              Next
            </v-btn>
          </v-col>
        </v-card>
      </v-stepper-content>
      <!--AREA : JE21-->
      <v-stepper-step editable :complete="e6 > 2" step="2">
        <h3>AREA : JE21</h3>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card class="my-1 mx-2" elevation="2" outlined>
          <v-row class="mx-2" v-for="(item, n) in area2" :key="n">
            <v-col cols="12">
              <h3 class="text-left">{{ item.photocell }}</h3>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="6" class="py-0 my-0">
              <v-switch
                class="text-center caption mx-1 py-0 my-0"
                v-model="item.status"
                color="info"
                :label="`สภาพทั่วไป`"
                :readonly="isTest"
                inset
              >
              </v-switch>
            </v-col>
            <v-col cols="6" class="py-0 my-0">
              <v-switch
                class="text-center caption mx-1 py-0 my-0"
                v-model="item.cleaning"
                color="success"
                :label="`ทำความสะอาด`"
                :readonly="isTest"
                inset
              >
              </v-switch>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-btn block color="primary" :disabled="isTest" @click="endStep()">
              Next
            </v-btn>
          </v-col>
        </v-card>
      </v-stepper-content>
      <v-btn
        block
        color="success"
        elevation="2"
        v-if="check_button"
        @click="saveData()"
        >SAVE</v-btn
      >
    </v-stepper>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Photocell",

  data() {
    return {
      e6: 1,
      url: "https://hook.zubbsteel.com/line-ci/machine/",
      check_data: [],
      status: "",
      cleaning: "",
      id: "",
      doc_date: "",
      put_step1: false,
      put_step2: false,
      current_shift: "",
      current_date: "",
      show_report: false,
      //check_btn: false,
      motor: [],
      area1: [
        {
          head: "B001",
          photocell: "MATERIAL ON ROLLER TABLE DETECTION",
          status: "",
          cleaning: "",
        },
        {
          head: "B001",
          photocell: "ALIGNING ON DISAPPERING STOPPER",
          status: "",
          cleaning: "",
        },
        {
          head: "B001",
          photocell: "DETECTION BILLET FOR CLOSED CHARGING DOOR",
          status: "",
          cleaning: "",
        },
      ],
      area2: [
        { photocell: "PH0", status: "", cleaning: "" },
        { photocell: "PH0A", status: "", cleaning: "" },
        { photocell: "PH01", status: "", cleaning: "" },
        { photocell: "PH02", status: "", cleaning: "" },
        { photocell: "PH03", status: "", cleaning: "" },
        { photocell: "PH03A", status: "", cleaning: "" },
        { photocell: "PH04", status: "", cleaning: "" },
        { photocell: "PH05", status: "", cleaning: "" },
        { photocell: "PH05B", status: "", cleaning: "" },
        { photocell: "PH06", status: "", cleaning: "" },
        { photocell: "PH07", status: "", cleaning: "" },
        { photocell: "PH07B", status: "", cleaning: "" },
        { photocell: "PH08", status: "", cleaning: "" },
        { photocell: "PH09", status: "", cleaning: "" },
        { photocell: "PH10", status: "", cleaning: "" },
        { photocell: "PH11", status: "", cleaning: "" },
      ],
    };
  },
  methods: {
    //nextStep
    async nextStep() {
      console.clear();
      for (let i = 0; i < this.area1.length; i++) {
        //ตรวจสอบสภาพทั่วไป
        await this.checkStatArea1(i);
        //ตรวจสอบทำความสะอาด
        await this.checkCleanArea1(i);
        //เพิ่มเข้าไปใน Array
        this.area1[i] = {
          head: this.area1[i].head,
          photocell: this.area1[i].photocell,
          status: this.area1[i].status,
          cleaning: this.area1[i].cleaning,
        };
      }
      this.motor[0] = this.area1;
      console.log(this.motor[0]);
      this.putData_Step1();
      this.e6 = 2;
    },
    async endStep() {
      console.clear();
      for (let i = 0; i < this.area2.length; i++) {
        //ตรวจสอบสภาพทั่วไป
        await this.checkStatArea2(i);
        //ตรวจสอบทำความสะอาด
        await this.checkCleanArea2(i);
        //เพิ่มเข้าไปที่ Object
        this.area2[i] = {
          photocell: this.area2[i].photocell,
          status: this.area2[i].status,
          cleaning: this.area2[i].cleaning,
        };
        //console.log(this.area2[i])
      }
      this.motor[1] = this.area2;
      this.putData_Step2();
      this.e6 = 3;
      //console.log(this.motor[1]);
    },
    //Area 1
    checkStatArea1(i) {
      if (this.area1[i].status == true) {
        this.area1[i].status = "OK";
      }
      if (this.area1[i].status == false) {
        this.area1[i].status = "NO";
      }
    },
    //Area 2
    checkStatArea2(i) {
      if (this.area2[i].status == true) {
        this.area2[i].status = "OK";
      }
      if (this.area2[i].status == false) {
        this.area2[i].status = "NO";
      }
    },
    //Area 1
    checkCleanArea1(i) {
      if (this.area1[i].cleaning == true) {
        this.area1[i].cleaning = "OK";
      }
      if (this.area1[i].cleaning == false) {
        this.area1[i].cleaning = "NO";
      }
    },
    //Area 2
    checkCleanArea2(i) {
      if (this.area2[i].cleaning == true) {
        this.area2[i].cleaning = "OK";
      }
      if (this.area2[i].cleaning == false) {
        this.area2[i].cleaning = "NO";
      }
    },
    //post data step 1 ไปยัง table
    async putData_Step1() {
      await this.getData();
      await this.getPhotocell();
      //กำหนด object เพื่อเก็บข้อมูล
      const data_update = [];
      //ใช้ for ในการวนรับข้อมูลเข้า array ขึ้น database ตามรอบของ i
      for (let i = 0; i < this.motor[0].length; i++) {
        //กำหนด id เพื่อเป็น key ในการอัพเดทข้อมูล
        this.id = i + 1;
        data_update[i] = {
          id: this.photocell_length + 1 + i,
          status: this.motor[0][i].status,
          cleaning: this.motor[0][i].cleaning,
          form_id: 4,
          doc_id: this.doc_length + 1,
        };
        //post ขึ้น database ตามรอบของ i
        console.log(data_update[i]);
        axios.post(this.url + "photocell_insert", data_update[i]);
      }
      this.put_step1 = true;
      console.log("Push 1");
    },
    //post data step 2 ไปยัง table
    async putData_Step2() {
      await this.getData();
      await this.getPhotocell();
      const data_update = [];
      //ใช้ for ในการวนรับข้อมูลเข้า array ขึ้น database ตามรอบของ i
      for (let i = 0; i < this.motor[1].length; i++) {
        //กำหนด id เพื่อเป็น key ในการอัพเดทข้อมูล
        this.id = i + 4;
        data_update[i] = {
          id: this.photocell_length + 1 + i,
          status: this.motor[1][i].status,
          cleaning: this.motor[1][i].cleaning,
          form_id: 4,
          doc_id: this.doc_length + 1,
        };
        //post ขึ้น database ตามรอบของ i
        console.log(data_update[i]);
        axios.post(this.url + "photocell_insert", data_update[i]);
      }
      this.put_step2 = true;
      console.log("Push 2");
    },
    //บันทึกข้อมูลไป table header
    async saveData() {
      await this.getData();
      if (
        localStorage.getItem("docShift") == null ||
        localStorage.getItem("docShift") == "" ||
        localStorage.getItem("docShift") == "null"
      ) {
        alert("กรุณาเลือกเวลาการทำงาน !");
      } else {
        //กำหนด object เพื่อเก็บข้อมูล
        const data_insert = {
          doc_id: this.doc_length + 1,
          form_id: 4,
          lat: localStorage.getItem("current_lat"),
          long: localStorage.getItem("current_long"),
          user: localStorage.getItem("localUser"),
          doc_shift: localStorage.getItem("docShift"),
        };
        axios.post(this.url + "header_insert", data_insert);
        console.log("SAVE");
      }
    },
    //get machine_header เพื่อตรวจสอบ
    getData() {
      return axios
        .get(this.url + "header")
        .then((response) => (this.doc_length = response.data.length));
    },
    //รับค่าจำนวนของ table photocell เพื่อใช้เป็น Runtime
    getPhotocell() {
      return axios
        .get(this.url + "photocell")
        .then((response) => (this.photocell_length = response.data.length));
    },
    //รับค่า id จากฟอร์ม List
    getID() {
      //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล
      let current_doc = localStorage.getItem("current_doc");
      current_doc = JSON.parse(current_doc);
      //แสดงข้อมูลตาม id ที่ได้จากการเลือก list
      return axios
        .get(this.url + "photocell_id/" + current_doc.get_doc_id)
        .then((response) => (this.machine_data = response.data));
    },
    // ตรวจสอบค่า status ที่ได้และแสดงที่ step
    check_StatReverse(i) {
      if (this.machine_data[i].status == "OK") {
        this.machine_data[i].status = true;
      } else if (this.machine_data[i].status == "NO") {
        this.machine_data[i].status = false;
      }
    },
    // ตรวจสอบค่า cleaning ที่ได้และแสดงที่ step
    check_CleanReverse(i) {
      if (this.machine_data[i].cleaning == "OK") {
        this.machine_data[i].cleaning = true;
      } else if (this.machine_data[i].cleaning == "NO") {
        this.machine_data[i].cleaning = false;
      }
    },
    // รับค่าที่ได้จากฟอร์ม List ไปแสดงที่ Step
    async pushData() {
      //รับค่า id จากฟอร์ม List
      await this.getID();
      for (let i = 0; i < 3; i++) {
        await this.check_StatReverse(i);
        await this.check_CleanReverse(i);
        this.area1[i].status = this.machine_data[i].status;
        this.area1[i].cleaning = this.machine_data[i].cleaning;
      }
      for (let i = 0; i < 16; i++) {
        await this.check_StatReverse(i);
        await this.check_CleanReverse(i);
        this.area2[i].status = this.machine_data[i].status;
        this.area2[i].cleaning = this.machine_data[i].cleaning;
        //console.log(this.area2[i]);
      }
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
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    check_button() {
      //ตรวจสอบการกดปุ่้ม
      if (this.put_step1 == true && this.put_step2 == true) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return true;
      }
    },
  },
  created() {
    //เรียกใช้ function แสดงเวลา
    this.getTime();

    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล user
    let localUser = localStorage.getItem("localUser");
    this.firstname = localUser;

    if (localUser == null || localUser == "") {
      this.$router.replace({
        name: "Home",
        params: { next_page: this.$route.name },
      });
    } else {
      //localStorage.clear();
    }

    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล
    let watch_doc = localStorage.getItem("watch_doc");
    if (watch_doc == null || watch_doc == "") {
      console.log("ok");
    } else {
      this.pushData();
    }
    //ตรวจสอบว่าเข้าระบบมาด้วยวิธีอะไร
    if (localStorage.getItem("current_long") == null) {
      this.show_report = true;
    } else {
      this.show_report = false;
    }

    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูลของ document
    let current_doc = localStorage.getItem("current_doc");
    current_doc = JSON.parse(current_doc);

    // รับค่าที่ได้จากฟอร์ม List ไปแสดง
    this.current_shift = current_doc.get_doc_shift;
    this.current_date = current_doc.get_doc_date;
    this.isTest = current_doc.isTest;
  },
};
</script>
