import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import AboutPage from './views/AboutPage.vue';
import ContactPage from './views/ContactPage.vue';
import FavoriteDestination from './views/FavoriteDestination.vue'; 
import DestinationDetails from './views/DestinationDetails.vue';

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/about', component: AboutPage, name: 'About' },
  { path: '/contact', component: ContactPage, name: 'Contact' },
  { path: '/destination/:id', component: DestinationDetails, name: 'DestinationDetails' },
  { path: '/favorites', component: FavoriteDestination, name: 'Favorites' },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;