<template>
    <div class="posts-list">
        <div v-show="posts">
            <h3>Список постов</h3>
            <post-item
                v-for="post in posts"
                :key="post.id"
                :post="post"
            />
        </div>
        <h2 v-show="!posts" style="color: red">Список постов пуст</h2>
    </div>
</template>

<script>
import postItem from "./postItem.vue";
import { mapState } from "vuex";

export default {
    components: { postItem },
    computed: {
        ...mapState({
            posts: state => state.post.posts
        })
    }
};
</script>

<style scoped>
.posts-list {
    margin-top: 25px;
    width: 75%;
}
.post {
    margin-top: 15px;
    padding: 15px;
}
</style>
