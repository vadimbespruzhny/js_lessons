
<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <input
            :modelValue="post.title"
            @input="post.title = $event.target.value"
            type="text"
            placeholder="Название"
        />
        <input
            :modelValue="post.body"
            @input="post.body = $event.target.value"
            type="text"
            placeholder="Описание"
        />
        <post-button class="btn" @click="createPost">Создать</post-button>
    </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            post: {
                title: "",
                body: "",
                comments: {},
            },
        };
    },
    methods: {
        ...mapMutations("post", {
            createPostMutation: "createPostMutation",
        }),
        createPost() {
            this.post.id = uuidv4();
            this.createPostMutation(this.post),
            this.post = {
                title: "",
                body: "",
            };
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
input {
    width: 100%;
    border: 2px solid gray;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>
