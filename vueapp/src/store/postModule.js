import axios from "axios";
import {v4 as uuidv4} from "uuid";

export const postModule = {
    state: () => (
        {
            likes: 1,
            posts: {},
            visible: false,
            isPostsLoading: false,
            selectedSort: "",
            sortOptions: [
                {
                    value: "title",
                    name: "По названию"
                }, {
                    value: "body",
                    name: "По содержимому"
                },
            ]
        }
    ),
    getters: {
        postList(state) {
            return state.posts;
        }
    },
    mutations: {
        setPosts(state, data) {
            state.posts = data;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        createPostMutation(state, post) {
            state.posts[post.id] = post;
        },
        deletePostMutation(state, id) {
            delete state.posts[id];
        },
        createCommentMutation(state, payload) {
            state.posts[payload.postId].comments[payload.comment.id] = payload.comment;
        },
        editCommentMutation(state, payload) {
            state.posts[payload.postId].comments[payload.commentId].text = payload.text;
        },
        deleteCommentMutation(state, payload) {
            delete state.posts[payload.postId].comments[payload.commentId];
        },
        createCommentAnswerMutation(state, payload) {
            state.posts[payload.postId]
            .comments[payload.commentId]
            .subComments[payload.commentAnswer.id] = payload.commentAnswer
        },
    },
    actions: {
        async fetchPosts({commit}) {
            try {
                commit("setLoading", true);
                let response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");

                let data = response.data.reduce((acc, cur) => {
                    delete cur.userId;
                    cur.id = uuidv4();
                    acc[cur.id] = cur;
                    acc[cur.id]["comments"] = {};
                    return acc;
                }, {});
                commit("setPosts", data);
            } catch (error) {
                alert("Ошибка");
            } finally {
                commit("setLoading", false);
            }
        }
    },
    namespaced: true
};
