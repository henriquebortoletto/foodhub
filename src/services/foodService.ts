import { ref, set, push } from 'firebase/database'
import { database } from '@/lib/firebase'

export const create = async ({
  name,
  email,
  cnpj,
  phone,
  userId,
}: {
  name: string
  email: string
  cnpj: string
  phone: string
  userId: string
}): Promise<void> => {
  const restaurantRef = ref(database, 'restaurants')
  const newRestaurantRef = push(restaurantRef)
  await set(newRestaurantRef, {
    name,
    email,
    cnpj,
    phone,
    user_id: userId,
  })
}
