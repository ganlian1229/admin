export default [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/common/Login.vue"),
    },
    {
        path: "/main",
        component: () => import("../components/Container.vue"),
        meta: {
            show: true,//是否显示在右侧
            title: "首页",//显示在右侧的文字（给自己的标识）
            isOne: true,//是否只有一个子集
            onePath: "index"//仅有的一个子集path是什么
        },
        name: "main",
        children: [{
            path: "index",
            name: "mainIndex",
            meta: {
                show: true,
                title: "首页"
            },
            component: () => import("../views/main/index.vue"),
        }],
    },
    {
        path: "/advertising",
        component: () => import("../components/Container.vue"),
        meta: {
            show: true,
            title: "广告位",
            isOne: true,
            onePath: "advertising"
        },
        name: "advertising",
        children: [{
            path: "advertising",
            name: "advertisingCon",
            meta: {
                show: true,
                title: "广告位"
            },
            component: () => import("../views/advertising/advertising.vue"),
        }],
    },
    {
        path: "/advertising2",
        component: () => import("../components/Container.vue"),
        meta: {
            show: true,
            title: "广告位2",
            isOne: true,
            onePath: "advertising2"
        },
        children: [{
            path: "advertising2",
            name: "advertisingCon2",
            meta: {
                show: true,
                title: "广告位2"
            },
            component: () => import("../views/advertising2/advertising2.vue"),
        }],
    },
    {
        path: "/articleAdmin",
        component: () => import("../components/Container.vue"),
        meta: {
            show: true,
            title: "文章管理",
            isOne: false,
            onePath: ""
        },
        name: "articleAdmin",
        children: [{
            path: "predestineRule",
            name: "predestineRule",
            meta: {
                show: true,
                title: "球场预定规则"
            },
            component: () => import("../views/articleAdmin/predestineRule.vue"),
        },
        {
            path: "finalNotice",
            name: "finalNotice",
            meta: {
                show: true,
                title: "球会下场须知"
            },
            component: () => import("../views/articleAdmin/finalNotice.vue"),
        },
        {
            path: "recentDiscount",
            name: "recentDiscount",
            meta: {
                show: true,
                title: "近期优惠"
            },
            component: () => import("../views/articleAdmin/recentDiscount.vue"),
        }
        ],
    }
]