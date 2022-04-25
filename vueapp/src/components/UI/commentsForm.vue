<template>
    <form @submit.prevent>
        <h3>Написать коментарий</h3>
        <!-- <textarea name="" id="" cols="30" rows="10" ></textarea> -->
        <my-input v-model="comment.text" type="text"></my-input>
        <post-button class="btn" @click="createComment"
            >Сохранить</post-button
        >
    </form>
</template>

<script>
export default {
    name: "comment-form",
    data() {
        return {
            comment: {
                text: "",
            },
        };
    },
    methods: {
        createComment() {
            this.$emit("createComment", this.comment);
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>
