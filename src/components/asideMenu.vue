<template>
  <div class="aside-menu">
    <div class="wraps">
      <label>
        縣市：<select v-model="currCity">
          <option v-for="city in cityList" :key="city">{{ city }}</option>
        </select>
      </label>
      <label>
        行政區：<select v-model="currDistrict">
          <option v-for="district in districtList" :key="district.id">{{ district.name }}</option>
        </select>
      </label>
    </div>

    <div class="wraps">
      <label>
        <i class="fas fa-search-location"></i> 關鍵字搜尋：
        <input type="text" placeholder="請輸入關鍵字" v-model="keywords">
      </label>
    </div>

    <ul class="store-lists">
      <li 
        class="store-info wraps" 
        v-for="store in filteredStores" 
        :key="store.id"
        @click="$emit('triggerMarkerPopup', store.id)">
        <h1 v-html="keywordHighlight(store.name)"></h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: {{ store.mask_adult }} 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩: {{ store.mask_child }} 個</span>
        </div>

        <div class="mask-info">
          最後更新時間: {{ store.updated }}
        </div>

        <button class="btn-store-detail" @click="openInfoBox(store.id)">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>
      </li>
    </ul>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {  
  computed: {
    currCity: {
      get() {
        return this.$store.state.currCity;
      },
      set(value) {
        this.$store.commit('setcurrCity', value);
      }
    },
    currDistrict: {
      get() {
        return this.$store.state.currDistrict;
      },
      set(value) {
        this.$store.commit('setcurrDistrict', value);
      }
    },
    keywords: {
      get() {
        return this.$store.state.keywords;
      },
      set(value) {
        this.$store.commit('setKeywords', value);
      }
    },
    showModal: {
      get() {
        return this.$store.state.showModal;
      },
      set(value) {
        this.$store.commit('setshowModal', value);
      }
    },
    infoBoxSid: {
      get() {
        return this.$store.state.infoBoxSid;
      },
      set(value) {
        this.$store.commit('setInfoBoxSid', value);
      }
    },
    ...mapGetters(['cityList', 'districtList', 'filteredStores'])
  },
  methods: {
    keywordHighlight(value) {
      return value.replace(new RegExp(this.keywords, 'g'), `<span class="highlight">${this.keywords}</span>`)
    },
    openInfoBox(sid) {
      this.showModal = true;
      this.infoBoxSid = sid;
    }
  },
  watch: {
    districtList(v) {
      const [arr] = v;
      this.currDistrict = arr.name
    }
  }
}
</script>
<style lang="scss">
  .highlight {
    color: #f08d49;
  }
</style>