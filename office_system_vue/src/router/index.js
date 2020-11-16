import Vue from 'vue'
import Router from 'vue-router'
import Message from "../components/Message";
import Login from "../components/Login";
import Registration from "../components/Registration";
import PersonalInfo from "../components/PersonalInfo";
import AttendanceStatistics from "../components/AttendanceStatistics";

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/message', name: 'Message', component: Message, meta: {showNav: true}},
    { path: '/', name: 'Login', component: Login, meta: {showNav: false}},
    { path: '/register', name: 'Registration', component: Registration, meta: {showNav: false}},
    { path: '/person', name: 'PersonalInfo', component: PersonalInfo, meta: {showNav: true}},
    {path: '/statistic',name: 'AttendanceStatistics',component: AttendanceStatistics,meta: {showNav: false}}
  ],
  mode: "history"
})
