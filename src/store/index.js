import { createStore } from 'vuex'

export default createStore({
  state: {
    // 使用者目前所選縣市，預設值為
    currCity: '臺北市',
    // 使用者目前所選行政區，預設值為北投區
    currDistrict: '北投區',
    // 存放 API 回傳的縣市 / 行政區的列表資訊
    location: [],
    // 存放 API 回傳的所有藥局資訊
    stores: [],
    keywords: '',
    showModal: false,
    infoBoxSid: null,
  },
  mutations: {
    setcurrCity(state, payload) {
      state.currCity = payload;
    },
    setcurrDistrict(state, payload) {
      state.currDistrict = payload;
    },
    setAreaLocation(state, payload) {
      state.location = payload;
    },
    setStore(state, payload) {
      state.stores = payload;
    },
    setKeywords(state, payload) {
      state.keywords = payload;
    },
    setshowModal(state, payload) {
      state.showModal = payload;
    },
    setInfoBoxSid(state, payload) {
      state.infoBoxSid = payload;
    }
  },
  actions: {
    // 行政區資料
    async fetchLoactions({ commit }) {
      const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
      .then(res => res.json());

      commit('setAreaLocation', json);
    },
    // 藥局資料
    async fetchPharmacies({ commit }) {
      const json = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json').then(res => res.json());
      // 整理資料格式，拆出經緯度
      const data = json.features.map(d => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1],
      }));

      commit('setStore', data);
    }
  },
  getters: {
    cityList(state) {
      // 城市
      return state.location.map(d => d.name)
    },
    districtList(state) {
      // 行政區
      return state.location.find(d => d.name === state.currCity)?.districts || []
    },
    filteredStores(state) {
      // 依縣市、行政區分組
      const { stores, currCity, currDistrict, keywords } = state;
      return keywords 
        ? stores.filter(d => d.name.includes(state.keywords))
        : stores.filter(d => d.county === currCity && d.town === currDistrict)
    }
  },
  modules: {
  }
})
