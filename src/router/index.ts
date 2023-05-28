import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "../store/userinfo";


const routes = [
  {
    path: '/',
    name: 'login',
    meta: {
      requireAuth: false   // 添加该字段，表示进入这个路由是不需要token的
    },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/main',
    name: 'main',
    meta: {
      requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/shouye',
        name: 'shouye',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/layout/Shouye.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/userset/users/Userlist.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/userset/admin/Adminlist.vue')
      },
      {
        path: '/premissionshow',
        name: 'premissionshow',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/permissions/Permissionlist.vue')
      },
      {
        path: '/relolist',
        name: 'relolist',
        meta: {
          requireAuth: true
        },
        component: () => import('../views/permissions/Rolelist.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 定义完路由后，我们主要是利用vue-router提供的钩子函数beforeEach()对路由进行判断。
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    const uerinfo = useUserStore();
    //先运行axios，后运行路由守卫
    if (uerinfo.token) {
      // 通过pinia state获取当前的token是否存在
      next();
    } else {
      //console.log(from.fullPath);
      //将页面指定到登录页面
      return { name: 'login' }
      // next({
      //   path: "/login",
      //   query: { redirect: from.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      // });
    }
  } else {
    next();
  }
});

export default router;

