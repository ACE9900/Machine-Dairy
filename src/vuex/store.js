import Vue from "vue";
import Vuex from "vuex";
import VueLocalStorage from "vue-localstorage";

Vue.use(Vuex);
Vue.use(VueLocalStorage);

export const store = new Vuex.Store({
  state: {
    number: 0,
    firstname: {},
    //current_page: {},
    doc_shift: "",
    doc_watch: "",
    search_filter: "",
    lat: "",
    long: "",
    localUser: Vue.localStorage.get("localUser"),
    docShift: Vue.localStorage.get("docShift"),
    watch_doc: Vue.localStorage.get("watch_doc"),
    current_lat: Vue.localStorage.get("current_lat"),
    current_long: Vue.localStorage.get("current_long"),
    current_doc: Vue.localStorage.get("current_doc"),
    filter_search: Vue.localStorage.get("filter_search"),
    current_device: Vue.localStorage.get("current_device"),
    //currentpage: Vue.localStorage.get("currentpage"),
  },
  mutations: {
    addNum: (state, num) => {
      state.number += num;
    },
    //เก็บค่า firstname
    setFirstname(state, firstname) {
      localStorage.setItem("localUser", firstname);
      //state.firstname = firstname;
    },  
    //เก็บค่า firstname
    setShift(state, doc_shift) {
      localStorage.setItem("docShift", doc_shift);
      //console.log("local : "+localStorage.getItem("docShift"));
    },
    //เก็บค่า doc_watch
    setWatch(state, doc_watch) {
      localStorage.setItem("watch_doc", doc_watch);
      //console.log("local : "+localStorage.getItem("docShift"));
    }, //เก็บค่า firstname
    setFilter(state, search_filter) {
      localStorage.setItem("filter_search", search_filter);
      //console.log("local : "+localStorage.getItem("docShift"));
    },
    setLat(state, lat) {
      localStorage.setItem("current_lat", lat);
      //console.log("local : " + localStorage.getItem("current_lat"));
    },
    setLong(state, long) {
      localStorage.setItem("current_long", long);
      //console.log("local : " + localStorage.getItem("current_long"));
    },
    //เก็บค่า current_page
    setDoc(state, doc) {
      let doc_data = JSON.stringify(doc);
      localStorage.setItem("current_doc", doc_data);
      //console.log(localStorage.getItem("current_doc"));
    },
    setDevice(state, device) {
      localStorage.setItem("current_device", device);
      //console.log("local : " + localStorage.getItem("current_device"));
    },
    /* setDoc(state, doc) {
             localStorage.setItem("current_doc", doc);
             console.log(localStorage.getItem("current_doc"));
           }, */
  },
  getters: {
    /* number: (state) => state.number,
    firstname: (state) => state.firstname,
    lat: (state) => state.lat,
    lng: (state) => state.lng, */
  },
  /* actions: {
    addNumber: (state, num) => {
      store.commit("addNum", num);
    },
  }, */
  /* actions: {
    setUser({ commit }, firstname) {
      commit("SET_USER", firstname);
    },
    removeUser({ commit }, firstname) {
      commit("REMOVE_USER", firstname);
    },
  }, */
});

export default store;
