<template>
  <div>
    <div class="container">
  
</div>
  </div>
</template>
<script>
import http from '@/utils/api/http';

export default {
  name: "PlanWrite",
    components: {
    },
  data() {
    return {
        plan: {},
    };
  },
    created() {
        const planId = this.$route.params.planId;
        http.get(`/plan/${planId}`).then(res => {
            console.log(res)
            if (res.status === 200) {
                this.plan = res.data;
            }
        }).catch(() => {
            this.$alertDanger("데이터 로드 실패 !", "추후에 예외처리 로직 추가 예정")
        })
  },
  methods: {},
};
</script>

<style scoped>
#search-select-box { 
    width: 200px;
}
</style>
