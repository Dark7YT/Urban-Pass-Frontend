import {createRouter, createWebHistory} from "vue-router";
import AboutComponent from "../public/pages/about.component.vue";
import HomeComponent from "../public/pages/home.component.vue";
import EventListComponent from "../sections/eventManagement/pages/event-list.component.vue";
import PageNotFoundComponent from "../public/pages/page-not-found.component.vue";
import SignUpComponent from "../sections/authentication/pages/sign-up.component.vue";
import SignInComponent from "../sections/authentication/pages/sign-in.component.vue";
import EventDetailComponent from "../sections/eventManagement/pages/event-detail.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', component: HomeComponent, meta: { title: 'Home' }, },
        { path: '/about', component: AboutComponent, meta: { title: 'About Us' }, },
        { path: '/eventManagement/event', component: EventListComponent, meta: { title: 'Events' }, },
        { path: '/eventManagement/event/:id', component: EventDetailComponent, meta: { title: 'Event' },props: true },
        { path: '/sign-up', component: SignUpComponent, meta: { title: 'Sign Up' }},
        { path: '/sign-in', component: SignInComponent, meta: { title: 'Sign In' }},
        { path: '/:pathMatch(.*)*', component: PageNotFoundComponent },
        { path: '/', redirect: '/home' }
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'Urban Pass';
    document.title = `${ baseTitle } | ${to.meta["title"]}`;
    next();
});
export default router;