import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, TextField } from '@mui/material'
import { z } from 'zod'

import { Mask } from '@/components/Mask'
import { useModal } from '@/components/Modal/Base'
import { create } from '@/services/foodService'
import { useAuth } from '@/context/auth'

const createFoodSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  cnpj: z.string().min(18, { message: 'CNPJ inválido' }),
  phone: z.string().min(15, { message: 'Telefone inválido' }),
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
})

type FormData = z.infer<typeof createFoodSchema>

export const FormDialog = () => {
  const { id, onLoading, onToggle } = useModal()
  const { user } = useAuth()

  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(createFoodSchema),
    defaultValues: {
      name: '',
      email: '',
      cnpj: '',
      phone: '',
    },
  })

  const onSubmit = async ({ name, email, cnpj, phone }: FormData) => {
    try {
      onLoading(true)

      const userId = user!.uid
      await create({ name, email, cnpj, phone, userId })

      onLoading(false)
      onToggle()
    } catch (error) {
      console.error('Erro ao cadastrar restaurante:', error)
    }
  }

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Nome do restaurante"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        {...control.register('name')}
        error={!!formState.errors.name}
        helperText={formState.errors.name?.message}
      />
      <TextField
        label="E-mail"
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
        {...control.register('email')}
        error={!!formState.errors.email}
        helperText={formState.errors.email?.message}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Controller
          name="cnpj"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="CNPJ"
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              error={!!formState.errors.cnpj}
              helperText={formState.errors.cnpj?.message}
              InputProps={{ inputComponent: Mask }}
              inputProps={{ mask: '00.000.000/0000-00' }}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Telefone"
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              error={!!formState.errors.phone}
              helperText={formState.errors.phone?.message}
              InputProps={{ inputComponent: Mask }}
              inputProps={{ mask: '(00) 00000-0000' }}
            />
          )}
        />
      </Box>
    </form>
  )
}
