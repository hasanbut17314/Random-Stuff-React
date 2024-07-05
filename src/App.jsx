import React from 'react'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import Jokes from './comp/Jokes'
import Quotes from './comp/Quotes'
import Home from './comp/Home'
import Facts from './comp/Facts'
import NotFound from './comp/404'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='' element={<Layout />}>
        <Route path='/' element={<Home />} /> 
        <Route path='/jokes' element={<Jokes />} />
        <Route path='/quotes' element={<Quotes />} />
        <Route path='/facts' element={<Facts />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
