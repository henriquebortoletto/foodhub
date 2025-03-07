import { Header } from '@/components/Header'
import { Table } from '@/components/Table'
import { Modal } from '@/components/Modal'

import * as S from './styles'

export const Home = () => (
  <S.Root>
    <Header />
    <Modal />
    <Table />
  </S.Root>
)
