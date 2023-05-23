<template>
  <div id="map-container" :ref="mapId" class="shadow" />
</template>

<script>
import KAKAO_API_KEY from "@/utils/api/kakao_config";

export default {
  name: "PlanKakaoMap",
  components: {},
  props: {
    mapId: String,
    attractions: Array,
  },
  data() {
    return {
      map: null,
      markers: [],
      overlays: [],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      // 카카오 객체가 있고, 카카오 맵그릴 준비가 되어 있다면 맵 실행
      this.loadMap();
    } else {
      // 없다면 카카오 스크립트 추가 후 맵 실행
      this.loadScript();
    }
  },
  created() {},
  watch: {
    attractions(to, from) {
      if (to != from) {
        this.loadMap();
      }
    },
  },
  methods: {
    // kakaoMap Script 로드
    loadScript() {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_API_KEY}`; // &autoload=false api를 로드한 후 맵을 그리는 함수가 실행되도록 구현
      script.onload = () => window.kakao.maps.load(this.loadMap); // 스크립트 로드가 끝나면 지도를 실행될 준비가 되어 있다면 지도가 실행되도록 구현

      document.head.appendChild(script); // html>head 안에 스크립트 소스를 추가
    },

    // kakaoMap Dom에 렌더링
    loadMap() {
      if (window.kakao != undefined) {
        const container = this.$refs[this.mapId]; // 지도를 담을 DOM 영역
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 7, // 지도의 레벨(확대, 축소 정도)
        };

        // 지도 생성 및 객체 리턴
        this.map = new window.kakao.maps.Map(container, options);

        if (this.attractions) {
          this.displayMarkers();
          this.displayLines();
          this.displayOverLays();

          if (this.markers.length) {
            this.map.panTo(this.markers[0].position);
          }
        }
      }
    },

    // 마커 표시
    displayMarkers() {
      this.attractions.forEach((el) => {
        // 마커 생성
        const marker = {
          map: this.map,
          position: new window.kakao.maps.LatLng(el.latitude, el.longitude),
          title: el.title,
        };

        new window.kakao.maps.Marker(marker);
        this.markers.push(marker);
      });
    },

    // 마커 간 거리 표시 (라인)
    displayLines() {
      let linePath = [];

      for (let i = 0; i < this.markers.length; i++) {
        linePath.push(this.markers[i].position);
      }

      let polyline = new window.kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열
        strokeWeight: 3,
        strokeColor: "orange",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });

      polyline.setMap(this.map);
    },

    displayOverLays() {
      for (let i = 0; i < this.attractions.length; i++) {
        const innerHTML = `
            <div class="customoverlay">
                <a>
                    <span id="numbers">${i + 1}</span>
                    <span class="title">${this.attractions[i].title}</span>
                </a>
            </div>`;

        const overlay = new window.kakao.maps.CustomOverlay({
          map: this.map,
          position: this.markers[i].position,
          content: innerHTML,
          yAnchor: 0.3,
        });
        this.overlays.push(overlay);
      }
    },
  },
};
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 600px;
  border-left: 2px solid var(--sub-color);
  border-bottom: 2px solid var(--sub-color);
}
</style>
