<template>
  <div id="map-container" :ref="mapId" class="shadow" />
</template>

<script>
import KAKAO_API_KEY from "@/utils/api/kakao_config";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "PlanKakaoMap",
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
    selectedAttraction(after, before) {
      // 시점 이동
      this.map.setCenter(
        new window.kakao.maps.LatLng(after.latitude, after.longitude)
      );

      // 이전에 띄워져있던 인포윈도우 close
      if (before?.clickedInfoWindow) {
        before.clickedInfoWindow.close();
      }

      // 현재 띄워진 인포윈도우 open
      after.clickedInfoWindow.open(this.map, after.marker);
    },

    attractions(atts) {
      this.displayMarkers();
      this.displayLines();
      this.displayOverLays();

      this.map.setCenter(
        new window.kakao.maps.LatLng(atts[0].latitude, atts[0].longitude)
      );
    },

    myPlan(after, before) {
      // 추가될 때만 수행
      // 시점 이동
      this.map.setCenter(
        new window.kakao.maps.LatLng(after.latitude, after.longitude)
      );

      // 이전에 띄워져있던 인포윈도우 close
      if (before?.clickedInfoWindow) {
        before.clickedInfoWindow.close();
      }

      // 현재 띄워진 인포윈도우 open
      after.clickedInfoWindow.open(this.map, after.marker);

      this.displayMyPlanMarkers();

      this.map.setCenter(
        new window.kakao.maps.LatLng(after[0].latitude, after[0].longitude)
      );
    },
  },
  computed: {
    ...mapState("attractionStore", ["attractions", "selectedAttraction"]),
    ...mapState("planStore", ["myPlan"]),
    ...mapGetters("planStore", ["getMarkers"]),
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
          this.displayLines();
          this.displayOverLays();

          if (this.markers.length) {
            this.map.panTo(this.markers[0].position);
          }
        }

        if (this.myPlan.length) {
          this.displayMyPlanMarkers();
        }
      }
    },

    // 마커 표시
    displayMarkers() {
      this.markers.forEach((mk) => mk.setMap(null));
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
          this.setAttraction(el);
        });

        // 마커에 마우스오버 이벤트를 등록
        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          infoWindow.open(this.map, marker);
        });

        // 마커에 마우스아웃 이벤트를 등록
        window.kakao.maps.event.addListener(marker, "mouseout", () => {
          infoWindow.close();
        });

        // markers에 marker push
        this.markers.push(marker);
      });
    },

    // 마커 표시
    displayMyPlanMarkers() {
      this.getMarkers.forEach((mk) => mk.setMap(null));
      this.myPlan.forEach((el) => {
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

        // 마커에 마우스오버 이벤트를 등록
        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          infoWindow.open(this.map, marker);
        });

        // 마커에 마우스아웃 이벤트를 등록
        window.kakao.maps.event.addListener(marker, "mouseout", () => {
          infoWindow.close();
        });

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
                    </div>
                </div>
            </div>
        </div>
    `;
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
  height: 65vh;
}
</style>
