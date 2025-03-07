import * as S from './styles'

export const NotFound = () => (
  <S.Root>
    <S.Image src="/not-found.svg" alt="Not Found" />
    <S.Title variant="h5">Página não encontrada</S.Title>
    <S.GoBack to="/">Voltar para a Home</S.GoBack>
  </S.Root>
)
