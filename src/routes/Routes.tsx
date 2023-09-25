import React from 'react'
import { useRoutes } from 'react-router-dom'
import Layout from 'layout/Layout'

//pages
import Home from 'pages/Home'
import Images from 'pages/Images'
import Projects from 'pages/Projects'
import Assets from 'pages/Assets'

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { element: <Home />, index: true },
        { element: <Images />, path: 'images' },
        { element: <Projects />, path: 'projects' },
        { element: <Assets />, path: 'assets' }
      ]
    }
  ])

  return routes
}
