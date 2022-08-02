<template>
	<div>
		<form @submit.prevent>
			<input
				:value="searchQuery"
				@input="this.$store.commit('post/setSearchQuery', $event.target.value)"
				type="text"
				placeholder="Поиск..."
			/>
		</form>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "search-form",
	computed: {
		...mapState({
			searchQuery: (state) => state.post.searchQuery,
		}),
	},
};
</script>

<style scoped>
form {
	display: flex;
	justify-content: center;
	margin: 15px;
}
input {
	width: 30%;
	border: 2px solid rgb(99, 101, 251);
	border-radius: 5px;
	padding: 10px 15px;
	outline: none;
}
</style>
