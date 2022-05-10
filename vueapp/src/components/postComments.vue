<template>
    <div class="comments" v-if="Object.keys(comments).length > 0">
        <div class="allCommentsText">
            <h4>Все коментарии</h4>
        </div>
        <comment-item
            class="commentItem"
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            @deleteComment="$emit('deleteComment', comment)"
            @editComment="editComment"
        ></comment-item>
    </div>
    <div v-else></div>
</template>

<script>
import commentItem from "./commentItem.vue";
export default {
    components: { commentItem },
    name: "post-comments",
    props: {
        comments: {
            type: Object,
        },
    },
    methods: {
        editComment(newComment, comment) {
            this.$emit("editComment", newComment, comment)
        },
    }
};
</script>

<style scoped>
.comments {
    width: 700px;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 5px;
    background-color: rgb(194, 194, 194);
    margin-top: 15px;
}
.allCommentsText {
    border-bottom: 1px solid gray;
    padding: 10px;
}
</style>
