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
            this.$emit("delete", this.post);
        },
        showDialog() {
            this.visible = true;
        },
        createComment(comment) {
            let date = new Date();
            comment["id"] = Math.floor(Math.random() * (1000 - 1));
            comment["date"] = date.toLocaleString();
            this.$emit("createComment", comment, this.post);
            this.visible = false;
        },
        editComment(newComment, comment) {
            // comment.text = newComment.text;
            this.$emit("editComment", newComment, comment, this.post);
        },

        deleteComment(comment) {
            this.$emit("deleteComment", comment, this.post);
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
