import React from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChefHat } from 'lucide-react'
import * as z from 'zod'

import { TextField, Typography } from '@mui/material'
import { loginWithEmail, loginWithGoogle } from '@/services/authService'

import { Card } from '@/components/Card'

import * as S from './styles'

const createUserSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type FormData = z.infer<typeof createUserSchema>

export const Login = () => {
  const [loading, setLoading] = React.useState(false)

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      console.error('Erro ao autenticar com Google:', error)
    }
  }

  const onSubmit = async ({ email, password }: FormData) => {
    setLoading(true)

    try {
      await loginWithEmail({ email, password })
      navigate('/')
    } catch (error) {
      console.error('Erro ao autenticar:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <S.Brand variant="h5">
        <ChefHat strokeWidth={2} size={40} />
        FoodHub
      </S.Brand>
      <S.Form as="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="E-mail"
          variant="outlined"
          size="small"
          fullWidth
          margin="none"
          {...register('email')}
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!formState.errors.password}
          helperText={formState.errors.password?.message}
        />
        <S.Login
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Entrar
        </S.Login>
      </S.Form>
      <S.Divider />
      <S.Google
        onClick={handleGoogleLogin}
        fullWidth
        variant="outlined"
        color="primary"
      >
        <img src="/google.svg" alt="Google" width={20} height={20} />
        Entrar com Google
      </S.Google>
      <Typography variant="body2" color="textSecondary">
        Não tem uma conta? <S.Register to="/register">Cadastre-se</S.Register>
      </Typography>
    </Card>
  )
}
