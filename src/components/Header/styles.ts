import { Box, styled, Typography } from '@mui/material'
import type { Theme } from '@mui/material/styles'

export const Wrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
}))

export const Children = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})

export const Title = styled(Typography)(({ theme }: { theme: Theme }) => ({
  textAlign: 'right',
  mr: theme.spacing(2),
}))
