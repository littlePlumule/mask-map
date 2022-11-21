<template>
<div id="app">
  <asideMenu />
  <maskMap />
  <lightBox />
</div>
</template>

<script>
import { provide } from 'vue';
import map from './utils/map';
import mapStore from './store/index';

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
  setup() {
    provide('mapStore', mapStore);
    provide('map', map);
    mapStore.fetchLoactions();
    mapStore.fetchPharmacies();
  }
}
</script>

<style lang="scss" src="./assets/scss/style.scss"></style>