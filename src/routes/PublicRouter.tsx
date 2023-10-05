import React from 'react'
import { useRoutes } from 'react-router-dom'
import generalRoutes from './generalRoutes'
import AuthLayout from 'layout/AuthLayout'
import Login from 'pages/Login'
import NotFound from 'pages/NotFound'

export default function PublicRouter() {
  const routes = useRoutes([
    {
      path: '/',
      element: <AuthLayout />,
      children: [{ element: <Login />, index: true }, { path: 'login', element: <Login /> }, ...generalRoutes, { path: '*', element: <NotFound /> }]
    }
  ])

  return routes
}
