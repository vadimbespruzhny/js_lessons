<template>
    <div class="post">
        <div class="left-side">
            <div class="post-item">
                <div><strong> Название: </strong>{{ post.title }}</div>
                <div><strong> Описание: </strong>{{ post.body }}</div>
            </div>
            <div>
                <post-comments
                    @deleteComment="deleteComment"
                    @editComment="editComment"
                    @createCommentAnswer="createCommentAnswer"
                    :comments="post.comments"
                ></post-comments>
            </div>
        </div>

        <div class="right-side">
            <div>
                <post-button class="create-btn" @click="showDialog">
                    Написать коментарий</post-button
                >
            </div>

            <my-dialog v-model:show="visible">
                <div @click.stop class="dialog-content">
                    <h3>Написать коментарий</h3>
                    <comments-form
                        @createComment="createComment"
                    ></comments-form>
                </div>
            </my-dialog>
            <div>
                <post-button class="btn" @click="deletePost"
                    >Удалить</post-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import postComments from "../components/postComments.vue";
import commentsForm from "./UI/commentsForm.vue";
export default {
    components: { postComments, commentsForm },
    data() {
        return {
            visible: false,
            currentTime: new Date(),
        };
    },
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    methods: {
        deletePost() {
            this.$emit("delete", this.post.id);
        },
        showDialog() {
            this.visible = true;
        },
        createComment(text) {
            let currentDate = new Date().toLocaleString();
            let comment = {
                id: Math.floor(Math.random() * (1000 - 1)),
                date: currentDate,
                text: text,
                subComments: {},
            };
            this.$emit("createComment", comment, this.post.id);
            this.visible = false;
        },
        editComment(newCommentText, commentId) {
            this.$emit("editComment", newCommentText, commentId, this.post.id);
        },

        deleteComment(commentId) {
            this.$emit("deleteComment", commentId, this.post.id);
        },

        createCommentAnswer(commentAnswerText, commentId) {
            let currentDate = new Date().toLocaleString();
            let commentAnswer = {
                id: Math.floor(Math.random() * (1000 - 1)),
                date: currentDate,
                text: commentAnswerText,
            };
            this.$emit(
                "createCommentAnswer",
                commentAnswer,
                commentId,
                this.post.id
            );
        },
    },
};
</script>

<style scoped>
.post {
    display: flex;
    justify-content: space-between;
    border: 1px solid gray;
}

.post-item {
    width: 700px;
    border: 1px solid rgb(211, 211, 211);
    border-radius: 5px;
    background-color: rgb(194, 194, 194);
    padding: 10px;
}

.dialog-content {
    margin: auto;
    background: white;
    border-radius: 12px;
    height: 230px;
    width: 500px;
    padding: 20px;
}
.right-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
</style>
