<template>
    <div>
        <div><strong> Название: </strong>{{ postItem.title }}</div>
        <div><strong> Описание: </strong>{{ postItem.body }}</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: "postItemPage",
    methods: {
        ...mapMutations("post", {
            loadPostItem: "loadPostItem",
        }),
    },
    computed: {
        ...mapState({
            postItem: (state) => state.post.posts,
        }),
        postId() {
            return this.$route.params.id;
        },
    },
    mounted() {
        this.loadPostItem(this.postId);
    },
};
</script>

<style scoped></style>
