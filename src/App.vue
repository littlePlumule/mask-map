<template>
<div id="app">
  <!-- aside-menu 左側欄 -->
  <asideMenu @triggerMarkerPopup="openPopup" ref="menu" />

  <!-- 地圖區塊 -->
  <maskMap ref="map" />
  <lightBox />
</div>
</template>

<script>
import { mapActions } from 'vuex';
import asideMenu from './components/asideMenu.vue';
import lightBox from './components/lightbox';
import maskMap from './components/maskMap.vue';

export default {
  name: 'App',
  components: {
    asideMenu,
    lightBox,
    maskMap
  },
  methods: {
    ...mapActions(['fetchLoactions', 'fetchPharmacies']),
    openPopup(id) {
      this.$refs.map.triggerPopup(id);
    }
  },
  mounted() {
    this.fetchLoactions();
    this.fetchPharmacies();
  }
}
</script>

<style lang="scss" src="./assets/scss/style.scss"></style>