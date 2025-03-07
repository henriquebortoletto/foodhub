import React from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChefHat } from 'lucide-react'
import { FirebaseError } from 'firebase/app'
import * as z from 'zod'

import { TextField, Typography } from '@mui/material'
import { Card } from '@/components/Card'
import { createUser } from '@/services/authService'
import { transformTranslate } from '@/lib/translate'

import * as S from './styles'

const createUserschema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type FormData = z.infer<typeof createUserschema>

export const Register = () => {
  const [loading, setLoading] = React.useState(false)

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(createUserschema),
    defaultValues: { email: '', password: '', name: '' },
  })

  const navigate = useNavigate()

  const onSubmit = async ({ name, email, password }: FormData) => {
    setLoading(true)

    try {
      await createUser({ name, email, password })
      navigate('/')
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Erro de autenticação:', error.code)
        alert(transformTranslate(error.code))
      } else {
        console.error('Erro desconhecido:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <S.Brand variant="h5">
        <ChefHat strokeWidth={2} size={40} />
        Criar Conta
      </S.Brand>
      <S.Form as="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Nome"
          variant="outlined"
          size="small"
          fullWidth
          margin="none"
          {...register('name')}
          error={!!formState.errors.name}
          helperText={formState.errors.name?.message}
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="E-mail"
          variant="outlined"
          size="small"
          fullWidth
          margin="none"
          {...register('email')}
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          margin="none"
          {...register('password')}
          error={!!formState.errors.password}
          helperText={formState.errors.password?.message}
          style={{ marginBottom: 16 }}
        />
        <S.Account
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Criar Conta
        </S.Account>
      </S.Form>
      <S.Divider />
      <Typography variant="body2" color="textSecondary">
        Já tem uma conta? <S.Login to="/sign-in">Faça login</S.Login>
      </Typography>
    </Card>
  )
}
