import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Message from "../components/Message";
import Login from "../components/Login";

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/message', name: 'Message', component: Message, meta: {showNav: true}},
    { path: '/', name: 'Login', component: Login, meta: {showNav: false}}
  ],
  mode: "history"
})
