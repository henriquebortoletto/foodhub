import { Route, Routes } from 'react-router'

import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { NotFound } from '@/pages/NotFound'

import { RoutePrivate } from '@/routes/private.routes'
import { RoutePublic } from '@/routes/public.routes'

export const Router = () => (
  <Routes>
    <Route element={<RoutePublic />}>
      <Route path="/sign-in" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
    <Route element={<RoutePrivate />}>
      <Route path="/" element={<Home />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)
