import React from 'react'
import { Plus } from 'lucide-react'

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from '@mui/material'

type ModalContextProps = {
  id: string
  loading: boolean
  onLoading: (loading: boolean) => void
  open: boolean
  onToggle: () => void
}

const ModalContext = React.createContext({} as ModalContextProps)

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const id = React.useId()

  const handleToggle = React.useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  const handleLoading = React.useCallback((loading: boolean) => {
    setLoading(loading)
  }, [])

  return (
    <ModalContext.Provider
      value={{
        id,
        open,
        onToggle: handleToggle,
        loading,
        onLoading: handleLoading,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = React.useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context
}

const Root = ({ children }: { children: React.ReactNode }) => (
  <ModalProvider>{children}</ModalProvider>
)

const Trigger = ({ children }: { children: React.ReactNode }) => {
  const { open, onToggle } = useModal()

  return (
    <Dialog open={open} onClose={onToggle}>
      {children}
    </Dialog>
  )
}

type ContentProps = {
  title: string
  children: React.ReactNode
}

const Content = ({ title, children }: ContentProps) => (
  <>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
  </>
)

const Actions = () => {
  const { id, onToggle, loading } = useModal()

  return (
    <DialogActions sx={{ px: 3, pb: 3 }}>
      <Button onClick={onToggle} color="info" variant="outlined">
        Cancelar
      </Button>
      <Button
        loading={loading}
        form={id}
        type="submit"
        color="primary"
        variant="contained"
      >
        Salvar
      </Button>
    </DialogActions>
  )
}

const Open = () => {
  const { onToggle } = useModal()

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', mb: 2 }}>
      <Tooltip title="Adicion novo restaurante" placement="left">
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={onToggle}
          sx={{ minWidth: 0, padding: '2px' }}
          style={{ marginLeft: 'auto' }}
        >
          <Plus size={20} />
        </Button>
      </Tooltip>
    </Container>
  )
}

export { Root, Trigger, Open, Content, Actions }
