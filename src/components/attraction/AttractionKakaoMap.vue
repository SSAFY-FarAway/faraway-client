<template>
  <div id="map-container" :ref="mapId" class="shadow" />
</template>

<script>
import KAKAO_API_KEY from "@/utils/api/kakao_config";
import { mapActions, mapState } from "vuex";

export default {
  name: "AttractionKakaoMap",
  components: {},
  props: {
    mapId: String,
  },
  data() {
    return {
      map: null,
      selectMarker: null,
      markers: [],
      overlays: [],
    };
  },
  mounted() {
    if (!(window.kakao && window.kakao.maps)) {
      this.loadScript();
    }
  },
  created() {
    this.loadScript();
  },
  watch: {
    selectedAttraction(after, before) {
      console.log(after)
      // 시점 이동
      this.map.setCenter(
        new window.kakao.maps.LatLng(after.latitude, after.longitude)
      );

      // 이전에 띄워져있던 인포윈도우 close
      if (before?.clickedInfoWindow) {
        before.clickedInfoWindow.close();
      }

      // 현재 띄워진 인포윈도우 open
      after.clickedInfoWindow.open(this.map, after.marker)
    },

    attractions(atts) {
      this.displayMarkers();
      this.map.setCenter(
        new window.kakao.maps.LatLng(atts[0].latitude, atts[0].longitude)
      );
    },
   
  },
  computed: {
    ...mapState("attractionStore", [
      "attractions",
      "selectedAttraction",
    ]),
  },
  methods: {
    ...mapActions("attractionStore", ["setAttraction"]),

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

        if (this.attractions.length) {
          this.displayMarkers();
        }
      }
    },

    // 마커 표시
    displayMarkers() {
      this.markers.forEach(mk => mk.setMap(null));
      this.attractions.forEach((el) => {

        // 인포윈도우 생성
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: this.makeContent(el),
        });

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map: this.map,
          position: new window.kakao.maps.LatLng(el.latitude, el.longitude),
          title: el.title,
        });
        const clickedInfoWindow = new window.kakao.maps.InfoWindow({
          content: this.makeContent(el),
        });

        // 각 관광지 객체에 인포윈도우, 마커정보 기록
        el.clickedInfoWindow = clickedInfoWindow;
        el.marker = marker;

         // 마커에 클릭 이벤트를 등록
        window.kakao.maps.event.addListener(marker, "click", () => {
          clickedInfoWindow.open(this.map, marker);
          this.setAttraction(el)
         });

        // 마커에 마우스오버 이벤트를 등록
        window.kakao.maps.event.addListener(marker,"mouseover",() => {infoWindow.open(this.map, marker);});

        // 마커에 마우스아웃 이벤트를 등록
        window.kakao.maps.event.addListener(marker,"mouseout", () => {infoWindow.close();});

        // markers에 marker push
        this.markers.push(marker);
      });
      
    },

    // 마커 인포윈도우의 content 만들기
    makeContent(el) {
      return `
        <div class="wrap">
            <div class="info shadow ">
                <div class="bg-primary">
                    <div class="text-light font-weight-bold p-1 d-flex justify-content-between">
                        ${el.title}
                    </div>
                </div>
                <div class="body">
                    <div class="img">
                        <img src="${el.firstImage}" width="73" height="70">
                    </div>
                    <div class="desc">
                        <div class="ellipsis">${el.addr1}</div>
                        <div class="jibun ellipsis">(우)${el.zipcode}</div>
                        <a href="#detail" class="d-flex justify-content-end mr-3">상세정보</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    },
  },
};


</script>

<style scoped>
#map-container {
  width: 100%;
  height: 65vh;
}
</style>
