<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "post-button"
};
</script>

<style scoped>
.btn {
    align-items: center;
    margin-top: 15px;
    padding: 10px 15px;
    background-color:rgb(251, 99, 99);
    border:none;
}
.create-btn {
    align-self: flex-end;
    background-color: rgb(100, 255, 100);
    margin: 15px 0 15px 0;
    padding: 10px 16px;
    border: none;
}
</style>
