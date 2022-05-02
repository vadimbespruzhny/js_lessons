
<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <my-input
            v-model="post.title"
            type="text"
            placeholder="Название"
        />
        <my-input
            v-model="post.body"
            type="text"
            placeholder="Описание"
        />
        <post-button class="btn" @click="createPost">Создать</post-button>
    </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
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
        createPost() {
            this.post.id = uuidv4();
            this.$emit("create", this.post);
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
</style>
