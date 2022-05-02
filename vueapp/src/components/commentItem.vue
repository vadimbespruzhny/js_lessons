<template>
    <div class="commentItem">
        <div class="commentDate">
            <p>{{ comment.date }}</p>
        </div>
        <div class="commentText">
            <p>{{ comment.text }}</p>
        </div>
        <button @click="deleteComment">Удалить коментарий</button>
    </div>
</template>

<script>
export default {
    name: "commentItem",
    props: {
        comment: {
            type: Object,
        },
    },
    methods: {
        deleteComment() {
            this.$emit("deleteComment", this.comment);
        },
    },
};
</script>

<style scoped>
.commentItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 15px;
    min-height: 25px;
    padding: 10px;
}
</style>
