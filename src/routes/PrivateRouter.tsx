import React from 'react'
import { useRoutes } from 'react-router-dom'
import Layout from 'layout/Layout'
import generalRoutes from './generalRoutes'

//pages
import Home from 'pages/home/Home'
import Images from 'pages/Images'
import Projects from 'pages/Projects'
import Assets from 'pages/Assets'
import NotFound from 'pages/NotFound'

export default function PrivateRouter() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        ...generalRoutes,
        { element: <Home />, index: true },
        { element: <Images />, path: 'images' },
        { element: <Projects />, path: 'projects' },
        { element: <Assets />, path: 'assets' },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  return routes
}
