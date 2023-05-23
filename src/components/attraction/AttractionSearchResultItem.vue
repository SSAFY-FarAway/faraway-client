<template>
  <!-- TODO : img 디폴트 이미지 추가할 것. -->
  <b-card
    :title="attraction.title"
    :img-src="$options.filters.defaultImgSrcFilter(attraction.firstImage)"
    img-top
    tag="article"
    style="max-width: 20rem"
    class="mb-1"
    @click="selectAttraction"
  >
    <b-card-text>
      {{ attraction.addr1 }}
    </b-card-text>

    <!-- 여행 계획의 아이템으로 사용되는 경우 -->
    <button
      class="btn btn-primary"
      v-if="domain === 'plan'"
      @click="addMyPath(attraction)"
    >
      내 경로에 추가하기
    </button>
  </b-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AttractionSearchResultItem",
  components: {},
  props: {
    attraction: Object,
    domain: String,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("planStore", ["myPlan"]),
  },
  created() {},
  methods: {
    ...mapActions("attractionStore", ["setAttraction"]),
    ...mapActions("planStore", ["addPlan"]),
    selectAttraction() {
      this.setAttraction(this.attraction);
    },
    addMyPath(attraction) {
      let flag = true;

      if (
        this.myPlan.filter((el) => el.contentId === attraction.contentId)
          .length > 0
      ) {
        flag = false;
      }

      if (flag) {
        this.$alertSuccess("경로 추가", "경로가 성공적으로 추가되었습니다.");
        this.addPlan(attraction);
      } else {
        this.$alertDanger("경로 추가 실패", "이미 추가된 경로입니다.");
      }
    },
  },
};
</script>

<style scoped></style>
