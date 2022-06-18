<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
