<script setup>
import axios from 'axios'
import { ref, onMounted, watchEffect } from 'vue'
import { KakaoMap, KakaoMapPolyline, KakaoMapMarker, KakaoMapCustomOverlay } from 'vue3-kakao-maps'
import { useWishList } from '@/store/attrationStore'

const wishStore = useWishList()

const wishList = ref(wishStore.wishListItems)

console.log(wishList.value, '위시리스트')

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY
const URL = 'https://apis-navi.kakaomobility.com/v1/waypoints/directions'

console.log(REST_API_KEY, 'API키')

// 커스텀 오버레이
const content = (info) => `
      <div
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
const markerList = ref([])

// 폴리 라인 그리는 배열
const latLngList = ref([])

// 위도 경도
const lat = ref(0)
const lng = ref(0)

// 거리 계산
const distance = ref(0)

// 카카오 지도 경유지 설정
let wayBody = {}
if (Array.isArray(wishList.value) && wishList.value.length > 0) {
  wayBody = {
    // 출발지
    origin: {
      x: wishList.value[0].longitude,
      y: wishList.value[0].latitude
    },
    // 목적지
    destination: {
      x: wishList.value[wishList.value.length - 1].longitude,
      y: wishList.value[wishList.value.length - 1].latitude
    },
    // 경유지
    waypoints: wishList.value.slice(1, -1).map((item, index) => ({
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

    distance.value = 0
    latLngList.value = []
    markerList.value = []

    console.log(res.data.routes[0].sections)

    res.data.routes[0].sections.forEach((e) => {
      distance.value += e.distance

      e.guides.forEach((e) => {
        latLngList.value.push({
          lat: e.y,
          lng: e.x
        })
        console.log(e.name, 'e')
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

    console.log(lat.value, 'lat')
    console.log(lng.value, 'lng')

    console.log(distance.value, '거리')

    console.log(latLngList.value, '폴리라인')

    console.log(markerList.value, '찍어야할 마커')
  } catch (error) {
    console.error('에러' + error)
  }
}

onMounted(async () => {
  await getKakaoMap()
})

let bounds

const map = ref()

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef
  // eslint-disable-next-line no-undef
  bounds = new kakao.maps.LatLngBounds()
  let marker
  let point

  markerList.value.forEach((markerInfo) => {
    // eslint-disable-next-line no-undef
    point = new kakao.maps.LatLng(markerInfo.lat, markerInfo.lng)
    // eslint-disable-next-line no-undef
    marker = new kakao.maps.Marker({ position: point })
    if (map.value !== undefined) {
      marker.setMap(map.value)
    }

    bounds.extend(point)
  })
}

const setBounds = () => {
  if (map.value !== undefined) {
    map.value.setBounds(bounds)
  }
}

watchEffect(() => {
  try {
    if (wishList.value.length > 0) {
      onLoadKakaoMap(map.value)
    }
    setBounds()
  } catch (error) {
    console.error('에러' + error)
  }
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
      <KakaoMapPolyline
        :latLngList="latLngList"
        :end-arrow="true"
        strokeWeight="9"
        strokeColor="#0066FF"
        strokeOpacity="0.9"
        strokeStyle="dashed"
      />
    </KakaoMap>
  </div>
</template>

<style scoped></style>
