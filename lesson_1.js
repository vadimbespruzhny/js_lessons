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

let courses = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

function filteredRange1(courses, requiredRange1) {
    let filteredCourse = courses.filter((item) => {
        let notNullValues = item.prices.filter((p) => p);
        if (notNullValues.length > 1) {
            return notNullValues[1] <= requiredRange1[1];
        }
        return notNullValues[0] < requiredRange1[1];
    });
    return filteredCourse;
}
// console.log(filteredRange1(courses, requiredRange1));

function filteredRange2(courses, requiredRange2) {
    let filteredCourse = courses.filter((item) => {
        let notNullValues = item.prices.filter((p) => p);
        if (notNullValues.length > 1) notNullValues = [notNullValues[1]];
        return (
            notNullValues[0] > requiredRange2[0] && notNullValues[0] < requiredRange2[1]
        );
    });
    return filteredCourse;
}
console.log(filteredRange2(courses, requiredRange2));

function filteredRange3(courses, requiredRange3) {
    let filteredCourse = courses.filter((item) => {
        let notNullValues = item.prices.filter((p) => p);
        if (notNullValues.length > 1) {
            return notNullValues[0] >= requiredRange3[1];
        }
        return notNullValues[0] > requiredRange3[1];
    });
    return filteredCourse;
}
// console.log(filteredRange3(courses, requiredRange2));


