import React from 'react'

import { Menu, MenuItem, Avatar as AvatarMui, IconButton } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

import * as S from './styles'

type MenuProps = {
  anchorEl: HTMLElement | null
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void
  onMenuClose: () => void
}

const MenuContext = React.createContext({} as MenuProps)

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const onMenuClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    },
    []
  )

  const onMenuClose = React.useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <MenuContext.Provider value={{ anchorEl, onMenuClick, onMenuClose }}>
      {children}
    </MenuContext.Provider>
  )
}

const useMenu = () => {
  const context = React.useContext(MenuContext)

  if (context === undefined) {
    throw new Error('useMenu deve ser usado dentro de um MenuProvider')
  }

  return context
}

const Root = ({ children }: { children: React.ReactNode }) => (
  <MenuProvider>
    <S.Wrapper>
      <S.Children>{children}</S.Children>
    </S.Wrapper>
  </MenuProvider>
)

const Welcome = ({ name }: { name: string }) => (
  <S.Title variant="body1">
    Bem-vindo <br /> {name}
  </S.Title>
)

const Avatar = ({
  photo,
  alt,
}: {
  photo: string
  alt: string
}) => {
  const { onMenuClick } = useMenu()

  return (
    <IconButton onClick={onMenuClick}>
      <AvatarMui src={photo} alt={alt} />
    </IconButton>
  )
}

const Trigger = ({ children }: { children: React.ReactNode }) => {
  const { anchorEl, onMenuClose } = useMenu()

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onMenuClose}>
      {children}
    </Menu>
  )
}

const Logout = ({ onClick }: { onClick: () => void }) => (
  <MenuItem onClick={onClick}>
    <AccountCircle sx={{ mr: 2 }} /> Logout
  </MenuItem>
)

export { Root, Welcome, Avatar, Trigger, Logout }
