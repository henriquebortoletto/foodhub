import { BrowserRouter } from 'react-router'
import { ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'

import { AuthProvider } from '@/context/auth'
import { Router } from '@/Router'

import theme from '@/theme'

export const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <Router />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
)
