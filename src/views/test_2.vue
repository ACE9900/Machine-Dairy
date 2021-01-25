<template>
  <div id="app" class="pa-12 grey darken-3">
    <v-main align="center" justify="center">
      <v-card
        class="mx-auto my-1"
        max-width="344"
        outlined
        v-for="(item, n) in location.length"
        :key="n"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              Location {{ location[n].head }}
            </v-list-item-title>
            <div class="overline mb-4">
              {{ test }}
              <!-- <v-icon v-if="this.check == true" class="ml-2" color="success"
                >mdi-check-bold</v-icon
              >
              <v-icon v-if="this.check == false" class="ml-2" color="error"
                >mdi-close-thick</v-icon
              > -->
            </div>
            <v-list-item-subtitle
              >Latitude : {{ location[n].Lat }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Longitude : {{ location[n].Long }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Accuracy : {{ location[n].accuracy }}</v-list-item-subtitle
            >
            <v-divider class="my-1"></v-divider
            ><v-list-item-title class="headline mb-1 red--text">
              Accuracy <v-icon color="red">mdi-plus-minus</v-icon>
            </v-list-item-title>
            <v-list-item-subtitle
              >Lat+ : {{ location[n].lat_plus }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Lat- {{ location[n].lat_minus }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Long+ : {{ location[n].long_plus }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >Long- {{ location[n].long_minus }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn block :class="location[n].color" @click="saveData2(n)"
            >save - {{ location[n].head }}</v-btn
          >
        </v-card-actions>
      </v-card>

      <v-card class="mx-auto my-1" max-width="344" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              Check Location
            </v-list-item-title>
            <div v-if="this.check == false" class="overline mb-4 error--text">
              {{ test }}
              <v-icon v-if="this.check == true" class="ml-2" color="success"
                >mdi-check-bold</v-icon
              >
              <v-icon v-if="this.check == false" class="ml-2" color="error"
                >mdi-close-thick</v-icon
              >
            </div>
            <div v-else class="overline mb-4 success--text">
              {{ test }}
              <v-icon v-if="this.check == true" class="ml-2" color="success"
                >mdi-check-bold</v-icon
              >
              <v-icon v-if="this.check == false" class="ml-2" color="error"
                >mdi-close-thick</v-icon
              >
            </div>
            <v-list-item-subtitle>Latitude : {{ lat }}</v-list-item-subtitle>
            <v-list-item-subtitle>Longitude : {{ long }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn block color="success" @click="saveData()">save - end</v-btn>
        </v-card-actions>
      </v-card>
      <v-btn class="mt-10" color="yellow" @click="measure()">Distance</v-btn>
    </v-main>
  </div>
</template>

<script>
import store from "../vuex/store";
import axios from "axios";

export default {
  store,
  data() {
    return {
      lat: "",
      long: "",
      lat1: "1",
      lon1: "",
      lat2: "",
      lon2: "",
      distance: "",
      location: [
        { head: "Start", Lat: "", Long: "", color: "info" },
        { head: "End", Lat: "", Long: "", color: "error" },
      ],
      accuracy: "",
      data_head: "",
      data_color: "",
      check: null,
      test: "",
      url: "https://hook.zubbsteel.com/line-ci/machine/",
    };
  },
  methods: {
    locatorButtonPressed(n) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude.toFixed(6);
          this.long = position.coords.longitude.toFixed(6);
          this.accuracy = position.coords.accuracy;
          //alert(this.lat + " : " + this.long)
          //commit data to LocalStorage
          this.$store.commit("setLat", this.lat);
          this.$store.commit("setLong", this.long);
          this.$store.commit("setAccur", this.accuracy);

          //convert data are plus and minus
          this.lat_plus = String((parseFloat(this.lat) + 0.00065).toFixed(6));
          this.lat_minus = String((parseFloat(this.lat) - 0.00065).toFixed(6));
          this.long_plus = String((parseFloat(this.long) + 0.00065).toFixed(6));
          this.long_minus = String(
            (parseFloat(this.long) - 0.00065).toFixed(6)
          );

          this.check_area();

          for (let i = 0; i < this.location.length; i++) {
            //เพิ่มเข้าไปใน Array
            if (n == 0) {
              this.data_head = "Start";
              this.data_color = "info";
            } else {
              this.data_head = "End";
              this.data_color = "error";
            }

            this.location[n] = {
              head: this.data_head,
              Lat: this.lat,
              Long: this.long,
              color: this.data_color,
              accuracy: this.accuracy,
              lat_plus: this.lat_plus,
              lat_minus: this.lat_minus,
              long_plus: this.long_plus,
              long_minus: this.long_minus,
            };
          }
          console.log(this.location[n]);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    //ขอบเขตพื้นที่
    check_area() {
      /* let lat_plus = String(
        parseFloat(localStorage.getItem("current_lat")) + 0.00065
      );
      let lat_minus = String(
        parseFloat(localStorage.getItem("current_lat")) - 0.00065
      );
      let long_plus = String(
        parseFloat(localStorage.getItem("current_long")) + 0.00065
      );
      let long_minus = String(
        parseFloat(localStorage.getItem("current_long")) - 0.00065
      ); */
      //console.log(this.lat_plus)
      if (
        /* this.lat_plus >= "13.696325" &&
        this.lat_plus <= "13.696533" &&
        this.lat_minus >= "13.696325" &&
        this.lat_minus <= "13.696533" &&
        
        this.long_plus >= "100.329990" &&
        this.long_plus <= "100.330311" &&
        this.long_minus >= "100.329990" &&
        this.long_minus <= "100.330311"
         */
        this.lat >= "13.696325" &&
        this.long >= "100.329990" &&
        this.lat <= "13.696533" &&
        this.long <= "100.330311"
      ) {
        this.test = "Correct";
        this.check = true;
        console.log("Correct");
      } else {
        this.test = "Failed";
        this.check = false;
        alert("คุณไม่อยู่ในพื้นที่ที่กำหนด - ลองทำรายการใหม่ !");
        console.log("Failed");
      }
    },
    //ตรวจสอบค่าว่าง
    chkParam(lt1, lt2, lg1, lg2) {
      let array = [];
      array.push(lt1, lt2, lg1, lg2);

      if (array.includes("")) {
        return false;
      } else {
        return true;
      }
    },
    //ระยะทางระหว่าง 2 จุด
    measure() {
      if (
        this.chkParam(
          this.location[0].Lat,
          this.location[0].Long,
          this.location[1].Lat,
          this.location[1].Long
        )
      ) {
        this.lat1 = this.location[0].Lat;
        this.lon1 = this.location[0].Long;
        this.lat2 = this.location[1].Lat;
        this.lon2 = this.location[1].Long;
        /* this.lat1 = String(parseFloat(this.location[0].Lat) + 0.00065);
        this.lon1 = String(parseFloat(this.location[0].Long) + 0.00065);
        this.lat2 = String(parseFloat(this.location[1].Lat) + 0.00065);
        this.lon2 = String(parseFloat(this.location[1].Long) + 0.00065); */
        // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        //var R = localStorage.getItem("current_accuracy"); // Radius of earth in KM
        var dLat = (this.lat2 * Math.PI) / 180 - (this.lat1 * Math.PI) / 180;
        var dLon = (this.lon2 * Math.PI) / 180 - (this.lon1 * Math.PI) / 180;
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((this.lat1 * Math.PI) / 180) *
            Math.cos((this.lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        this.distance = (R * c * 1000).toFixed(2);
        /* console.log(this.lat1);
        console.log(this.lat2);
        console.log(this.lon1);
        console.log(this.lon2);
        console.log("Distance : " + this.distance + " meters"); */
        alert(
          "Distance : " +
            this.distance +
            " meters ,accuracy : ± " +
            localStorage.getItem("current_accuracy") +
            "meters"
        );
      } else {
        alert("ไม่สามารถคำนวณได้");
      }
    },
    //ตรวจสอบตำแหน่ง
    async saveData() {
      /* await this.locatorButtonPressed();
      this.lat1 = "13.69636";
      this.lon1 = "100.33001";
      console.log("Lat1 : " + this.lat1);
      console.log("Lon1 : " + this.lon1); */
      await this.locatorButtonPressed();
      //กำหนด object เพื่อเก็บข้อมูล
      const data_insert = {
        lat: localStorage.getItem("current_lat"),
        long: localStorage.getItem("current_long"),
        status: this.test,
      };
      axios.post(this.url + "location_insert/", data_insert);
    },
    //ตรวจสอบตำแหน่งสำหรับ 2 จุด
    async saveData2(n) {
      await this.locatorButtonPressed(n);
      //เพิ่มเข้าไปใน Array
      console.log(n);
      //this.motor[0] = this.area1;
    },
  },
};
</script>
