<template>
    <form @submit.prevent="createComment">
        <textarea v-focus v-model="comment.text" type="text" cols="30" rows="7" ></textarea>
        <button class="btn" @click="createComment">Сохранить</button>
    </form>
</template>

<script>
export default {
    name: "comment-form",
    data() {
        return {
            comment: {
                text: "",
            },
        };
    },
    methods: {
        createComment() {
            this.$emit("createComment", this.comment.text);
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
textarea {
	border: 2px solid rgb(198, 199, 255);
    border-radius: 3px;
    outline: none;
	padding: 10px;
}
button {
	background-color: rgb(198, 199, 255);
    height: 35px;
    margin-top: 15px;
	border: none;
    border-radius: 3px;
}
button:hover {
    background-color: rgb(131, 133, 255);
}
</style>
