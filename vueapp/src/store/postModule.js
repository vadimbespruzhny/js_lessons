import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const postModule = {
    state: () => ({
        posts: {},
        isPostsLoading: false,
        page: 1,
        limit: 10,
        totalPages: 0,
        searchQuery: "",
        selectedSort: "",
        sortOptions: [
            { value: "title", name: "По названию" },
            { value: "body", name: "По содержимому" },
        ],
    }),
    mutations: {
        setPosts(state, payload) {
            if (payload.posts) {
                state.posts = payload.posts;
                return;
            }
            const data = payload.data.reduce((acc, cur) => {
                delete cur.userId;
                cur.id = uuidv4();
                acc[cur.id] = cur;
                acc[cur.id]["comments"] = {};
                return acc;
            }, {});
            localStorage.setItem("posts", JSON.stringify(data));
            state.posts = data;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        createPostMutation(state, payload) {
            state.posts = Object.entries(state.posts);
            state.posts.unshift(payload);
            state.posts = Object.fromEntries(state.posts);

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
            localStorage.setItem("posts", JSON.stringify(localStoragePosts));
        },
        createCommentMutation(state, payload) {
            const { postId } = payload;
            const postComments = Object.entries(state.posts[postId].comments);
            const arrayFromCommentObj = Object.entries(payload)[0];
            postComments.push(arrayFromCommentObj);
            state.posts[postId].comments = Object.fromEntries(postComments);

            const localStoragePosts = JSON.parse(localStorage.getItem("posts"));
            let comments = localStoragePosts[postId].comments;
            comments = Object.entries(comments);
            comments.push(arrayFromCommentObj);
            comments = Object.fromEntries(comments);
            localStoragePosts[postId].comments = comments;
            localStorage.setItem("posts", JSON.stringify(localStoragePosts));
        },
        editCommentMutation(state, payload) {
            const { postId, commentId, text } = payload;
            state.posts[postId].comments[commentId].text = text;

            const localStoragePosts = JSON.parse(localStorage.getItem("posts"));
            localStoragePosts[postId].comments[commentId].text = text;
            localStorage.setItem("posts", JSON.stringify(localStoragePosts));
        },
        deleteCommentMutation(state, payload) {
            const { postId, commentId } = payload;
            delete state.posts[postId].comments[commentId];

            const localStoragePosts = JSON.parse(localStorage.getItem("posts"));
            delete localStoragePosts[postId].comments[commentId];
            localStorage.setItem("posts", JSON.stringify(localStoragePosts));
        },
        createCommentAnswerMutation(state, payload) {
            const { postId, commentId, commentAnswer } = payload;
            state.posts[postId].comments[commentId].subComments[commentAnswer.id] =
                payload.commentAnswer;
        },
        setSelectedSort(state, payload) {
            state.selectedSort = payload;
        },
        setSearchQuery(state, payload) {
            state.searchQuery = payload;
        },
        setPageNumber(state, payload) {
            state.page = payload;
        },
        setTotalPages(state, payload) {
            const totalPages = localStorage.getItem("totalPages");
            if (!totalPages) {
                localStorage.setItem("totalPages", JSON.stringify(payload));
            }
            state.totalPages = +payload;
        },
    },
    getters: {
        sortGetter(state) {
            if (state.selectedSort) {
                const posts = Object.entries(state.posts);
                posts.sort((post1, post2) => {
                    return post1[1][state.selectedSort].localeCompare(
                        post2[1][state.selectedSort]
                    );
                });
                return (state.posts = Object.fromEntries(posts));
            }
            return state.posts;
        },
        searchGetter(state, getters) {
            if (!state.searchQuery) {
                state.posts = JSON.parse(localStorage.getItem("posts"));
            }

            let postsFilter = getters.sortGetter;
            postsFilter = Object.entries(postsFilter).filter((item) =>
                item[1].title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
            state.posts = Object.fromEntries(postsFilter);
        },
    },
    actions: {
        async fetchPosts({ commit, state }) {
            const posts = localStorage.getItem("posts");
            const totalPages = localStorage.getItem("totalPages");
            console.log(state.page);
            if (!posts || posts.length < 3) {
                try {
                    commit("setLoading", true);
                    const response = await axios.get(
                        "https://jsonplaceholder.typicode.com/posts?",
                        {
                            params: {
                                _page: state.page,
                                _limit: state.limit,
                            },
                        }
                    );
                    const totalPages = Math.ceil(
                        response.headers["x-total-count"] / state.limit
                    );
                    commit("setTotalPages", totalPages);
                    commit("setPosts", response);
                } catch (error) {
                    alert("Ошибка");
                } finally {
                    commit("setLoading", false);
                }
                return;
            }
            commit("setPosts", { posts });
            commit("setTotalPages", totalPages);
        },
        async loadMorePosts({ commit, state }) {
            console.log(state.page);
            try {
                commit("setLoading", true);
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts?",
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        },
                    }
                );
                console.log(response.config.params);
                commit("setPosts", response);
            } catch (error) {
                alert("Ошибка");
            } finally {
                commit("setLoading", false);
            }
        },
    },
    namespaced: true,
};
