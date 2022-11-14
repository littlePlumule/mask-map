<template>
<div id="app">
  <!-- aside-menu 左側欄 -->
  <asideMenu />

  <!-- 地圖區塊 -->
  <div class="mask-map" id="mask-map"></div>
  <lightBox />
</div>
</template>

<script>
import { mapActions } from 'vuex';
import asideMenu from './components/asideMenu.vue';
import lightBox from './components/lightbox';

export default {
  name: 'App',
  components: {
    asideMenu,
    lightBox
  },
  methods: {
    ...mapActions(['fetchLoactions', 'fetchPharmacies'])
  },
  mounted() {
    this.fetchLoactions();
    this.fetchPharmacies();
  }
}
</script>

<style lang="scss" src="./assets/scss/style.scss"></style>