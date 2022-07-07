<template>
    <select
        :value="selectedSort"
        @change="this.$store.commit('post/setSelectedSort', $event.target.value)"
    >
        <option disabled value="">Сортировать</option>
        <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            {{ option.name }}
        </option>
    </select>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "my-select",
    computed: {
        ...mapState({
            sortOptions: (state) => state.post.sortOptions,
            selectedSort: (state) => state.post.selectedSort,
        }),
    },
};
</script>

<style scoped>
select {
    text-align: center;
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 3px;
    -webkit-appearance: none;
}
select:hover {
    background-color: rgb(131, 133, 255);
}
</style>
