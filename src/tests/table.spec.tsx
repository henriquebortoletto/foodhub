import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Table } from '@/components/Table'
import { useAuth } from '@/context/auth'
import { onValue } from 'firebase/database'

vi.mock('@/context/auth', () => ({
  useAuth: vi.fn(),
}))

vi.mock('firebase/database', () => {
  return {
    onValue: vi.fn((_, callback) => {
      callback({
        exists: () => false,
        val: () => null,
      })
      return () => {}
    }),
    ref: vi.fn(),
    query: vi.fn(),
    orderByChild: vi.fn(),
    equalTo: vi.fn(),
    getDatabase: vi.fn(),
  }
})

describe('<Table />', () => {
  it('Deve exibir os cabeçalhos da tabela corretamente', async () => {
    ;(useAuth as jest.Mock).mockReturnValue({ user: { uid: 'user-id' } })

    render(<Table />)

    await waitFor(() => {
      expect(screen.getByText(/Nome/i)).toBeInTheDocument()
      expect(screen.getByText(/CNPJ/i)).toBeInTheDocument()
      expect(screen.getByText(/Telefone/i)).toBeInTheDocument()
      expect(screen.getByText(/Email/i)).toBeInTheDocument()
    })
  })

  it('Deve exibir o estado de carregamento enquanto os dados são carregados', async () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      user: {},
      loading: true,
    })

    render(<Table />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('Deve exibir a mensagem de "Nenhum restaurante encontrado" quando não houver dados', async () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      user: { uid: 'user-id' },
      loading: false,
    })

    const mockOnValue = vi.fn((_, callback) => {
      callback({
        exists: () => false,
        val: () => null,
      })
      return () => {}
    })

    vi.mocked(onValue).mockImplementation(mockOnValue)

    render(<Table />)

    await waitFor(() =>
      expect(
        screen.getByText(/Nenhum restaurante encontrado/i)
      ).toBeInTheDocument()
    )
  })

  it('Deve exibir os dados do banco quando houver informações', async () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      user: { uid: 'user-id', loading: false },
    })

    const mockData = [
      {
        id: '1',
        name: 'Restaurante A',
        email: 'contato@restaurantea.com',
        cnpj: '00.000.000/0001-00',
        phone: '(11) 99999-9999',
      },
      {
        id: '2',
        name: 'Restaurante B',
        email: 'contato@restauranteb.com',
        cnpj: '11.111.111/0001-11',
        phone: '(22) 98888-8888',
      },
    ]

    const mockOnValue = vi.fn((_, callback) => {
      callback({
        exists: () => true,
        val: () => mockData,
      })
      return () => {}
    })

    vi.mocked(onValue).mockImplementation(mockOnValue)

    render(<Table />)

    await waitFor(() => {
      expect(screen.getByText('Restaurante A')).toBeInTheDocument()
      expect(screen.getByText('00.000.000/0001-00')).toBeInTheDocument()
      expect(screen.getByText('(11) 99999-9999')).toBeInTheDocument()
      expect(screen.getByText('contato@restaurantea.com')).toBeInTheDocument()

      expect(screen.getByText('Restaurante B')).toBeInTheDocument()
      expect(screen.getByText('11.111.111/0001-11')).toBeInTheDocument()
      expect(screen.getByText('(22) 98888-8888')).toBeInTheDocument()
      expect(screen.getByText('contato@restauranteb.com')).toBeInTheDocument()
    })
  })
})
