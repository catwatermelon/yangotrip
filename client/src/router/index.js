import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import User from '@/views/User'
import Login from '@/views/Login'
import Index from '@/views/Index'
import Register from '@/views/Register'
import About from '@/views/About'



const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      // name: 'Home',
      component: Index,
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/about',
          name: 'About',
          component: About,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/user',
          name: 'User',
          component: User,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

//判断是否有权限进入该路由
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('token');
    if (token && token !== 'null') {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

Vue.use(Router)

export default router;
