import React , { lazy } from 'react';
const SignIn = lazy(()=>import('../SignIn/SignIn'))
const SignUp = lazy(()=>import('../SignUp/SignUp'))
const Home = lazy(()=>import( '../../Component/User/Home/Home'));
const BookStepTwo = lazy(()=>import('../../Component/User/Book/BookStepTwo/BookStepTwo'));
const pageUser = [
    {
        path : '/',
        exact : true,
        component : Home
    },
    {
        path : '/ve-xe',
        exact : true,
        component : BookStepTwo
    },
    
    {
        path : '/signin',
        exact : true,
        component : SignIn
    },
    {
        path : '/signup',
        exact : true,
        component : SignUp
    }
]

export default pageUser;