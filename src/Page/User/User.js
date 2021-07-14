import React , { lazy } from 'react';
const SignIn = lazy(()=>import('../SignIn/SignIn'))
const SignUp = lazy(()=>import('../SignUp/SignUp'))
const Home = lazy(()=>import( '../../Component/User/Home/Home'));
const BookStepTwo = lazy(()=>import('../../Component/User/Book/BookStepTwo/BookStepTwo'));
const BookStepOne = lazy(()=>import('../../Component/User/Book/BookStepOne/BookStepOne'));
const pageUser = [
    {
        path : '/',
        exact : true,
        component : Home
    },
    {
        path : '/chon-ghe',
        exact : true,
        component : BookStepTwo
    },
    {
        path : '/tim-kiem',
        exact : true,
        component : BookStepOne
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