<template>
    <div class="commentItem">
        <div class="left-side">
            <div class="commentDate">
                <p>{{ comment.date }}</p>
            </div>

            <div v-if="!isEdit" class="commentText">
                <p>{{ comment.text }}</p>
                <div class="commentAnswer" v-for="answer in comment.subComments" :key="answer.id">
                    <p>{{ answer.text }}</p>
                </div>
            </div>
            <div v-if="isEdit">
                <p>{{ comment.text }}</p>
                <edit-form :isEdit="isEdit" @editComment="editComment"/>
            </div>
            <div v-if="isAnswer">
                <edit-form :isAnswer="isAnswer" @createCommentAnswer="createCommentAnswer"/>
            </div>
        </div>

        <div class="right-side">
            <button class="edit-comment-button" @click="showAnswerForm">
                Ответить
            </button>
            <button class="edit-comment-button" @click="showEditForm">
                Редактировать
            </button>
            <button class="delete-comment-button" @click="showDeleteDialog">
                Удалить
            </button>

            <div v-if="isDelete">
                <my-dialog class="dialog" v-model:show="visible">
                    <div @click.stop class="dialog-content">
                        <div>
                            <h3>Вы уверены что хотите удалить?</h3>
                        </div>
                        <div class="yes-or-no-buttons">
                            <div>
                                <post-button class="create-btn" @click="deleteComment">
                                    ДА
                                </post-button>
                            </div>
                            <div>
                                <post-button class="create-btn" @click="visible = false">
                                    НЕТ
                                </post-button>
                            </div>
                        </div>
                    </div>
                </my-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import editForm from "./UI/editForm.vue";
export default {
    components: { editForm },
    name: "commentItem",
    data() {
        return {
            visible: false,
            isDelete: false,
            isEdit: false,
            isAnswer: false,

        };
    },
    props: {
        comment: {
            type: Object,
        },
    },
    methods: {
        showDeleteDialog() {
            this.isDelete = true;
            this.visible = true;
        },
        showEditForm() {
            this.isEdit = !this.isEdit;
        },
        showAnswerForm() {
            this.isAnswer = !this.isAnswer;
        },

        deleteComment() {
            this.$emit("deleteComment", this.comment.id);
        },

        editComment(newCommentText) {
            this.$emit("editComment", newCommentText, this.comment.id);
            this.isEdit = false;
        },

        createCommentAnswer(commentAnswerText) {
            this.$emit("createCommentAnswer", commentAnswerText, this.comment.id);
            this.isAnswer = false;
        },
    },
};
</script>

<style scoped>
.commentItem {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    min-height: 25px;
    padding: 10px;
}

.left-side {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    overflow: hidden;
}

.commentAnswer {
    margin-left: 25px;
}

.right-side {
    display: flex;
    margin-top: 20px;
}

.delete-comment-button {
    display: flex;
    background-color: rgb(194, 194, 194);
    margin-left: 5px;
    height: 15px;
    border: none;
    outline: none;
}

.edit-comment-button {
    display: flex;
    background-color: rgb(194, 194, 194);
    margin-left: 5px;
    height: 15px;
    border: none;
    outline: none;
}

.edit-comment-button:hover {
    color: blue;
}

.delete-comment-button:hover {
    color: red;
}

.dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.yes-or-no-buttons {
    margin-top: 25px;
    display: flex;
    width: 80%;
    justify-content: space-around;
}
</style>
