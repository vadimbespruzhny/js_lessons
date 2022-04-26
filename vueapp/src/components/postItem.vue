<template>
    <div class="post">
        <div class="post-item">
            <div><strong> Название: </strong>{{ post.title }}</div>
            <div><strong> Описание: </strong>{{ post.body }}</div>
            <div>
                <post-comments :comments="comments"></post-comments>
            </div>
        </div>

        <div class="app-buttons">
            <post-button class="create-btn" @click="showDialog">
                Написать коментарий</post-button
            >
        </div>

        <my-dialog class="dialog" v-model:show="visible">
            <div @click.stop class="dialog-content">
                <comments-form @createComment="createComment"></comments-form>
            </div>
        </my-dialog>
        <div>
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
            comments: [],
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
            this.comments.push(comment);
            this.visible = false;
            console.log(this.comments);
        },
    },
};
</script>

<style scoped>
.post {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    padding: 15px;
    border: 2px solid gray;
}

.post-item {
    width: 700px;
}
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}
.dialog-content {
    margin: auto;
    background: white;
    border-radius: 12px;
    height: 230px;
    width: 500px;
    padding: 20px;
}
</style>
