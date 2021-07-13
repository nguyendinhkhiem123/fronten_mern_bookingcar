import React , { lazy } from 'react';

const Home = lazy(()=>import('../../Component/Admin/Home/Home'));
const pageAdmin = [
    {
        path : '/admin',
        exact : true,
        component : Home
    }
]
export default pageAdmin;