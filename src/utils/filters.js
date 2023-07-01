import Vue from "vue";

Vue.filter("timeFilter", (value) => {
  // 들어오는 value 값이 공백이면 그냥 공백으로 돌려줌
  if (value === "") return "";

  // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
  let js_date = new Date(value);

  // 연도, 월, 일 추출
  let year = js_date.getFullYear();
  let month = js_date.getMonth() + 1;
  let day = js_date.getDate();

  // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  // 최종 포맷 (ex - '2021-10-08')
  return year + "-" + month + "-" + day;
});

Vue.filter("fileNameFilter", (url) => {
  if (url === "") return "";

  let splitUrl = url.split("\\");
  let len = splitUrl.length;
  return splitUrl[len - 1];
});

Vue.filter("defaultImgSrcFilter", (src) => {
  if (!src) return require("@/assets/img/common/default-img.png");
  return src;
});
