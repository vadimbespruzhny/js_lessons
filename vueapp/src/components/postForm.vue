<template>
	<form @submit.prevent>
		<h4>Создание поста</h4>
		<input
			v-focus
			:modelValue="post.title"
			@input="post.title = $event.target.value"
			type="text"
			placeholder="Название"
		/>
		<input
			:modelValue="post.body"
			@input="post.body = $event.target.value"
			type="text"
			placeholder="Описание"
		/>
		<button @click="createPost">Создать</button>
	</form>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapMutations } from "vuex";
export default {
	data() {
		return {
			post: {
				title: "",
				body: "",
				comments: {},
			},
		};
	},
	methods: {
		...mapMutations("post", {
			createPostMutation: "createPostMutation",
		}),
		createPost() {
			let fullPost = {};
			this.post["id"] = uuidv4();
			fullPost[this.post.id] = this.post;
			fullPost = Object.entries(fullPost)[0];
			this.createPostMutation(fullPost),
				(this.post = {
					title: "",
					body: "",
				});
		},
	},
};
</script>

<style scoped>
form {
	display: flex;
	flex-direction: column;
}
input {
	width: 100%;
	border: 2px solid rgb(198, 199, 255);
	border-radius: 3px;
	padding: 10px;
	margin-top: 15px;
	outline: none;
}
button {
	background-color: rgb(198, 199, 255);
    height: 35px;
    margin-top: 15px;
	border: none;
    border-radius: 3px;
}
button:hover {
    background-color: rgb(131, 133, 255);
}
</style>
