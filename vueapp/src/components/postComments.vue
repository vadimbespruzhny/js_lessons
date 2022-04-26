<template>
    <div class="comments" v-if="comments.length > 0">
        <h4>Коментарии:</h4>
        <div v-for="comment in comments" :key="comment.id" :comment="comment">
                <p>{{ comment.text }}</p>
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
    border-radius: 5px;
    background-color: rgb(210, 250, 150);
    margin-top: 15px;
    padding: 10px;
}
</style>
