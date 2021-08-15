import React , { lazy } from 'react';

const Route = lazy(()=>import('../../Component/Admin/Route/Route'));
const Car = lazy(()=>import('../../Component/Admin/Car/Car'));
const Trip = lazy(()=>import('../../Component/Admin/Trip/Trip'));
const Ticket = lazy(()=>import('../../Component/Admin/Ticket/Ticket'))
const Tab = lazy(()=>import('../../Component/Admin/Tab/Tab'));
const Employee = lazy(()=>import('../../Component/Admin/Employee/Employee'))
const pageAdmin = [
    {
        path : '/admin/tuyen-duong',
        exact : true,
        component : Route
    },
    {
        path : '/admin/xe',
        exact : true,
        component : Car
    },
    {
        path : '/admin/lich-trinh',
        exact : true,
        component : Trip
    },
    {
        path : '/admin/lich-trinh/:slug',
        exact : true,
        component : Ticket
    },
    {
        path : '/admin/thong-ke',
        exact : true,
        component : Tab
    },
    {
        path : '/admin/nhan-vien',
        exact : true,
        component : Employee
    },
]
export default pageAdmin;