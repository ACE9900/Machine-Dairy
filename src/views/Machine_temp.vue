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
    <!-- <h1 class="red--text">lat : {{ lat }}</h1>
    <h1 class="red--text">long : {{ lng }}</h1> -->
    <v-stepper v-model="e1" vertical>
      <v-form :ref="'form'">
        <template v-for="(step, n) in machine_data.length">
          <v-stepper-step :key="n" :complete="e1 > n" :step="n + 1" editable>
            <v-row class="ml-1" align="center">
              {{ machine_data[n].motor }}
              <v-icon v-if="machine_data[n].valid" class="ml-2" color="success"
                >mdi-check-bold</v-icon
              >
              <v-icon v-if="!machine_data[n].valid" class="ml-2" color="red"
                >mdi-close-thick</v-icon
              >
            </v-row>
          </v-stepper-step>

          <v-stepper-content :key="`${n}-content`" :step="n + 1">
            <v-form :ref="'stepForm'" lazy-validation>
              <!--ข้อมูล Tempareture ,Blower ,Currents ,Vibration-->
              <v-row>
                <!--Tempareture-->
                <v-col cols="6" class="pb-0">
                  <v-text-field
                    class="text-center"
                    v-model="machine_data[n].u_temp"
                    label="U (°C)"
                    type="number"
                    outlined
                    :rules="[
                      rules.require,
                      rules.space,
                      rules.number,
                      rules.counter,
                    ]"
                    :disabled="isTest"
                  ></v-text-field>
                  <v-text-field
                    class="text-center"
                    v-model="machine_data[n].w_temp"
                    label="W (°C)"
                    type="number"
                    outlined
                    :rules="[
                      rules.require,
                      rules.space,
                      rules.number,
                      rules.counter,
                    ]"
                    :disabled="isTest"
                  ></v-text-field>
                  <v-text-field
                    class="text-center"
                    v-model="machine_data[n].nde_temp"
                    label="NDE (°C)"
                    type="number"
                    outlined
                    :rules="[
                      rules.require,
                      rules.space,
                      rules.number,
                      rules.counter,
                    ]"
                    :disabled="isTest"
                  ></v-text-field>
                  <v-text-field
                    class="text-center"
                    v-model="machine_data[n].heat_temp"
                    label="HEAT SINK (°C)"
                    type="number"
                    outlined
                    :rules="[
                      rules.require,
                      rules.space,
                      rules.number,
                      rules.counter,
                    ]"
                    :disabled="isTest"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="pb-0">
                  <v-text-field
                    class="text-center"
                    v-model="machine_data[n].v_temp"
                    label="V (°C)"
                    type="number"
                    outlined
                    :rules="[
                      rules.require,
                      rules.space,
                      rules.number,
                      rules.counter,
                    ]"
                    :disabled="isTest"
                  ></v-text-field>
                  <v-text-field
                    class="text-center"
                    v-model="machine_data[n].de_temp"
                    label="DE (°C)"
                    type="number"
                    outlined
                    :rules="[
                      rules.require,
                      rules.space,
                      rules.number,
                      rules.counter,
                    ]"
                    :disabled="isTest"
                  ></v-text-field>
                  <v-text-field
                    class="text-center"
                    v-model="machine_data[n].frame_temp"
                    label="FRAME (°C)"
                    type="number"
                    outlined
                    :rules="[
                      rules.require,
                      rules.space,
                      rules.number,
                      rules.counter,
                    ]"
                    :disabled="isTest"
                  ></v-text-field>
                  <!--Blower-->
                  <v-row align="center" class="mt-2">
                    <v-col cols="4" class="text-left py-0 my-0">
                      <h4 class="subtitle-1">Blower</h4>
                    </v-col>
                    <v-col cols="8" class="py-0">
                      <v-radio-group
                        row
                        mandatory
                        v-model="machine_data[n].radios"
                        :rules="rules.radioRules"
                        :readonly="isTest"
                        class="py-0 my-0"
                        hide-details="auto"
                      >
                        <v-radio
                          v-model="selected"
                          label="OK"
                          value="pass"
                          on-icon="mdi-checkbox-marked-circle"
                          color="success"
                        ></v-radio>
                        <v-radio
                          v-model="selected"
                          label="NO"
                          value="not_pass"
                          on-icon="mdi-close-circle"
                          color="red"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-col>
                <!--Currents & Vibration-->
                <v-row class="mx-1">
                  <v-col cols="12" sm="6" class="py-0 my-0">
                    <v-textarea
                      v-model="machine_data[n].currents"
                      auto-grow
                      filled
                      rows="1"
                      label="CURRENTS"
                      counter
                      maxlength="50"
                      :disabled="isTest"
                      :rules="[rules.require]"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6" class="py-0 my-0">
                    <v-textarea
                      v-if="
                        machine_data[n].motor == 'MOTOR COMBUSTION AIR FAN' ||
                        machine_data[n].motor == 'MOTOR EJECTION AIR FAN' ||
                        machine_data[n].motor == 'MOTOR DISK SAW #1' ||
                        machine_data[n].motor == 'MOTOR DISK SAW #2'
                      "
                      v-model="machine_data[n].vibration"
                      auto-grow
                      filled
                      rows="1"
                      label="VIBRATION"
                      counter
                      maxlength="50"
                      :rules="[rules.require]"
                      :disabled="isTest"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-row>
            </v-form>
            <!-- Button Next & Check -->
            <v-divider></v-divider>
            <v-row>
              <v-col cols="6">
                <!--Next Step-->
                <v-btn
                  block
                  color="primary"
                  :disabled="isTest"
                  @click="nextStep(n)"
                >
                  Next
                </v-btn>
              </v-col>
              <v-col cols="6">
                <!--Check Validate-->
                <v-btn
                  block
                  color="amber"
                  :disabled="isTest"
                  @click="checkValidate(n)"
                >
                  Check
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
        </template>
      </v-form>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-btn
          v-if="check_button"
          block
          color="success"
          elevation="2"
          @click="saveData()"
          >SAVE</v-btn
        >
      </v-col>
    </v-stepper>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      e1: 1,
      url: "https://hook.zubbsteel.com/line-ci/machine/",
      check_data: [],
      id: "",
      lat: "",
      lng: "",
      //check_btn: false,
      doc_date: "",
      put_step: false,
      isTest: false,
      current_shift: "",
      current_date: "",
      show_report: false,
      machine_data: [
        {
          id: 1,
          motor: "MOTOR COMBUSTION AIR FAN",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 2,
          motor: "MOTOR EJECTION AIR FAN",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 3,
          motor: "MOTOR STAND 1H",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 4,
          motor: "MOTOR STAND 2V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 5,
          motor: "MOTOR STAND 3H",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 6,
          motor: "MOTOR STAND 4V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 7,
          motor: "MOTOR STAND 5H",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 8,
          motor: "MOTOR STAND 6V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 9,
          motor: "MOTOR STAND 1",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 10,
          motor: "MOTOR STAND 7H",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 11,
          motor: "MOTOR STAND 8V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 12,
          motor: "MOTOR STAND 9H/U",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 13,
          motor: "MOTOR STAND 10H/V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 14,
          motor: "MOTOR STAND 11H/U",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 15,
          motor: "MOTOR STAND 12H/V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 16,
          motor: "MOTOR STAND 2",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 17,
          motor: "MOTOR STAND 13H/U",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 18,
          motor: "MOTOR STAND 14H/V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 19,
          motor: "MOTOR STAND 15H/U",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 20,
          motor: "MOTOR STAND 16H/V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 21,
          motor: "MOTOR STAND 17H",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 22,
          motor: "MOTOR STAND 18H/V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 23,
          motor: "MOTOR SHEAR 3",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 24,
          motor: "MOTOR COOLING BED",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 25,
          motor: "MOTOR STRAIGHTENING",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 26,
          motor: "MOTOR COLD SHEAR",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 27,
          motor: "MOTOR DISK SAW #1",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 28,
          motor: "MOTOR DISK SAW #2",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
      ],
      stepForm: [],
      //Varidation Rules
      rules: {
        space: (value) =>
          (value || "").indexOf(" ") < 0 || "No spaces are allowed",
        number: (value) => !isNaN(value) || "Must be a number",
        require: (value) => !!value || "This field is required",
        counter: (value) => value <= 1000 || "Input 0-1000",
        //stepper: value => (value || false) || 'Not Complete'
      },
      //Temp Data
      u_temp: "",
      v_temp: "",
      w_temp: "",
      de_temp: "",
      nde_temp: "",
      frame_temp: "",
      heat_temp: "",
      currents: "",
      vibration: "",
      radios: "",
      status: "",
      selected: "",
      valid: "",
      //progress: false,
    };
  },

  methods: {
    /* stepStatus(n) {
      :rules="stepStatus(n+1)"
      console.log("check");
      this.check_blower(n);
      this.check_vibration(n);
      this.check_icon(n);
    }, */
    //check validation
    checkValidate(n) {
      if (this.$refs.stepForm[n].validate()) {
        console.log("validation success");
      } else {
        console.log("input data please !");
      }
    },
    //nextStep
    async nextStep(n) {
      if (n === this.machine_data) {
        this.e1 = 1;
        //call check_icon function
        await this.check_icon(n);
      } else {
        this.e1 = n + 2;
        //call check vibartion function
        await this.check_vibration(n);
        //call insertData function
        //await this.insertData(n);
        //call putData function เพื่อเพิ่มข้อมูลไปที่ database
        await this.putData(n);
      }
    },
    async insertData(n) {
      //ตรวจสอบว่ามีข้อมูลหรือไม่ หากมีแล้วจะทำการอัพเดต
      console.log("insert : " + this.machine_data[n].radios);
      if (this.machine_data != "") {
        this.machine_data[n] = {
          motor: this.machine_data[n].motor,
          u_temp: this.machine_data[n].u_temp,
          v_temp: this.machine_data[n].v_temp,
          w_temp: this.machine_data[n].w_temp,
          de_temp: this.machine_data[n].de_temp,
          nde_temp: this.machine_data[n].nde_temp,
          frame_temp: this.machine_data[n].frame_temp,
          heat_temp: this.machine_data[n].heat_temp,
          blower: this.machine_data[n].radios,
          currents: this.machine_data[n].currents,
          vibration: this.machine_data[n].vibration,
          valid: this.machine_data[n].valid,
          status: this.machine_data[n].status,
        };
        console.log("insert if : " + this.machine_data[n].radios);
        //console.log("update : " + this.machine_data[n].motor);
      } else {
        //เพิ่มข้อมูลเข้าไปใหม่
        this.machine_data[n] = {
          motor: this.machine_data[n].motor,
          u_temp: this.machine_data[n].u_temp,
          v_temp: this.machine_data[n].v_temp,
          w_temp: this.machine_data[n].w_temp,
          de_temp: this.machine_data[n].de_temp,
          nde_temp: this.machine_data[n].nde_temp,
          frame_temp: this.machine_data[n].frame_temp,
          heat_temp: this.machine_data[n].heat_temp,
          blower: this.machine_data[n].radios,
          currents: this.machine_data[n].currents,
          vibration: this.machine_data[n].vibration,
          valid: this.machine_data[n].valid,
          status: this.machine_data[n].status,
        };
        console.log("insert else : " + this.machine_data[n].radios);
        //this.machine_data.push(data)
        //console.log("New : " + this.machine_data[n].motor);
      }
    },
    //check blower และตั่งค่าให้เป็น OK หรือ NO
    check_blower(n) {
      if (this.machine_data[n].radios == 0) {
        this.machine_data[n].radios = "OK";
        //call check_icon function
        this.check_icon(n);
      } else {
        this.machine_data[n].radios = "NO";
        //call check_icon function
        this.check_icon(n);
      }
    },
    //check vibartion และตั่งค่าให้เป็น 'ไม่สามารถแก้ไขได้'
    check_vibration(n) {
      if (
        this.machine_data[n].motor != "MOTOR COMBUSTION AIR FAN" &&
        this.machine_data[n].motor != "MOTOR EJECTION AIR FAN" &&
        this.machine_data[n].motor != "MOTOR DISK SAW #1" &&
        this.machine_data[n].motor != "MOTOR DISK SAW #2"
      ) {
        this.machine_data[n].vibration = "-";
      }
    },
    //check data true or false and show icon
    check_icon(n) {
      if (
        this.machine_data[n].u_temp == null ||
        this.machine_data[n].v_temp == null ||
        this.machine_data[n].w_temp == null ||
        this.machine_data[n].de_temp == null ||
        this.machine_data[n].nde_temp == null ||
        this.machine_data[n].frame_temp == null ||
        this.machine_data[n].heat_temp == null ||
        this.machine_data[n].radios == null ||
        this.machine_data[n].currents == null ||
        this.machine_data[n].vibration == null
      ) {
        this.machine_data[n].valid = false;
        this.machine_data[n].status = 2;
        //console.log("status : " + this.status[n])
      } //ถ้าหากข้อมูลไม่เป็นค่าว่าง
      else if (
        this.machine_data[n].u_temp != "" &&
        this.machine_data[n].v_temp != "" &&
        this.machine_data[n].w_temp != "" &&
        this.machine_data[n].de_temp != "" &&
        this.machine_data[n].nde_temp != "" &&
        this.machine_data[n].frame_temp != "" &&
        this.machine_data[n].heat_temp != "" &&
        this.machine_data[n].radios != "" &&
        this.machine_data[n].currents != "" &&
        this.machine_data[n].vibration != ""
      ) {
        this.machine_data[n].valid = true;
        this.machine_data[n].status = 1;
        //console.log("status : " + this.status[n])
      } //ถ้าหากข้อมูลเป็นค่าว่าง
      else if (
        this.machine_data[n].u_temp == "" ||
        this.machine_data[n].v_temp == "" ||
        this.machine_data[n].w_temp == "" ||
        this.machine_data[n].de_temp == "" ||
        this.machine_data[n].nde_temp == "" ||
        this.machine_data[n].frame_temp == "" ||
        this.machine_data[n].heat_temp == "" ||
        this.machine_data[n].radios == "" ||
        this.machine_data[n].currents == "" ||
        this.machine_data[n].vibration == ""
      ) {
        this.machine_data[n].valid = false;
        this.machine_data[n].status = 2;
        //console.log("status : " + this.status[n])
      }
    },
    //post data ไปยัง table
    async putData(n) {
      //call getData function เพื่อรับค่าจำนวน
      await this.getData();
      //call getMachineTemp function เพื่อรับค่าจำนวน
      await this.getMachineTemp();
      //call blower function
      await this.check_blower(n);
      //console.log(this.u_temp[n])
      const data_insert = {
        u_temp: this.machine_data[n].u_temp,
        v_temp: this.machine_data[n].v_temp,
        w_temp: this.machine_data[n].w_temp,
        de_temp: this.machine_data[n].de_temp,
        nde_temp: this.machine_data[n].nde_temp,
        frame_temp: this.machine_data[n].frame_temp,
        heat_temp: this.machine_data[n].heat_temp,
        blower: this.machine_data[n].radios,
        currents: this.machine_data[n].currents,
        vibration: this.machine_data[n].vibration,
        valid: this.machine_data[n].valid,
        form_id: 3,
        doc_id: this.doc_length + 1,
      };
      console.log("blower : " + this.machine_data[n].radios);
      //console.log(data_insert);
      //post data ไปยัง table
      axios
        .post(this.url + "machine_temp_insert", data_insert)
        //.then((response) => console.log(response.data));
      await this.check_all_data();
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
          form_id: 3,
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
    getMachineTemp() {
      return axios
        .get(this.url + "machine_temp")
        .then(
          (response) => (
            (this.machine_temp_length = response.data.length)
            //console.log(this.machine_temp_length)
          )
        );
    },
    //รับค่า id จากฟอร์ม List
    getID() {
      //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล
      let current_doc = localStorage.getItem("current_doc");
      current_doc = JSON.parse(current_doc);
      //แสดงข้อมูลตาม id ที่ได้จากการเลือก list
      return axios
        .get(this.url + "machine_temp_id/" + current_doc.get_doc_id)
        .then((response) => (this.machine_temp_data = response.data));
    },
    // ตรวจสอบค่า status ที่ได้และแสดงที่ step
    check_BlowerReverse(n) {
      if (this.machine_temp_data[n].blower == "OK") {
        this.machine_temp_data[n].blower = 0;
      } else if (this.machine_temp_data[n].blower == "NO") {
        this.machine_temp_data[n].blower = 1;
      }
    },
    // รับค่าที่ได้จากฟอร์ม List ไปแสดงที่ Step
    async pushData() {
      //รับค่า id จากฟอร์ม List
      await this.getID();
      for (let n = 0; n < 28; n++) {
        await this.check_BlowerReverse(n);
        this.machine_data[n].u_temp = this.machine_temp_data[n].u_temp;
        this.machine_data[n].v_temp = this.machine_temp_data[n].v_temp;
        this.machine_data[n].w_temp = this.machine_temp_data[n].w_temp;
        this.machine_data[n].de_temp = this.machine_temp_data[n].de_temp;
        this.machine_data[n].nde_temp = this.machine_temp_data[n].nde_temp;
        this.machine_data[n].frame_temp = this.machine_temp_data[n].frame_temp;
        this.machine_data[n].heat_temp = this.machine_temp_data[n].heat_temp;
        this.machine_data[n].radios = this.machine_temp_data[n].blower;
        this.machine_data[n].currents = this.machine_temp_data[n].currents;
        this.machine_data[n].vibration = this.machine_temp_data[n].vibration;
        this.machine_data[n].valid = this.machine_temp_data[n].valid;
      }
      //console.log(this.machine_data)
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
    check_all_data() {
      for (let i = 0; i < this.machine_data.length; i++) {
        if (
          this.machine_data[i].status == 2 ||
          this.machine_data[i].status == ""
        ) {
          this.put_step = false;
          //console.log("FALSE");
          i = this.machine_data.length + 1;
        } else {
          this.put_step = true;
          //console.log("TRUE");
        }
      }
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    check_button() {
      //ตรวจสอบการกดปุ่้ม
      if (this.put_step == true) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return true;
      }
    },
    /*   machine_data() {return [
        {
          id: 1,
          motor: "MOTOR COMBUSTION AIR FAN",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 2,
          motor: "MOTOR EJECTION AIR FAN",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 3,
          motor: "MOTOR STAND 1H",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 4,
          motor: "MOTOR STAND 2V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 5,
          motor: "MOTOR STAND 3H",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 6,
          motor: "MOTOR STAND 4V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 7,
          motor: "MOTOR STAND 5H",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 8,
          motor: "MOTOR STAND 6V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 9,
          motor: "MOTOR STAND 1",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 10,
          motor: "MOTOR STAND 7H",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 11,
          motor: "MOTOR STAND 8V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 12,
          motor: "MOTOR STAND 9H/U",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 13,
          motor: "MOTOR STAND 10H/V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 14,
          motor: "MOTOR STAND 11H/U",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 15,
          motor: "MOTOR STAND 12H/V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 16,
          motor: "MOTOR STAND 2",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 17,
          motor: "MOTOR STAND 13H/U",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 18,
          motor: "MOTOR STAND 14H/V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 19,
          motor: "MOTOR STAND 15H/U",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 20,
          motor: "MOTOR STAND 16H/V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 21,
          motor: "MOTOR STAND 17H",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 22,
          motor: "MOTOR STAND 18H/V",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 23,
          motor: "MOTOR SHEAR 3",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 24,
          motor: "MOTOR COOLING BED",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 25,
          motor: "MOTOR STRAIGHTENING",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 26,
          motor: "MOTOR COLD SHEAR",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 27,
          motor: "MOTOR DISK SAW #1",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
        {
          id: 28,
          motor: "MOTOR DISK SAW #2",
          u_temp: "",
          v_temp: "",
          w_temp: "",
          de_temp: "",
          nde_temp: "",
          frame_temp: "",
          heat_temp: "",
          blower: "",
          currents: "",
          vibration: "",
          valid: "",
          status: "",
        },
      ]} */
  },
  created() {
    //เรียกใช้ function แสดงเวลา
    this.getTime();
    /* this.lat = localStorage.getItem("current_lat");
    this.lng = localStorage.getItem("current_long"); */

    //สร้างตัวแปรและรับค่าจาก store เพื่อแสดงข้อมูล user
    let localUser = localStorage.getItem("localUser");
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
