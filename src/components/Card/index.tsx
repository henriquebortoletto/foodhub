import { Container } from '@mui/material'
import * as S from './styles'

export const Card = ({ children }: { children: React.ReactNode }) => (
  <S.Root>
    <Container component="main" maxWidth="xs">
      <S.Wrapper>{children}</S.Wrapper>
    </Container>
  </S.Root>
)
