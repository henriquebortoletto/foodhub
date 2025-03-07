import {
  Box,
  Button,
  Divider as DividerMui,
  styled,
  type Theme,
  Typography,
} from '@mui/material'

import { Link } from 'react-router'

export const Brand = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(2),
}))

export const Form = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
}))

export const Account = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  fontWeight: theme.typography.fontWeightBold,
  marginTop: theme.spacing(1),
  boxShadow: theme.shadows[0],

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[0],
  },
}))

export const Divider = styled(DividerMui)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
}))

export const Login = styled(Link)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'underline',
  },
}))
