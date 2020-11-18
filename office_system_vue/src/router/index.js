import Vue from 'vue'
import Router from 'vue-router'
import Message from "../components/Message";
import Login from "../components/Login";
import Registration from "../components/Registration";
import PersonalInfo from "../components/PersonalInfo";
import Approval from "../components/Approval";
import CloudFile from "../components/CloudFile";
import Report from "../components/Report";

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Login', component: Login, meta: {showNav: false}},
    { path: '/message', name: 'Message', component: Message, meta: {showNav: true}},
    { path: '/register', name: 'Registration', component: Registration, meta: {showNav: false}},
    { path: '/person', name: 'PersonalInfo', component: PersonalInfo, meta: {showNav: true}},
    { path: '/approval', name: 'Approval', component: Approval, meta: {showNav: true}},
    { path: '/cloudfile', name: 'CloudFile', component: CloudFile, meta: {showNav: true}},
    { path: '/report', name: 'Report', component: Report, meta: {showNav: true}},
  ],
  mode: "history"
})
