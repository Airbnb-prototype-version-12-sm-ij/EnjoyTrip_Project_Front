<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import { ref, computed } from 'vue';

const props = defineProps({
  wishList: Array
})


const map = ref();

const markerInfoList = computed(() => {
  return props.wishList.map((item, index) => {
    return {
      key: index + 1,
      lat: item.latitude,
      lng: item.longitude
    }
  })
})

// const markerInfoList = [
//   { key: 1, lat: 33.452278, lng: 126.567803 },
//   { key: 2, lat: 33.452671, lng: 126.574792 },
//   { key: 3, lat: 33.451744, lng: 126.572441 }
// ];



// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
let bounds;

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  bounds = new kakao.maps.LatLngBounds();

  console.log(markerInfoList.value)
  markerInfoList.value.forEach((markerInfo) => {
    // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
    let point = new kakao.maps.LatLng(markerInfo.lat, markerInfo.lng);

    let marker = new kakao.maps.Marker({ position: point });
    // LatLngBounds 객체에 좌표를 추가합니다
    bounds.extend(point);
  });
};

const setBounds = () => {
  // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
  // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
  if (map.value !== undefined) {
    map.value.setBounds(bounds);
  }
};
</script>


<template>
  {{ tmp }}
  <!-- <div v-if="wishList && wishList.length > 0"> -->
  <!-- <KakaoMap :lat="wishList[0].latitude" :lng="wishList[0].longitude">
      <KakaoMapMarker :lat="item.latitude" :lng="item.longitude" :order="index + 1" title="절대경로로 이미지 가져오기" :image="{
        imageSrc: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
        imageWidth: 64,
        imageHeight: 64,
        imageOption: {}
      }" v-for="(item, index) in wishList" :key="index" />
    </KakaoMap> -->

  <button class="demo-button" @click="setBounds">지도 범위 재설정 하기</button>
  <button class="demo-button" @click="setBounds">지도 범위 재설정 하기</button>
  <button class="demo-button" @click="setBounds">지도 범위 재설정 하기</button>
  <button class="demo-button" @click="setBounds">지도 범위 재설정 하기</button>
  <button class="demo-button" @click="setBounds">지도 범위 재설정 하기</button>
  <button class="demo-button" @click="setBounds">지도 범위 재설정 하기</button>
  <button class="demo-button" @click="setBounds">지도 범위 재설정 하기</button>
  <button class="demo-button" @click="setBounds">지도 범위 재설정 하기</button>

  <KakaoMap :lat="33.450701" :lng="126.570667" @onLoadKakaoMap="onLoadKakaoMap">
    <KakaoMapMarker v-for='marker in markerInfoList' :key='marker.key' :lat="marker.lat" :lng="marker.lng" />
  </KakaoMap>
  <!-- </div> -->
</template>