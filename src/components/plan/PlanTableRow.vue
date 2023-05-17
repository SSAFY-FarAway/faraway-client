<template>
    <tr class="text-center" @click='moveDetail'>
        <th scope="row">{{plan.id}}</th>
        <td>{{plan.title}}</td>
        <td>{{plan.loginId}}</td>
        <td>{{plan.hit}}</td>
        <td>{{plan.createdDate}}</td>
    </tr>
</template>

<script>
export default {
    name: 'PlanTableRow',
    components: {},
    props: {
        plan : Object
    },
    data() {
        return {
            message: '',
        };
    },
    created() {},
    methods: {
        moveDetail() {
            this.$router.push(`/plan/${this.plan.id}`).catch(() => {})
        }
    },
};
</script>

<style scoped></style>