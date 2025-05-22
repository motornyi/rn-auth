import { type PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <Provider client={queryClient}>{children}</Provider>
)
