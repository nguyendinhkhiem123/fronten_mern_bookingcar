import React , { lazy } from 'react';

const SignIn = lazy(()=>import('../SignIn/SignIn'))
const SignUp = lazy(()=>import('../SignUp/SignUp'))
const Home = lazy(()=>import( '../../Component/User/Home/Home'));
const BookStepTwo = lazy(()=>import('../../Component/User/Book/BookStepTwo/BookStepTwo'));
const BookStepOne = lazy(()=>import('../../Component/User/Book/BookStepOne/BookStepOne'));
const BookStepThree= lazy(()=>import('../../Component/User/Book/BookStepThree/BookStepThree'));
const BookStepFour= lazy(()=>import('../../Component/User/Book/BookStepFour/BookStepFour'));
const BookStepSuccess= lazy(()=>import('../../Component/User/Book/Success/Success'));
const Pricing= lazy(()=>import('../../Component/User/Pricing/Pricing'));
const History = lazy(()=>import('../../Component/User/History/History'));
const pageUser = [
    {
        path : '/',
        exact : true,
        component : Home
    },
    {
        path : '/tim-kiem',
        exact : true,
        component : BookStepOne
    },
    {
        path : '/chon-gio',
        exact : true,
        component : BookStepTwo
    },
    {
        path : '/chon-ghe',
        exact : true,
        component : BookStepThree
    },
    {
        path : '/xac-nhan',
        exact : true,
        component : BookStepFour
    },
    {
        path : '/thanh-cong',
        exact : true,
        component : BookStepSuccess
    },
    {
        path : '/lich-su',
        exact : true,
        component : History
    },
    {
        path : '/lich-trinh',
        exact : true,
        component : Pricing
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
    },

]

export default pageUser;