import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: true,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #fff inset',
            WebkitTextFillColor: 'var(--text-primary)',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
      light: '#82b1ff',
      dark: '#1a73e8',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

export default theme
