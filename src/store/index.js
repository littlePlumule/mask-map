// import { createStore } from 'vuex'
import { reactive, computed, readonly } from 'vue';

const state = reactive({
  currCity: '臺北市',
  // 使用者目前所選行政區，預設值為北投區
  currDistrict: '北投區',
  keywords: '',
  showModal: false,
  infoBoxSid: null,
  // 存放 API 回傳的縣市 / 行政區的列表資訊
  location: [],
  // 存放 API 回傳的所有藥局資訊
  stores: [],
  cityList: computed(() => state.location.map(d => d.name)),
  districtList: computed(() => state.location.find(d => d.name === state.currCity)?.districts || []),
  currDistrictInfo: computed(() => state.districtList.find(d => d.name === state.currDistrict) || {}),
  filteredStores: computed(() => {
    return state.keywords
      ? state.stores.filter(d => d.name.includes(state.keywords)).slice(0, 30)
      : state.stores.filter(d => d.county === state.currCity && d.town === state.currDistrict);
  })
});

const setcurrCity = val => { state.currCity = val; };
const setcurrDistrict = val => { state.currDistrict = val; };
const setLocation = val => { state.location = val; };
const setStore = val => { state.stores = val; };
const setKeywords = val => { state.keywords = val; };
const setShowModal = val => { state.showModal = val; };
const setInfoBoxSid = val => { state.infoBoxSid = val; };

const fetchLoactions = async () => {
  // 行政區資料
  const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json').then(res => res.json());
  setLocation(json);
};

const fetchPharmacies = async () => {
  // 藥局資料
  const json = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json').then(res => res.json());
  // 整理資料格式，拆出經緯度
  const data = json.features.map(d => ({
    ...d.properties,
    latitude: d.geometry.coordinates[0],
    longitude: d.geometry.coordinates[1],
  }));
  setStore(data);
};

export default {
  state: readonly(state),
  setcurrCity,
  setcurrDistrict,
  setKeywords,
  setShowModal,
  setInfoBoxSid,
  fetchLoactions,
  fetchPharmacies
}

// export default createStore({
//   state: {
//     // 使用者目前所選縣市，預設值為
//     currCity: '臺北市',
//     // 使用者目前所選行政區，預設值為北投區
//     currDistrict: '北投區',
//     // 存放 API 回傳的縣市 / 行政區的列表資訊
//     location: [],
//     // 存放 API 回傳的所有藥局資訊
//     stores: [],
//     keywords: '',
//     showModal: false,
//     infoBoxSid: null,
//   },
//   mutations: {
//     setcurrCity(state, payload) {
//       state.currCity = payload;
//     },
//     setcurrDistrict(state, payload) {
//       state.currDistrict = payload;
//     },
//     setAreaLocation(state, payload) {
//       state.location = payload;
//     },
//     setStore(state, payload) {
//       state.stores = payload;
//     },
//     setKeywords(state, payload) {
//       state.keywords = payload;
//     },
//     setshowModal(state, payload) {
//       state.showModal = payload;
//     },
//     setInfoBoxSid(state, payload) {
//       state.infoBoxSid = payload;
//     }
//   },
//   actions: {
//     // 行政區資料
//     async fetchLoactions({ commit }) {
//       const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
//         .then(res => res.json());

//       commit('setAreaLocation', json);
//     },
//     // 藥局資料
//     async fetchPharmacies({ commit }) {
//       const json = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json').then(res => res.json());
//       // 整理資料格式，拆出經緯度
//       const data = json.features.map(d => ({
//         ...d.properties,
//         latitude: d.geometry.coordinates[0],
//         longitude: d.geometry.coordinates[1],
//       }));

//       commit('setStore', data);
//     }
//   },
//   getters: {
//     cityList(state) {
//       // 城市
//       return state.location.map(d => d.name)
//     },
//     districtList(state) {
//       // 行政區
//       return state.location.find(d => d.name === state.currCity)?.districts || []
//     },
//     filteredStores(state) {
//       // 依縣市、行政區分組
//       const { stores, currCity, currDistrict, keywords } = state;
//       return keywords
//         ? stores.filter(d => d.name.includes(state.keywords))
//         : stores.filter(d => d.county === currCity && d.town === currDistrict)
//     },
//     currDistrictInfo(state, getters) {
//       // 目前所選行政區資訊
//       return getters.districtList.find(d => d.name === state.currDistrict) || {};
//     }
//   },
//   modules: {
//   }
// })
