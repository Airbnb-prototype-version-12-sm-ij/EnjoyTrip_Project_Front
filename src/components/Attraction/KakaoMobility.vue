<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { KakaoMap, KakaoMapPolyline, KakaoMapMarker, KakaoMapCustomOverlay } from 'vue3-kakao-maps'

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
const URL = 'https://apis-navi.kakaomobility.com/v1/waypoints/directions'
console.log(REST_API_KEY)

// 커스텀 오버레이
const content = (info) => ` <div
        style="
          padding: 10px;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        "
      >
        <div style="font-weight: bold; margin-bottom: 5px">${info}</div>
        <div style="display: flex">
          <div style="margin-right: 10px">
            <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70" />
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-start">
            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">제주특별자치도 제주시 첨단로 242</div>
            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">(우) 63309 (지번) 영평동 2181</div>
            <div><a href="https://www.kakaocorp.com/main" target="_blank" style="color: blue">홈페이지</a></div>
          </div>
        </div>
      </div>`

const onClickKakaoMapMarker = (item) => {
  console.log('마커 클릭')
  item.visible = !item.visible
}

// 마커 정보 배열
const markerInfoList = ref([])
const markerList = ref([])

// 폴리 라인 그리는 배열
const latLngList = ref([])

// 위도 경도
const lat = ref(0)
const lng = ref(0)

// 거리 계산
const distance = ref(0)

const wayBody = {
  // 출발지
  origin: {
    x: '127.11024293202674',
    y: '37.394348634049784'
  },
  // 목적지
  destination: {
    x: '127.10860518470294',
    y: '37.401999820065534'
  },
  // 경유지
  waypoints: [
    {
      name: 'name0',
      x: 127.11341936045922,
      y: 37.39639094915999
    }
  ],
  priority: 'RECOMMEND',
  car_fuel: 'GASOLINE',
  car_hipass: false,
  alternatives: false,
  road_details: false
}

// 카카오 지도 경로
const getKakaoMap = async () => {
  try {
    const res = await axios.post(URL, wayBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'KakaoAK ' + REST_API_KEY
      }
    })

    markerInfoList.value = []
    latLngList.value = []
    markerList.value = []

    console.log(res.data.routes[0].sections)

    res.data.routes[0].sections.forEach((e) => {
      distance.value += e.distance

      e.guides.forEach((e) => {
        if (e.name !== '' && markerInfoList.value.some((item) => item.name === e.name)) return
        if (e.name === '출발지' || e.name === '경유지' || e.name === '목적지') {
          markerInfoList.value.push({
            name: e.name,
            x: e.x,
            y: e.y
          })
        }
        latLngList.value.push({
          lat: e.y,
          lng: e.x
        })
      })
    })

    lat.value = res.data.routes[0].sections[0].guides[0].y
    lng.value = res.data.routes[0].sections[0].guides[0].x

    console.log(lat.value, 'lat')
    console.log(lng.value, 'lng')

    markerInfoList.value.forEach((e) => {
      if (e.name === '') {
        return
      }
      markerList.value.push({
        lat: e.y,
        lng: e.x,
        name: e.name,
        visible: false
      })
    })

    console.log(distance.value, '거리')

    console.log(latLngList.value, '폴리라인')

    console.log(markerList.value, '찍어야할 마커')
  } catch (error) {
    console.error('에러' + error)
  }
}
</script>

<template>
  <div>
    <button @click="getKakaoMap">카카오 지도</button>
    <div v-if="distance > 1000">
      <p>거리: {{ distance / 1000 }}km</p>
    </div>
    <div v-else>
      <p>거리: {{ distance }}m</p>
    </div>

    <KakaoMap :lat="lat" :lng="lng">
      <KakaoMapMarker
        v-for="item in markerList"
        :key="item.name"
        :lat="item.lat"
        :lng="item.lng"
        :clickable="true"
        @onClickKakaoMapMarker="onClickKakaoMapMarker(item)"
      />
      <KakaoMapCustomOverlay
        v-for="item in markerList"
        :key="item.name"
        :lat="item.lat"
        :lng="item.lng"
        :content="content(item.name)"
        :visible="item.visible"
        :yAnchor="1.4"
      />
      <KakaoMapPolyline :latLngList="latLngList" :end-arrow="true" />
    </KakaoMap>
  </div>
</template>

<style scoped></style>
