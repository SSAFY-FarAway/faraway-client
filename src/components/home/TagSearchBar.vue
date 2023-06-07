<template>
    <div>
        <label for="tags-basic">떠나고 싶은 여행지와 관련된 키워드를 입력하세요.</label>
        <p class="text-muted">#봄 #제주 #설렘 #비 #축제</p>
        <div class="col-12 row align-items-center">
            <b-form-tags
            class="col-11"
                id="b-form-tags"
                tag-pills
                remove-on-delete
                size="lg"
                input-id="tags-basic" v-model="value"
                :limit="limit"
                placeholder="키워드를 입력 후 Enter"
            />
            <img
            id="tag-submit-btn"
            class="col-1 p-0"
            @click="submitTags"
            src="https://img.uxwing.com/wp-content/themes/uxwing/download/brands-social-media/chatgpt-icon.svg"/>
            
      </div>
    </div>
</template>

<script>

export default {
    name: "TagSearchBar",
    data() {
        return {
            value: [],
            limit: 5
        };
    },
    mounted() {
    },
    methods: {
        submitTags(){
            this.$alertSuccess("gpt 검색 요청",`입력된 키워드 : ${this.value}`)
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

</style>