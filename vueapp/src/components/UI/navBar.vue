<template>
    <div class="navbar">
        <router-link class="link" to="/" style="color: blue"><h3>Главная</h3></router-link>
        <router-link to="/posts">Все посты</router-link>
        <router-link to="/about">О сайте</router-link>
    </div>
</template>

<script>

export default {
    name: "navBar",
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    background-color: rgb(198, 199, 255);
    width: 100%;
    border-bottom: 2px solid rgb(131, 133, 255);
}
a {
    margin-right: 25px;
    text-decoration: none;
    color: rgb(58, 58, 58);
}
a:hover {
    color: rgb(0, 0, 0);
}
</style>
