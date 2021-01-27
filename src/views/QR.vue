<template>
  <div id="app">
    <!-- <v-card color="red">
      <v-card-text>
        <div >
          ผลรับที่ได้ : {{ decodedContent }}
        </div>
      </v-card-text>
    </v-card> -->
    <qrcode-stream @init="onInit" @decode="onDecode" :paused="paused">
    </qrcode-stream>

    <div class="error white--text">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../vuex/store";

export default {
  store,
  data() {
    return {
      paused: false,
      url: "https://hook.zubbsteel.com/line-ci/machine",
      //decodedContent: '',
      errorMessage: "",
      lat: "",
      long: "",
      check: false,
    };
  },
  computed: {
    cameraForzen() {
      return this.camera === false || (this.loading && !this.firstLoad);
    },
  },
  methods: {
    //ตรวจสอบการแสกน QR Code
    async onDecode(content) {
      //รับค่ามาแล้ว split / เพื้อเอาแค่ค่านั้น
      var pathname_test = new URL(content).pathname.split("/")[1]; //Machine_area1_JC31F01VEF-M001
      //motorname หลังจาก split
      var motorname = new URL(content).pathname.split("/Machine_area1_")[1]; //JC31F01VEF-M001
      //pathname หลังจาก substr
      var pathname = new URL(content).pathname.substr(1, 13); //Machine_area1

      //รับค่าจากการแสกน QR Code
      //this.decodedContent = pathname_test;
      console.log(pathname)
      console.log(motorname)
      console.log(pathname_test)
      //this.$router.replace({ name: testvalue });

      //เรียกใช้ check_area
      await this.check_area();

      if (this.check == false) {
        alert("check = false")
        this.scan_False();
      } else if (
        pathname == "Machine" ||
        pathname == "Machine_temp" ||
        pathname == "Photocell" ||
        pathname == "Machine_rolling" ||
        pathname == "Machine_area1"
      ) {
        if (localStorage.getItem("localUser") != null) {
          this.$router.replace({ name: pathname ,params: { motor_name: motorname }});
        } else {
          this.$fire({
            title: "สแกนสำเร็จ",
            type: "success",
            timer: 2000,
          }).then((r) => {
            console.log(r.value);
            this.$router.replace({
              name: "Home",
              params: { next_page: pathname ,motor_name: motorname},
            });
          });
        }
      } else {
        this.scan_False();
      }
    },
    //ตรวจสอบการใช้งานของกล้อง
    onInit(promise) {
      //เรียกใช้ locatorButtonPressed
      this.locatorButtonPressed();
      promise
        .then(() => {
          console.log("Successfully initilized! Ready for scanning now!");
        })
        .catch((error) => {
          //กล้องถูก blocked ในการใช้งาน
          if (error.name === "NotAllowedError") {
            this.$fire({
              title: "Camera\u{1F4F7}</i>Blocked",
              text:
                "ไม่สามารถเข้าถึงกล้องได้เนื่องจากถูก Block\nกรุณาไปตั้งค่าที่ Setting > Privacy > Camera",
              type: "error",
            }).then((r) => {
              if (
                localStorage.getItem("localUser") == null ||
                localStorage.getItem("localUser") == ""
              ) {
                localStorage.clear();
                this.$router.replace({ name: "Home" });
              } else {
                this.$router.replace({ name: "List" });
              }
              console.log(r.value);
            });
          } else if (error.name === "NotFoundError") {
            this.errorMessage = "Do you even have a camera on your device?";
          } else if (error.name === "NotSupportedError") {
            this.errorMessage =
              "Seems like this page is served in non-secure context (HTTPS, localhost or file://)";
            //ไม่พบการใช้งานของกล้อง
          } else if (error.name === "NotReadableError") {
            this.errorMessage =
              "Couldn't access your camera. Is it already in use?";
            this.$fire({
              title: "Camera\u{1F4F7}Not Found",
              text:
                "ไม่สามารถเข้าถึงกล้องของคุณได้",
              type: "error",
            }).then((r) => {
              if (
                localStorage.getItem("localUser") == null ||
                localStorage.getItem("localUser") == ""
              ) {
                localStorage.clear();
                this.$router.replace({ name: "Home" });
              } else {
                this.$router.replace({ name: "List" });
              }
              console.log(r.value);
            });
          } else if (error.name === "OverconstrainedError") {
            this.errorMessage =
              "Constraints don't match any installed camera. Did you asked for the front camera although there is none?";
          } else {
            this.errorMessage = "UNKNOWN ERROR: " + error.message;
          }
        });
    },
    //รับค่า Location
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude.toFixed(6);
          this.long = position.coords.longitude.toFixed(6);

          this.$store.commit("setLat", this.lat);
          this.$store.commit("setLong", this.long);

          const data_store = {
            isTest: false,
          };
          this.$store.commit("setDoc", data_store);
        },
        (error) => {
          console.log(error.message);
          this.$fire({
            title: "Location Blocked",
            text:
              "ไม่สามารถเข้าถึงสถานที่ได้เนื่องจากถูก Block\nกรุณาไปตั้งค่าที่ Setting > Privacy > Location",
            type: "error",
          }).then((r) => {
            if (
              localStorage.getItem("localUser") == null ||
              localStorage.getItem("localUser") == ""
            ) {
              localStorage.clear();
              this.$router.replace({ name: "Home" });
            } else {
              this.$router.replace({ name: "List" });
            }
            console.log(r.value);
          });
        }
      );
    },
    //รับค่าตำแหน่งจาก database
    get_location() {
      //แสดงข้อมูลตาม id ที่ได้จากการเลือก list
      return axios
        .get(this.url + "/location_id/" + 1)
        .then(
          (response) => (
            (this.location_data = response.data[0]),
            console.log(this.location_data)
          )
        );
    },
    //scan location ไม่ถูกต้อง
    scan_False() {
      this.$confirm(
        "ไม่อยู่ในพื้นที่ที่กำหนด หรือ\nQR code ไม่ถูกต้อง!",
        "สแกนไม่สำเร็จ",
        "error",
        {
          confirmButtonText: "สแกนใหม่",
          cancelButtonText: "ไปหน้าหลัก",
        }
      )
        .then((r) => {
          console.log(r);
          location.reload();
        })
        .catch(() => {
          this.$router.replace({ name: "Home" });
        });
    },
    //ขอบเขตพื้นที่
    async check_area() {
      await this.get_location();
      if (
        /* this.lat >= "13.696025" &&
        this.lat <= "13.696533" &&
        this.long >= "100.329990" &&
        this.long <= "100.339011" */
        this.lat >= this.location_data.lat_min &&
        this.lat <= this.location_data.lat_max &&
        this.long >= this.location_data.long_min &&
        this.long <= this.location_data.long_max
      ) {
        this.check = true;
      } else {
        this.check = false;
        this.$store.commit("setLat", null);
        this.$store.commit("setLong", null);
      }
    },
  },
  created() {
    //console.log("QR - " + localStorage.getItem("localUser"));
    //localStorage.clear();
    /* this.locatorButtonPressed();
    console.log(localStorage.getItem("current_lat").split("9")[0]);
    console.log(localStorage.getItem("current_long")); */
  },
};
</script>

<style scoped>
.decoded-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;

  color: white;
  font-weight: bold;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
}

.error {
  color: red;
  font-weight: bold;
}
</style>
