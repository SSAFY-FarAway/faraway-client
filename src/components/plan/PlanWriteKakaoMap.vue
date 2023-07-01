<template>
  <div id="map-container" :ref="mapId" />
</template>

<script>
import KAKAO_API_KEY from "@/utils/api/kakao_config";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  components: {},
  props: {
    mapId: String,
  },
  data() {
    return {
      map: null,
      selectMarker: null,
      markers: [],
      polyline : null,
    };
  },
  mounted() {
    if (!(window.kakao && window.kakao.maps)) {
      this.loadScript();
    } else {
      this.loadMap();
    }
  },

  created() { },
  watch: {
    // 현재 선택(클릭)된 관광지가 변할 때
    selectedAttraction(after, before) {
      
      // 이전에 띄워져있던 인포윈도우 close
      if (before?.clickedInfoWindow) {
        before?.clickedInfoWindow?.close();
      }

      if (after) {
         // 시점 이동
      this.map.setCenter(
        new window.kakao.maps.LatLng(after.latitude, after.longitude)
        );

       after.clickedInfoWindow??open(this.map, after.marker);
      }
    },
    attractions(atts) {
      if (window.kakao != undefined) {
        this.displayMarkers();
        
        this.map.setCenter(
          new window.kakao.maps.LatLng(atts[0].latitude, atts[0].longitude)
        );
      }
    },
    myPlan(after) {
      const maxIdx = after.length - 1

      if (this.map) {
        if (maxIdx >= 0) {
         // 시점 이동
         this.map.setCenter(
          new window.kakao.maps.LatLng(after[maxIdx].latitude, after[maxIdx].longitude)
          );
          this.displayMyPlanMarkers();
          this.displayLines();
        }
      }
     
     
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
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 7,
        };

        // 지도 생성
        this.map = new window.kakao.maps.Map(container, options);

        // 최초에 마커 정보를 myPlan에 넣어준다.
        if (this.myPlan.length) {
          this.myPlan.forEach(el => {
            const marker = {
              map: this.map,
              position: new window.kakao.maps.LatLng(el.latitude, el.longitude),
              title: el.title,
              };
            el.marker = marker;

            const kakaoMarker = new window.kakao.maps.Marker(marker);
            el.kakaoMarker = kakaoMarker;


            this.map.setCenter(new window.kakao.maps.LatLng(el.latitude, el.longitude));
           
          })
          this.displayMyPlanMarkers();
          this.displayLines();
        }
      }
    },
    displayMarkers() {
      // 초기화
      this.markers.forEach((mk) => mk.setMap(null));

      this.attractions.forEach((el) => {
        const marker = {
          map: this.map,
          position: new window.kakao.maps.LatLng(el.latitude, el.longitude),
          title: el.title,
        };

        const kakaoMarker = new window.kakao.maps.Marker(marker);
        el.marker = marker;

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: this.makeContent(el),
        });

        const clickedInfoWindow = new window.kakao.maps.InfoWindow({
          content: this.makeContent(el),
        });

        el.clickedInfoWindow = clickedInfoWindow;
       
        // 마커에 클릭 이벤트를 등록
        window.kakao.maps.event.addListener(
          kakaoMarker,
          "click",
          () => {
            clickedInfoWindow.open(this.map, kakaoMarker);
            this.setAttraction(el);
          }
        );

        // 마커에 마우스오버 이벤트를 등록
        window.kakao.maps.event.addListener(
          kakaoMarker,
          "mouseover",
          () => {
            infoWindow.open(this.map, kakaoMarker);
          }
        );

        // 마커에 마우스아웃 이벤트를 등록
        window.kakao.maps.event.addListener(
          kakaoMarker,
          "mouseout",
          () => {
            infoWindow.close();
          }, {
            passive:false
          }
        );

        // markers에 marker push
        this.markers.push(kakaoMarker);
      });
    },

    // displayLines() : 라인 표시
    displayLines() {
      if (this.polyline) {
        this.polyline.setMap(null);
      }
  
      let linePath = [];

      for (let i = 0; i < this.getMarkers.length; i++) {
        linePath.push(this.getMarkers[i].position);
      }

      this.polyline = new window.kakao.maps.Polyline({
        path: linePath, // 선을 구성하는 좌표배열
        strokeWeight: 3,
        strokeColor: "red",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
      });

      this.polyline.setMap(this.map);
    },

    // myPlan 마커 표시
    displayMyPlanMarkers() {
      this.myPlan.forEach((el) => el.kakaoMarker?.setMap(null));

      this.myPlan.forEach((el) => {
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: this.makeContent(el),
          removable: true,
        });

        const marker ={
          map: this.map,
          position: new window.kakao.maps.LatLng(el.latitude, el.longitude),
          title: el.title,
        };

        el.marker = marker;

        const kakaoMarker = new window.kakao.maps.Marker(marker);
        const clickedInfoWindow = new window.kakao.maps.InfoWindow({
          content: this.makeContent(el),
        });

        // 각 관광지 객체에 인포윈도우, 마커정보 기록
        el.clickedInfoWindow = clickedInfoWindow;
        

        // 마커에 마우스오버 이벤트를 등록
        window.kakao.maps.event.addListener(kakaoMarker, "mouseover", () => {
          infoWindow??open(this.map, el.marker, { passive: false });
        },
          { passive: false });

        // 마커에 마우스아웃 이벤트를 등록
        window.kakao.maps.event.addListener(
          kakaoMarker,
          "mouseout",
          () => {
            infoWindow.close();
          },
          { passive: false }
        );
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
  },
};
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 65vh;
}
</style>
