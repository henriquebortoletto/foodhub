import { TableCell, TableRow, CircularProgress, Box } from '@mui/material'

const Loading = () => (
  <TableRow sx={{ height: 53 * 5 }}>
    <TableCell colSpan={4} align="center">
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    </TableCell>
  </TableRow>
)

const Empty = () => (
  <TableRow sx={{ height: 53 * 5 }}>
    <TableCell colSpan={4} align="center">
      Nenhum restaurante encontrado
    </TableCell>
  </TableRow>
)

export { Loading, Empty }
