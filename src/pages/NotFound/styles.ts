import { Box, styled, Typography } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import { Link } from 'react-router'

export const Root = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'background.default',
})

export const Title = styled(Typography)({
  marginBottom: '1rem',
})

export const Image = styled('img')({
  maxWidth: '25rem',
  marginBottom: '1rem',
})

export const GoBack = styled(Link)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'underline',
  },
}))
