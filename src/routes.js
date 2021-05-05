import Home from './pages/Home';
import Page404 from './pages/Page404';
import MoviePage from './pages/MoviePage';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/search/:searchValue',
    exact: true,
    component: Home,
  },
  {
    path: '/film/:id',
    exact: true,
    component: MoviePage,
  },
  {
    path: '*',
    component: Page404,
  },
];

export default routes;
