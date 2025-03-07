import { useNavigate } from 'react-router'

import * as Menu from '@/components/Header/Base'
import { logout } from '@/services/authService'
import { useAuth } from '@/context/auth'

export const Header = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/sign-in')
  }

  const userName = user?.displayName ?? ''
  const userPhoto = user?.photoURL ?? ''

  return (
    <Menu.Root>
      <Menu.Welcome name={userName} />
      <Menu.Avatar photo={userPhoto} alt={`Foto de ${userName}`} />
      <Menu.Trigger>
        <Menu.Logout onClick={handleLogout} />
      </Menu.Trigger>
    </Menu.Root>
  )
}
