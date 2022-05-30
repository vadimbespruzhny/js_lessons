<template>
    <div class="post">
        <div class="left-side">
            <div class="post-item">
                <div><strong> Название: </strong>{{ post.title }}</div>
                <div><strong> Описание: </strong>{{ post.body }}</div>
            </div>
            <div>
                <post-comments @deleteComment="deleteComment" @editComment="editComment"
                    @createCommentAnswer="createCommentAnswer" :comments="post.comments"/>
            </div>
        </div>

        <div class="right-side">
            <div>
                <post-button class="create-btn" @click="visible = true">
                    Написать коментарий</post-button>
            </div>

            <my-dialog v-model:show="visible">
                <div @click.stop class="dialog-content">
                    <h3>Написать коментарий</h3>
                    <comments-form @createComment="createComment"/>
                </div>
            </my-dialog>
            <div>
                <post-button class="btn" @click="deletePostMutation(post.id)">Удалить</post-button>
            </div>
        </div>
    </div>
</template>

<script>
import postComments from "../components/postComments.vue";
import commentsForm from "./UI/commentsForm.vue";
import { v4 as uuidv4 } from 'uuid';
import { mapMutations } from "vuex";

export default {
    components: { postComments, commentsForm },
    data() {
        return {
            visible: false,
        };
    },
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    methods: {
        ...mapMutations("post", {
            deletePostMutation: "deletePostMutation",
            createCommentMutation: "createCommentMutation",
            editCommentMutation: "editCommentMutation",
            deleteCommentMutation: "deleteCommentMutation",
            createCommentAnswerMutation: "createCommentAnswerMutation",
        }),
        
        createComment(text) {
            const fullComment = {};
            const comment = {
                id: uuidv4(),
                date: new Date().toLocaleString(),
                text,
                subComments: {},
            };
            fullComment[comment.id] = comment;
            fullComment["postId"] = this.post.id;
            this.createCommentMutation(fullComment);
            this.visible = false;
        },
        editComment(newCommentText, commentId) {
            this.editCommentMutation({
                text: newCommentText,
                commentId,
                postId: this.post.id,
            });
        },

        deleteComment(commentId) {
            this.deleteCommentMutation({
                commentId: commentId,
                postId: this.post.id,
            });
            // в компоненте не обязательно определять ...mapMutations, можно напярмую вызывать
            // мутацю - this.$store.commit("post/deleteCommentMutation", payload)
        },

        createCommentAnswer(commentAnswerText, commentId) {
            this.createCommentAnswerMutation({
                commentAnswer: {
                    id: Math.floor(Math.random() * (1000 - 1)),
                    date: new Date().toLocaleString(),
                    text: commentAnswerText,
                },
                commentId: commentId,
                postId: this.post.id,
            });
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
