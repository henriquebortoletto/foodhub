import React from 'react'
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database'

import {
  Container,
  Paper,
  Table as TableMui,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { Loading, Empty } from '@/components/Table/Base'
import { database } from '@/lib/firebase'
import { useAuth } from '@/context/auth'

type Food = {
  name: string
  email: string
  cnpj: string
  phone: string
  user_id: string
}

export interface Foods {
  [key: string]: Food
}

function transformToArray(data: Foods) {
  if (!data) return []
  return Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }))
}

export const Table = () => {
  const { user } = useAuth()

  const [foods, setFoods] = React.useState<Food[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user || !user.uid) return

    const foodRef = query(
      ref(database, 'restaurants'),
      orderByChild('user_id'),
      equalTo(user!.uid)
    )

    const unsubscribe = onValue(foodRef, (snapshot) => {
      setLoading(true)

      if (!snapshot.exists()) {
        setFoods([])
        setLoading(false)
        return
      }

      const data = snapshot.val()
      const foods: Food[] = transformToArray(data)

      setFoods(foods)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  const isLoading = loading
  const isEmpty = !isLoading && foods.length === 0
  const isNotEmpty = !isLoading && foods.length > 0

  return (
    <Container>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <TableMui sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">CNPJ</TableCell>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <Loading />}
            {isEmpty && <Empty />}
            {isNotEmpty &&
              foods.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.cnpj}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TableMui>
      </TableContainer>
    </Container>
  )
}
