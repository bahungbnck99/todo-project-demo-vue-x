import Vue from "vue";
import VueX from "vuex";

// import modules
import posts from "./modules/post";

Vue.use(VueX);
const storeData = {
  modules: {
    posts
  }
};
const store = new VueX.Store(storeData);

export default store;
