<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { KakaoMap, KakaoMapPolyline, KakaoMapMarker } from 'vue3-kakao-maps'

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
const URL = 'https://apis-navi.kakaomobility.com/v1/waypoints/directions'
console.log(REST_API_KEY)

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

// 카카오 지도 경로
const getKakaoMap = async () => {
  try {
    const res = await axios.post(
      URL,
      {
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
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'KakaoAK ' + REST_API_KEY
        }
      }
    )

    markerInfoList.value = []
    latLngList.value = []
    markerList.value = []

    console.log(res.data.routes[0].sections)

    res.data.routes[0].sections.forEach((e) => {
      distance.value += e.distance

      e.guides.forEach((e) => {
        if (e.name !== '' && markerInfoList.value.some((item) => item.name === e.name)) return
        markerInfoList.value.push({
          name: e.name,
          x: e.x,
          y: e.y
        })
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
        name: e.name
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
        :infoWindow="{
          content: item.name
        }"
      />
      <KakaoMapPolyline :latLngList="latLngList" :end-arrow="true" />
    </KakaoMap>
  </div>
</template>

<style scoped></style>
