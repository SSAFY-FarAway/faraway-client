<template>
  <div>
    <label for="tags-basic"
      >떠나고 싶은 여행지와 관련된 키워드를 입력하세요.</label
    >
    <p>
      <span class="tag m-1" v-for="tag in tagExample" :key="tag"
        >#{{ tag }}</span
      >
    </p>
    <div class="col-12 row m-0">
      <b-form-tags
        class="col-11"
        id="b-form-tags"
        tag-pills
        remove-on-delete
        size="lg"
        input-id="tags-basic"
        v-model="value"
        :limit="limit"
        placeholder="키워드를 입력 후 Enter"
      />
      <img
        id="tag-submit-btn"
        class="col-1 p-0"
        @click="submitTags"
        src="https://img.uxwing.com/wp-content/themes/uxwing/download/brands-social-media/chatgpt-icon.svg"
      />
    </div>
  </div>
</template>

<script>

export default {
    name: "TagSearchBar",
    data() {
        return {
            value: [],
            limit: 5,
            tagExample : ["봄","제주","설렘","비","축제"]
        };
    },
    mounted() {
    },
    methods: {
        submitTags(){
            this.$emit("submitTags",this.value)
        }
    }
};
</script>

<style scoped>

#b-form-tags > ul > li {
    background-color: red !important;
}

#tag-submit-btn {
    width:48px;
    height:48px;
    cursor: pointer;
}

.tag {
    font-size: 0.9em;
    padding: 0 7px;
    border-radius: 5px;
    background-color: #6c757d;
    color: white;
}
</style>
