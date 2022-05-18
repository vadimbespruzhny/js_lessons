<template>
    <div v-if="visible">
        <form @submit.prevent="editComment">
            <textarea v-model="comment.text" type="text" cols="60" rows="5"></textarea>
            <div v-if="condition.isEdit">
                <post-button class="btn" @click="editComment">Редактировать</post-button>
            </div>
            <div v-if="condition.isAnswer">
                <post-button class="btn" @click="createCommentAnswer">Сохранить</post-button>
            </div>
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
    props: {
        condition: {
            type: Object,
        },
    },
    methods: {
        editComment() {
            this.$emit("editComment", this.comment.text);
            this.visible = false;
        },
        createCommentAnswer() {
            this.$emit("createCommentAnswer", this.comment.text);
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
