import DashBoard from './pages/DashbBoard.vue';
import ForgotPassword from './pages/ForgotPassword.vue';
import LoginPage from './pages/Login.vue';
import ResetPassword from './pages/ResetPassword.vue';
import SignUp from './pages/SignUp.vue';
import UserIndex from './pages/User.vue';

function guardMyroute(to, from, next)
{
    var isAuthenticated= false;
    if(localStorage.getItem('access-token')){
        isAuthenticated = true;
    }else{
        isAuthenticated= false;
    }
    if(isAuthenticated){
        next(); // allow to enter route
    }
    else{
        next('/login'); // go to '/login';
    }
}

export const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp,
    },
    {
        name: 'dashboard',
        path: '/',
        beforeEnter : guardMyroute,
        component: DashBoard
    },
    {
        name: 'users',
        path: '/users',
        beforeEnter : guardMyroute,
        component: UserIndex
    },
    {
        name: 'forgotPassword',
        path: '/forgot-password',
        component: ForgotPassword
    },
    {
        name: 'resetPassword',
        path: '/reset-password',
        component: ResetPassword
    },
];
