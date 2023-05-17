<template>
    <div>
        <!-- TODO : img 디폴트 이미지 추가할 것. -->
        <b-card
            :title='attraction.title'
            :img-src='attraction.firstImage'
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-1"
        >
            <b-card-text>
                {{attraction.addr1 }}
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'AttractionSearchResultItem',
    components: {},
    props: {
        attraction : Object
    },  
    data() {
        return {
            message: '',
        };
    },
    created() {},
    methods: {},
};
</script>

<style scoped></style>