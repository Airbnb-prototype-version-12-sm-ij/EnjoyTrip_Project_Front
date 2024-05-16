<script setup>
import { KakaoMap } from 'vue3-kakao-maps';
import { ref, computed, watchEffect } from 'vue';

const props = defineProps({
  wishList: Array
})


const map = ref();

// const markerInfoList = [
//   { key: 1, lat: 33.452278, lng: 126.567803 },
//   { key: 2, lat: 33.452671, lng: 126.574792 },
//   { key: 3, lat: 33.451744, lng: 126.572441 }
// ];

const markerInfoList = computed(() => {
  return props.wishList.map((item, index) => {
    return {
      key: index + 1,
      lat: item.latitude,
      lng: item.longitude
    }
  })
})


let bounds;

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  bounds = new kakao.maps.LatLngBounds();
  let marker;
  let point;

  markerInfoList.value.forEach((markerInfo) => {
    point = new kakao.maps.LatLng(markerInfo.lat, markerInfo.lng);

    marker = new kakao.maps.Marker({ position: point });
    if (map.value !== undefined) {
      marker.setMap(map.value);
    }

    bounds.extend(point);
  });
};

const setBounds = () => {
  if (map.value !== undefined) {
    map.value.setBounds(bounds);
  }
};

watchEffect(() => {
  if (props.wishList.length > 0) {
    onLoadKakaoMap(map.value);
  }
  setBounds();
});

</script>


<template>

  <KakaoMap :lat="0" :lng="0" @onLoadKakaoMap="onLoadKakaoMap" width='1000' class='mt-40' />

</template>