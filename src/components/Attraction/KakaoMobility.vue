<script setup>
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { KakaoMap, KakaoMapPolyline, KakaoMapMarker, KakaoMapCustomOverlay } from 'vue3-kakao-maps'
import { useWishList } from '@/store/attrationStore'

const props = defineProps({
  wishList: Object
})



const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
const URL = 'https://apis-navi.kakaomobility.com/v1/waypoints/directions'

// 커스텀 오버레이
const content = (info) => `<div
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
      </div>`

const markerList = ref([])
const latLngList = ref([])
const lat = ref(0)
const lng = ref(0)
const distance = ref(0)

const getKakaoMap = async () => {
  if (props.wishList.length < 2) {
    console.error('최소 두 개의 경유지가 필요합니다.')
    return
  }

  const wayBody = {
    origin: {
      x: props.wishList[0].longitude,
      y: props.wishList[0].latitude
    },
    destination: {
      x: props.wishList[props.wishList.length - 1].longitude,
      y: props.wishList[props.wishList.length - 1].latitude
    },
    waypoints: props.wishList.slice(1, -1).map((item, index) => ({
      name: 'name' + index,
      x: item.longitude,
      y: item.latitude
    })),
    priority: 'RECOMMEND',
    car_fuel: 'GASOLINE',
    car_hipass: false,
    alternatives: false,
    road_details: false
  }

  try {
    const res = await axios.post(URL, wayBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'KakaoAK ' + REST_API_KEY
      }
    })

    distance.value = 0
    latLngList.value = []
    markerList.value = []

    res.data.routes[0].sections.forEach((e) => {
      distance.value += e.distance

      e.guides.forEach((e) => {
        latLngList.value.push({
          lat: e.y,
          lng: e.x
        })
        if (e.name === '') return
        if (e.name === '출발지' || e.name === '경유지' || e.name === '목적지') {
          markerList.value.push({
            lat: e.y,
            lng: e.x,
            name: e.name,
            visible: false
          })
        }
      })
    })

    lat.value = res.data.routes[0].sections[0].guides[0].y
    lng.value = res.data.routes[0].sections[0].guides[0].x

    setBounds()
  } catch (error) {
    console.error('에러' + error)
  }
}

const map = ref()
let bounds

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef
  setBounds()
}

const setBounds = () => {
  if (map.value !== undefined) {
    bounds = new kakao.maps.LatLngBounds()
    markerList.value.forEach((markerInfo) => {
      const point = new kakao.maps.LatLng(markerInfo.lat, markerInfo.lng)
      const marker = new kakao.maps.Marker({ position: point })
      marker.setMap(map.value)
      bounds.extend(point)
    })
    map.value.setBounds(bounds)
  }
}

watch([latLngList, markerList], () => {
  if (map.value !== undefined) {
    setBounds()
  }
},
  {
    deep: true
  }
)

watch(() => [...props.wishList], async () => {
  console.log('wishList 변경')
  await getKakaoMap()
}, { deep: true }
)



onMounted(async () => {
  await getKakaoMap()
})
</script>

<template>
  <div class="mt-20">
    <div v-if="distance > 1000">
      <h1>거리: {{ distance / 1000 }}km</h1>
    </div>
    <div v-else>
      <h1>거리: {{ distance }}m</h1>
    </div>
    <KakaoMap :lat="lat" :lng="lng" width="1000" @onLoadKakaoMap="onLoadKakaoMap">
      <KakaoMapMarker v-for="item in markerList" :key="item.name" :lat="item.lat" :lng="item.lng" :clickable="true"
        @onClickKakaoMapMarker="onClickKakaoMapMarker(item)" />
      <KakaoMapCustomOverlay v-for="item in markerList" :key="item.name" :lat="item.lat" :lng="item.lng"
        :content="content(item.name)" :visible="item.visible" :yAnchor="1.4" />
      <KakaoMapPolyline :latLngList="latLngList" :end-arrow="true" strokeWeight="9" strokeColor="#0066FF"
        strokeOpacity="0.9" strokeStyle="solid" />
    </KakaoMap>
  </div>
</template>
