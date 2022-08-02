<template>
    <div class="posts-list">
        <div v-if="Object.keys(this.posts).length > 0">
            <transition-group name="post-list">
                <post-item
                    v-for="post in posts"
                    :key="post.id"
                    :post="post"
                />
            </transition-group>
        </div>
        <div v-else>Пока нет постов...</div>
    </div>
</template>

<script>
import postItem from "./postItem.vue";
import { mapState } from "vuex";

export default {
    components: { postItem },
    methods: {},
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
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.3s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>
