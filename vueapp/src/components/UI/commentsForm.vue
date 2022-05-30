<template>
    <form @submit.prevent="createComment">
        <textarea v-model="comment.text" type="text" cols="30" rows="7" ></textarea>
        <post-button class="btn" @click="createComment">Сохранить</post-button>
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
            this.$emit("createComment", this.comment.text);
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
