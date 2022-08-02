<template>
    <div class="notFound">
        cтраница не найдена...
    </div>
    <div>
        <router-link to="/">На главную</router-link>
    </div>
</template>

<script>
    export default {
        name: "notFoundPage"
    }
</script>

<style scoped>
.notFound {
    font-size: 25px;
    margin-bottom: 25px;
}
</style>