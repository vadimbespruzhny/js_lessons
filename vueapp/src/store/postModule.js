import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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
    mutations: {
        setPosts(state, payload) {
            if (typeof payload === "string") {
                const data = JSON.parse(payload);
                state.posts = data;
            } else {
                const data = payload.data.reduce((acc, cur) => {
                    delete cur.userId;
                    cur.id = uuidv4();
                    acc[cur.id] = cur;
                    acc[cur.id]["comments"] = {};
                    return acc;
                }, {});
                localStorage.setItem("posts", JSON.stringify(data));
                state.posts = data;
            }
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        createPostMutation(state, payload) {
            state.posts = Object.entries(state.posts);
            state.posts.unshift(payload);
            state.posts = Object.fromEntries(state.posts)

            let localStoragePosts = JSON.parse(localStorage.getItem("posts"));
            localStoragePosts = Object.entries(localStoragePosts);
            localStoragePosts.unshift(payload);
            localStoragePosts = Object.fromEntries(localStoragePosts);
            localStorage.setItem("posts", JSON.stringify(localStoragePosts));
        },
        deletePostMutation(state, id) {
            delete state.posts[id];
            const localStoragePosts = JSON.parse(localStorage.getItem("posts"));

            delete localStoragePosts[id];
            localStorage.posts = JSON.stringify(localStoragePosts);
        },
        createCommentMutation(state, payload) {
            const { postId } = payload;
            const postComments = Object.entries(state.posts[postId].comments);
            const arrayFromCommentObj = Object.entries(payload)[0];
            postComments.push(arrayFromCommentObj);
            state.posts[postId].comments = Object.fromEntries(postComments);

            const localStoragePostsObj = JSON.parse(localStorage.getItem("posts"));
            let comments = localStoragePostsObj[postId].comments;
            comments = Object.entries(comments);
            comments.push(arrayFromCommentObj);
            comments = Object.fromEntries(comments);
            localStoragePostsObj[postId].comments = comments;
            localStorage.setItem("posts", JSON.stringify(localStoragePostsObj));

        },
        editCommentMutation(state, payload) {
            const { postId, commentId, text } = payload;
            state.posts[postId].comments[commentId].text = text;
        },
        deleteCommentMutation(state, payload) {
            const { postId, commentId } = payload;
            delete state.posts[postId].comments[commentId];
        },
        createCommentAnswerMutation(state, payload) {
            const { postId, commentId, commentAnswer } = payload;
            state.posts[postId]
                .comments[commentId]
                .subComments[commentAnswer.id] = payload.commentAnswer
        },
    },
    actions: {
        async fetchPosts({ commit }) {
            if (!localStorage.posts) {
                localStorage.setItem("posts", JSON.stringify({}));

            } else if (localStorage.posts) {
                const localStoragePostsLength = Object.keys(JSON.parse(localStorage.posts)).length
                if (localStoragePostsLength < 1) {
                    try {
                        commit("setLoading", true);
                        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
                        commit("setPosts", response);
                    } catch (error) {
                        alert("Ошибка");
                    } finally {
                        commit("setLoading", false);
                    }
                } else {
                    commit("setPosts", localStorage.posts);
                }
            }
        }
    },
    namespaced: true
};
