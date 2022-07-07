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
    padding: 7px 12px;
    background-color:rgb(212, 212, 212);
    border: none;
    border-radius: 3px;
}
.btn:hover {
    background-color:rgb(186, 186, 186);

}
.create-btn {
    background-color: rgb(198, 199, 255);
    margin: 0 0 15px 0;
    padding: 7px 13px;
    border: none;
    border-radius: 3px;
}
.create-btn:hover {
    background-color: rgb(131, 133, 255);
}
</style>
