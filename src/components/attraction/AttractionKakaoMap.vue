<template>
  <div id="map-container" :ref="mapId" class="shadow" />
</template>

<script>
import KAKAO_API_KEY from "@/utils/api/kakao_config";
import { mapGetters } from "vuex";

export default {
  name: "AttractionKakaoMap",
  components: {},
  props: {
    mapId: String,
  },
  data() {
    return {
      map: null,
      markers: [],
      overlays: [],
      selectedAttraction: {},
      attractions: [],
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
    getAttractions(after) {
      console.log(after);
      this.attractions = after;
    },
    getSelectedAttraction(attraction) {
      this.map.panTo(
        new window.kakao.maps.LatLng(attraction.latitude, attraction.longitude)
      );
    },
  },
  computed: {
    ...mapGetters("attractionStore", [
      "getAttractions",
      "getSelectedAttraction",
    ]),
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
          // this.displayOverLays();

          if (this.markers.length) {
            this.map.panTo(this.markers[0].position);
          }
        }
      }
    },

    // 마커 표시
    displayMarkers() {
      this.attractions.forEach((el, idx) => {
        const innerHTML = `
          <div class="wrap">
              <div class="info shadow ">
                  <div class="bg-primary">
                      <div class="text-light font-weight-bold p-1 d-flex justify-content-between">
                          ${el.title}
                          <div class="far fa-times-circle fa-lg" onclick="closeOverlay(${idx})" title="닫기"></div>
                      </div>
                  </div>
                  <div class="body">
                      <div class="img">
                          <img src="${el.firstImage}" width="73" height="70">
                      </div>
                      <div class="desc">
                          <div class="ellipsis">${el.addr1}</div>
                          <div class="jibun ellipsis">(우)${el.zipcode}</div>
                          <div class="d-flex justify-content-end"></div>
                      </div>
                  </div>
              </div>
          </div>
      `;

        console.log(innerHTML);
        const infowindow = new window.kakao.maps.InfoWindow({
          content: '<div style="padding:5px;">Hello World!</div>',
        });

        // 마커 생성
        const marker = {
          map: this.map,
          position: new window.kakao.maps.LatLng(el.latitude, el.longitude),
          title: el.title,
        };

        this.markers.push(marker);
        const kakaoMarker = new window.kakao.maps.Marker(marker);

        // 마커에 마우스오버 이벤트를 등록합니다
        window.kakao.maps.event.addListener(
          kakaoMarker,
          "mouseover",
          function () {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(this.map, kakaoMarker);
          }
        );

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(
          kakaoMarker,
          "mouseout",
          function () {
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            infowindow.close();
          }
        );
      });
    },

    // displayOverLays() {
    //   for (let i = 0; i < this.attractions.length; i++) {
    //     const innerHTML = `
    //       <div class="wrap">
    //           <div class="info shadow ">
    //               <div class="bg-primary">
    //                   <div class="text-light font-weight-bold p-1 d-flex justify-content-between">
    //                       ${this.attractions[i].title}
    //                       <div class="far fa-times-circle fa-lg" onclick="closeOverlay(${i})" title="닫기"></div>
    //                   </div>
    //               </div>
    //               <div class="body">
    //                   <div class="img">
    //                       <img src="${this.attractions[i].firstImage}" width="73" height="70">
    //                   </div>
    //                   <div class="desc">
    //                       <div class="ellipsis">${this.attractions[i].addr1}</div>
    //                       <div class="jibun ellipsis">(우)${this.attractions[i].zipcode}</div>
    //                       <div class="d-flex justify-content-end"></div>
    //                   </div>
    //               </div>
    //           </div>
    //       </div>
    //   `;

    //     const overlay = new window.kakao.maps.CustomOverlay({
    //       map: this.map,
    //       position: this.markers[i].position,
    //       content: innerHTML,
    //       yAnchor: 0.3,
    //     });
    //     this.overlays.push(overlay);
    //   }
    // },
  },
};
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 65vh;
}
</style>
