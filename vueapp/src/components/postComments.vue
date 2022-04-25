<template>
    <div class="comments" v-if="comments.length > 0">
        <h4>Коментарии:</h4>
        <div v-for="comment in comments" :key="comment.id" :comment="comment">
            <strong
                ><p>{{ comment.text }}</p></strong
            >
        </div>
    </div>
    <div v-else>Нет коментариев</div>
</template>

<script>
export default {
    name: "post-comments",
    props: {
        comments: {
            type: Array,
        },
    },
};
</script>

<style scoped>
.comments {
    width: 700px;
    border: solid grey 1px;
    margin-top: 15px;
}
</style>
