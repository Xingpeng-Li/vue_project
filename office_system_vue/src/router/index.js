import Vue from 'vue'
import Router from 'vue-router'
import Message from "../components/Message";
import Login from "../components/Login";
import Registration from "../components/Registration";
import PersonalInfo from "../components/PersonalInfo";

import AttendanceStatistics from "../components/AttendanceStatistics";
import Approval from "../components/Approval";
import AddressBook  from "../components/AddressBook";
import CloudFile from "../components/CloudFile";
import Report from "../components/Report";
import Home from "../components/Home";
import Mail from "../components/Mail";
import Announcement from "../components/Announcement";
import HealthPunchin from "../components/HealthPunchin";
import WriteAnnouncement from "../components/WriteAnnouncement";
import LoginToMail from "../components/LoginToMail";
import PublicAccount from "../components/PublicAccount";
import AccountDetail from "../components/AccountDetail";

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Login', component: Login, meta: {showNav: false}},
    { path: '/register', name: 'Registration', component: Registration, meta: {showNav: false}},
    { path: '/home', name: 'Home', component: Home, meta: {showNav: true}},
    { path: '/message', name: 'Message', component: Message, meta: {showNav: true}},
    { path: '/person', name: 'PersonalInfo', component: PersonalInfo, meta: {showNav: true}},
    { path: '/statistic',name: 'AttendanceStatistics',component: AttendanceStatistics,meta: {showNav: true}},
    { path: '/mail', name: 'Mail', component: Mail, meta: {showNav: true}},
    { path: '/approval', name: 'Approval', component: Approval, meta: {showNav: true}},
    { path: '/cloudfile', name: 'CloudFile', component: CloudFile, meta: {showNav: true}},
    { path: '/report', name: 'Report', component: Report, meta: {showNav: true}},
    { path: '/addressBook',name:'AddressBook',component:AddressBook,meta:{showNav: true}},
    { path: '/announcement',name:'Announcement',component:Announcement,meta:{showNav: true}},
    { path: '/healthPunchin',name:'HealthPunchin',component:HealthPunchin,meta:{showNav: true}},
    { path: '/writeAnnouncement',name:'WriteAnnouncement',component:WriteAnnouncement,meta:{showNav: true}},
    { path: '/loginToMail',name:'LoginToMail',component:LoginToMail,meta:{showNav: true}},
    { path: '/publicAccount',name:'PublicAccount',component:PublicAccount,meta:{showNav: true}},
    { path: '/accountDetail',name:'AccountDetail',component:AccountDetail,meta:{showNav: true}},
  ],
  mode: "history"
})
