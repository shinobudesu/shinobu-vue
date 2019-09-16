import Vue from "vue"
import Router from "vue-router"
import store from "@/store/index.js";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const Layout = () =>
    import ("@/layout/index.vue");
const Article = () =>
    import ("@/views/backstage/article/index.vue");
const ArticleEdit = () =>
    import ("@/views/backstage/article/edit.vue");
const Statics = () =>
    import ("@/views/backstage/statics/index.vue");
const Log = () =>
    import ("@/views/backstage/log/index.vue");
const Role = () =>
    import ("@/views/backstage/role/index.vue");
const Login = () =>
    import ("@/views/login/index.vue");


Vue.use(Router);

const router = new Router({
    mode: "hash",
    routes: [{
        path: "/backstage",
        name: "Layout",
        meta: { title: '后台' },
        component: Layout,
        children: [{
            path: "/backstage/statics",
            name: "statics",
            meta: {
                title: '统计管理',
                requireAuth: true,
            },
            component: Statics
        }, {
            path: "/backstage/article",
            name: "article",
            meta: {
                title: '文章管理',
                requireAuth: true,
            },
            component: Article
        }, {
            path: "/backstage/articleByedit/:id",
            name: "articlebyedit",
            meta: {
                title: '文章编辑',
                requireAuth: true,
            },
            component: ArticleEdit
        }, {
            path: "/backstage/log",
            name: "log",
            meta: {
                title: '日志管理',
                requireAuth: true,
            },
            component: Log
        }, {
            path: "/backstage/role",
            name: "role",
            meta: {
                title: '权限管理',
                requireAuth: true,
            },
            component: Role
        }]
    }, {
        path: "/login",
        name: "login",
        meta: { title: '登录', },
        component: Login
    }]
});
// 配置NProgress进度条选项  —— 动画效果
NProgress.configure({ ease: 'ease', speed: 500, showSpinner: false });
NProgress.inc(0.2);
// 页面刷新时，重新赋值token
if (window.localStorage.getItem("token")) {
    store.commit('LOGIN', window.localStorage.getItem("token"));
}
// 全局路由拦截-进入页面前执行
router.beforeEach((to, from, next) => {
    // NProgress开始进度条
    NProgress.start();
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token && window.localStorage.getItem("token")) {
            next();
        } else {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});
// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
    // NProgress结束进度条
    NProgress.done();
});


// requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
export default router;