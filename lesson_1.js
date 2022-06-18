"use strict";

let obj = {
    posts: [
        {
            id: 1,
            title: "asasas",
            body: "lklklk",
        },
        {
            id: 2,
            title: "qwerty",
            body: "123456",
        },
        {
            id: 3,
            title: "jcladjgckhg",
            body: "cj98u576gu98",
        },
    ],
};

obj.posts = obj.posts.reduce((res, curr) => {
    res[curr.id] = curr;
    res[curr.id]["commnets"] = [];
    return res;
}, {});

// console.log(obj.posts);
// obj.posts["1"].body = "qwerty"
// console.log(obj.posts["1"].body);

let posts = {
    123: {
        text: "text123",
    },
};

let post = {
    321: {
        text: "second",
    },
};

let post123 = {
    777: {
        text: "third",
    },
};

let converted = Object.entries(posts);
converted.unshift(post);
// converted.unshift(Object.entries(post123)[0]);

console.log(Object.fromEntries(converted));
