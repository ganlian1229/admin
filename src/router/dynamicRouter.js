export default [
    {
        path: '/main',
        component: () => import('../components/Container.vue'),
        meta: {
            icon: 'el-icon-s-platform', //文字前的图标（element-ui的自带图标、如需自定义需要修改dom结构）
            show: true, //是否显示在右侧
            title: '首页', //显示在右侧的文字（给自己的标识）
            isOne: true //是否只有一个子集
        },
        name: 'main',
        children: [
            {
                path: 'index',
                name: 'mainIndex',
                meta: {
                    show: true,
                    title: '首页'
                },
                component: () => import('../views/main/index.vue')
            }
        ]
    },
    {
        path: '/advertising',
        component: () => import('../components/Container.vue'),
        meta: {
            icon: 'el-icon-s-platform',
            show: true,
            title: '广告位',
            isOne: true
        },
        name: 'advertising',
        children: [
            {
                path: 'advertising',
                name: 'advertisingCon',
                meta: {
                    show: true,
                    title: '广告位'
                },
                component: () => import('../views/advertising/advertising.vue')
            }
        ]
    },
    {
        path: '/advertising2',
        component: () => import('../components/Container.vue'),
        meta: {
            icon: 'el-icon-s-platform',
            show: true,
            title: '广告位2',
            isOne: true
        },
        name: 'advertising2',
        children: [
            {
                path: 'advertising2',
                name: 'advertisingCon2',
                meta: {
                    show: true,
                    title: '广告位2'
                },
                component: () => import('../views/advertising2/advertising2.vue')
            }
        ]
    },
    {
        path: '/advertising3',
        component: () => import('../components/Container.vue'),
        meta: {
            icon: 'el-icon-s-platform',
            show: true,
            title: '广告位3',
            isOne: true
        },
        name: 'advertising3',
        children: [
            {
                path: 'advertising3',
                name: 'advertisingCon3',
                meta: {
                    show: true,
                    title: '广告位3'
                },
                component: () => import('../views/advertising3/advertising3.vue')
            }
        ]
    },
    {
        path: '/articleAdmin',
        component: () => import('../components/Container.vue'),
        meta: {
            icon: 'el-icon-s-platform',
            show: true,
            title: '文章管理',
            isOne: false
        },
        name: 'articleAdmin',
        children: [
            {
                path: 'predestineRule',
                name: 'predestineRule',
                meta: {
                    icon: 'Football',
                    show: true,
                    title: '球场预定规则'
                },
                component: () => import('../views/articleAdmin/predestineRule.vue')
            },
            {
                path: 'finalNotice',
                name: 'finalNotice',
                meta: {
                    icon: 'Tickets',
                    show: true,
                    title: '球会下场须知'
                },
                component: () => import('../views/articleAdmin/finalNotice.vue')
            },
            {
                path: 'recentDiscount',
                name: 'recentDiscount',
                meta: {
                    icon: 'ShoppingCart',
                    show: true,
                    title: '近期优惠'
                },
                component: () => import('../views/articleAdmin/recentDiscount.vue')
            }
        ]
    }
];
