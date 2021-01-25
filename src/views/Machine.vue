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
          <v-btn
            block
            elevation="1"
            x-large
            hide-details="auto"
            color="error"
            @click="exportPDF"
          >
            PDF - <v-icon large>mdi-printer</v-icon>
          </v-btn>
        </v-col>
      </v-row></v-card
    >
    <!--Area Machine-->
    <v-stepper v-model="e6" vertical>
      <!--AREA : JC31 : MOTOR CHANGING-->
      <v-stepper-step
        editable
        :complete="e6 > 1"
        step="1"
        @click="expand_step1 = !expand_step1"
      >
        <h3>AREA : JC31 : MOTOR CHANGING</h3>
      </v-stepper-step>

      <v-expand-transition>
        <v-stepper-content step="1" v-show="expand_step1">
          <v-card class="mb-12 mx-2" elevation="2" outlined>
            <v-row
              class="mx-2"
              v-for="(item, n) in area1"
              :key="n"
              align="center"
              justify="center"
            >
              <v-col cols="12" class="py-1">
                <h3 class="text-left">{{ item.machine }}</h3>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" sm="6" class="py-1 my-0">
                <v-row align="center" class="ml-1">
                  <v-col cols="5" class="pa-0 my-0">
                    <p class="my-0 text-left">สภาพทั่วไป</p></v-col
                  >
                  <v-col cols="7" class="pa-0 my-0">
                    <v-btn-toggle
                      v-model="item.status"
                      :readonly="isTest"
                      mandatory
                    >
                      <v-btn :color="Stat_Btn1(item)">
                        <v-icon :color="Stat_Icon1(item)"
                          >mdi-radiobox-blank</v-icon
                        >
                      </v-btn>
                      <v-btn :color="Stat_Btn2(item)">
                        <v-icon :color="Stat_Icon2(item)"
                          >mdi-check-circle-outline</v-icon
                        >
                      </v-btn>
                      <v-btn :color="Stat_Btn3(item)">
                        <v-icon :color="Stat_Icon3(item)"
                          >mdi-close-circle-outline</v-icon
                        >
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="py-1 my-0">
                <v-row align="center" class="ml-1">
                  <v-col cols="5" class="pa-0 my-0">
                    <p class="my-0 text-left">การหมุน</p></v-col
                  >
                  <v-col cols="5" class="pa-0 my-0">
                    <v-btn-toggle
                      :readonly="isTest"
                      v-model="item.rotation"
                      mandatory
                    >
                      <v-btn :color="Rote_Btn1(item)">
                        <v-icon :color="Rote_Icon1(item)"
                          >mdi-radiobox-blank</v-icon
                        >
                      </v-btn>
                      <v-btn :color="Rote_Btn2(item)">
                        <v-icon :color="Rote_Icon2(item)"
                          >mdi-check-circle-outline</v-icon
                        >
                      </v-btn>
                      <v-btn :color="Rote_Btn3(item)">
                        <v-icon :color="Rote_Icon3(item)"
                          >mdi-close-circle-outline</v-icon
                        >
                      </v-btn>
                    </v-btn-toggle></v-col
                  >
                </v-row>
              </v-col>
              <v-col cols="12" class="py-1">
                <v-textarea
                  class="pa-1 ma-0"
                  dense
                  auto-grow
                  filled
                  rows="1"
                  v-model="item.comment"
                  label="หมายเหตุ"
                  :disabled="isTest"
                  counter
                  maxlength="250"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-col cols="12">
              <v-btn
                block
                color="primary"
                :disabled="isTest"
                @click="nextStep_1"
              >
                Next
              </v-btn>
            </v-col>
          </v-card>
        </v-stepper-content>
      </v-expand-transition>
      <!--AREA : JC31 : MOTOR DISCHANGING-->
      <v-stepper-step
        editable
        :complete="e6 > 2"
        step="2"
        @click="expand_step2 = !expand_step2"
      >
        <h3>AREA : JE21 : MOTOR DISCHANGING</h3>
      </v-stepper-step>

      <v-expand-transition>
        <v-stepper-content step="2" v-show="expand_step2">
          <v-card class="mb-12 mx-2" elevation="2" outlined>
            <!--1-->
            <v-row
              class="mx-2"
              v-for="(item, n) in area2"
              :key="n"
              align="center"
              justify="center"
            >
              <v-col cols="12" class="py-1">
                <h3 class="text-left">{{ item.machine }}</h3>
                <v-divider></v-divider>
              </v-col>

              <v-col cols="12" sm="6" class="py-1 my-0">
                <v-row align="center" class="ml-1">
                  <v-col cols="5" class="pa-0 my-0">
                    <p class="my-0 text-left">สภาพทั่วไป</p></v-col
                  >
                  <v-col cols="7" class="pa-0 my-0">
                    <v-btn-toggle
                      :readonly="isTest"
                      v-model="item.status"
                      mandatory
                    >
                      <v-btn :color="Stat_Btn1(item)">
                        <v-icon :color="Stat_Icon1(item)"
                          >mdi-radiobox-blank</v-icon
                        >
                      </v-btn>
                      <v-btn :color="Stat_Btn2(item)">
                        <v-icon :color="Stat_Icon2(item)"
                          >mdi-check-circle-outline</v-icon
                        >
                      </v-btn>
                      <v-btn :color="Stat_Btn3(item)">
                        <v-icon :color="Stat_Icon3(item)"
                          >mdi-close-circle-outline</v-icon
                        >
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="py-1 my-0">
                <v-row align="center" class="ml-1">
                  <v-col cols="5" class="pa-0 my-0">
                    <p class="my-0 text-left">การหมุน</p></v-col
                  >
                  <v-col cols="5" class="pa-0 my-0">
                    <v-btn-toggle
                      :readonly="isTest"
                      v-model="item.rotation"
                      mandatory
                    >
                      <v-btn :color="Rote_Btn1(item)">
                        <v-icon :color="Rote_Icon1(item)"
                          >mdi-radiobox-blank</v-icon
                        >
                      </v-btn>
                      <v-btn :color="Rote_Btn2(item)">
                        <v-icon :color="Rote_Icon2(item)"
                          >mdi-check-circle-outline</v-icon
                        >
                      </v-btn>
                      <v-btn :color="Rote_Btn3(item)">
                        <v-icon :color="Rote_Icon3(item)"
                          >mdi-close-circle-outline</v-icon
                        >
                      </v-btn>
                    </v-btn-toggle></v-col
                  >
                </v-row>
              </v-col>
              <v-col cols="12" class="py-1">
                <v-textarea
                  class="my-0"
                  auto-grow
                  filled
                  rows="1"
                  v-model="item.comment"
                  label="หมายเหตุ"
                  :disabled="isTest"
                  counter
                  maxlength="250"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-col cols="12">
              <v-btn
                block
                color="primary"
                :disabled="isTest"
                @click="nextStep_2"
              >
                Next
              </v-btn>
            </v-col>
          </v-card>
        </v-stepper-content>
      </v-expand-transition>
      <!--รายการตรวจสอบเครื่องจักร-->
      <v-stepper-step
        editable
        :complete="e6 > 3"
        step="3"
        @click="expand_step3 = !expand_step3"
      >
        <h3>รายการตรวจสอบเครื่องจักร</h3>
      </v-stepper-step>

      <v-expand-transition>
        <v-stepper-content step="3" v-show="expand_step3">
          <v-card class="mb-12 mx-2" elevation="2" outlined>
            <v-row
              class="mx-2"
              v-for="(item, n) in area3"
              :key="n"
              align="center"
              justify="center"
            >
              <v-col cols="12" class="py-1">
                <h3 class="text-left">{{ item.bogie }} :</h3>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" sm="6" class="py-1 my-0">
                <v-text-field
                  class="text-center"
                  hide-details="auto"
                  v-model="item.bogies_set"
                  v-if="check_error"
                  :error="text_error"
                  label="SET (%)"
                  :disabled="isTest"
                  type="number"
                  outlined
                  :rules="[rules.require, rules.counter]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="py-1 my-0">
                <v-text-field
                  class="text-center"
                  hide-details="auto"
                  v-model="item.bogies_act"
                  v-if="check_error"
                  :error="text_error"
                  label="ACTUAL (%)"
                  :disabled="isTest"
                  type="number"
                  outlined
                  :rules="[rules.require, rules.counter]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="py-1 my-0">
                <v-row align="center" class="ml-1">
                  <v-col cols="5" class="pa-0 my-0">
                    <p class="my-0 text-left">สภาพทั่วไป</p></v-col
                  >
                  <v-col cols="7" class="pa-0 my-0">
                    <v-btn-toggle
                      :readonly="isTest"
                      v-model="item.status"
                      mandatory
                    >
                      <v-btn :color="Stat_Btn1(item)">
                        <v-icon :color="Stat_Icon1(item)"
                          >mdi-radiobox-blank</v-icon
                        >
                      </v-btn>
                      <v-btn :color="Stat_Btn2(item)">
                        <v-icon :color="Stat_Icon2(item)"
                          >mdi-check-circle-outline</v-icon
                        >
                      </v-btn>
                      <v-btn :color="Stat_Btn3(item)">
                        <v-icon :color="Stat_Icon3(item)"
                          >mdi-close-circle-outline</v-icon
                        >
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="py-1 my-0">
                <v-textarea
                  class="my-auto"
                  hide-details="auto"
                  v-model="item.comment"
                  auto-grow
                  filled
                  rows="1"
                  label="หมายเหตุ"
                  :disabled="isTest"
                  counter
                  maxlength="250"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-col cols="12">
              <v-btn
                block
                color="primary"
                v-if="check_number"
                :disabled="isTest"
                @click="nextStep_3"
              >
                Next
              </v-btn>
            </v-col>
          </v-card>
        </v-stepper-content>
      </v-expand-transition>
      <v-col cols="12">
        <v-textarea
          class="my-3 mx-1"
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
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import store from "../vuex/store";
//import "jspdf-customfonts";

export default {
  name: "Machine",
  store,
  data() {
    return {
      text_error: true,
      expand_step1: false,
      expand_step2: false,
      expand_step3: false,
      e6: 1,
      url: "https://hook.zubbsteel.com/line-ci/machine/",
      isTest: false,
      ex_comment: '',
      check_data: [],
      doc_date: "",
      put_step1: false,
      put_step2: false,
      put_step3: false,
      current_shift: "",
      current_date: "",
      show_report: false,
      //check_btn: false,
      //next_btn: false,
      section: [],
      area1: [
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F01VEF-M001)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F01VEF-M002)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F01VEF-M003)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F01VEF-M004)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F01VEF-M005)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F01VEF-M006)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F01VEF-M007)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F01VEF-M008)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F01VEF-M009)",
          status: "",
          rotation: "",
          comment: "",
        },
      ],
      area2: [
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F04VUF-M001)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F04VUF-M002)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F04VUF-M003)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F04VUF-M004)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F04VUF-M005)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F04VUF-M006)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F04VUF-M007)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F04VUF-M008)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F04VUF-M009)",
          status: "",
          rotation: "",
          comment: "",
        },
        {
          machine: "ตรวจเช็คสภาพของมอเตอร์ (JC31F04VUF-M010)",
          status: "",
          rotation: "",
          comment: "",
        },
      ],
      area3: [
        {
          bogie: "BOGIES #O MAGNETS CURRENT",
          status: "",
          bogies_set: "",
          bogies_act: "",
          comment: "",
        },
        {
          bogie: "BOGIES #A MAGNETS CURRENT",
          status: "",
          bogies_set: "",
          bogies_act: "",
          comment: "",
        },
        {
          bogie: "BOGIES #B MAGNETS CURRENT",
          status: "",
          bogies_set: "",
          bogies_act: "",
          comment: "",
        },
      ],
      rules: {
        require: (value) => !!value || "ข้อมูลนี้จำเป็นต้องกรอก",
        counter: (value) => value <= 1000 || "ใส่ค่า 0-1000 เท่านั้น",
      },
    };
  },
  methods: {
    //Change Color Status
    Stat_Btn1(item) {
      return item.status == 0 ? "grey" : "white";
    },
    Stat_Btn2(item) {
      return item.status == 1 ? "green accent-3" : "white";
    },
    Stat_Btn3(item) {
      return item.status == 2 ? "red accent-3" : "white";
    },
    Stat_Icon1(item) {
      return item.status == 0 ? "white" : "black";
    },
    Stat_Icon2(item) {
      return item.status == 1 ? "white" : "black";
    },
    Stat_Icon3(item) {
      return item.status == 2 ? "white" : "black";
    },
    //Change Color Rotation
    Rote_Btn1(item) {
      return item.rotation == 0 ? "grey" : "white";
    },
    Rote_Btn2(item) {
      return item.rotation == 1 ? "green accent-3" : "white";
    },
    Rote_Btn3(item) {
      return item.rotation == 2 ? "red accent-3" : "white";
    },
    Rote_Icon1(item) {
      return item.rotation == 0 ? "white" : "black";
    },
    Rote_Icon2(item) {
      return item.rotation == 1 ? "white" : "black";
    },
    Rote_Icon3(item) {
      return item.rotation == 2 ? "white" : "black";
    },
    set_Hint(item) {
      return item.bogies_set == 0 ? "white" : "black";
    },
    //nextStep 1
    async nextStep_1() {
      console.clear();
      for (let i = 0; i < this.area1.length; i++) {
        //เพิ่มเข้าไปใน Array
        this.area1[i] = {
          machine: this.area1[i].machine,
          status: this.area1[i].status,
          rotation: this.area1[i].rotation,
          comment: this.area1[i].comment,
        };
      }
      this.putData_Step1();
      this.e6 = 2;
    },
    //nextStep 2
    async nextStep_2() {
      console.clear();
      for (let i = 0; i < this.area2.length; i++) {
        //เพิ่มเข้าไปใน Array
        this.area2[i] = {
          machine: this.area2[i].machine,
          status: this.area2[i].status,
          rotation: this.area2[i].rotation,
          comment: this.area2[i].comment,
        };
      }
      this.putData_Step2();
      this.e6 = 3;
    },
    //nextStep 3
    async nextStep_3() {
      console.clear();
      for (let i = 0; i < this.area3.length; i++) {
        //เพิ่มเข้าไปใน Array
        this.area3[i] = {
          bogie: this.area3[i].bogie,
          bogies_set: this.area3[i].bogies_set,
          bogies_act: this.area3[i].bogies_act,
          status: this.area3[i].status,
          comment: this.area3[i].comment,
        };
      }
      this.putData_Step3();
      this.e6 = 4;
    },
    //Area ตรวจสอบสภาพทั่วไป
    check_Stat(i) {
      if (i < 9) {
        if (this.area1[i].status == 0) this.area1[i].status = "UNCHECK";
        if (this.area1[i].status == 1) this.area1[i].status = "OK";
        if (this.area1[i].status == 2) this.area1[i].status = "NO";
      } else if (i < 19) {
        if (this.area2[i - 9].status == 0) this.area2[i - 9].status = "UNCHECK";
        if (this.area2[i - 9].status == 1) this.area2[i - 9].status = "OK";
        if (this.area2[i - 9].status == 2) this.area2[i - 9].status = "NO";
      } else if (i < 22) {
        if (this.area3[i - 19].status == 0)
          this.area3[i - 19].status = "UNCHECK";
        if (this.area3[i - 19].status == 1) this.area3[i - 19].status = "OK";
        if (this.area3[i - 19].status == 2) this.area3[i - 19].status = "NO";
      }
    },
    //Area ตรวจสอบการหมุน
    check_Rote(i) {
      if (i < 9) {
        if (this.area1[i].rotation == 0) this.area1[i].rotation = "UNCHECK";
        if (this.area1[i].rotation == 1) this.area1[i].rotation = "OK";
        if (this.area1[i].rotation == 2) this.area1[i].rotation = "NO";
      } else if (i < 19) {
        if (this.area2[i - 9].rotation == 0) this.area2[i - 9].rotation = "UNCHECK";
        if (this.area2[i - 9].rotation == 1) this.area2[i - 9].rotation = "OK";
        if (this.area2[i - 9].rotation == 2) this.area2[i - 9].rotation = "NO";
      }
    },
    //Area แสดงสภาพทั่วไป
    check_StatReverse(i) {
      if (this.machine_data[i].status == "UNCHECK") this.machine_data[i].status = 0;
      if (this.machine_data[i].status == "OK") this.machine_data[i].status = 1;
      if (this.machine_data[i].status == "NO") this.machine_data[i].status = 2;
    },
    //Area แสดงการหมุน
    check_RoteReverse(i) {
      if (this.machine_data[i].rotation == "UNCHECK") this.machine_data[i].rotation = 0;
      if (this.machine_data[i].rotation == "OK") this.machine_data[i].rotation = 1;
      if (this.machine_data[i].rotation == "NO") this.machine_data[i].rotation = 2;
    },
    //post data step 1 ไปยัง table
    async putData_Step1() {
      await this.getData();
      //ใช้ for ในการวนรับข้อมูลเข้า array ขึ้น database ตามรอบของ i
      for (let i = 0; i < 9; i++) {
        this.check_Stat(i);
        this.check_Rote(i);
        //กำหนด id เพื่อเป็น key ในการอัพเดทข้อมูล
        this.section[i] = {
          id: i + 1,
          doc_id: this.doc_length + 1,
          status: this.area1[i].status,
          rotation: this.area1[i].rotation,
          comment: this.area1[i].comment,
          form_id: 1,
        };
      }
      //console.log(this.section);
      this.put_step1 = true;
    },
    //post data step 2 ไปยัง table
    async putData_Step2() {
      await this.getData();
      //await this.getMachine();
      //ใช้ for ในการวนรับข้อมูลเข้า array ขึ้น database ตามรอบของ i
      for (let i = 9; i < 19; i++) {
        this.check_Stat(i);
        this.check_Rote(i);
        //กำหนด id เพื่อเป็น key ในการอัพเดทข้อมูล
        this.section[i] = {
          id: i + 1,
          doc_id: this.doc_length + 1,
          status: this.area2[i - 9].status,
          rotation: this.area2[i - 9].rotation,
          comment: this.area2[i - 9].comment,
          form_id: 1,
        };
      }
      //console.log(this.section);
      this.put_step2 = true;
    },
    //post data step 3 ไปยัง table
    async putData_Step3() {
      await this.getData();
      //await this.getMachine();
      //ใช้ for ในการวนรับข้อมูลเข้า array ขึ้น database ตามรอบของ i
      for (let i = 19; i < 22; i++) {
        this.check_Stat(i);
        //กำหนด id เพื่อเป็น key ในการอัพเดทข้อมูล
        this.section[i] = {
          id: i + 1,
          doc_id: this.doc_length + 1,
          bogies_set: this.area3[i - 19].bogies_set,
          bogies_act: this.area3[i - 19].bogies_act,
          status: this.area3[i - 19].status,
          comment: this.area3[i - 19].comment,
          form_id: 1,
        };
      }
      //console.log(this.section);
      this.put_step3 = true;
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
          form_id: 1,
          lat: localStorage.getItem("current_lat"),
          long: localStorage.getItem("current_long"),
          user: localStorage.getItem("localUser"),
          doc_shift: localStorage.getItem("docShift"),
          ex_comment: this.ex_comment,
        };
        axios.post(this.url + "header_insert", data_insert);
        //console.log(data_insert);
        console.log("SAVE");
        await this.get_currentData();
          this.$fire({
            title: "สแกนสำเร็จ",
            type: "success",
            timer: 2000,
          }).then((r) => {
            console.log(r.value);
            location.reload();
          });
      }
    },
    async get_currentData(doc_watch) {
      for (let i = 0; i < 22; i++) {
        await axios.post(this.url + "machine_insert", this.section[i]);
        //console.log(this.section[i]);
      }
      var str = "" + (this.doc_length + 1);
      var pad = "0000";
      var answer = pad.substring(0, pad.length - str.length) + str;
      const data_store = {
        get_doc_id: answer,
        get_doc_shift: localStorage.getItem("docShift"),
        get_doc_date: new Date().toISOString().substr(0, 10),
        isTest: true,
      };
      doc_watch = null
      //เก็บค่า doc_watch ไว้ใน state
      this.$store.commit("setWatch", doc_watch);
      this.$store.commit("setDoc", data_store);
    },
    //รับค่าจำนวนของ table machine_header เพื่อใช้เป็น Runtime
    getData() {
      return axios
        .get(this.url + "header")
        .then((response) => (this.doc_length = response.data.length));
    },
    //รับค่าจำนวนของ table machine เพื่อใช้เป็น Runtime
    getMachine() {
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
    // รับค่าที่ได้จากฟอร์ม List ไปแสดงที่ Step
    async showData() {
      //รับค่า id จากฟอร์ม List
      await this.getID();
      await this.get_headerID();
      for (let i = 0; i < 9; i++) {
        await this.check_StatReverse(i);
        await this.check_RoteReverse(i);
        this.area1[i].status = this.machine_data[i].status;
        this.area1[i].rotation = this.machine_data[i].rotation;
        this.area1[i].comment = this.machine_data[i].comment;
      }
      for (let i = 9; i < 19; i++) {
        await this.check_StatReverse(i);
        await this.check_RoteReverse(i);
        this.area2[i - 9].status = this.machine_data[i].status;
        this.area2[i - 9].rotation = this.machine_data[i].rotation;
        this.area2[i - 9].comment = this.machine_data[i].comment;
      }
      for (let i = 19; i < 22; i++) {
        await this.check_StatReverse(i);
        await this.check_RoteReverse(i);
        this.area3[i - 19].bogies_set = this.machine_data[i].bogies_set;
        this.area3[i - 19].bogies_act = this.machine_data[i].bogies_act;
        this.area3[i - 19].status = this.machine_data[i].status;
        this.area3[i - 19].comment = this.machine_data[i].comment;
        //console.log(this.area3[i])
      }
      this.ex_comment = this.header_data.ex_comment;
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
    //รายงานเป็นรูปแบบ PDF
    async exportPDF() {
      //รับค่า id จากฟอร์ม List มาแสดงที่ PDF
      await this.getID();
      //รับค่า id จากฟอร์ม List
      await this.get_headerID();
      var doc = new jsPDF();
      //รูปภาพ Logo ZUBB
      var imgData =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACosAAALZCAYAAABlb4quAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF3WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wNC0wMlQwODowOTo1MyswNzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDQtMDJUMDg6MTM6MTArMDc6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDQtMDJUMDg6MTM6MTArMDc6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzc4NmY2YWQtZjQxZS1iYTQx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AAAAyJiyKAAAAAAAAAAAAEDGlEUBAAAAAAAAAAAAMqYsCgAAAAAAAAAAAJAxZVEAAAAAAAAAAACAjCmLAgAAAAAAAAAAAGRMWRQAAAAAAAAAAAAgY8qiAAAAAAAAAAAAABlTFgUAAAAAAAAAAADImLIoAAAAAAAAAAAAQMaURQEAAAAAAAAAAAAypiwKAAAAAAAAAAAAkDFlUQAAAAAAAAAAAICMKYsCAAAAAAAAAAAAZExZFAAAAAAAAAAAACBjyqIAAAAAAAAAAAAAGVMWBQAAAAAAAAAAAMiYsigAAAAAAAAAAABAxpRFAQAAAAAAAAAAADKmLAoAAAAAAAAAAACQMWVRAAAAAAAAAAAAgIwpiwIAAAAAAAAAAABkTFkUAAAAAAAAAAAAIGPKogAAAAAAAAAAAAAZUxYFAAAAAAAAAAAAyJiyKAAAAAAAAAAAAEDGlEUBAAAAAAAAAAAAMqYsCgAAAAAAAAAAAJAxZVEAAAAAAAAAAACAjCmLAgAAAAAAAAAAAGRMWRQAAAAAAAAAAAAgY8qiAAAAAAAAAAAAABlTFgUAAAAAAAAAAADImLIoAAAAAAAAAAAAQMaURQEAAAAAAAAAAAAypiwKAAAAAAAAAAAAkDFlUQAAAAAAAAAAAICMKYsCAAAAAAAAAAAAZExZFAAAAAAAAAAAACBjyqIAAAAAAAAAAAAAGVMWBQAAAAAAAAAAAMiYsigAAAAAAAAAAABAxpRFAQAAAAAAAAAAADKmLAoAAAAAAAAAAACQMWVRAAAAAAAAAAAAgIwpiwIAAAAAAAAAAABkTFkUAAAAAAAAAAAAIGPKogAAAAAAAAAAAAAZUxYFAAAAAAAAAAAAyJiyKAAAAAAAAAAAAEDGlEUBAAAAAAAAAAAAMqYsCgAAAAAAAAAAAJAxZVEAAAAAAAAAAACAjCmLAgAAAAAAAAAAAGRMWRQAAAAAAAAAAAAgY8qiAAAAAAAAAAAAABlTFgUAAAAAAAAAAADImLIoAAAAAAAAAAAAQMaURQEAAAAAAAAAAAAypiwKAAAAAAAAAAAAkDFlUQAAAAAAAAAAAICMKYsCAAAAAAAAAAAAZExZFAAAAAAAAAAAACBjyqIAAAAAAAAAAAAAGVMWBQAAAAAAAAAAAMiYsigAAAAAAAAAAABAxpRFAQAAAAAAAAAAADKmLAoAAAAAAAAAAACQ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AgAAAAAAAAAAAGRMLAoAAAAAAAAAAACQMbEoAAAAAAAAAAAAQMbEogAAAAAAAAAAAAAZE4sCAAAAAAAAAAAAZEwsCgAAAAAAAAAAAJAxsSgAAAAAAAAAAABAxsSiAAAAAAAAAAAAABkTiwIAAAAAAAAAAABkTCwKAAAAAAAAAAAAkDGxKAAAAAAAAAAAAEDGxKIAAAAAAAAAAAAAGROLAgAAAAAAAAAAAGRMLAoAAAAAAAAAAACQMbEoAAAAAAAAAAAAQMbEogAAAAAAAAAAAAAZE4sCAAAAAAAAAAAAZEwsCgAAAAAAAAAAAJAxsSgAAAAAAAAAAABAxsSiAAAAAAAAAAAAABkTiwIAAAAAAAAAAABkTCwKAAAAAAAAAAAAkDGxKAAAAAAAAAAAAEDGxKIAAAAAAAAAAAAAGROLAgAAAAAAAAAAAGRMLAoAAAAAAAAAAACQMbEoAAAAAAAAAAAAQMbEogAAAAAAAAAAAAAZE4sCAAAAAAAAAAAAZEwsCgAAAAAAAAAAAJAxsSgAAAAAAAAAAABAxsSiAAAAAAAAAAAAABkTiwIAAAAAAAAAAABkTCwKAAAAAAAAAAAAkDGxKAAAAAAAAAAAAEDGxKIAAAAAAAAAAAAAGROLAgAAAAAAAAAAAGRMLAoAAAAAAAAAAACQMbEoAAAAAAAAAAAAQMbEogAAAAAAAAAAAAAZE4sCAAAAAAAAAAAAZEwsCgAAAAAAAAAAAJAxsSgAAAAAAAAAAABAxsSiAAAAAAAAAAAAABkTiwIAAAAAAAAAAABkTCwKAAAAAAAAAAAAkDGxKAAAAAAAAAAAAEDGxKIAAAAAAAAAAAAAGROLAgAAAAAAAAAAAGRMLAoAAAAAAAAAAACQMbEoAAAAAAAAAAAAQMbEogAAAAAAAAAAAAAZE4sCAAAAAAAAAAAAZEwsCgAAAAAAAAAAAJAxsSgAAAAAAAAAAABAxsSiAAAAAAAAAAAAABkTiwIAAAAAAAAAAABkTCwKAAAAAAAAAAAAkDGxKAAAAAAAAAAAAEDGxKIAAAAAAAAAAAAAGROLAgAAAAAAAAAAAGRMLAoAAAAAAAAAAACQMbEoAAAAAAAAAAAAQMbEogAAAAAAAAAAAAAZE4sCAAAAAAAAAAAAZEwsCgAAAAAAAAAAAJAxsSgAAAAAAAAAAABAxsSiAAAAAAAAAAAAABkTiwIAAAAAAAAAAABkTCwKAAAAAAAAAAAAkDGxKAAAAAAAAAAAAEDGxKIAAAAAAAAAAAAAGROLAgAAAAAAAAAAAGRMLAoAAAAAAAAAAACQMbEoAAAAAAAAAAAAQMbEogAAAAAAAAAAAAAZE4sCAAAAAAAAAAAAZEwsCgAAAAAAAAAAAJAxsSgAAAAAAAAAAABAxsSiAAAAAAAAAAAAABkTiwIAAAAAAAAAAABkTCwKAAAAAAAAAAAAkDGxKAAAAAAAAAAAAEDGxKIAAAAAAAAAAAAAGROLAgAAAAAAAAAAAGRMLAoAAAAAAAAAAACQMbEoAAAAAAAAAAAAQMbEogAAAAAAAAAAAAAZE4sCAAAAAAAAAAAAZEwsCgAAAAAAAAAAAJAxsSgAAAAAAAAAAABAxsSiAAAAAAAAAAAAABkTiwIAAAAAAAAAAABkTCwKAAAAAAAAAAAAkDGxKAAAAAAAAAAAAEDGxKIAAAAAAAAAAAAAGROLAgAAAAAAAAAAAGRMLAoAAAAAAAAAAACQMbEoAAAAAAAAAAAAQMbEogAAAAAAAAAAAAAZE4sCAAAAAAAAAAAAZEwsCgAAAAAAAAAAAJAxsSgAAAAAAAAAAABAxsSiAAAAAAAAAAAAABkTiwIAAAAAAAAAAABkTCwKAAAAAAAAAAAAkDGxKAAAAAAAAAAAAEDGxKIAAAAAAAAAAAAAGROLAgAAAAAAAAAAAGRMLAoAAAAAAAAAAACQMbEoAAAAAAAAAAAAQMbEogAAAAAAAAAAAAAZE4sCAAAAAAAAAAAAZEwsCgAAAAAAAAAAAJAxsSgAAAAAAAAAAABAxsSiAAAAAAAAAAAAABkTiwIAAAAAAAAAAABkTCwKAAAAAAAAAAAAkDGxKAAAAAAAAAAAAEDGxKIAAAAAAAAAAAAAGTtzmN/UONUVEV3HPAoAAAAAQBojIyPxf8b/b+oxAAAAAACOxaFi0egSigIAAAAA+Zr/+eeY/H//lXoMAAAAAIBj4Rl6AAAAAAAAAAAAgIyJRQEAAAAAAAAAAAAyJhYFAAAAAAAAAAAAyJhYFAAAAAAAAAAAACBjYlEAAAAAAAAAAACAjIlFAQAAAAAAAAAAADImFgUAAAAAAAAAAADI2P8Hwj8hafCpxisAAAAASUVORK5CYII=";
      //หมายเลขเอกสาร กะการทำงาน และวันที่
      doc.addImage(imgData, "JPEG", 14, 10, 48, 12);
      doc.setFontSize(8);
      doc.text(165, 13, "Doc. No..........................");
      doc.text(165, 18, "SHIFT............................");
      doc.text(165, 23, "DATE.............................");
      doc.line(14, 25, 196, 25); // horizontal line

      /* API.addFont = function(postScriptName, fontName, fontStyle) {
        addFont(postScriptName, fontName, fontStyle, 'StandardEncoding');
      }; */

      //กำหนดและเพิ่ม Font ที่ต้องการใช้
      const myFont =
        "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ABIAEP/3ABMAEf/3ABQAEf/2ABUAEv/2ABYAE//1ABcAFP/1ABgAFf/0ABkAFv/0ABoAF//0ABsAF//zABwAGP/zAB0AGf/yAB4AGv/yAB8AG//xACAAHP/xACEAHf/wACIAHf/wACMAHv/vACQAH//vACUAIP/uACYAIf/uACcAIv/uACgAIv/tACkAI//tACoAJP/sACsAJf/sACwAJv/rAC0AJ//rAC4AKP/qAC8AKP/qADAAKf/pADEAKv/pADIAK//pADMALP/oADQALf/oADUALv/nADYALv/nADcAL//mADgAMP/mADkAMf/lADoAMv/lADsAM//kADwAM//kAD0ANP/jAD4ANf/jAD8ANv/jAEAAN//iAEEAOP/iAEIAOf/hAEMAOf/hAEQAOv/gAEUAO//gAEYAPP/fAEcAPf/fAEgAPv/eAEkAP//eAEoAP//dAEsAQP/dAEwAQf/dAE0AQv/cAE4AQ//cAE8ARP/bAFAARP/bAFEARf/aAFIARv/aAFMAR//ZAFQASP/ZAFUASf/YAFYASv/YAFcASv/XAFgAS//XAFkATP/XAFoATf/WAFsATv/WAFwAT//VAF0AUP/VAF4AUP/UAF8AUf/UAGAAUv/TAGEAU//TAGIAVP/SAGMAVf/SAGQAVf/SAGUAVv/RAGYAV//RAGcAWP/QAGgAWf/QAGkAWv/PAGoAW//PAGsAW//OAGwAXP/OAG0AXf/NAG4AXv/NAG8AX//MAHAAYP/MAHEAYf/MAHIAYf/LAHMAYv/LAHQAY//KAHUAZP/KAHYAZf/JAHcAZv/JAHgAZv/IAHkAZ//IAHoAaP/HAHsAaf/HAHwAav/GAH0Aa//GAH4AbP/GAH8AbP/FAIAAbf/FAIEAbv/EAIIAb//EAIMAcP/DAIQAcf/DAIUAcv/CAIYAcv/CAIcAc//BAIgAdP/BAIkAdf/AAIoAdv/AAIsAd//AAIwAd/+/AI0AeP+/AI4Aef++AI8Aev++AJAAe/+9AJEAfP+9AJIAff+8AJMAff+8AJQAfv+7AJUAf/+7AJYAgP+7AJcAgf+6AJgAgv+6AJkAg/+5AJoAg/+5AJsAhP+4AJwAhf+4AJ0Ahv+3AJ4Ah/+3AJ8AiP+2AKAAiP+2AKEAif+1AKIAiv+1AKMAi/+1AKQAjP+0AKUAjf+0AKYAjv+zAKcAjv+z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ADUARv/iADUASP/dADUATv/iADUAT//iADUAUP/iADUAUf/iADUAUv/iADUAU//iADUAVP/iADUAVv/iADUAV//iADUAWP/iADUAWf/iADUAWv/iADUAW//iADUAgv/YADUAg//YADUAhP/YADUAhf/YADUAhv/YADUAh//YADUAov/iADUAo//iADUApP/iADUApf/iADUApv/iADUAp//iADUAqP/iADUAqf/iADUAqv/iADUAq//iADUArP/iADUArf/iADUAsv/iADUAs//iADUAtP/iADUAtf/iADUAtv/iADUAt//iADUAuP/iADUAuv/iADUAu//iADUAvP/iADUAvf/iADUAvv/iADUAv//iADUAwf/iADUAxv/iADUAyP/iADUBdv/YADUBd//iADUBeP/YADUBef/iADUBev/YADUBe//iADUBfP/YADUBff/iADUBfv/YADUBf//iADUBgP/YADUBgf/iADUBgv/YADUBg//iADUBhP/YADUBhf/iADUBhv/YADUBh//iADUBiP/YADUBif/iADUBiv/YADUBi//iADUBjP/YADUBjf/iADUBj//iADUBkf/iADUBk//iADUBlf/iADUBl//iADUBmf/iADUBm//iADUBnf/iADUBo//iADUBpf/iADUBp//iADUBqf/iADUBq//iADUBrf/iADUBr//iADUBsf/iADUBs//iADUBtf/iADUBt//iADUBuf/iADUBu//iADUBvf/iADUBv//iADUBwf/iADUBw//iADUBxf/iADUBx//iADUByf/iADUBy//iADUBzf/iADUBz//iADUB0v/YADUB0//iADUB1f/iADUB1//iADUB2//dADUB4P/iADUB4v/iADUB5P/iADUB5v/iADcAIv/OADcAK//YADcARP/iADcARv/iADcASP/iADcAUP/iADcAUv/iADcAVP/sADcAgv/OADcAg//OADcAhP/OADcAhf/OADcAhv/OADcAh//OADcAqf/iADcAqv/iADcAq//iADcArP/iADcArf/iADcAsv/iADcAtP/iADcAtf/iADcAtv/iADcAt//iADcAuP/iADcAuv/iADcAxv/iADcAyP/sADcBdv/OADcBeP/OADcBev/OADcBfP/OADcBfv/OADcBgP/OADcBgv/OADcBhP/OADcBhv/OADcBiP/OADcBiv/OADcBjP/OADcBj//iADcBkf/iADcBk//iADcBlf/iADcBl//iADcBmf/iADcBm//iADcBnf/iADcBo//iADcBpf/iADcBp//iADcBqf/iADcBq//iADcBrf/iADcBr//iADcBsf/iADcBs//iADcBtf/iADcBt//iADcBuf/iADcB0v/OADcB1f/iADcB1//iADcB2//iADcB4P/sADcB5P/iADgAIv/TADgARP/sADgARv/sADgASP/sADgAUP/sADgAUv/sADgAVP/sADgAgv/TADgAg//TADgAhP/TADgAhf/TADgAhv/TADgAh//TADgAqf/sADgAqv/sADgAq//sADgArP/sADgArf/sADgAsv/sADgAtP/sADgAtf/sADgAtv/sADgAt//sADgAuP/sADgAuv/sADgAxv/sADgAyP/sADgBdv/TADgBeP/TADgBev/TADgBfP/TADgBfv/TADgBgP/TADgBgv/TADgBhP/TADgBhv/TADgBiP/TADgBiv/TADgBjP/TADgBj//sADgBkf/sADgBk//sADgBlf/sADgBl//sADgBmf/sADgBm//sADgBnf/sADgBo//sADgBpf/sADgBp//sADgBqf/sADgBq//sADgBrf/sADgBr//sADgBsf/sADgBs//sADgBtf/sADgBt//sADgBuf/sADgB0v/TADgB1f/sADgB1//sADgB2//sADgB4P/sADgB5P/sADoAIv/YADoAQv/sADoARP/nADoARv/nADoASP/nADoATv/sADoAT//sADoAUP/nADoAUf/sADoAUv/nADoAU//sADoAVP/nADoAVv/sADoAgv/YADoAg//YADoAhP/YADoAhf/YADoAhv/YADoAh//YADoAov/sADoAo//sADoApP/sADoApf/sADoApv/sADoAp//sADoAqP/sADoAqf/nADoAqv/nADoAq//nADoArP/nADoArf/nADoAsv/nADoAs//sADoAtP/nADoAtf/nADoAtv/nADoAt//nADoAuP/nADoAuv/nADoAu//sADoAvP/sADoAvf/sADoAvv/sADoAxv/nADoAyP/nADoBdv/YADoBd//sADoBeP/YADoBef/sADoBev/YADoBe//sADoBfP/YADoBff/sADoBfv/YADoBf//sADoBgP/YADoBgf/sADoBgv/YADoBg//sADoBhP/YADoBhf/sADoBhv/YADoBh//sADoBiP/YADoBif/sADoBiv/YADoBi//sADoBjP/YADoBjf/sADoBj//nADoBkf/nADoBk//nADoBlf/nADoBl//nADoBmf/nADoBm//nADoBnf/nADoBo//nADoBpf/nADoBp//nADoBqf/nADoBq//nADoBrf/nADoBr//nADoBsf/nADoBs//nADoBtf/nADoBt//nADoBuf/nADoBu//sADoBvf/sADoBv//sADoBwf/sADoBw//sADoBxf/sADoBx//sADoB0v/YADoB0//sADoB1f/nADoB1//nADoB2//nADoB4P/nADoB4v/sADoB5P/nADoB5v/sAIIANf/YAIIAN//OAIIAOP/TAIIAOv/YAIIAWv/xAIIAn//YAIIAv//xAIIAwf/xAIIAyf/YAIIByP/YAIIByf/xAIIByv/YAIIBy//xAIIBzP/YAIIBzf/xAIIBzv/YAIIBz//xAIMANf/YAIMAN//OAIMAOP/TAIMAOv/YAIMAWv/xAIMAn//YAIMAv//xAIMAwf/xAIMAyf/YAIMByP/YAIMByf/xAIMByv/YAIMBy//xAIMBzP/YAIMBzf/xAIMBzv/YAIMBz//xAIQANf/YAIQAN//OAIQAOP/TAIQAOv/YAIQAWv/xAIQAn//YAIQAv//xAIQAwf/xAIQAyf/YAIQByP/YAIQByf/xAIQByv/YAIQBy//xAIQBzP/YAIQBzf/xAIQBzv/YAIQBz//xAIUANf/YAIUAN//OAIUAOP/TAIUAOv/YAIUAWv/xAIUAn//YAIUAv//xAIUAwf/xAIUAyf/YAIUByP/YAIUByf/xAIUByv/YAIUBy//xAIUBzP/YAIUBzf/xAIUBzv/YAIUBz//xAIYANf/YAIYAN//OAIYAOP/TAIYAOv/YAIYAWv/xAIYAn//YAIYAv//xAIYAwf/xAIYAyf/YAIYByP/YAIYByf/xAIYByv/YAIYBy//xAIYBzP/YAIYBzf/xAIYBzv/YAIYBz//xAIcANf/YAIcAN//OAIcAOP/TAIcAOv/YAIcAWv/xAIcAn//YAIcAv//xAIcAwf/xAIcAyf/YAIcByP/YAIcByf/xAIcByv/YAIcBy//xAIcBzP/YAIcBzf/xAIcBzv/YAIcBz//xAJ8AIv/YAJ8AQv/sAJ8ARP/nAJ8ARv/nAJ8ASP/nAJ8ATv/sAJ8AT//sAJ8AUP/nAJ8AUf/sAJ8AUv/nAJ8AU//sAJ8AVP/nAJ8AVv/sAJ8Agv/YAJ8Ag//YAJ8AhP/YAJ8Ahf/YAJ8Ahv/YAJ8Ah//YAJ8Aov/sAJ8Ao//sAJ8ApP/sAJ8Apf/sAJ8Apv/sAJ8Ap//sAJ8AqP/sAJ8Aqf/nAJ8Aqv/nAJ8Aq//nAJ8ArP/nAJ8Arf/nAJ8Asv/nAJ8As//sAJ8AtP/nAJ8Atf/nAJ8Atv/nAJ8At//nAJ8AuP/nAJ8Auv/nAJ8Au//sAJ8AvP/sAJ8Avf/sAJ8Avv/sAJ8Axv/nAJ8AyP/nAJ8Bdv/YAJ8Bd//sAJ8BeP/YAJ8Bef/sAJ8Bev/YAJ8Be//sAJ8BfP/YAJ8Bff/sAJ8Bfv/YAJ8Bf//sAJ8BgP/YAJ8Bgf/sAJ8Bgv/YAJ8Bg//sAJ8BhP/YAJ8Bhf/sAJ8Bhv/YAJ8Bh//sAJ8BiP/YAJ8Bif/sAJ8Biv/YAJ8Bi//sAJ8BjP/YAJ8Bjf/sAJ8Bj//nAJ8Bkf/nAJ8Bk//nAJ8Blf/nAJ8Bl//nAJ8Bmf/nAJ8Bm//nAJ8Bnf/nAJ8Bo//nAJ8Bpf/nAJ8Bp//nAJ8Bqf/nAJ8Bq//nAJ8Brf/nAJ8Br//nAJ8Bsf/nAJ8Bs//nAJ8Btf/nAJ8Bt//nAJ8Buf/nAJ8Bu//sAJ8Bvf/sAJ8Bv//sAJ8Bwf/sAJ8Bw//sAJ8Bxf/sAJ8Bx//sAJ8B0v/YAJ8B0//sAJ8B1f/nAJ8B1//nAJ8B2//nAJ8B4P/nAJ8B4v/sAJ8B5P/nAJ8B5v/sAMkAIv/YAMkAQv/sAMkARP/nAMkARv/nAMkASP/nAMkATv/sAMkAT//sAMkAUP/nAMkAUf/sAMkAUv/nAMkAU//sAMkAVP/nAMkAVv/sAMkAgv/YAMkAg//YAMkAhP/YAMkAhf/YAMkAhv/YAMkAh//YAMkAov/sAMkAo//sAMkApP/sAMkApf/sAMkApv/sAMkAp//sAMkAqP/sAMkAqf/nAMkAqv/nAMkAq//nAMkArP/nAMkArf/nAMkAsv/nAMkAs//sAMkAtP/nAMkAtf/nAMkAtv/nAMkAt//nAMkAuP/nAMkAuv/nAMkAu//sAMkAvP/sAMkAvf/sAMkAvv/sAMkAxv/nAMkAyP/nAMkBdv/YAMkBd//sAMkBeP/YAMkBef/sAMkBev/YAMkBe//sAMkBfP/YAMkBff/sAMkBfv/YAMkBf//sAMkBgP/YAMkBgf/sAMkBgv/YAMkBg//sAMkBhP/YAMkBhf/sAMkBhv/YAMkBh//sAMkBiP/YAMkBif/sAMkBiv/YAMkBi//sAMkBjP/YAMkBjf/sAMkBj//nAMkBkf/nAMkBk//nAMkBlf/nAMkBl//nAMkBmf/nAMkBm//nAMkBnf/nAMkBo//nAMkBpf/nAMkBp//nAMkBqf/nAMkBq//nAMkBrf/nAMkBr//nAMkBsf/nAMkBs//nAMkBtf/nAMkBt//nAMkBuf/nAMkBu//sAMkBvf/sAMkBv//sAMkBwf/sAMkBw//sAMkBxf/sAMkBx//sAMkB0v/YAMkB0//sAMkB1f/nAMkB1//nAMkB2//nAMkB4P/nAMkB4v/sAMkB5P/nAMkB5v/sAREA1//iAREA2P/iAREA3f/sAREA3//iAREA4P/iAREA5v/iAREA+P/nAREA/P/sARIA1//iARIA2P/iARIA3f/sARIA3//iARIA4P/iARIA5v/sARIA+P/nARIA/P/sARMA1//iARMA2P/iARMA3f/sARMA3//iARMA4P/iARMA5v/iARMA+P/nARMA/P/sARQA1//iARQA2P/iARQA3f/sARQA3//iARQA4P/iARQA5v/iARQA+P/nARQA/P/sARUA1//iARUA2P/iARUA3f/sARUA3//iARUA4P/iARUA5v/iARUA+P/nARUA/P/sAXYANf/YAXYAN//OAXYAOP/TAXYAOv/YAXYAWv/xAXYAn//YAXYAv//xAXYAwf/xAXYAyf/YAXYByP/YAXYByf/xAXYByv/YAXYBy//xAXYBzP/YAXYBzf/xAXYBzv/YAXYBz//xAXgANf/YAXgAN//OAXgAOP/TAXgAOv/YAXgAWv/xAXgAn//YAXgAv//xAXgAwf/xAXgAyf/YAXgByP/YAXgByf/xAXgByv/YAXgBy//xAXgBzP/YAXgBzf/xAXgBzv/YAXgBz//xAXoANf/YAXoAN//OAXoAOP/TAXoAOv/YAXoAWv/xAXoAn//YAXoAv//xAXoAwf/xAXoAyf/YAXoByP/YAXoByf/xAXoByv/YAXoBy//xAXoBzP/YAXoBzf/xAXoBzv/YAXoBz//xAXwANf/YAXwAN//OAXwAOP/TAXwAOv/YAXwAWv/xAXwAn//YAXwAv//xAXwAwf/xAXwAyf/YAXwByP/YAXwByf/xAXwByv/YAXwBy//xAXwBzP/YAXwBzf/xAXwBzv/YAXwBz//xAX4ANf/YAX4AN//OAX4AOP/TAX4AOv/YAX4AWv/xAX4An//YAX4Av//xAX4Awf/xAX4Ayf/YAX4ByP/YAX4Byf/xAX4Byv/YAX4By//xAX4BzP/YAX4Bzf/xAX4Bzv/YAX4Bz//xAYAANf/YAYAAN//OAYAAOP/TAYAAOv/YAYAAWv/xAYAAn//YAYAAv//xAYAAwf/xAYAAyf/YAYAByP/YAYAByf/xAYAByv/YAYABy//xAYABzP/YAYABzf/xAYABzv/YAYABz//xAYIANf/YAYIAN//OAYIAOP/TAYIAOv/YAYIAWv/xAYIAn//YAYIAv//xAYIAwf/xAYIAyf/YAYIByP/YAYIByf/xAYIByv/YAYIBy//xAYIBzP/YAYIBzf/xAYIBzv/YAYIBz//xAYQANf/YAYQAN//OAYQAOP/TAYQAOv/YAYQAWv/xAYQAn//YAYQAv//xAYQAwf/xAYQAyf/YAYQByP/YAYQByf/xAYQByv/YAYQBy//xAYQBzP/YAYQBzf/xAYQBzv/YAYQBz//xAYYANf/YAYYAN//OAYYAOP/TAYYAOv/YAYYAWv/xAYYAn//YAYYAv//xAYYAwf/xAYYAyf/YAYYByP/YAYYByf/xAYYByv/YAYYBy//xAYYBzP/YAYYBzf/xAYYBzv/YAYYBz//xAYgANf/YAYgAN//OAYgAOP/TAYgAOv/YAYgAWv/xAYgAn//YAYgAv//xAYgAwf/xAYgAyf/YAYgByP/YAYgByf/xAYgByv/YAYgBy//xAYgBzP/YAYgBzf/xAYgBzv/YAYgBz//xAYoANf/YAYoAN//OAYoAOP/TAYoAOv/YAYoAWv/xAYoAn//YAYoAv//xAYoAwf/xAYoAyf/YAYoByP/YAYoByf/xAYoByv/YAYoBy//xAYoBzP/YAYoBzf/xAYoBzv/YAYoBz//xAYwANf/YAYwAN//OAYwAOP/TAYwAOv/YAYwAWv/xAYwAn//YAYwAv//xAYwAwf/xAYwAyf/YAYwByP/YAYwByf/xAYwByv/YAYwBy//xAYwBzP/YAYwBzf/xAYwBzv/YAYwBz//xAcgAIv/YAcgAQv/sAcgARP/nAcgARv/nAcgASP/nAcgATv/sAcgAT//sAcgAUP/nAcgAUf/sAcgAUv/nAcgAU//sAcgAVP/nAcgAVv/sAcgAgv/YAcgAg//YAcgAhP/YAcgAhf/YAcgAhv/YAcgAh//YAcgAov/sAcgAo//sAcgApP/sAcgApf/sAcgApv/sAcgAp//sAcgAqP/sAcgAqf/nAcgAqv/nAcgAq//nAcgArP/nAcgArf/nAcgAsv/nAcgAs//sAcgAtP/nAcgAtf/nAcgAtv/nAcgAt//nAcgAuP/nAcgAuv/nAcgAu//sAcgAvP/sAcgAvf/sAcgAvv/sAcgAxv/nAcgAyP/nAcgBdv/YAcgBd//sAcgBeP/YAcgBef/sAcgBev/YAcgBe//sAcgBfP/YAcgBff/sAcgBfv/YAcgBf//sAcgBgP/YAcgBgf/sAcgBgv/YAcgBg//sAcgBhP/YAcgBhf/sAcgBhv/YAcgBh//sAcgBiP/YAcgBif/sAcgBiv/YAcgBi//sAcgBjP/YAcgBjf/sAcgBj//nAcgBkf/nAcgBk//nAcgBlf/nAcgBl//nAcgBmf/nAcgBm//nAcgBnf/nAcgBo//nAcgBpf/nAcgBp//nAcgBqf/nAcgBq//nAcgBrf/nAcgBr//nAcgBsf/nAcgBs//nAcgBtf/nAcgBt//nAcgBuf/nAcgBu//sAcgBvf/sAcgBv//sAcgBwf/sAcgBw//sAcgBxf/sAcgBx//sAcgB0v/YAcgB0//sAcgB1f/nAcgB1//nAcgB2//nAcgB4P/nAcgB4v/sAcgB5P/nAcgB5v/sAcoAIv/YAcoAQv/sAcoARP/nAcoARv/nAcoASP/nAcoATv/sAcoAT//sAcoAUP/nAcoAUf/sAcoAUv/nAcoAU//sAcoAVP/nAcoAVv/sAcoAgv/YAcoAg//YAcoAhP/YAcoAhf/YAcoAhv/YAcoAh//YAcoAov/sAcoAo//sAcoApP/sAcoApf/sAcoApv/sAcoAp//sAcoAqP/sAcoAqf/nAcoAqv/nAcoAq//nAcoArP/nAcoArf/nAcoAsv/nAcoAs//sAcoAtP/nAcoAtf/nAcoAtv/nAcoAt//nAcoAuP/nAcoAuv/nAcoAu//sAcoAvP/sAcoAvf/sAcoAvv/sAcoAxv/nAcoAyP/nAcoBdv/YAcoBd//sAcoBeP/YAcoBef/sAcoBev/YAcoBe//sAcoBfP/YAcoBff/sAcoBfv/YAcoBf//sAcoBgP/YAcoBgf/sAcoBgv/YAcoBg//sAcoBhP/YAcoBhf/sAcoBhv/YAcoBh//sAcoBiP/YAcoBif/sAcoBiv/YAcoBi//sAcoBjP/YAcoBjf/sAcoBj//nAcoBkf/nAcoBk//nAcoBlf/nAcoBl//nAcoBmf/nAcoBm//nAcoBnf/nAcoBo//nAcoBpf/nAcoBp//nAcoBqf/nAcoBq//nAcoBrf/nAcoBr//nAcoBsf/nAcoBs//nAcoBtf/nAcoBt//nAcoBuf/nAcoBu//sAcoBvf/sAcoBv//sAcoBwf/sAcoBw//sAcoBxf/sAcoBx//sAcoB0v/YAcoB0//sAcoB1f/nAcoB1//nAcoB2//nAcoB4P/nAcoB4v/sAcoB5P/nAcoB5v/sAcwAIv/YAcwAQv/sAcwARP/nAcwARv/nAcwASP/nAcwATv/sAcwAT//sAcwAUP/nAcwAUf/sAcwAUv/nAcwAU//sAcwAVP/nAcwAVv/sAcwAgv/YAcwAg//YAcwAhP/YAcwAhf/YAcwAhv/YAcwAh//YAcwAov/sAcwAo//sAcwApP/sAcwApf/sAcwApv/sAcwAp//sAcwAqP/sAcwAqf/nAcwAqv/nAcwAq//nAcwArP/nAcwArf/nAcwAsv/nAcwAs//sAcwAtP/nAcwAtf/nAcwAtv/nAcwAt//nAcwAuP/nAcwAuv/nAcwAu//sAcwAvP/sAcwAvf/sAcwAvv/sAcwAxv/nAcwAyP/nAcwBdv/YAcwBd//sAcwBeP/YAcwBef/sAcwBev/YAcwBe//sAcwBfP/YAcwBff/sAcwBfv/YAcwBf//sAcwBgP/YAcwBgf/sAcwBgv/YAcwBg//sAcwBhP/YAcwBhf/sAcwBhv/YAcwBh//sAcwBiP/YAcwBif/sAcwBiv/YAcwBi//sAcwBjP/YAcwBjf/sAcwBj//nAcwBkf/nAcwBk//nAcwBlf/nAcwBl//nAcwBmf/nAcwBm//nAcwBnf/nAcwBo//nAcwBpf/nAcwBp//nAcwBqf/nAcwBq//nAcwBrf/nAcwBr//nAcwBsf/nAcwBs//nAcwBtf/nAcwBt//nAcwBuf/nAcwBu//sAcwBvf/sAcwBv//sAcwBwf/sAcwBw//sAcwBxf/sAcwBx//sAcwB0v/YAcwB0//sAcwB1f/nAcwB1//nAcwB2//nAcwB4P/nAcwB4v/sAcwB5P/nAcwB5v/sAc4AIv/YAc4AQv/sAc4ARP/nAc4ARv/nAc4ASP/nAc4ATv/sAc4AT//sAc4AUP/nAc4AUf/sAc4AUv/nAc4AU//sAc4AVP/nAc4AVv/sAc4Agv/YAc4Ag//YAc4AhP/YAc4Ahf/YAc4Ahv/YAc4Ah//YAc4Aov/sAc4Ao//sAc4ApP/sAc4Apf/sAc4Apv/sAc4Ap//sAc4AqP/sAc4Aqf/nAc4Aqv/nAc4Aq//nAc4ArP/nAc4Arf/nAc4Asv/nAc4As//sAc4AtP/nAc4Atf/nAc4Atv/nAc4At//nAc4AuP/nAc4Auv/nAc4Au//sAc4AvP/sAc4Avf/sAc4Avv/sAc4Axv/nAc4AyP/nAc4Bdv/YAc4Bd//sAc4BeP/YAc4Bef/sAc4Bev/YAc4Be//sAc4BfP/YAc4Bff/sAc4Bfv/YAc4Bf//sAc4BgP/YAc4Bgf/sAc4Bgv/YAc4Bg//sAc4BhP/YAc4Bhf/sAc4Bhv/YAc4Bh//sAc4BiP/YAc4Bif/sAc4Biv/YAc4Bi//sAc4BjP/YAc4Bjf/sAc4Bj//nAc4Bkf/nAc4Bk//nAc4Blf/nAc4Bl//nAc4Bmf/nAc4Bm//nAc4Bnf/nAc4Bo//nAc4Bpf/nAc4Bp//nAc4Bqf/nAc4Bq//nAc4Brf/nAc4Br//nAc4Bsf/nAc4Bs//nAc4Btf/nAc4Bt//nAc4Buf/nAc4Bu//sAc4Bvf/sAc4Bv//sAc4Bwf/sAc4Bw//sAc4Bxf/sAc4Bx//sAc4B0v/YAc4B0//sAc4B1f/nAc4B1//nAc4B2//nAc4B4P/nAc4B4v/sAc4B5P/nAc4B5v/sAdIANf/YAdIAN//OAdIAOP/TAdIAOv/YAdIAWv/xAdIAn//YAdIAv//xAdIAwf/xAdIAyf/YAdIByP/YAdIByf/xAdIByv/YAdIBy//xAdIBzP/YAdIBzf/xAdIBzv/YAdIBz//xAAAAHQFiAAEAAAAAAAAA0wAAAAEAAAAAAAEADQDTAAEAAAAAAAIABwDgAAEAAAAAAAMANwDnAAEAAAAAAAQADQEeAAEAAAAAAAUAEQErAAEAAAAAAAYADAE8AAEAAAAAAAgAJwFIAAEAAAAAAAkAFAFvAAEAAAAAAAoBigGDAAEAAAAAAAwAGAMNAAEAAAAAAA0JZgMlAAEAAAAAABAADQyLAAEAAAAAABEABwyYAAEAAAAAABIADQyfAAMAAQQJAAABpgysAAMAAQQJAAEAGg5SAAMAAQQJAAIADg5sAAMAAQQJAAMAbg56AAMAAQQJAAQAGg7oAAMAAQQJAAUAIg8CAAMAAQQJAAYAGA8kAAMAAQQJAAgATg88AAMAAQQJAAkAKA+KAAMAAQQJAAoDFA+yAAMAAQQJAAwAMBLGAAMAAQQJAA0SzBL2AAMAAQQJABAAGiXCAAMAAQQJABEADiXcQ29weXJpZ2h0IChjKSAyMDA2IGJ5IERlcGFydG1lbnQgb2YgSW50ZWxsZWN0dWFsIFByb3BlcnR5IChESVApLCBNaW5pc3RyeSBvZiBDb21tZXJjZSBhbmQgU29mdHdhcmUgSW5kdXN0cnkgUHJvbW90aW9uIEFnZW5jeSAoUHVibGljIE9yZ2FuaXphdGlvbikgKFNJUEEpLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KQ3JlYXRlZCBieSA6IFN1cHBha2l0IENIQUxFUk1MQVJQLlRIIFNhcmFidW5QU0tSZWd1bGFyU3VwcGFraXRDaGFsZXJtbGFycC5QU0suRGVzaWduTFRELjogVEggU2FyYWJ1blBTSzogMjAwNlRIIFNhcmFidW5QU0tWZXJzaW9uIDEuMSAgMjAwNlRIU2FyYWJ1blBTS1N1cHBha2l0IENoYWxlcm1sYXJwLiAgUFNLLiBEZXNpZ24gTFRELlN1cHBha2l0IENIQUxFUk1MQVJQUFNLIGlzIGEgdHJhZGVtYXJrIG9mIFBTSy4gRGVzaWduIExURC4NClBTSy4gRGVzaWduIExURC4gaXMgYSB0cmFkZW1hcmsgb2YNClB1dHRoYXBvcm4gVGhvbmdzdWssDQpTdXBwYWtpaiBDaGFsZXJtbGFycCwNCkthbW9ud2FuIENoYWxlcm1sYXJwLA0KJiBSdXhzaW4gQWR2ZXJ0aXNpbmcgTFRELiAoUlNBRCkNCg0KUFNLLiBEZXNpZ24gTFRELiBjYW4gYmUgY29udGFjdGVkIGF0Og0KDQpUaGFpbGFuZCAoKzY2KSAgVGVsLjAgMzg0NSA1NDI4IEZheC4wIDM4NDUgNTM1OQ0KZSBtYWlsIDogcHNrZm9udEB5YWhvby5jb20NCg0KVHlwZWZhY2UgKGMpIFN1cHBha2lqIENoYWxlcm1sYXJwLg0KRGF0YSAoYykgU3VwcGFraWogQ2hhbGVybWxhcnAuDQoyMDA2LiBBbGwgcmlnaHRzIHJlc2VydmVkLm1haWx0bzpwc2tmb250QHlhaG9vLmNvbUZvbnQgQ29tcHV0ZXIgUHJvZ3JhbSBMaWNlbnNlIEFncmVlbWVudA0NUmVzZXJ2ZWQgRm9udCBOYW1lcyBmb3IgdGhpcyBGb250IENvbXB1dGVyIFByb2dyYW06DVRIIEtydWIsIFRIIEtydWIgSXRhbGljLCBUSCBLcnViIEJvbGQsIFRIIEtydWIgQm9sZCBJdGFsaWMsDVRIIE5pcmFtaXQgQVMsIFRIIE5pcmFtaXQgQVMgSXRhbGljLCBUSCBOaXJhbWl0IEFTIEJvbGQsIFRIIE5pcmFtaXQgQVMgQm9sZCBJdGFsaWMsDVRIIEtvZGNoYXNhbCwgVEggS29kY2hhc2FsIEl0YWxpYywgVEggS29kY2hhc2FsIEJvbGQsIFRIIEtvZGNoYXNhbCBCb2xkIEl0YWxpYywNVEggU2FyYWJ1biBQU0ssIFRIIFNhcmFidW4gUFNLIEl0YWxpYywgVEggU2FyYWJ1biBQU0sgQm9sZCwgVEggU2FyYWJ1biBQU0sgQm9sZCBJdGFsaWMsDVRIIEsyRCBKdWx5OCwgVEggSzJEIEp1bHk4IEl0YWxpYywgVEggSzJEIEp1bHk4IEJvbGQsIFRIIEsyRCBKdWx5OCBCb2xkIEl0YWxpYywNVEggTWFsaSBHcmFkZSA2LCBUSCBNYWxpIEdyYWRlIDYgSXRhbGljLCBUSCBNYWxpIEdyYWRlIDYgQm9sZCwgVEggTWFsaSBHcmFkZSA2IEJvbGQgSXRhbGljLA1USCBDaGFrcmEgUGV0Y2gsIFRIIENoYWtyYSBQZXRjaCBJdGFsaWMsIFRIIENoYWtyYSBQZXRjaCBCb2xkLCBUSCBDaGFrcmEgUGV0Y2ggQm9sZCBJdGFsaWMsDVRIIEJhaWphbSwgVEggQmFpamFtIEl0YWxpYywgVEggQmFpamFtIEJvbGQsIFRIIEJhaWphbSBCb2xkIEl0YWxpYywNVEggS29IbywgVEggS29IbyBJdGFsaWMsIFRIIEtvSG8gQm9sZCwgVEggS29IbyBCb2xkIEl0YWxpYywNVEggRmFoIEt3YW5nLCBUSCBGYWggS3dhbmcgSXRhbGljLCBUSCBGYWggS3dhbmcgQm9sZCwgVEggRmFoIEt3YW5nIEJvbGQgSXRhbGljLg0NVGhpcyBGb250IENvbXB1dGVyIFByb2dyYW0gaXMgdGhlIGNvcHlyaWdodCBvZiB0aGUgRGVwYXJ0bWVudCBvZiBJbnRlbGxlY3R1YWwgUHJvcGVydHkgKERJUCksIE1pbmlzdHJ5IG9mIENvbW1lcmNlIGFuZCB0aGUgU29mdHdhcmUgSW5kdXN0cnkgUHJvbW90aW9uIEFnZW5jeSAoUHVibGljIE9yZ2FuaXphdGlvbikgKFNJUEEpIA0NVGhlIHB1cnBvc2VzIG9mIHRoaXMgRm9udCBDb21wdXRlciBQcm9ncmFtIExpY2Vuc2UgYXJlIHRvIHN0aW11bGF0ZSB3b3JsZHdpZGUgZGV2ZWxvcG1lbnQgb2YgY29vcGVyYXRpdmUgZm9udCBjcmVhdGlvbiwgdG8gYmVuZWZpdCBmb3IgYWNhZGVtaWMsIHRvIHNoYXJlIGFuZCB0byBkZXZlbG9wIGluIHBhcnRuZXJzaGlwIHdpdGggb3RoZXJzLg0NVGVybSBhbmQgQ29uZGl0aW9uIG9mIHRoZSBGb250IENvbXB1dGVyIFByb2dyYW0NDSgxKSBBbGxvdyB0byB1c2Ugd2l0aG91dCBhbnkgY2hhcmdlcyBhbmQgYWxsb3cgdG8gcmVwcm9kdWNlLCBzdHVkeSwgYWRhcHQgYW5kIGRpc3RyaWJ1dGUgdGhpcyBGb250IENvbXB1dGVyIFByb2dyYW0uIE5laXRoZXIgdGhlIG9yaWdpbmFsIHZlcnNpb24gbm9yIGFkYXB0ZWQgdmVyc2lvbiBvZiBGb250IENvbXB1dGVyIFByb2dyYW0gbWF5IGJlIHNvbGQgYnkgaXRzZWxmLCBleGNlcHQgYnVuZGxlZCBhbmQvb3Igc29sZCB3aXRoIGFueSBjb21wdXRlciBwcm9ncmFtLg0NKDIpIElmIHlvdSB3aXNoIHRvIGFkYXB0IHRoaXMgRm9udCBDb21wdXRlciBQcm9ncmFtLCB5b3UgbXVzdCBub3RpZnkgY29weXJpZ2h0IG93bmVycyAoRElQICYgU0lQQSkgaW4gd3JpdGluZy4NDSgzKSBObyBhZGFwdGVkIHZlcnNpb24gb2YgRm9udCBDb21wdXRlciBQcm9ncmFtIG1heSB1c2UgdGhlIFJlc2VydmVkIEZvbnQgTmFtZShzKSwgdGhlIG5hbWUocykgb2YgdGhlIGNvcHlyaWdodCBvd25lcnMgYW5kIHRoZSBhdXRob3Iocykgb2YgdGhlIEZvbnQgQ29tcHV0ZXIgUHJvZ3JhbSBtdXN0IG5vdCBiZSB1c2VkIHRvIHByb21vdGUgb3IgYWR2ZXJ0aXNlIGFueSBhZGFwdGVkIHZlcnNpb24sIGV4Y2VwdCBvYnRhaW5pbmcgd3JpdHRlbiBwZXJtaXNzaW9uIGZyb20gY29weXJpZ2h0IG93bmVycyBhbmQgdGhlIGF1dGhvcihzKS4NDSg0KSBUaGUgYWRhcHRlZCB2ZXJzaW9uIG9mIEZvbnQgQ29tcHV0ZXIgUHJvZ3JhbSBtdXN0IGJlIHJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtIGFuZCBjb25kaXRpb24gb2YgdGhpcyBsaWNlbnNlLg0NRElTQ0xBSU1FUg1USEUgRk9OVCBDT01QVVRFUiBQUk9HUkFNIEFORCBSRUxBVEVEIEZJTEVTIEFSRSBQUk9WSURFRCA/QVMgSVM/IEFORCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELiAgTk8gR1VBUkFOVEVFUyBBUkUgTUFERSBUSEFUIFRISVMgRk9OVCBDT01QVVRFUiBQUk9HUkFNIFdJTEwgV09SSyBBUyBFWFBFQ1RFRCBPUiBXSUxMIEJFIERFVkVMT1BFRCBGVVJUSFVSIElOIEFOWSBTUEVDSUZJQyBXQVkuICBUSEVSRSBJUyBOTyBPRkZFUiBPUiBHVUFSQU5URUUgT0YgVEVDSE5JQ0FMIFNVUFBPUlQuIFRIIFNhcmFidW5QU0tSZWd1bGFyVEggU2FyYWJ1blBTSwBDAG8AcAB5AHIAaQBnAGgAdAAgACgAYwApACAAMgAwADAANgAgAGIAeQAgAEQAZQBwAGEAcgB0AG0AZQBuAHQAIABvAGYAIABJAG4AdABlAGwAbABlAGMAdAB1AGEAbAAgAFAAcgBvAHAAZQByAHQAeQAgACgARABJAFAAKQAsACAATQBpAG4AaQBzAHQAcgB5ACAAbwBmACAAQwBvAG0AbQBlAHIAYwBlACAAYQBuAGQAIABTAG8AZgB0AHcAYQByAGUAIABJAG4AZAB1AHMAdAByAHkAIABQAHIAbwBtAG8AdABpAG8AbgAgAEEAZwBlAG4AYwB5ACAAKABQAHUAYgBsAGkAYwAgAE8AcgBnAGEAbgBpAHoAYQB0AGkAbwBuACkAIAAoAFMASQBQAEEAKQAuACAAQQBsAGwAIAByAGkAZwBoAHQAcwAgAHIAZQBzAGUAcgB2AGUAZAAuAA0ACgBDAHIAZQBhAHQAZQBkACAAYgB5ACAAOgAgAFMAdQBwAHAAYQBrAGkAdAAgAEMASABBAEwARQBSAE0ATABBAFIAUAAuAFQASAAgAFMAYQByAGEAYgB1AG4AUABTAEsAUgBlAGcAdQBsAGEAcgBTAHUAcABwAGEAawBpAHQAQwBoAGEAbABlAHIAbQBsAGEAcgBwAC4AUABTAEsALgBEAGUAcwBpAGcAbgBMAFQARAAuADoAIABUAEgAIABTAGEAcgBhAGIAdQBuAFAAUwBLADoAIAAyADAAMAA2AFQASAAgAFMAYQByAGEAYgB1AG4AUABTAEsAVgBlAHIAcwBpAG8AbgAgADEALgAxACAAIAAyADAAMAA2AFQASABTAGEAcgBhAGIAdQBuAFAAUwBLAFMAdQBwAHAAYQBrAGkAdAAgAEMAaABhAGwAZQByAG0AbABhAHIAcAAuACAAIABQAFMASwAuACAARABlAHMAaQBnAG4AIABMAFQARAAuAFMAdQBwAHAAYQBrAGkAdAAgAEMASABBAEwARQBSAE0ATABBAFIAUABQAFMASwAgAGkAcwAgAGEAIAB0AHIAYQBkAGUAbQBhAHIAawAgAG8AZgAgAFAAUwBLAC4AIABEAGUAcwBpAGcAbgAgAEwAVABEAC4ADQAKAFAAUwBLAC4AIABEAGUAcwBpAGcAbgAgAEwAVABEAC4AIABpAHMAIABhACAAdAByAGEAZABlAG0AYQByAGsAIABvAGYADQAKAFAAdQB0AHQAaABhAHAAbwByAG4AIABUAGgAbwBuAGcAcwB1AGsALAANAAoAUwB1AHAAcABhAGsAaQBqACAAQwBoAGEAbABlAHIAbQBsAGEAcgBwACwADQAKAEsAYQBtAG8AbgB3AGEAbgAgAEMAaABhAGwAZQByAG0AbABhAHIAcAAsAA0ACgAmACAAUgB1AHgAcwBpAG4AIABBAGQAdgBlAHIAdABpAHMAaQBuAGcAIABMAFQARAAuACAAKABSAFMAQQBEACkADQAKAA0ACgBQAFMASwAuACAARABlAHMAaQBnAG4AIABMAFQARAAuACAAYwBhAG4AIABiAGUAIABjAG8AbgB0AGEAYwB0AGUAZAAgAGEAdAA6AA0ACgANAAoAVABoAGEAaQBsAGEAbgBkACAAKAArADYANgApACAAIABUAGUAbAAuADAAIAAzADgANAA1ACAANQA0ADIAOAAgAEYAYQB4AC4AMAAgADMAOAA0ADUAIAA1ADMANQA5AA0ACgBlACAAbQBhAGkAbAAgADoAIABwAHMAawBmAG8AbgB0AEAAeQBhAGgAbwBvAC4AYwBvAG0ADQAKAA0ACgBUAHkAcABlAGYAYQBjAGUAIAAoAGMAKQAgAFMAdQBwAHAAYQBrAGkAagAgAEMAaABhAGwAZQByAG0AbABhAHIAcAAuAA0ACgBEAGEAdABhACAAKABjACkAIABTAHUAcABwAGEAawBpAGoAIABDAGgAYQBsAGUAcgBtAGwAYQByAHAALgANAAoAMgAwADAANgAuACAAQQBsAGwAIAByAGkAZwBoAHQAcwAgAHIAZQBzAGUAcgB2AGUAZAAuAG0AYQBpAGwAdABvADoAcABzAGsAZgBvAG4AdABAAHkAYQBoAG8AbwAuAGMAbwBtAEYAbwBuAHQAIABDAG8AbQBwAHUAdABlAHIAIABQAHIAbwBnAHIAYQBtACAATABpAGMAZQBuAHMAZQAgAEEAZwByAGUAZQBtAGUAbgB0AA0ADQBSAGUAcwBlAHIAdgBlAGQAIABGAG8AbgB0ACAATgBhAG0AZQBzACAAZgBvAHIAIAB0AGgAaQBzACAARgBvAG4AdAAgAEMAbwBtAHAAdQB0AGUAcgAgAFAAcgBvAGcAcgBhAG0AOgANAFQASAAgAEsAcgB1AGIALAAgAFQASAAgAEsAcgB1AGIAIABJAHQAYQBsAGkAYwAsACAAVABIACAASwByAHUAYgAgAEIAbwBsAGQALAAgAFQASAAgAEsAcgB1AGIAIABCAG8AbABkACAASQB0AGEAbABpAGMALAANAFQASAAgAE4AaQByAGEAbQBpAHQAIABBAFMALAAgAFQASAAgAE4AaQByAGEAbQBpAHQAIABBAFMAIABJAHQAYQBsAGkAYwAsACAAVABIACAATgBpAHIAYQBtAGkAdAAgAEEAUwAgAEIAbwBsAGQALAAgAFQASAAgAE4AaQByAGEAbQBpAHQAIABBAFMAIABCAG8AbABkACAASQB0AGEAbABpAGMALAANAFQASAAgAEsAbwBkAGMAaABhAHMAYQBsACwAIABUAEgAIABLAG8AZABjAGgAYQBzAGEAbAAgAEkAdABhAGwAaQBjACwAIABUAEgAIABLAG8AZABjAGgAYQBzAGEAbAAgAEIAbwBsAGQALAAgAFQASAAgAEsAbwBkAGMAaABhAHMAYQBsACAAQgBvAGwAZAAgAEkAdABhAGwAaQBjACwADQBUAEgAIABTAGEAcgBhAGIAdQBuACAAUABTAEsALAAgAFQASAAgAFMAYQByAGEAYgB1AG4AIABQAFMASwAgAEkAdABhAGwAaQBjACwAIABUAEgAIABTAGEAcgBhAGIAdQBuACAAUABTAEsAIABCAG8AbABkACwAIABUAEgAIABTAGEAcgBhAGIAdQBuACAAUABTAEsAIABCAG8AbABkACAASQB0AGEAbABpAGMALAANAFQASAAgAEsAMgBEACAASgB1AGwAeQA4ACwAIABUAEgAIABLADIARAAgAEoAdQBsAHkAOAAgAEkAdABhAGwAaQBjACwAIABUAEgAIABLADIARAAgAEoAdQBsAHkAOAAgAEIAbwBsAGQALAAgAFQASAAgAEsAMgBEACAASgB1AGwAeQA4ACAAQgBvAGwAZAAgAEkAdABhAGwAaQBjACwADQBUAEgAIABNAGEAbABpACAARwByAGEAZABlACAANgAsACAAVABIACAATQBhAGwAaQAgAEcAcgBhAGQAZQAgADYAIABJAHQAYQBsAGkAYwAsACAAVABIACAATQBhAGwAaQAgAEcAcgBhAGQAZQAgADYAIABCAG8AbABkACwAIABUAEgAIABNAGEAbABpACAARwByAGEAZABlACAANgAgAEIAbwBsAGQAIABJAHQAYQBsAGkAYwAsAA0AVABIACAAQwBoAGEAawByAGEAIABQAGUAdABjAGgALAAgAFQASAAgAEMAaABhAGsAcgBhACAAUABlAHQAYwBoACAASQB0AGEAbABpAGMALAAgAFQASAAgAEMAaABhAGsAcgBhACAAUABlAHQAYwBoACAAQgBvAGwAZAAsACAAVABIACAAQwBoAGEAawByAGEAIABQAGUAdABjAGgAIABCAG8AbABkACAASQB0AGEAbABpAGMALAANAFQASAAgAEIAYQBpAGoAYQBtACwAIABUAEgAIABCAGEAaQBqAGEAbQAgAEkAdABhAGwAaQBjACwAIABUAEgAIABCAGEAaQBqAGEAbQAgAEIAbwBsAGQALAAgAFQASAAgAEIAYQBpAGoAYQBtACAAQgBvAGwAZAAgAEkAdABhAGwAaQBjACwADQBUAEgAIABLAG8ASABvACwAIABUAEgAIABLAG8ASABvACAASQB0AGEAbABpAGMALAAgAFQASAAgAEsAbwBIAG8AIABCAG8AbABkACwAIABUAEgAIABLAG8ASABvACAAQgBvAGwAZAAgAEkAdABhAGwAaQBjACwADQBUAEgAIABGAGEAaAAgAEsAdwBhAG4AZwAsACAAVABIACAARgBhAGgAIABLAHcAYQBuAGcAIABJAHQAYQBsAGkAYwAsACAAVABIACAARgBhAGgAIABLAHcAYQBuAGcAIABCAG8AbABkACwAIABUAEgAIABGAGEAaAAgAEsAdwBhAG4AZwAgAEIAbwBsAGQAIABJAHQAYQBsAGkAYwAuAA0ADQBUAGgAaQBzACAARgBvAG4AdAAgAEMAbwBtAHAAdQB0AGUAcgAgAFAAcgBvAGcAcgBhAG0AIABpAHMAIAB0AGgAZQAgAGMAbwBwAHkAcgBpAGcAaAB0ACAAbwBmACAAdABoAGUAIABEAGUAcABhAHIAdABtAGUAbgB0ACAAbwBmACAASQBuAHQAZQBsAGwAZQBjAHQAdQBhAGwAIABQAHIAbwBwAGUAcgB0AHkAIAAoAEQASQBQACkALAAgAE0AaQBuAGkAcwB0AHIAeQAgAG8AZgAgAEMAbwBtAG0AZQByAGMAZQAgAGEAbgBkACAAdABoAGUAIABTAG8AZgB0AHcAYQByAGUAIABJAG4AZAB1AHMAdAByAHkAIABQAHIAbwBtAG8AdABpAG8AbgAgAEEAZwBlAG4AYwB5ACAAKABQAHUAYgBsAGkAYwAgAE8AcgBnAGEAbgBpAHoAYQB0AGkAbwBuACkAIAAoAFMASQBQAEEAKQAgAA0ADQBUAGgAZQAgAHAAdQByAHAAbwBzAGUAcwAgAG8AZgAgAHQAaABpAHMAIABGAG8AbgB0ACAAQwBvAG0AcAB1AHQAZQByACAAUAByAG8AZwByAGEAbQAgAEwAaQBjAGUAbgBzAGUAIABhAHIAZQAgAHQAbwAgAHMAdABpAG0AdQBsAGEAdABlACAAdwBvAHIAbABkAHcAaQBkAGUAIABkAGUAdgBlAGwAbwBwAG0AZQBuAHQAIABvAGYAIABjAG8AbwBwAGUAcgBhAHQAaQB2AGUAIABmAG8AbgB0ACAAYwByAGUAYQB0AGkAbwBuACwAIAB0AG8AIABiAGUAbgBlAGYAaQB0ACAAZgBvAHIAIABhAGMAYQBkAGUAbQBpAGMALAAgAHQAbwAgAHMAaABhAHIAZQAgAGEAbgBkACAAdABvACAAZABlAHYAZQBsAG8AcAAgAGkAbgAgAHAAYQByAHQAbgBlAHIAcwBoAGkAcAAgAHcAaQB0AGgAIABvAHQAaABlAHIAcwAuAA0ADQBUAGUAcgBtACAAYQBuAGQAIABDAG8AbgBkAGkAdABpAG8AbgAgAG8AZgAgAHQAaABlACAARgBvAG4AdAAgAEMAbwBtAHAAdQB0AGUAcgAgAFAAcgBvAGcAcgBhAG0ADQANACgAMQApACAAQQBsAGwAbwB3ACAAdABvACAAdQBzAGUAIAB3AGkAdABoAG8AdQB0ACAAYQBuAHkAIABjAGgAYQByAGcAZQBzACAAYQBuAGQAIABhAGwAbABvAHcAIAB0AG8AIAByAGUAcAByAG8AZAB1AGMAZQAsACAAcwB0AHUAZAB5ACwAIABhAGQAYQBwAHQAIABhAG4AZAAgAGQAaQBzAHQAcgBpAGIAdQB0AGUAIAB0AGgAaQBzACAARgBvAG4AdAAgAEMAbwBtAHAAdQB0AGUAcgAgAFAAcgBvAGcAcgBhAG0ALgAgAE4AZQBpAHQAaABlAHIAIAB0AGgAZQAgAG8AcgBpAGcAaQBuAGEAbAAgAHYAZQByAHMAaQBvAG4AIABuAG8AcgAgAGEAZABhAHAAdABlAGQAIAB2AGUAcgBzAGkAbwBuACAAbwBmACAARgBvAG4AdAAgAEMAbwBtAHAAdQB0AGUAcgAgAFAAcgBvAGcAcgBhAG0AIABtAGEAeQAgAGIAZQAgAHMAbwBsAGQAIABiAHkAIABpAHQAcwBlAGwAZgAsACAAZQB4AGMAZQBwAHQAIABiAHUAbgBkAGwAZQBkACAAYQBuAGQALwBvAHIAIABzAG8AbABkACAAdwBpAHQAaAAgAGEAbgB5ACAAYwBvAG0AcAB1AHQAZQByACAAcAByAG8AZwByAGEAbQAuAA0ADQAoADIAKQAgAEkAZgAgAHkAbwB1ACAAdwBpAHMAaAAgAHQAbwAgAGEAZABhAHAAdAAgAHQAaABpAHMAIABGAG8AbgB0ACAAQwBvAG0AcAB1AHQAZQByACAAUAByAG8AZwByAGEAbQAsACAAeQBvAHUAIABtAHUAcwB0ACAAbgBvAHQAaQBmAHkAIABjAG8AcAB5AHIAaQBnAGgAdAAgAG8AdwBuAGUAcgBzACAAKABEAEkAUAAgACYAIABTAEkAUABBACkAIABpAG4AIAB3AHIAaQB0AGkAbgBnAC4ADQANACgAMwApACAATgBvACAAYQBkAGEAcAB0AGUAZAAgAHYAZQByAHMAaQBvAG4AIABvAGYAIABGAG8AbgB0ACAAQwBvAG0AcAB1AHQAZQByACAAUAByAG8AZwByAGEAbQAgAG0AYQB5ACAAdQBzAGUAIAB0AGgAZQAgAFIAZQBzAGUAcgB2AGUAZAAgAEYAbwBuAHQAIABOAGEAbQBlACgAcwApACwAIAB0AGgAZQAgAG4AYQBtAGUAKABzACkAIABvAGYAIAB0AGgAZQAgAGMAbwBwAHkAcgBpAGcAaAB0ACAAbwB3AG4AZQByAHMAIABhAG4AZAAgAHQAaABlACAAYQB1AHQAaABvAHIAKABzACkAIABvAGYAIAB0AGgAZQAgAEYAbwBuAHQAIABDAG8AbQBwAHUAdABlAHIAIABQAHIAbwBnAHIAYQBtACAAbQB1AHMAdAAgAG4AbwB0ACAAYgBlACAAdQBzAGUAZAAgAHQAbwAgAHAAcgBvAG0AbwB0AGUAIABvAHIAIABhAGQAdgBlAHIAdABpAHMAZQAgAGEAbgB5ACAAYQBkAGEAcAB0AGUAZAAgAHYAZQByAHMAaQBvAG4ALAAgAGUAeABjAGUAcAB0ACAAbwBiAHQAYQBpAG4AaQBuAGcAIAB3AHIAaQB0AHQAZQBuACAAcABlAHIAbQBpAHMAcwBpAG8AbgAgAGYAcgBvAG0AIABjAG8AcAB5AHIAaQBnAGgAdAAgAG8AdwBuAGUAcgBzACAAYQBuAGQAIAB0AGgAZQAgAGEAdQB0AGgAbwByACgAcwApAC4ADQANACgANAApACAAVABoAGUAIABhAGQAYQBwAHQAZQBkACAAdgBlAHIAcwBpAG8AbgAgAG8AZgAgAEYAbwBuAHQAIABDAG8AbQBwAHUAdABlAHIAIABQAHIAbwBnAHIAYQBtACAAbQB1AHMAdAAgAGIAZQAgAHIAZQBsAGUAYQBzAGUAZAAgAHUAbgBkAGUAcgAgAHQAaABlACAAdABlAHIAbQAgAGEAbgBkACAAYwBvAG4AZABpAHQAaQBvAG4AIABvAGYAIAB0AGgAaQBzACAAbABpAGMAZQBuAHMAZQAuAA0ADQBEAEkAUwBDAEwAQQBJAE0ARQBSAA0AVABIAEUAIABGAE8ATgBUACAAQwBPAE0AUABVAFQARQBSACAAUABSAE8ARwBSAEEATQAgAEEATgBEACAAUgBFAEwAQQBUAEUARAAgAEYASQBMAEUAUwAgAEEAUgBFACAAUABSAE8AVgBJAEQARQBEACAA0gBBAFMAIABJAFMA0wAgAEEATgBEACAAVwBJAFQASABPAFUAVAAgAFcAQQBSAFIAQQBOAFQAWQAgAE8ARgAgAEEATgBZACAASwBJAE4ARAAuACAAIABOAE8AIABHAFUAQQBSAEEATgBUAEUARQBTACAAQQBSAEUAIABNAEEARABFACAAVABIAEEAVAAgAFQASABJAFMAIABGAE8ATgBUACAAQwBPAE0AUABVAFQARQBSACAAUABSAE8ARwBSAEEATQAgAFcASQBMAEwAIABXAE8AUgBLACAAQQBTACAARQBYAFAARQBDAFQARQBEACAATwBSACAAVwBJAEwATAAgAEIARQAgAEQARQBWAEUATABPAFAARQBEACAARgBVAFIAVABIAFUAUgAgAEkATgAgAEEATgBZACAAUwBQAEUAQwBJAEYASQBDACAAVwBBAFkALgAgACAAVABIAEUAUgBFACAASQBTACAATgBPACAATwBGAEYARQBSACAATwBSACAARwBVAEEAUgBBAE4AVABFAEUAIABPAEYAIABUAEUAQwBIAE4ASQBDAEEATAAgAFMAVQBQAFAATwBSAFQALgAgAFQASAAgAFMAYQByAGEAYgB1AG4AUABTAEsAUgBlAGcAdQBsAGEAcgACAAAAAAAA/90AHgAAAAAAAAAAAAAAAAAAAAAAAAAAAf4AAACsAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQASABMAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgA/AEAAQQBCAEMARABFAEYARwBIAEkASgBLAEwATQBOAE8AUABRAFIAUwBUAFUAVgBXAFgAWQBaAFsAXABdAF4AXwBgAGEBAgEDAQQAAgCjAIQAhQC9AJYA6ACGAI4AiwCdAKkApACKANoAgwCTAPIA8wCNAJcAiADDAN4A8QCeAKoA9QD0APYAogCtAMkAxwCuAGIAYwCQAGQAywBlAMgAygDPAMwAzQDOAOkAZgDTANAA0QCvAGcA8ACRANYA1ADVAGgA6wDtAIkAagBpAGsAbQBsAG4AoABvAHEAcAByAHMAdQB0AHYAdwDqAHgAegB5AHsAfQB8ALgAoQB/AH4AgACBAOwA7gC6ANcA4gDjALAAsQDkAOUAuwDmAOcApgDYAOEA2wDcAN0A4ADZAN8BBQEGAQcBCAEJAQoBCwEMAQ0BDgEPARABEQESARMBFAEVARYBFwEYARkBGgEbARwBHQEeAR8BIAEhASIBIwEkASUBJgEnASgBKQEqASsBLAEtAS4BLwEwATEBMgEzATQBNQE2ATcBOAE5AToBOwE8AT0BPgE/AUABQQFCAUMBRAFFAUYBRwFIAUkBSgFLAUwBTQFOAU8BUAFRAVIBUwFUAVUBVgFXAVgBWQFaAVsBXAFdAV4BXwFgALIAswC2ALcAxAC0ALUAxQCCAMIAhwCrAMYBYQFiAL4AvwC8AWMBZACMAWUBZgCYAKgAmgCZAO8ApQCSAJwApwCPAJQAlQC5AWcBaAFpAWoBawFsAW0BbgFvAXABcQFyAXMBdAF1AXYBdwF4AXkBegF7AXwBfQF+AX8BgAGBAYIBgwGEAMAAwQGFAYYBhwGIAYkBigGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQGaAZsBnAGdAZ4BnwGgAaEBogGjAaQBpQGmAacBqAGpAaoBqwGsAa0BrgGvAbABsQGyAbMBtAG1AbYBtwG4AbkBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgHHAcgByQHKAcsBzAHNAc4BzwHQAdEB0gHTAdQB1QHWAdcB2AHZAdoB2wHcAd0B3gHfAPcB4AHhAeIA/QD+AP8BAAHjAQEA+AD5AeQB5QD6APsA/AHmAecB6AHpAeoB6wHsAe0B7gHvAfAB8QHyAfMB9AADAfUB9gH3AfgB+QH6AfsB/AH9Af4B/wIAAgEMdW5pMEUzMy5hbHQxBS5udWxsEG5vbm1hcmtpbmdyZXR1cm4HdW5pMEUwMAd1bmkwRTAxB3VuaTBFMDIHdW5pMEUwMwd1bmkwRTA0B3VuaTBFMDUHdW5pMEUwNgd1bmkwRTA3B3VuaTBFMDgHdW5pMEUwOQd1bmkwRTBBB3VuaTBFMEIHdW5pMEUwQwd1bmkwRTBEB3VuaTBFMEUHdW5pMEUwRgd1bmkwRTEwB3VuaTBFMTEHdW5pMEUxMgd1bmkwRTEzB3VuaTBFMTQHdW5pMEUxNQd1bmkwRTE2B3VuaTBFMTcHdW5pMEUxOAd1bmkwRTE5B3VuaTBFMUEHdW5pMEUxQgd1bmkwRTFDB3VuaTBFMUQHdW5pMEUxRQd1bmkwRTFGB3VuaTBFMjAHdW5pMEUyMQd1bmkwRTIyB3VuaTBFMjMHdW5pMEUyNAd1bmkwRTI1B3VuaTBFMjYHdW5pMEUyNwd1bmkwRTI4B3VuaTBFMjkHdW5pMEUyQQd1bmkwRTJCB3VuaTBFMkMHdW5pMEUyRAd1bmkwRTJFB3VuaTBFMkYHdW5pMEUzMAd1bmkwRTMxB3VuaTBFMzIHdW5pMEUzMwd1bmkwRTM0B3VuaTBFMzUHdW5pMEUzNgd1bmkwRTM3B3VuaTBFMzgHdW5pMEUzOQd1bmkwRTNBB3VuaTBFM0YHdW5pMEU0MAd1bmkwRTQxB3VuaTBFNDIHdW5pMEU0Mwd1bmkwRTQ0B3VuaTBFNDUHdW5pMEU0Ngd1bmkwRTQ3B3VuaTBFNDgHdW5pMEU0OQd1bmkwRTRBB3VuaTBFNEIHdW5pMEU0Qwd1bmkwRTREB3VuaTBFNEUHdW5pMEU0Rgd1bmkwRTUwB3VuaTBFNTEHdW5pMEU1Mgd1bmkwRTUzB3VuaTBFNTQHdW5pMEU1NQd1bmkwRTU2B3VuaTBFNTcHdW5pMEU1OAd1bmkwRTU5B3VuaTBFNUEHdW5pMEU1QhJ6ZXJvd2lkdGhub25qb2luZXIPemVyb3dpZHRoam9pbmVyD2xlZnR0b3JpZ2h0bWFyaw9yaWdodHRvbGVmdG1hcmsGbWludXRlBnNlY29uZARFdXJvB3VuaTIxMTMDT2htCWVzdGltYXRlZAxkb3R0ZWRjaXJjbGUMdW5pMEUxMC5hbHQxDHVuaTBFMzQuYWx0MQx1bmkwRTM1LmFsdDEMdW5pMEUzNi5hbHQxDHVuaTBFMzcuYWx0MQx1bmkwRTQ4LmFsdDEMdW5pMEU0OS5hbHQxDHVuaTBFNEEuYWx0MQx1bmkwRTRCLmFsdDEMdW5pMEU0Qy5hbHQxDHVuaTBFNDguYWx0Mgx1bmkwRTQ5LmFsdDIMdW5pMEU0QS5hbHQyDHVuaTBFNEIuYWx0Mgx1bmkwRTRDLmFsdDIMdW5pMEUwRC5hbHQxDHVuaTBFMzEuYWx0MQx1bmkwRTRELmFsdDEMdW5pMEU0Ny5hbHQxDHVuaTBFNDguYWx0Mwx1bmkwRTQ5LmFsdDMMdW5pMEU0QS5hbHQzDHVuaTBFNEIuYWx0Mwx1bmkwRTRDLmFsdDMMdW5pMEUzOC5hbHQxDHVuaTBFMzkuYWx0MQx1bmkwRTNBLmFsdDEMdW5pMEUwRi5hbHQxDHVuaTBFMkMuYWx0MQx1bmkwRTRFLmFsdDEHdW5pMUVBMAd1bmkxRUExB3VuaTFFQTIHdW5pMUVBMwd1bmkxRUE0B3VuaTFFQTUHdW5pMUVBNgd1bmkxRUE3B3VuaTFFQTgHdW5pMUVBOQd1bmkxRUFBB3VuaTFFQUIHdW5pMUVBQwd1bmkxRUFEB3VuaTFFQUUHdW5pMUVBRgd1bmkxRUIwB3VuaTFFQjEHdW5pMUVCMgd1bmkxRUIzB3VuaTFFQjQHdW5pMUVCNQd1bmkxRUI2B3VuaTFFQjcHdW5pMUVCOAd1bmkxRUI5B3VuaTFFQkEHdW5pMUVCQgd1bmkxRUJDB3VuaTFFQkQHdW5pMUVCRQd1bmkxRUJGB3VuaTFFQzAHdW5pMUVDMQd1bmkxRUMyB3VuaTFFQzMHdW5pMUVDNAd1bmkxRUM1B3VuaTFFQzYHdW5pMUVDNwd1bmkxRUM4B3VuaTFFQzkHdW5pMUVDQQd1bmkxRUNCB3VuaTFFQ0MHdW5pMUVDRAd1bmkxRUNFB3VuaTFFQ0YHdW5pMUVEMAd1bmkxRUQxB3VuaTFFRDIHdW5pMUVEMwd1bmkxRUQ0B3VuaTFFRDUHdW5pMUVENgd1bmkxRUQ3B3VuaTFFRDgHdW5pMUVEOQd1bmkxRURBB3VuaTFFREIHdW5pMUVEQwd1bmkxRUREB3VuaTFFREUHdW5pMUVERgd1bmkxRUUwB3VuaTFFRTEHdW5pMUVFMgd1bmkxRUUzB3VuaTFFRTQHdW5pMUVFNQd1bmkxRUU2B3VuaTFFRTcHdW5pMUVFOAd1bmkxRUU5B3VuaTFFRUEHdW5pMUVFQgd1bmkxRUVDB3VuaTFFRUQHdW5pMUVFRQd1bmkxRUVGB3VuaTFFRjAHdW5pMUVGMQZZZ3JhdmUGeWdyYXZlB3VuaTFFRjQHdW5pMUVGNQd1bmkxRUY2B3VuaTFFRjcHdW5pMUVGOAd1bmkxRUY5BGRvbmcGQWJyZXZlBmFicmV2ZQZEY3JvYXQGSXRpbGRlBml0aWxkZQZVdGlsZGUGdXRpbGRlBU9ob3JuBW9ob3JuBVVob3JuBXVob3JuDWhvb2thYm92ZWNvbWIJdGlsZGVjb21iCWFjdXRlY29tYgxkb3RiZWxvd2NvbWIJZ3JhdmVjb21iCW9uZWVpZ2h0aAx0aHJlZWVpZ2h0aHMLZml2ZWVpZ2h0aHMMc2V2ZW5laWdodGhzDHVuaTBFNEYubGlnYQx1bmkwRTI0LmxpZ2EMdW5pMEUyNi5saWdhDHVuaTBFMEUuYWx0MQhvbmV0aGlyZAl0d290aGlyZHMHdW5pMjE1NQd1bmkyMTU2B3VuaTIxNTcHdW5pMjE1OAd1bmkyMTU5B3VuaTIxNUEDUFNLAAAAAAAAAwAIAAIAEAAB//8AAwABAABQAAAAANQBPwAAAAABxQAUVEggU2FyYWJ1blBTICAgIAAAAAAAAAAAVEhTUjAwAABAAAAAAAEAAAAKAAAAGgACAAIBcwF0AAIB8gHzAAIADAAEABgAIAAoADAAAQAEAXMBdAHyAfMAAQAEAAEAywABAAQAAQDLAAEABAABAXMAAQAEAAEBogAAAAEAAAAKAB4ALAABbGF0bgAIAAQAAAAA//8AAQAAAAFrZXJuAAgAAAABAAAAAQAEAAIAAAABAAgAARa+AAQAAAAmAFYAnADyARwBcgNIBFIFWAb+B0QHigfQCBYIXAiiCkgL7gwQDDIMVAx2DJgM3g0kDWoNsA32DjwOgg7IDw4PVA+aD+ARhhMsFNIWeAARADX/2AA3/84AOP/TADr/2ABa//EAn//YAL//8QDB//EAyf/YAcj/2AHJ//EByv/YAcv/8QHM/9gBzf/xAc7/2AHP//EAFQAi/9gAgv/YAIP/2ACE/9gAhf/YAIb/2ACH/9gAiP/OAXb/2AF4/9gBev/YAXz/2AF+/9gBgP/YAYL/2AGE/9gBhv/YAYj/2AGK/9gBjP/YAdL/2AAKADX/sAA3/7AAOP+6ADr/ugCf/7oAyf+6Acj/ugHK/7oBzP+6Ac7/ugAVACL/zgAr/8QAgv/OAIP/zgCE/84Ahf/OAIb/zgCH/84Bdv/OAXj/zgF6/84BfP/OAX7/zgGA/84Bgv/OAYT/zgGG/84BiP/OAYr/zgGM/84B0v/OAHUAIv/YACv/2ABC/+IARP/iAEb/4gBI/90ATv/iAE//4gBQ/+IAUf/iAFL/4gBT/+IAVP/iAFb/4gBX/+IAWP/iAFn/4gBa/+IAW//iAIL/2ACD/9gAhP/YAIX/2ACG/9gAh//YAKL/4gCj/+IApP/iAKX/4gCm/+IAp//iAKj/4gCp/+IAqv/iAKv/4gCs/+IArf/iALL/4gCz/+IAtP/iALX/4gC2/+IAt//iALj/4gC6/+IAu//iALz/4gC9/+IAvv/iAL//4gDB/+IAxv/iAMj/4gF2/9gBd//iAXj/2AF5/+IBev/YAXv/4gF8/9gBff/iAX7/2AF//+IBgP/YAYH/4gGC/9gBg//iAYT/2AGF/+IBhv/YAYf/4gGI/9gBif/iAYr/2AGL/+IBjP/YAY3/4gGP/+IBkf/iAZP/4gGV/+IBl//iAZn/4gGb/+IBnf/iAaP/4gGl/+IBp//iAan/4gGr/+IBrf/iAa//4gGx/+IBs//iAbX/4gG3/+IBuf/iAbv/4gG9/+IBv//iAcH/4gHD/+IBxf/iAcf/4gHJ/+IBy//iAc3/4gHP/+IB0v/YAdP/4gHV/+IB1//iAdv/3QHg/+IB4v/iAeT/4gHm/+IAQgAi/84AK//YAET/4gBG/+IASP/iAFD/4gBS/+IAVP/sAIL/zgCD/84AhP/OAIX/zgCG/84Ah//OAKn/4gCq/+IAq//iAKz/4gCt/+IAsv/iALT/4gC1/+IAtv/iALf/4gC4/+IAuv/iAMb/4gDI/+wBdv/OAXj/zgF6/84BfP/OAX7/zgGA/84Bgv/OAYT/zgGG/84BiP/OAYr/zgGM/84Bj//iAZH/4gGT/+IBlf/iAZf/4gGZ/+IBm//iAZ3/4gGj/+IBpf/iAaf/4gGp/+IBq//iAa3/4gGv/+IBsf/iAbP/4gG1/+IBt//iAbn/4gHS/84B1f/iAdf/4gHb/+IB4P/sAeT/4gBBACL/0wBE/+wARv/sAEj/7ABQ/+wAUv/sAFT/7ACC/9MAg//TAIT/0wCF/9MAhv/TAIf/0wCp/+wAqv/sAKv/7ACs/+wArf/sALL/7AC0/+wAtf/sALb/7AC3/+wAuP/sALr/7ADG/+wAyP/sAXb/0wF4/9MBev/TAXz/0wF+/9MBgP/TAYL/0wGE/9MBhv/TAYj/0wGK/9MBjP/TAY//7AGR/+wBk//sAZX/7AGX/+wBmf/sAZv/7AGd/+wBo//sAaX/7AGn/+wBqf/sAav/7AGt/+wBr//sAbH/7AGz/+wBtf/sAbf/7AG5/+wB0v/TAdX/7AHX/+wB2//sAeD/7AHk/+wAaQAi/9gAQv/sAET/5wBG/+cASP/nAE7/7ABP/+wAUP/nAFH/7ABS/+cAU//sAFT/5wBW/+wAgv/YAIP/2ACE/9gAhf/YAIb/2ACH/9gAov/sAKP/7ACk/+wApf/sAKb/7ACn/+wAqP/sAKn/5wCq/+cAq//nAKz/5wCt/+cAsv/nALP/7AC0/+cAtf/nALb/5wC3/+cAuP/nALr/5wC7/+wAvP/sAL3/7AC+/+wAxv/nAMj/5wF2/9gBd//sAXj/2AF5/+wBev/YAXv/7AF8/9gBff/sAX7/2AF//+wBgP/YAYH/7AGC/9gBg//sAYT/2AGF/+wBhv/YAYf/7AGI/9gBif/sAYr/2AGL/+wBjP/YAY3/7AGP/+cBkf/nAZP/5wGV/+cBl//nAZn/5wGb/+cBnf/nAaP/5wGl/+cBp//nAan/5wGr/+cBrf/nAa//5wGx/+cBs//nAbX/5wG3/+cBuf/nAbv/7AG9/+wBv//sAcH/7AHD/+wBxf/sAcf/7AHS/9gB0//sAdX/5wHX/+cB2//nAeD/5wHi/+wB5P/nAeb/7AARADX/2AA3/84AOP/TADr/2ABa//EAn//YAL//8QDB//EAyf/YAcj/2AHJ//EByv/YAcv/8QHM/9gBzf/xAc7/2AHP//EAEQA1/9gAN//OADj/0wA6/9gAWv/xAJ//2AC///EAwf/xAMn/2AHI/9gByf/xAcr/2AHL//EBzP/YAc3/8QHO/9gBz//xABEANf/YADf/zgA4/9MAOv/YAFr/8QCf/9gAv//xAMH/8QDJ/9gByP/YAcn/8QHK/9gBy//xAcz/2AHN//EBzv/YAc//8QARADX/2AA3/84AOP/TADr/2ABa//EAn//YAL//8QDB//EAyf/YAcj/2AHJ//EByv/YAcv/8QHM/9gBzf/xAc7/2AHP//EAEQA1/9gAN//OADj/0wA6/9gAWv/xAJ//2AC///EAwf/xAMn/2AHI/9gByf/xAcr/2AHL//EBzP/YAc3/8QHO/9gBz//xABEANf/YADf/zgA4/9MAOv/YAFr/8QCf/9gAv//xAMH/8QDJ/9gByP/YAcn/8QHK/9gBy//xAcz/2AHN//EBzv/YAc//8QBpACL/2ABC/+wARP/nAEb/5wBI/+cATv/sAE//7ABQ/+cAUf/sAFL/5wBT/+wAVP/nAFb/7ACC/9gAg//YAIT/2ACF/9gAhv/YAIf/2ACi/+wAo//sAKT/7ACl/+wApv/sAKf/7ACo/+wAqf/nAKr/5wCr/+cArP/nAK3/5wCy/+cAs//sALT/5wC1/+cAtv/nALf/5wC4/+cAuv/nALv/7AC8/+wAvf/sAL7/7ADG/+cAyP/nAXb/2AF3/+wBeP/YAXn/7AF6/9gBe//sAXz/2AF9/+wBfv/YAX//7AGA/9gBgf/sAYL/2AGD/+wBhP/YAYX/7AGG/9gBh//sAYj/2AGJ/+wBiv/YAYv/7AGM/9gBjf/sAY//5wGR/+cBk//nAZX/5wGX/+cBmf/nAZv/5wGd/+cBo//nAaX/5wGn/+cBqf/nAav/5wGt/+cBr//nAbH/5wGz/+cBtf/nAbf/5wG5/+cBu//sAb3/7AG//+wBwf/sAcP/7AHF/+wBx//sAdL/2AHT/+wB1f/nAdf/5wHb/+cB4P/nAeL/7AHk/+cB5v/sAGkAIv/YAEL/7ABE/+cARv/nAEj/5wBO/+wAT//sAFD/5wBR/+wAUv/nAFP/7ABU/+cAVv/sAIL/2ACD/9gAhP/YAIX/2ACG/9gAh//YAKL/7ACj/+wApP/sAKX/7ACm/+wAp//sAKj/7ACp/+cAqv/nAKv/5wCs/+cArf/nALL/5wCz/+wAtP/nALX/5wC2/+cAt//nALj/5wC6/+cAu//sALz/7AC9/+wAvv/sAMb/5wDI/+cBdv/YAXf/7AF4/9gBef/sAXr/2AF7/+wBfP/YAX3/7AF+/9gBf//sAYD/2AGB/+wBgv/YAYP/7AGE/9gBhf/sAYb/2AGH/+wBiP/YAYn/7AGK/9gBi//sAYz/2AGN/+wBj//nAZH/5wGT/+cBlf/nAZf/5wGZ/+cBm//nAZ3/5wGj/+cBpf/nAaf/5wGp/+cBq//nAa3/5wGv/+cBsf/nAbP/5wG1/+cBt//nAbn/5wG7/+wBvf/sAb//7AHB/+wBw//sAcX/7AHH/+wB0v/YAdP/7AHV/+cB1//nAdv/5wHg/+cB4v/sAeT/5wHm/+wACADX/+IA2P/iAN3/7ADf/+IA4P/iAOb/4gD4/+cA/P/sAAgA1//iANj/4gDd/+wA3//iAOD/4gDm/+wA+P/nAPz/7AAIANf/4gDY/+IA3f/sAN//4gDg/+IA5v/iAPj/5wD8/+wACADX/+IA2P/iAN3/7ADf/+IA4P/iAOb/4gD4/+cA/P/sAAgA1//iANj/4gDd/+wA3//iAOD/4gDm/+IA+P/nAPz/7AARADX/2AA3/84AOP/TADr/2ABa//EAn//YAL//8QDB//EAyf/YAcj/2AHJ//EByv/YAcv/8QHM/9gBzf/xAc7/2AHP//EAEQA1/9gAN//OADj/0wA6/9gAWv/xAJ//2AC///EAwf/xAMn/2AHI/9gByf/xAcr/2AHL//EBzP/YAc3/8QHO/9gBz//xABEANf/YADf/zgA4/9MAOv/YAFr/8QCf/9gAv//xAMH/8QDJ/9gByP/YAcn/8QHK/9gBy//xAcz/2AHN//EBzv/YAc//8QARADX/2AA3/84AOP/TADr/2ABa//EAn//YAL//8QDB//EAyf/YAcj/2AHJ//EByv/YAcv/8QHM/9gBzf/xAc7/2AHP//EAEQA1/9gAN//OADj/0wA6/9gAWv/xAJ//2AC///EAwf/xAMn/2AHI/9gByf/xAcr/2AHL//EBzP/YAc3/8QHO/9gBz//xABEANf/YADf/zgA4/9MAOv/YAFr/8QCf/9gAv//xAMH/8QDJ/9gByP/YAcn/8QHK/9gBy//xAcz/2AHN//EBzv/YAc//8QARADX/2AA3/84AOP/TADr/2ABa//EAn//YAL//8QDB//EAyf/YAcj/2AHJ//EByv/YAcv/8QHM/9gBzf/xAc7/2AHP//EAEQA1/9gAN//OADj/0wA6/9gAWv/xAJ//2AC///EAwf/xAMn/2AHI/9gByf/xAcr/2AHL//EBzP/YAc3/8QHO/9gBz//xABEANf/YADf/zgA4/9MAOv/YAFr/8QCf/9gAv//xAMH/8QDJ/9gByP/YAcn/8QHK/9gBy//xAcz/2AHN//EBzv/YAc//8QARADX/2AA3/84AOP/TADr/2ABa//EAn//YAL//8QDB//EAyf/YAcj/2AHJ//EByv/YAcv/8QHM/9gBzf/xAc7/2AHP//EAEQA1/9gAN//OADj/0wA6/9gAWv/xAJ//2AC///EAwf/xAMn/2AHI/9gByf/xAcr/2AHL//EBzP/YAc3/8QHO/9gBz//xABEANf/YADf/zgA4/9MAOv/YAFr/8QCf/9gAv//xAMH/8QDJ/9gByP/YAcn/8QHK/9gBy//xAcz/2AHN//EBzv/YAc//8QBpACL/2ABC/+wARP/nAEb/5wBI/+cATv/sAE//7ABQ/+cAUf/sAFL/5wBT/+wAVP/nAFb/7ACC/9gAg//YAIT/2ACF/9gAhv/YAIf/2ACi/+wAo//sAKT/7ACl/+wApv/sAKf/7ACo/+wAqf/nAKr/5wCr/+cArP/nAK3/5wCy/+cAs//sALT/5wC1/+cAtv/nALf/5wC4/+cAuv/nALv/7AC8/+wAvf/sAL7/7ADG/+cAyP/nAXb/2AF3/+wBeP/YAXn/7AF6/9gBe//sAXz/2AF9/+wBfv/YAX//7AGA/9gBgf/sAYL/2AGD/+wBhP/YAYX/7AGG/9gBh//sAYj/2AGJ/+wBiv/YAYv/7AGM/9gBjf/sAY//5wGR/+cBk//nAZX/5wGX/+cBmf/nAZv/5wGd/+cBo//nAaX/5wGn/+cBqf/nAav/5wGt/+cBr//nAbH/5wGz/+cBtf/nAbf/5wG5/+cBu//sAb3/7AG//+wBwf/sAcP/7AHF/+wBx//sAdL/2AHT/+wB1f/nAdf/5wHb/+cB4P/nAeL/7AHk/+cB5v/sAGkAIv/YAEL/7ABE/+cARv/nAEj/5wBO/+wAT//sAFD/5wBR/+wAUv/nAFP/7ABU/+cAVv/sAIL/2ACD/9gAhP/YAIX/2ACG/9gAh//YAKL/7ACj/+wApP/sAKX/7ACm/+wAp//sAKj/7ACp/+cAqv/nAKv/5wCs/+cArf/nALL/5wCz/+wAtP/nALX/5wC2/+cAt//nALj/5wC6/+cAu//sALz/7AC9/+wAvv/sAMb/5wDI/+cBdv/YAXf/7AF4/9gBef/sAXr/2AF7/+wBfP/YAX3/7AF+/9gBf//sAYD/2AGB/+wBgv/YAYP/7AGE/9gBhf/sAYb/2AGH/+wBiP/YAYn/7AGK/9gBi//sAYz/2AGN/+wBj//nAZH/5wGT/+cBlf/nAZf/5wGZ/+cBm//nAZ3/5wGj/+cBpf/nAaf/5wGp/+cBq//nAa3/5wGv/+cBsf/nAbP/5wG1/+cBt//nAbn/5wG7/+wBvf/sAb//7AHB/+wBw//sAcX/7AHH/+wB0v/YAdP/7AHV/+cB1//nAdv/5wHg/+cB4v/sAeT/5wHm/+wAaQAi/9gAQv/sAET/5wBG/+cASP/nAE7/7ABP/+wAUP/nAFH/7ABS/+cAU//sAFT/5wBW/+wAgv/YAIP/2ACE/9gAhf/YAIb/2ACH/9gAov/sAKP/7ACk/+wApf/sAKb/7ACn/+wAqP/sAKn/5wCq/+cAq//nAKz/5wCt/+cAsv/nALP/7AC0/+cAtf/nALb/5wC3/+cAuP/nALr/5wC7/+wAvP/sAL3/7AC+/+wAxv/nAMj/5wF2/9gBd//sAXj/2AF5/+wBev/YAXv/7AF8/9gBff/sAX7/2AF//+wBgP/YAYH/7AGC/9gBg//sAYT/2AGF/+wBhv/YAYf/7AGI/9gBif/sAYr/2AGL/+wBjP/YAY3/7AGP/+cBkf/nAZP/5wGV/+cBl//nAZn/5wGb/+cBnf/nAaP/5wGl/+cBp//nAan/5wGr/+cBrf/nAa//5wGx/+cBs//nAbX/5wG3/+cBuf/nAbv/7AG9/+wBv//sAcH/7AHD/+wBxf/sAcf/7AHS/9gB0//sAdX/5wHX/+cB2//nAeD/5wHi/+wB5P/nAeb/7ABpACL/2ABC/+wARP/nAEb/5wBI/+cATv/sAE//7ABQ/+cAUf/sAFL/5wBT/+wAVP/nAFb/7ACC/9gAg//YAIT/2ACF/9gAhv/YAIf/2ACi/+wAo//sAKT/7ACl/+wApv/sAKf/7ACo/+wAqf/nAKr/5wCr/+cArP/nAK3/5wCy/+cAs//sALT/5wC1/+cAtv/nALf/5wC4/+cAuv/nALv/7AC8/+wAvf/sAL7/7ADG/+cAyP/nAXb/2AF3/+wBeP/YAXn/7AF6/9gBe//sAXz/2AF9/+wBfv/YAX//7AGA/9gBgf/sAYL/2AGD/+wBhP/YAYX/7AGG/9gBh//sAYj/2AGJ/+wBiv/YAYv/7AGM/9gBjf/sAY//5wGR/+cBk//nAZX/5wGX/+cBmf/nAZv/5wGd/+cBo//nAaX/5wGn/+cBqf/nAav/5wGt/+cBr//nAbH/5wGz/+cBtf/nAbf/5wG5/+cBu//sAb3/7AG//+wBwf/sAcP/7AHF/+wBx//sAdL/2AHT/+wB1f/nAdf/5wHb/+cB4P/nAeL/7AHk/+cB5v/sABEANf/YADf/zgA4/9MAOv/YAFr/8QCf/9gAv//xAMH/8QDJ/9gByP/YAcn/8QHK/9gBy//xAcz/2AHN//EBzv/YAc//8QABACYAIgAnAC0AMQA1ADcAOAA6AIIAgwCEAIUAhgCHAJ8AyQERARIBEwEUARUBdgF4AXoBfAF+AYABggGEAYYBiAGKAYwByAHKAcwBzgHSAAAAAQAAAAoAJAC8AAFsYXRuAAgABAAAAAD//wAEAAAAAQACAAMABGNjbXAAGmZyYWMAJmxpZ2EALHJsaWcAYgAAAAQAMwA0ADUANgAAAAEAAAAAABkAGgAbABwAHQAeAB8AIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAAABkAAQACAAMABAAFAAYABwAIAAkACgALAAwADQAOAA8AEAARABIAEwAUABUAFgAXABgAGQA6AHYAfgCGAI4AlgCeAKYArgC2AL4AxgDOANYA3gDoAPIA+gECAQoBEgEaASIBKgEyAToBQgFKAVIBWgFiAWoBcgF6AYIBigGSAZoBogGqAbQBvgHGAc4B1gHeAeYB7gH2Af4CBgIOAhYCHgImAi4CNgI+AkYABAAAAAEB2AAEAAAAAQMaAAQAAAABAywABgAAAAEDXgAGAAAAAQNoAAYAAAABA3AABgAAAAEDegAGAAAAAQOEAAYAAAABA44ABgAAAAEDmAAGAAAAAQOiAAYAAAABA6wABgAAAAEDtgAGAAAAAgPAA9IABgAAAAID2gPsAAYAAAABA/QABgAAAAED/gAGAAAAAQQIAAYAAAABBBIABAAAAAEEHAAEAAAAAQQ8AAQAAAABBUIABAAAAAEF8AAEAAAAAQZGAAQAAAABB0wABAAAAAEH+gAEAAAAAQhQAAQAAAABCGIABgAAAAEIlAAGAAAAAQieAAYAAAABCKYABgAAAAEIsAAGAAAAAQi6AAYAAAABCMQABgAAAAEIzgAGAAAAAQjYAAYAAAABCOIABgAAAAEI7AAGAAAAAgj2CQgABgAAAAIJEAkiAAYAAAABCSoABgAAAAEJNAAGAAAAAQk+AAYAAAABCUgABAAAAAEJUgAEAAAAAQlyAAQAAAABCngABAAAAAELJgAEAAAAAQt8AAQAAAABDIIABAAAAAENMAAEAAAAAQ2GAAQAAAABD8QABAAAAAERkgAEAAAAARPQAAEAAAABFZ4AAQAAAAEV4gABAAAAARXwAAEV7gAGABIAjAC2APQBCgE0AAwAGgAiACoAMgA6AEIASgBSAFoAYgBqAHIAfwADABAAEwH1AAMAEAAUAH4AAwAQABUB9wADABAAFgH7AAMAEAAXAewAAwAQABkAfwADAUIAEwH1AAMBQgAUAH4AAwFCABUB9wADAUIAFgH7AAMBQgAXAewAAwFCABkABAAKABIAGgAiAfYAAwAQABQB+AADABAAFgH2AAMBQgAUAfgAAwFCABYABgAOABYAHgAmAC4ANgCAAAMAEAAVAfkAAwAQABYB7QADABAAGQCAAAMBQgAVAfkAAwFCABYB7QADAUIAGQACAAYADgH6AAMAEAAWAfoAAwFCABYABAAKABIAGgAiAfwAAwAQABcB7gADABAAGQH8AAMBQgAXAe4AAwFCABkAAgAGAA4B7wADABAAGQHvAAMBQgAZAAEUtAABAAgAAgAGAAwBcwACAEoBdAACAE0AARSgAAMADAAeADAAAgAGAAwB8gACAQcB8gACARYAAgAGAAwB8wACAQcB8wACARYAAQAEAfEAAgADAAMAAAABFHAAARR4AAEAAAA3AAMAAAABFHAAAAABAAAANwADAAEUagABFHQAAAABAAAANwADAAEUWAABFGwAAAABAAAANwADAAEUbgABFFAAAAABAAAAOAADAAEUbAABFD4AAAABAAAAOQADAAEUagABFA4AAAABAAAANwADAAEUEAABFGQAAAABAAAANwADAAEUWAABFFIAAAABAAAANwADAAAAARRGAAEUUAABAAAANwADAAET2gABE8YAAAABAAAAOAADAAEUMgABE9IAAAABAAAANwADAAAAARQgAAEUEAABAAAANwADAAETpAABFA4AAAABAAAANwADAAAAARQGAAEUDgABAAAANwADAAAAARQGAAEUDAABAAAANwADAAEUCAABFA4AAAABAAAANwADAAAAARNmAAETsAABAAAAOAABE/AAAQAIAAEABAH9AA0ANAAsAA8AJQBGAFQASgBIAE8ACQBEAAoAARPOAAYAEgA8AGYAkAC6AOQABQAMABIAGAAeACQBeAACAecAhQACAegAgwACAekBdgACAeoAggACAesABQAMABIAGAAeACQBeQACAecApQACAegAowACAekBdwACAeoAogACAesABQAMABIAGAAeACQBfgACAecBgAACAegBegACAekBggACAeoBfAACAesABQAMABIAGAAeACQBfwACAecBgQACAegBewACAekBgwACAeoBfQACAesABQAMABIAGAAeACQBiAACAecBigACAegBhAACAekBjAACAeoBhgACAesABQAMABIAGAAeACQBiQACAecBiwACAegBhQACAekBjQACAeoBhwACAesAARLQAAQADgA4AGIAjAAFAAwAEgAYAB4AJAGQAAIB5wGSAAIB6ACLAAIB6QGOAAIB6gCKAAIB6wAFAAwAEgAYAB4AJAGRAAIB5wGTAAIB6ACrAAIB6QGPAAIB6gCqAAIB6wAFAAwAEgAYAB4AJAGYAAIB5wGaAAIB6AGUAAIB6QGcAAIB6gGWAAIB6wAFAAwAEgAYAB4AJAGZAAIB5wGbAAIB6AGVAAIB6QGdAAIB6gGXAAIB6wABEiYAAgAKADQABQAMABIAGAAeACQBngACAecB3AACAegAjwACAekBoAACAeoAjgACAesABQAMABIAGAAeACQBnwACAecB3QACAegArwACAekBoQACAeoArgACAesAARHQAAYAEgA8AGYAkAC6AOQABQAMABIAGAAeACQBpAACAecAlwACAegAlQACAekBogACAeoAlAACAesABQAMABIAGAAeACQBpQACAecAtwACAegAtQACAekBowACAeoAtAACAesABQAMABIAGAAeACQBqgACAecBrAACAegBpgACAekBrgACAeoBqAACAesABQAMABIAGAAeACQBqwACAecBrQACAegBpwACAekBrwACAeoBqQACAesABQAMABIAGAAeACQBtAACAecBtgACAegBsAACAekBuAACAeoBsgACAesABQAMABIAGAAeACQBtQACAecBtwACAegBsQACAekBuQACAeoBswACAesAARDSAAQADgA4AGIAjAAFAAwAEgAYAB4AJAG8AAIB5wHhAAIB6ACcAAIB6QG6AAIB6gCbAAIB6wAFAAwAEgAYAB4AJAG9AAIB5wHiAAIB6AC8AAIB6QG7AAIB6gC7AAIB6wAFAAwAEgAYAB4AJAHCAAIB5wHEAAIB6AG+AAIB6QHGAAIB6gHAAAIB6wAFAAwAEgAYAB4AJAHDAAIB5wHFAAIB6AG/AAIB6QHHAAIB6gHBAAIB6wABECgAAgAKADQABQAMABIAGAAeACQBzAACAecBzgACAegAnwACAekBygACAeoByAACAesABQAMABIAGAAeACQBzQACAecBzwACAegAvwACAekBywACAeoByQACAesAAQ6yAAEACAACAAYADAFzAAIASgF0AAIATQABDp4AAwAMAB4AMAACAAYADAHyAAIBBwHyAAIBFgACAAYADAHzAAIBBwHzAAIBFgABAAQB8QACAAMAAwAAAAEObgABDnYAAQAAADcAAwAAAAEObgAAAAEAAAA3AAMAAQ5oAAEOcgAAAAEAAAA3AAMAAQ5WAAEOagAAAAEAAAA3AAMAAQ5sAAEOTgAAAAEAAAA4AAMAAQ5qAAEOPAAAAAEAAAA5AAMAAQ5oAAEODAAAAAEAAAA3AAMAAQ4OAAEOYgAAAAEAAAA3AAMAAQ5WAAEOUAAAAAEAAAA3AAMAAAABDkQAAQ5OAAEAAAA3AAMAAQ3YAAENxAAAAAEAAAA4AAMAAQ4wAAEN0AAAAAEAAAA3AAMAAAABDh4AAQ4OAAEAAAA3AAMAAQ2iAAEODAAAAAEAAAA3AAMAAAABDgQAAQ4MAAEAAAA3AAMAAAABDgQAAQ4KAAEAAAA3AAMAAQ4GAAEODAAAAAEAAAA3AAMAAAABDWQAAQ2uAAEAAAA4AAEN7gABAAgAAQAEAf0ADQA0ACwADwAlAEYAVABKAEgATwAJAEQACgABDcwABgASADwAZgCQALoA5AAFAAwAEgAYAB4AJAF4AAIB5wCFAAIB6ACDAAIB6QF2AAIB6gCCAAIB6wAFAAwAEgAYAB4AJAF5AAIB5wClAAIB6ACjAAIB6QF3AAIB6gCiAAIB6wAFAAwAEgAYAB4AJAF+AAIB5wGAAAIB6AF6AAIB6QGCAAIB6gF8AAIB6wAFAAwAEgAYAB4AJAF/AAIB5wGBAAIB6AF7AAIB6QGDAAIB6gF9AAIB6wAFAAwAEgAYAB4AJAGIAAIB5wGKAAIB6AGEAAIB6QGMAAIB6gGGAAIB6wAFAAwAEgAYAB4AJAGJAAIB5wGLAAIB6AGFAAIB6QGNAAIB6gGHAAIB6wABDM4ABAAOADgAYgCMAAUADAASABgAHgAkAZAAAgHnAZIAAgHoAIsAAgHpAY4AAgHqAIoAAgHrAAUADAASABgAHgAkAZEAAgHnAZMAAgHoAKsAAgHpAY8AAgHqAKoAAgHrAAUADAASABgAHgAkAZgAAgHnAZoAAgHoAZQAAgHpAZwAAgHqAZYAAgHrAAUADAASABgAHgAkAZkAAgHnAZsAAgHoAZUAAgHpAZ0AAgHqAZcAAgHrAAEMJAACAAoANAAFAAwAEgAYAB4AJAGeAAIB5wHcAAIB6ACPAAIB6QGgAAIB6gCOAAIB6wAFAAwAEgAYAB4AJAGfAAIB5wHdAAIB6ACvAAIB6QGhAAIB6gCuAAIB6wABC84ABgASADwAZgCQALoA5AAFAAwAEgAYAB4AJAGkAAIB5wCXAAIB6ACVAAIB6QGiAAIB6gCUAAIB6wAFAAwAEgAYAB4AJAGlAAIB5wC3AAIB6AC1AAIB6QGjAAIB6gC0AAIB6wAFAAwAEgAYAB4AJAGqAAIB5wGsAAIB6AGmAAIB6QGuAAIB6gGoAAIB6wAFAAwAEgAYAB4AJAGrAAIB5wGtAAIB6AGnAAIB6QGvAAIB6gGpAAIB6wAFAAwAEgAYAB4AJAG0AAIB5wG2AAIB6AGwAAIB6QG4AAIB6gGyAAIB6wAFAAwAEgAYAB4AJAG1AAIB5wG3AAIB6AGxAAIB6QG5AAIB6gGzAAIB6wABCtAABAAOADgAYgCMAAUADAASABgAHgAkAbwAAgHnAeEAAgHoAJwAAgHpAboAAgHqAJsAAgHrAAUADAASABgAHgAkAb0AAgHnAeIAAgHoALwAAgHpAbsAAgHqALsAAgHrAAUADAASABgAHgAkAcIAAgHnAcQAAgHoAb4AAgHpAcYAAgHqAcAAAgHrAAUADAASABgAHgAkAcMAAgHnAcUAAgHoAb8AAgHpAccAAgHqAcEAAgHrAAEKJgACAAoANAAFAAwAEgAYAB4AJAHMAAIB5wHOAAIB6ACfAAIB6QHKAAIB6gHIAAIB6wAFAAwAEgAYAB4AJAHNAAIB5wHPAAIB6AC/AAIB6QHLAAIB6gHJAAIB6wABCdAAEAAmAFAAWgCEAK4AuADiAQwBNgFgAWoBlAG+AcgB8gIcAAUADAASABgAHgAkAXgAAgHnAIUAAgHoAIMAAgHpAXYAAgHqAIIAAgHrAAEABAHUAAIB6QAFAAwAEgAYAB4AJAGQAAIB5wGSAAIB6ACLAAIB6QGOAAIB6gCKAAIB6wAFAAwAEgAYAB4AJAGeAAIB5wHcAAIB6ACPAAIB6QGgAAIB6gCOAAIB6wABAAQAkwACAegABQAMABIAGAAeACQBpAACAecAlwACAegAlQACAekBogACAeoAlAACAesABQAMABIAGAAeACQBvAACAecB4QACAegAnAACAekBugACAeoAmwACAesABQAMABIAGAAeACQBzAACAecBzgACAegAnwACAekBygACAeoByAACAesABQAMABIAGAAeACQBeQACAecApQACAegAowACAekBdwACAeoAogACAesAAQAEAdUAAgHpAAUADAASABgAHgAkAZEAAgHnAZMAAgHoAKsAAgHpAY8AAgHqAKoAAgHrAAUADAASABgAHgAkAZ8AAgHnAd0AAgHoAK8AAgHpAaEAAgHqAK4AAgHrAAEABACzAAIB6AAFAAwAEgAYAB4AJAGlAAIB5wC3AAIB6AC1AAIB6QGjAAIB6gC0AAIB6wAFAAwAEgAYAB4AJAG9AAIB5wHiAAIB6AC8AAIB6QG7AAIB6gC7AAIB6wAFAAwAEgAYAB4AJAHNAAIB5wHPAAIB6AC/AAIB6QHLAAIB6gHJAAIB6wABB64ADAAeAEAAYgCEAKYAyADqAQwBLgFYAYIBrAAEAAoAEAAWABwBfgACAecBgAACAegBegACAekBfAACAesABAAKABAAFgAcAZgAAgHnAZoAAgHoAZQAAgHpAZYAAgHrAAQACgAQABYAHAGqAAIB5wGsAAIB6AGmAAIB6QGoAAIB6wAEAAoAEAAWABwBfwACAecBgQACAegBewACAekBfQACAesABAAKABAAFgAcAZkAAgHnAZsAAgHoAZUAAgHpAZcAAgHrAAQACgAQABYAHAGrAAIB5wGtAAIB6AGnAAIB6QGpAAIB6wAEAAoAEAAWABwBiAACAecBigACAegBhAACAekBhgACAesABAAKABAAFgAcAYkAAgHnAYsAAgHoAYUAAgHpAYcAAgHrAAUADAASABgAHgAkAbQAAgHnAbYAAgHoAbAAAgHpAbgAAgHqAbIAAgHrAAUADAASABgAHgAkAbUAAgHnAbcAAgHoAbEAAgHpAbkAAgHqAbMAAgHrAAUADAASABgAHgAkAcIAAgHnAcQAAgHoAb4AAgHpAcYAAgHqAcAAAgHrAAUADAASABgAHgAkAcMAAgHnAcUAAgHoAb8AAgHpAccAAgHqAcEAAgHrAAEFtAAQACYAUABaAIQArgC4AOIBDAE2AWABagGUAb4ByAHyAhwABQAMABIAGAAeACQBeAACAecAhQACAegAgwACAekBdgACAeoAggACAesAAQAEAdQAAgHpAAUADAASABgAHgAkAZAAAgHnAZIAAgHoAIsAAgHpAY4AAgHqAIoAAgHrAAUADAASABgAHgAkAZ4AAgHnAdwAAgHoAI8AAgHpAaAAAgHqAI4AAgHrAAEABACTAAIB6AAFAAwAEgAYAB4AJAGkAAIB5wCXAAIB6ACVAAIB6QGiAAIB6gCUAAIB6wAFAAwAEgAYAB4AJAG8AAIB5wHhAAIB6ACcAAIB6QG6AAIB6gCbAAIB6wAFAAwAEgAYAB4AJAHMAAIB5wHOAAIB6ACfAAIB6QHKAAIB6gHIAAIB6wAFAAwAEgAYAB4AJAF5AAIB5wClAAIB6ACjAAIB6QF3AAIB6gCiAAIB6wABAAQB1QACAekABQAMABIAGAAeACQBkQACAecBkwACAegAqwACAekBjwACAeoAqgACAesABQAMABIAGAAeACQBnwACAecB3QACAegArwACAekBoQACAeoArgACAesAAQAEALMAAgHoAAUADAASABgAHgAkAaUAAgHnALcAAgHoALUAAgHpAaMAAgHqALQAAgHrAAUADAASABgAHgAkAb0AAgHnAeIAAgHoALwAAgHpAbsAAgHqALsAAgHrAAUADAASABgAHgAkAc0AAgHnAc8AAgHoAL8AAgHpAcsAAgHqAckAAgHrAAEDkgAMAB4AQABiAIQApgDIAOoBDAEuAVgBggGsAAQACgAQABYAHAF+AAIB5wGAAAIB6AF6AAIB6QF8AAIB6wAEAAoAEAAWABwBmAACAecBmgACAegBlAACAekBlgACAesABAAKABAAFgAcAaoAAgHnAawAAgHoAaYAAgHpAagAAgHrAAQACgAQABYAHAF/AAIB5wGBAAIB6AF7AAIB6QF9AAIB6wAEAAoAEAAWABwBmQACAecBmwACAegBlQACAekBlwACAesABAAKABAAFgAcAasAAgHnAa0AAgHoAacAAgHpAakAAgHrAAQACgAQABYAHAGIAAIB5wGKAAIB6AGEAAIB6QGGAAIB6wAEAAoAEAAWABwBiQACAecBiwACAegBhQACAekBhwACAesABQAMABIAGAAeACQBtAACAecBtgACAegBsAACAekBuAACAeoBsgACAesABQAMABIAGAAeACQBtQACAecBtwACAegBsQACAekBuQACAeoBswACAesABQAMABIAGAAeACQBwgACAecBxAACAegBvgACAekBxgACAeoBwAACAesABQAMABIAGAAeACQBwwACAecBxQACAegBvwACAekBxwACAeoBwQACAesAAgHYACMBDQEOAQ8BZQH0AXEBVgFyAWYAYAFXAVgBWQFaAW4BbwFwAWgBYAFhAWIBYwFkAWcBdQFpAWoBawFsAW0BWwFcAV0BXgFfAAIBugAIAEIAQwBEARkBGgEbARwBHQABAEwACQACAAIAEgAWAAAAGAAYAAUAAQABAEcAAQADAPkA+wEgAAEAAgDiAOUAAgABAQ0BDwAAAAIAAQEZAR0AAAABAAMA8ADyAPQAAgABAWABZAAAAAEACAEGAQkBCgELAQwBGAEeAR8AAQAGAQYBCQEKAQsBDAEeAAIAAgFXAVoAAAFmAWcABAABAAQA4wDkAPkA+wABAAEBCAACAAEBWwFfAAAAAQABAGAAAgABAEIARAAAAAEAAgDjAOQAAgABAW4BcAAAAAEAAQEBAAEABQEJAQoBCwEMARgAAQABAXIAAQABARgAAQABADEAAQAGACIAQgCEAKQB0gHTAAEABAAmAEYAjACsAAEAAgAqAEoAAQAGADAAUACWALYB4wHkAAEABAA2AFYB5QHmAAEAAgA6AFoAAQAQACIAJAAmACoALwAwADYAOgBCAEQARgBKAE8AUABWAFoAAQAMAIQAjACWAKQArAC2AdIB0wHjAeQB5QHmAAIABwBCAEQAAADiAOUAAwEBAQEABwEGAQYACAEIAQ8ACQEYAR8AEQFbAWQAGQACAAIBDQEPAAABYAFkAAMAAAABAAAAAgAAAAAAAAAAAAEAAAAkAAABAAABAAEAAAAoAAABBAAAAQEAAgEEAAIAAAAAAAEAAAAPAAAmEAAAAAkAAAAIABsAAAAAAAH/////ABsAAQAAAAD////+AAEAAgAAAAL/////AAEAAwAAAAD////9ABsAAgAAAAT/////ABsAAwAAAAD////7ABcAAAAAAAD////3ABc+gAAAAAj/////AAAAAQAAAAAAAAAAAAALNCAAAAIAAAABAAAAGQAAABwAAAO2AAAHOgAACYgAAAoIAAAKqAAIACIBygAEAAEACgABAAsAAQABAAEADAABAAEAAQABAA0ADgABAAEAAQABAAEADwABAAEAAQAQAAEAAQABAAEAAQABAAEAEQABABIAAQATAAEAAQABABQAAQABAAEAAQAVABYAAQABAAEAAQABABcAAQABAAEAGAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAFAAYABwAIAAkAAAAAAAAAAAACAAAAAAAAAAAAAAADAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQAAAAAAAAAAAAIAAAAAAAAAAAAAAAMABAAFAAYABwAIAAkACgALAAwADQAOAA8AEAARAAEAAQASAAEAAQATABQAFQAWABcAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABgAAQABAAEAAQAZAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAGgABAAEAGwAcAB0AHgAfAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAgAAEAAQAhACIAIwAkACUAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABACYAAQABAAEAJwABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAKAABAAEAKQAqACsALAAtAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAuAAEAAQAvADAAMQAyADMAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABADQAAQABADUANgA3ADgAOQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAOgABAAEAOwA8AD0APgA/AAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQBAAAEAAQABAAEAQQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAEIAAQABAEMARABFAEYARwABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEASAABAAEASQBKAEsATABNAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQBOAAEAAQABAE8AAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAFAAAQABAFEAUgBTAFQAVQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAVgABAAEAVwBYAFkAWgBbAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQBcAAEAAQBdAF4AXwBgAGEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAAAAAAAAAEAAAAAAAoAAAAAAA4AAAAAABIAAAAAABYAAAAAABoAAAAAAB4AAAAAACIAAAAAACYAAAAAACoAAAAAAC4AAAAAADIAAAAAADYAAAAAADoAAAAAAD4AAAAAAEIAAAAAAEYAAAAAAAgAAAAAAAKAAAAAAAKAAAAAAAKAAAAAAAKAAAAAAAKAAAAAAAwAAAAAAAKAAAAIABAAAAAAAAKAAAAQAAKAAAAQAAKAAAAQAAKAAAAQAAKAAAAQABQAAAAAAAKAAAAYAAKAAAAYAAKAAAAYAAKAAAAYAAKAAAAYABgAAAAAAAKAAAAgABwAAAAAAAKAAAAoAAKAAAAoAAKAAAAoAAKAAAAoAAKAAAAoACAAAAAAAAKAAAAwAAKAAAAwAAKAAAAwAAKAAAAwAAKAAAAwACQAAAAAAAKAAAA4AAKAAAA4AAKAAAA4AAKAAAA4AAKAAAA4ACgAAAAAAAKAAABAAAKAAABAAAKAAABAAAKAAABAAAKAAABAACwAAAAAAAKAAABIADAAAAAAAAKAAABQAAKAAABQAAKAAABQAAKAAABQAAKAAABQADQAAAAAAAKAAABYAAKAAABYAAKAAABYAAKAAABYAAKAAABYADgAAAAAAAKAAABgADwAAAAAAAKAAABoAAKAAABoAAKAAABoAAKAAABoAAKAAABoAEAAAAAAAAKAAABwAAKAAABwAAKAAABwAAqAAABwAAKAAABwAEQAAAAAAAKAAAB4AAKAAAB4AAKAAAB4AAKAAAB4AAqAAAB4AAD///hm////jP//+Hb///+M///4hv///5z///ie////pP//+LL///+Y///4vv///6z///jW////rP//+O7///+0///5Bv///6z///kW////rP//+Sb///+8///5Pv///8T///lS////uP//+V7////M///5dv///8z///mO////1AAAAAQACAAMABAAAAAAABQAAAAEAAgADAAQABgAAAAEAAgADAAQACwAAABAAAAABAAIAAwAEABEAAAABAAIAAwAEABYAAAABAAIAAwAEABsAAAABAAIAAwAEACAAAAAlAAAAAQACAAMABAAmAAAAAQACAAMABAArAAAAMAAAAAEAAgADAAQAMQAAAAEAAgADAAQANgAAAAEAAgADAAQAOwF4AIUAgwF2AIIB1AGQAZIAiwGOAIoBngHcAI8BoACOAJMBpACXAJUBogCUAbwB4QCcAboAmwHMAc4AnwHKAcgBeQClAKMBdwCiAdUBkQGTAKsBjwCqAZ8B3QCvAaEArgCzAaUAtwC1AaMAtAG9AeIAvAG7ALsBzQHPAL8BywHJAAAIeCAAAAIAAAABAAAAFQAAABwAAALyAAAFPgAABxQAAAd0AAAIBAAIAIQBaAAEAAEAAQABAAEAAQABAAEACQABAAEAAQABAAEAAQABAAEAAQAKAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACwABAAEAAQABAAEAAQABAAwAAQABAAEAAQABAAEAAQABAAEADQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAA4ADwABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAQABIAEwAUAAUABgAHABEACAAAAAAAAAAAAAIAAAAAAAAAAAADAAQABQAGAAcACAAJAAoAAAALAAwADQAAAAAAAAAAAAIAAAAAAAAAAAADAAQABQAGAAcACAAJAAoAAAALAAwADQABAAEADgABAAEADwAQABEAEgABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAEwABAAEAFAAVABYAFwABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAGAABAAEAGQAaABsAHAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAHQABAAEAHgAfACAAIQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAIgABAAEAIwAkACUAJgABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAJwABAAEAKAApACoAKwABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEALAABAAEALQAuAC8AMAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAMQABAAEAMgAzADQANQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEANgABAAEANwA4ADkAOwABAAEAAQABAAEAAQABAAEAOgABAAEAAQABAAEAPAABAAEAPQA+AD8AQQABAAEAAQABAAEAAQABAAEAQAABAAEAAQABAAEAQgABAAEAQwBEAEUARwABAAEAAQABAAEAAQABAAEARgABAAEAAQABAAEASAABAAEASQBKAEsATQABAAEAAQABAAEAAQABAAEATAABAAEAAQAAAAAAAAAAQAAAAAACgAAAAAADgAAAAAAEgAAAAAAFgAAAAAAGgAAAAAAHgAAAAAAIgAAAAAAJgAAAAAAKgAAAAAALgAAAAAAMgAAAAAANgAAAAAACAAAAAAAAoAAAAAAAoAAAAAAAoAAAAAAAoAAAAAADAAAAAAAAoAAAAgAAoAAAAgAAoAAAAgAAoAAAAgAEAAAAAAAAoAAABAAAoAAABAAAoAAABAAAoAAABAAFAAAAAAAAoAAABgAAoAAABgAAoAAABgAAoAAABgAGAAAAAAAAoAAACAAAoAAACAAAoAAACAAAoAAACAAHAAAAAAAAoAAACgAAoAAACgAAoAAACgAAoAAACgAIAAAAAAAAoAAADAAAoAAADAAAoAAADAAAoAAADAAJAAAAAAAAoAAADgAAoAAADgAAoAAADgAAoAAADgAKAAAAAAAAoAAAEAAAoAAAEAAAoAAAEAAAoAAAEAAAoAAAEAALAAAAAAAAoAAAEgAAoAAAEgAAoAAAEgAAoAAAEgAAoAAAEgAMAAAAAAAAoAAAFAAAoAAAFAAAoAAAFAAAoAAAFAAAoAAAFAANAAAAAAAAoAAAFgAAoAAAFgAAoAAAFgAAoAAAFgAAoAAAFgAAP//+Gb///4E///4fv///fz///iW///97P//+K7///3M///4xv///cT///je///9tP//+Pb///lc///5Dv//+XD///km///5SP//+T7///lc///5Vv//+XD///lu///5hAAAAAQACAAAAAwAAAAAAAQACAAAAAwAEAAAAAQACAAAAAwAIAAAAAQACAAAAAwAMAAAAAQACAAAAAwAQAAAAAQACAAAAAwAUAAAAAQACAAAAAwAYAAAAAQACAAAAAwAcAAAAAQACAAMABAAgAAAAAQACAAMABAAlAAAAAQACAAMABAAqAAAAAQACAAMABAAvAX4BgAF6AXwBmAGaAZQBlgGqAawBpgGoAX8BgQF7AX0BmQGbAZUBlwGrAa0BpwGpAYgBigGEAYYBiQGLAYUBhwG0AbYBsAG4AbIBtQG3AbEBuQGzAcIBxAG+AcYBwAHDAcUBvwHHAcEAAAPsAAAAAgAAAAIAAAANAAAAHAAAAl4AAAL6AAADYAAAA4AAAAPSAAgAAwEeAAwAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAEAAEAAQAFAAEAAQAGAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAcAAQAKAAEAAQABAAEAAQABAAEAAQABAAEAAQAIAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAJAAEAAQABAAEAAQABAAEAAQABAAsAAAAAAAAAAAACAAAAAAADAAAAAAAEAAUAAAAAAAAAAAAAAAIAAAAAAAMAAAAAAAQABQAAAAEAAQAGAAEAAQAHAAgAAQABAAEAAQABAAEAAQABAAkAAQABAAEAAQABAAoACwABAAEAAQABAAEADAABAAEAAQABAAEADQAOAAEAAQABAAEAAQAPAAEAAQABAAEAAQABAAEAAQABABAAAAAAAAAAAEAAAAAAAoAAAAAAA4AAAAAABIAAAAAABYAAAAAAAgAAAAAAAKAAAAAAAKAAAAAAAwAAAAAAAKAAAAIAAKAAAAIABAAAAAAAAKAAAAQAAKAAAAQABQAAAAAAAKAAAAY///+2v///vT///v6///8cP///D7///ysAAAAkv///CAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEABAAAAAYBcwF0AfIB8gHzAfMB8QAABMwAAAACAAAABAAAAA4AAAAcAAACegAAA5IAAAQoAAAEWAAABLIACAADASwADQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAQAAQABAAYAAQABAAcAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACAABAAsAAQABAAEAAQABAAEAAQABAAEAAQABAAkAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAoAAQABAAEAAQABAAEAAQABAAEADAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAUAAAAAAAAAAAACAAAAAAAAAAMAAAAAAAQABQAAAAAAAAAAAAAAAgAAAAAAAAADAAAAAAAEAAUAAAABAAEABgABAAEAAQAHAAgAAQABAAEAAQABAAEAAQABAAkAAQABAAoAAQABAAEAAQABAAEAAQABAAEAAQALAAEAAQABAAEAAQABAAwADQABAAEAAQABAAEADgABAAEADwABAAEAAQABAAEAAQABAAEAAQABABAAAQABAAEAAQABAAEAEQASAAEAAQABAAEAAQATAAEAAQAUAAEAAQABAAEAAQABAAEAAQABAAEAFQABAAEAAQABAAEAAQABAAEAAQABABYAAQABABcAAQABABgAAQABAAEAAQABAAEAAQABAAAAAAAAAABAAAAAAAOAAAAAAAWAAAAAAAeAAAAAAAmAAAAAAAIAAAAAAACgAAAAAACgAAAAAAMAAAAAAAKAAAAAAAQAAAAAAACgAAADAACgAAADAAUAAAAAAASAAAAAAAYAAAAAAACgAAAGAACgAAAGAAcAAAAAAAaAAAAAAAgAAAAAAACgAAAJAAkAAAAAAAiAAAAAP///tj///ta///++P//+/z///ui///8eP///ET///vq///8uAAAAJz///v2///8MAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAEAAAAAAAGAXMBdAHyAfIB8wHzAfEAAACEIAAAAAAAAAgAAAAGAAAAEAAAAEIAAABmAAgBCAAWAAQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAFAAUABQAFAAUAAAAAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAIAAAABAAMAAAAAAAKAAAACAAAAACADAAAAAASMIAAAAQAAAAgAAAAOAAAAFAAAAJYAAAKOAAADsAAIAOIAPgALAAUABQAMAAEAAQABAAEAAQABAAEAAQABAAEABAABAAQAAQAEAAEAAQABAAEADQABAA0AAQABAAEAAQABAAQAAQABAAEAAQAGAAgACQAGAAYABgAGAAcABwAHAAEAAQABAAEAAQABAAEAAQAGAAoACgAKAAoACgAGAAYAAAABAAAAAAAGAA4AAAAAAAEACwAAABUAFQAbAAAAAQAAAAAABgAOAAAAAAABAAsAAAAVABUAGwAAAAEAAAAAAAYADgACAAEAAQACAAMAFQAVABsAAAABAAAAAAAGAA4AAgACAAEAAgACABUAFQAbAAAAAQAAAAAABgAOAAQABQABAAQAAwAVABUAGwAAAAEAAAAAAAYADgAHAAYAAQAHAAkAFQAVABsAAAABAAAAAAAGAA4ABwAIAAEABwAMABUAFQAbAAAAAQAAAAAABgAOAAoADQABAAoACQAVABUAGwAAAAEAAAAAAAYADgAQAA8AIwAQABIAFQAVABsAAAABAAAAAAAGAA4AEAARACMAEAAQABUAFQAbAAAAAQAAAAAABgAOABQAEwAjABQAEgAVABUAGwAAAAEAAAAAAAYADgAWABcAAQAWAAMAFQAVABsAAAABAAAAAAAGAA4AFgAaAAEAFgAWABUAFQAbAAAAAQAAAAAABgAOABkAGAABABkAAwAVABUAGwAAAAEAAAAAAAYADgAZABkAAQAZABkAFQAVABsAAAABAAAAAAAGAA4AHgAcAB0AHgAhABUAFQAbAAAAAQAAAAAABgAOAB4AHwAdAB4AHgAVABUAGwAAAAEAAAAAAAYADgAgACIAHQAgACEAFQAVABsAAAAA/////wACAAD/////AAMAAP////8ABIAA//8AAAADAAAAAf//AAQAAP////8ABQAA/////wAGAAD//wACAAYAAP////8AB4AA//8AAwAGAAAABAACAAIAAP////8ABgAA//8ABQAHAAD/////AAgAAP////8ACAAA//8ABgAJAAD/////AAkAAP//AAYACoAA//8AAAAKAAD//wAGAAkAAAAB//8AC4AA/////wAMAAD/////AA0AAAAH//8ADQAA/////wAOAAD/////AA4AAAAH//8ADwAA/////wAPAAD//wAGAAIAAP//AAgAEAAA/////wAQAAD//wAGABAAAAAB//8AEYAA//8AAAARAAD//wAGAAIAAP////8AAAAAACQAAAA0AAAAdAAAAEQAAABUAAAAZAAAAK4AAADCAAAAugAIARkABQFgAWEBYgFjAWQACAFgAAUBGQEaARsBHAEdAAgBGQAFAVsBXAFdAV4BXwAIAVsABQFpAWoBawFsAW0ACAEZAAUBaQFqAWsBbAFtAAgBBgAaAWYAAABgAVcBWAFZAVoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWgBaQFqAWsBbAFtAWcAYwAIAQ0AAwFuAW8BcAAIAQcAAQEWAAgA4gAEAWUAAAAAAVYAAAGYIAAAAQAAAAgAAAAGAAAAFAAAATYAAAFaAAABfAAIAOMAjgAEAAQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAUABQAFAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAACAAAAAQADAAAAAP////8AAoAA/////wACAAD/////AAAAAAAA//8AAAAAAAQACADjAAIB9AFxAAAAAAKIIAAAAQAAAAgAAAAGAAAAFAAAAiwAAAJQAAACcAAIAGABCQAFAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEABAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAUABQAFAAUAAQABAAEAAQABAAEAAQABAAEAAQABAAUABQAFAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAACAAAAAQADAAAAAP////8AAoAA/////wACAAD/////AAAAAAAA//8AAAAEAAgBAQABAXI=";
      //หัวเรื่อง
      doc.addFileToVFS("angsana-normal.ttf", myFont);
      doc.addFont("angsana-normal.ttf", "myFont", "normal");
      doc.setFont("myFont");
      doc.setFontSize(16);
      doc.text(67, 18, "แบบการตรวจสอบเครื่องจักรประจำวัน");

      /* ฝ่ายและหน่วยงาน ✓ */
      doc.text(16, 31, "ฝ่าย  : ");
      //doc.setLanguage("th-TH");
      doc.rect(28, 27.5, 5, 5);
      doc.text(36, 31, "SMD  ");

      doc.rect(47, 27.5, 5, 5);
      doc.text(55, 31, "RMD7  ");

      doc.rect(68, 27.5, 5, 5);
      doc.text(76, 31, "RMD8  ");

      doc.rect(89, 27.5, 5, 5);
      doc.text(97, 31, "UTD  ");

      doc.text(135, 31, "หน่วยงาน  : ");
      doc.rect(156, 27.5, 5, 5);
      doc.text(164, 31, "MM  ");

      doc.rect(178, 27.5, 5, 5);
      doc.text(186, 31, "ME  ");

      //test ฝ่าย
      doc.setFontSize(26);
      doc.text(48, 31, "√");
      //test หน่วยงาน
      doc.setFontSize(26);
      doc.text(157, 31, "√");
      //test Doc.no / shift / date
      doc.setFontSize(14);
      doc.text(177, 12, this.header_data.doc_id);
      doc.text(182, 17, this.current_shift);
      doc.text(176, 22, this.current_date);

      /* doc.text('CheckBox:', 10, 125);
      // eslint-disable-next-line no-undef
      var checkBox = new CheckBox();
      checkBox.fieldName = "CheckBox1";
      checkBox.Rect = [50, 120, 30, 10];
      doc.addField(checkBox); */

      //doc.text(105, 31, "☑ ✓ ✔ √ ☐ ☒ ☓ ✕ ✖ ✗ ✘");

      /* doc.text('CheckBox:', 10, 125);
      var checkBox = new CheckBox();
      checkBox.fieldName = "CheckBox1";
      checkBox.Rect = [50, 120, 30, 10];
      checkBox.value = 'Yes'
      doc.addField(checkBox); */

      //ห้วข้อ AREA : JC31 : MOTOR CHANGING
      const data_report = [];
      data_report[0] = [
        null,
        {
          content: "AREA : JC31 : MOTOR CHANGING",
          styles: { halign: "center", valign: "middle", cellWidth: 68 },
        },
        null,
        null,
        null,
        null,
        null,
      ];
      let status_ok = [];
      let status_no = [];
      //let status_uncheck = [];
      let rotation_ok = [];
      let rotation_no = [];
      //let rotation_uncheck = [];

      for (let i = 0; i < 22; i++) {
        //ตรวจสอบค่าว่าง
        if (
          this.machine_data[i].comment == "" ||
          this.machine_data[i].comment == null
        ) {
          this.machine_data[i].comment = "";
        }
        //ติ๊กถูกตามค่าที่ได้รับ
        if (this.machine_data[i].status == "OK") {
          status_ok[i] = "√";
          status_no[i] = "";
        } else if (this.machine_data[i].status == "NO") {
          status_ok[i] = "";
          status_no[i] = "√";
        } else {
          status_ok[i] = "";
          status_no[i] = "";
        }
        if (this.machine_data[i].rotation == "OK") {
          rotation_ok[i] = "√";
          rotation_no[i] = "";
        } else if (this.machine_data[i].rotation == "NO") {
          rotation_ok[i] = "";
          rotation_no[i] = "√";
        } else {
          rotation_ok[i] = "";
          rotation_no[i] = "";
        }
      }
      for (let i = 1; i < 10; i++) {
        //ข้อมูลชุดที่ 1
        data_report[i] = [
          {
            content: i,
            styles: { halign: "center", valign: "middle", cellWidth: 10 },
          },
          {
            content: this.area1[i - 1].machine,
            styles: { halign: "center", valign: "middle", cellWidth: 68 },
          },
          {
            content: status_ok[i - 1],
            styles: { halign: "center", valign: "middle", cellWidth: 10 },
          },
          {
            content: status_no[i - 1],
            styles: { halign: "center", valign: "middle", cellWidth: 10 },
          },
          {
            content: rotation_ok[i - 1],
            styles: { halign: "center", valign: "middle", cellWidth: 10 },
          },
          {
            content: rotation_no[i - 1],
            styles: { halign: "center", valign: "middle", cellWidth: 10 },
          },
          {
            content: this.machine_data[i - 1].comment,
            styles: { halign: "center", valign: "middle", cellWidth: 50 },
          },
        ];
      }
      //ห้วข้อ AREA : JE21 : MOTOR DISCHANGING
      data_report[10] = [
        null,
        {
          content: "AREA : JE21 : MOTOR DISCHANGING",
          styles: { halign: "center", valign: "middle", cellWidth: 68 },
        },
        null,
        null,
        null,
        null,
        null,
      ];
      for (let i = 11; i < 21; i++) {
        //ข้อมูลชุดที่ 2
        data_report[i] = [
          {
            content: i - 1,
            styles: { halign: "center", valign: "middle", cellWidth: 10 },
          },
          {
            content: this.area2[i - 11].machine,
            styles: { halign: "center", valign: "middle", cellWidth: 68 },
          },
          {
            content: status_ok[i - 11],
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: status_no[i - 11],
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: rotation_ok[i - 11],
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: rotation_no[i - 11],
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: this.machine_data[i - 2].comment,
            styles: { halign: "center", valign: "middle", cellWidth: 50 },
          },
        ];
      }
      //หัวข้อ รายการตรวจสอบเครื่องจักร
      data_report[21] = [
        null,
        {
          content: "รายการตรวจสอบเครื่องจักร",
          colSpan: 3,
          styles: { halign: "center", valign: "middle", cellWidth: 68 },
        },
        {
          content: "OK",
          styles: { halign: "center", valign: "middle", cellWidth: 10 },
        },
        {
          content: "NO",
          styles: { halign: "center", valign: "middle", cellWidth: 10 },
        },
        {
          content: "หมายเหตุ",
          styles: { halign: "center", valign: "middle", cellWidth: 10 },
        },
      ];
      for (let i = 22; i < 25; i++) {
        //ติ๊กถูกตามค่าที่ได้รับ
        if (this.machine_data[i - 22].status == "OK") {
          status_ok[i - 22] = "√";
          status_no[i - 22] = "";
        } else if (this.machine_data[i - 22].status == "NO") {
          status_ok[i - 22] = "";
          status_no[i - 22] = "√";
        }
        //ข้อมูลชุดที่ 3
        data_report[i] = [
          {
            content: i - 2,
            styles: { halign: "center", valign: "middle", cellWidth: 10 },
          },
          {
            content:
              this.area3[i - 22].bogie +
              ": " +
              "SET " +
              this.machine_data[i - 3].bogies_set +
              " %,ACTUAL " +
              this.machine_data[i - 3].bogies_act +
              " %",
            colSpan: 3,
            styles: { halign: "start", valign: "middle", cellWidth: 68 },
          },
          {
            content: status_ok[i - 22],
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: status_no[i - 22],
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: this.machine_data[i - 3].comment,
            styles: { halign: "center", valign: "middle" },
          },
        ];
      }

      var motor_image =
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4SSWRXhpZgAATU0AKgAAAAgABgALAAIAAAAmAAAIYgESAAMAAAABAAEAAAExAAIAAAAmAAAIiAEyAAIAAAAUAAAIrodpAAQAAAABAAAIwuocAAcAAAgMAAAAVgAAEUYc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFdpbmRvd3MgUGhvdG8gRWRpdG9yIDEwLjAuMTAwMTEuMTYzODQAV2luZG93cyBQaG90byBFZGl0b3IgMTAuMC4xMDAxMS4xNjM4NAAyMDIxOjAxOjE4IDEwOjI2OjI3AAAGkAMAAgAAABQAABEckAQAAgAAABQAABEwkpEAAgAAAAM0NgAAkpIAAgAAAAM0NgAAoAEAAwAAAAEAAQAA6hwABwAACAwAAAkQAAAAABzqAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAyMTowMToxOCAxMDoyNTo1NwAyMDIxOjAxOjE4IDEwOjI1OjU3AAAAAAYBAwADAAAAAQAGAAABGgAFAAAAAQAAEZQBGwAFAAAAAQAAEZwBKAADAAAAAQAC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ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9J3cnPz7/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAB4ARIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5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";
      //รูปตัวอย่างเครื่องจักร และข้อสังเกตุ
      data_report[25] = [
        {
          content: "",
          rowSpan: 5,
        },
        {
          content: "",
          colSpan: 1,
          rowSpan: 5,
          styles: { halign: "center", valign: "middle", cellWidth: 68 },
        },
        {
          content:
            "   ข้อสังเกตุ : 1) สภาพทั่วไป ไม่สั่นหรือมีเสียงดังในขณะหมุน",
          colSpan: 5,
          styles: { halign: "start", valign: "middle", cellWidth: 10 },
        },
      ];
      data_report[26] = [
        {
          content:
            "                 2) สังเกตุทิศทางการหมุนจากทางด้านพัดลมระบายความร้อนของ",
          colSpan: 5,
          styles: { halign: "start", valign: "middle", cellWidth: 10 },
        },
      ];
      data_report[27] = [
        {
          content: "          มอเตอร์จะหมุนทวนเข็มนาฬิกาในสภาวะปกติ",
          colSpan: 5,
          styles: { halign: "start", valign: "middle", cellWidth: 10 },
        },
      ];
      for (let i = 28; i < 30; i++) {
        data_report[i] = [
          {
            content: "",
            colSpan: 5,
            styles: { halign: "start", valign: "middle", cellWidth: 10 },
          },
        ];
      }
      //console.log(this.machine_data);
      //table header
      doc.autoTable({
        didDrawCell: (data) => {
          if (data.section === "body" && data.column.index === 1) {
            doc.addImage(motor_image, "JPEG", 30, 205, 60, 30);
          }
        },
        styles: {
          textColor: "black",
          fillColor: "white",
          lineColor: "black",
          lineWidth: 0.25,
          fontStyle: "normal",
          fontSize: 13,
          font: "myFont",
          cellPadding: 0.5,
        },
        margin: { top: 35 },
        head: [
          [
            {
              content: "No.",
              rowSpan: 2,
              styles: { halign: "center", valign: "middle", cellWidth: 10 },
            },
            {
              content: "รายการตรวจสอบเครื่องจักร",
              rowSpan: 2,
              styles: { halign: "center", valign: "middle", cellWidth: 72 },
            },
            {
              content: "สภาพทั่วไป",
              colSpan: 2,
              styles: { halign: "center", valign: "middle" },
            },
            {
              content: "การหมุน",
              colSpan: 2,
              styles: { halign: "center", valign: "middle" },
            },
            {
              content: "หมายเหตุ",
              rowSpan: 2,
              styles: { halign: "center", valign: "middle", cellWidth: 60 },
            },
          ],
          [
            { content: "OK", styles: { halign: "center", valign: "middle" } },
            { content: "NO", styles: { halign: "center", valign: "middle" } },
            { content: "OK", styles: { halign: "center", valign: "middle" } },
            { content: "NO", styles: { halign: "center", valign: "middle" } },
          ],
        ],
        body: data_report,
      });

      //table detail
      doc.autoTable({
        styles: {
          textColor: "black",
          lineColor: "black",
          fillColor: "white",
          lineWidth: 0.25,
          fontSize: 13,
          font: "myFont",
        },
        margin: { left: 132 },
        startY: 237,
        head: [
          [
            {
              content: "",
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 32,
                minCellHeight: 14,
              },
            },
            {
              content: "",
              styles: {
                halign: "center",
                valign: "middle",
                cellWidth: 32,
                minCellHeight: 14,
              },
            },
          ],
          [
            {
              content: "ผู้ตรวจสอบ",
              styles: {
                halign: "center",
                valign: "middle",
                cellPadding: 0.25,
                fillColor: "#EEEEEE",
              },
            },
            {
              content: "ผู้อนุมัติ",
              styles: {
                halign: "center",
                valign: "middle",
                cellPadding: 0.25,
                fillColor: "#EEEEEE",
              },
            },
          ],
        ],
      });

      doc.setFontSize(13);
      doc.text(14, 242, "หมายเหตุ");
      doc.text(40, 242, "√    =  ผ่านการตรวจสอบ");
      doc.text(78, 242, "X    =  ไม่ผ่านการตรวจสอบ");

      doc.text(
        14,
        251,
        "............................................................................................................................................................"
      );
      doc.text(
        14,
        257,
        "............................................................................................................................................................"
      );

      doc.text(14, 250, this.header_data.ex_comment);

      doc.text(175, 265, "MTD-F-001 R.0 01/03/60");

      //console.log();
      if (localStorage.getItem("current_device") == "desktop") {
        window.open(doc.output("bloburl"), "_blank");
      } else {
        doc.save("machine_report.pdf");
      }
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    check_button() {
      //ตรวจสอบการกดปุ่ม
      if (
        this.put_step1 == true &&
        this.put_step2 == true &&
        this.put_step3 == true
      ) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return true;
      }
    },
    //ตรวจสอบค่า set และ act ว่าเกิน 1000 หรือไม่
    // eslint-disable-next-line vue/return-in-computed-property
    check_number() {
      //ใช้ for ในการตรวจสอบข้อมูล bogie
      for (let i = 0; i < this.area3.length; i++) {
        if (
          //bogie #O
          this.area3[0].bogies_set > 1000 ||
          this.area3[0].bogies_set == "" ||
          this.area3[0].bogies_act > 1000 ||
          this.area3[0].bogies_act == "" ||
          //bogie #A
          this.area3[1].bogies_set > 1000 ||
          this.area3[1].bogies_set == "" ||
          this.area3[1].bogies_act > 1000 ||
          this.area3[1].bogies_act == "" ||
          //bogie #B
          this.area3[2].bogies_set > 1000 ||
          this.area3[2].bogies_set == "" ||
          this.area3[2].bogies_act > 1000 ||
          this.area3[2].bogies_act == ""
        ) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          return (this.next_btn = false);
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          return (this.next_btn = true);
        }
      }
      //console.log(this.area3)
    },//ตรวจสอบค่า set และ act error หรือไม่
    // eslint-disable-next-line vue/return-in-computed-property
    check_error() {
      //ใช้ for ในการตรวจสอบข้อมูล bogie
      for (let i = 0; i < this.area3.length; i++) {
        if (
          //bogie #O
          this.area3[0].bogies_set == "" ||
          this.area3[0].bogies_act == "" ||
          //bogie #A
          this.area3[1].bogies_set == "" ||
          this.area3[1].bogies_act == "" ||
          //bogie #B
          this.area3[2].bogies_set == "" ||
          this.area3[2].bogies_act == ""
        ) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          return (this.text_error = true);
        } else {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          return (this.text_error = false);
        }
      }
      //console.log(this.area3)
    },
  },
  created() {
    console.log("Machine - "+localStorage.getItem("localUser"))
    //เรียกใช้ function แสดงเวลา
    this.getTime();
    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูลของ document
    let current_doc = localStorage.getItem("current_doc");
    current_doc = JSON.parse(current_doc);

    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล user
    let localUser = localStorage.getItem("localUser");
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
    }

    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล
    let watch_doc = localStorage.getItem("watch_doc");
    if (watch_doc == null || watch_doc == "") {
      //console.log("ok");
    } else {
      this.showData();
    }

    //console.log(current_doc.get_doc_id);
    //ตรวจสอบว่าเข้าระบบมาด้วยวิธีอะไร
    if (this.isTest == true) {
      this.show_report = true;
    } else {
      this.show_report = false;
    }
  },
};
</script>