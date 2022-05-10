<template>
    <div v-if="visible">
        <form @submit.prevent="editComment">
            <textarea
                v-model="comment.text"
                type="text"
                cols="60"
                rows="5"
            ></textarea>
            <post-button class="btn" @click="editComment" @hideForm="hideForm"
                >Редактировать</post-button
            >
        </form>
    </div>
    <div v-else></div>
</template>

<script>
export default {
    name: "edit-form",
    data() {
        return {
            comment: {
                text: "",
            },
            visible: {
                type: Boolean,
                default: true,
            },
        };
    },
    methods: {
        editComment() {
            this.$emit("editComment", this.comment);
            this.visible = false;
        },
        hideForm() {
            this.visible = false;
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
