<template>
  <v-app>
    <v-main>
      <Navbar :name="$route.name"/>
      <router-view />
    </v-main>
    <!-- <v-btn
      id="top"
      v-scroll="onScroll"
      fab
      dark
      fixed
      bottom
      right
      color="pink"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn> -->
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: { Navbar },
  methods: {
    /* onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }, */
    /*top(){
            window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
            });
      }*/
  },
};
</script>