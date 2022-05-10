<template>
    <div class="commentItem">
        <div class="left-side">
            <div class="commentDate">
                <p>{{ comment.date }}</p>
            </div>

            <div v-if="!onEdit" class="commentText">
                <p>{{ comment.text }}</p>
            </div>
            <div v-else-if="onEdit">
                <p>{{ comment.text }}</p>
                <edit-form @editComment="editComment"></edit-form>
            </div>
        </div>

        <div class="right-side">
            <button class="edit-comment-button" @click="showEditDialog">
                Редактировать
            </button>
            <button class="delete-comment-button" @click="showDeleteDialog">
                Удалить
            </button>

            <div v-if="onDelete">
                <my-dialog class="dialog" v-model:show="visible">
                    <div @click.stop class="dialog-content">
                        <div>
                            <h3>Вы уверены что хотите удалить</h3>
                        </div>
                        <div class="yes-or-no-buttons">
                            <div>
                                <button class="yes" @click="deleteComment">
                                    ДА
                                </button>
                            </div>
                            <div>
                                <button class="no" @click="hideDialog">
                                    НЕТ
                                </button>
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
            onDelete: false,
            onEdit: false,
        };
    },
    props: {
        comment: {
            type: Object,
        },
    },
    methods: {
        showDeleteDialog() {
            this.onDelete = true;
            this.visible = true;
            console.log(this.comment);
        },
        showEditDialog() {
            this.onEdit = true;
        },
        hideDialog() {
            this.visible = false;
        },

        deleteComment() {
            this.$emit("deleteComment", this.comment);
        },
        editComment(newComment) {
            this.$emit("editComment", newComment, this.comment)
            this.onEdit = false;
        }
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
    justify-content: space-between;
}
.yes {
    background-color: rgb(251, 99, 99);
    height: 30px;
    width: 100px;
    border: none;
    outline: none;
}
.no {
    background-color: rgb(100, 255, 100);
    height: 30px;
    width: 100px;
    border: none;
    outline: none;
}
</style>
