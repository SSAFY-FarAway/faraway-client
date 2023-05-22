<template>
  <div id="card-container" class="d-flex align-items-center">
    <b-card class="font-small" style="width: 220px" no-body>
      <p class="m-1 font-weight-bold">{{ idx }}번째 경로</p>
      <b-card-img
        class="p-2"
        :src="plan.firstImage"
        style="height: 130px"
      ></b-card-img>
      <b-list-group flush>
        <b-list-group-item class="hidden-text p-1 font-weight-bold">{{
          plan.title
        }}</b-list-group-item>
        <b-list-group-item class="hidden-text p-1">{{
          plan.addr1
        }}</b-list-group-item>
        <b-list-group-item class="hidden-text p-1"
          ><button class="btn btn-danger font-small" @click="removeMyPath">
            내 경로에서 삭제
          </button></b-list-group-item
        >
      </b-list-group>
    </b-card>
    <b-icon
      class="mx-2"
      style="z-index: 99; top: 40%; right: 0px; color: var(--main-color)"
      icon="arrow-right-circle-fill"
      font-scale="3"
    ></b-icon>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PlanCard",
  components: {},
  props: {
    plan: Object,
    idx: Number,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    ...mapActions("planStore", ["removePlan"]),
    removeMyPath() {
      this.removePlan(this.plan);
    },
  },
};
</script>

<style scoped>
#card-container {
  min-width: 220px;
  height: 270px;
}
.font-small {
  font-size: 0.9em;
}

.hidden-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
