import { use, createContext, type PropsWithChildren } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

export const useTokenQuery = () => {
  return useQuery({
    queryKey: ['token'],
    queryFn: () => AsyncStorage.getItem('token'),
    staleTime: 0,
  })
}

const AuthContext = createContext<{
  setToken: (val: string) => void
  removeToken: () => void
  token?: string | null
  isAuthorized: boolean
  isLoading: boolean
}>({
  setToken: () => null,
  removeToken: () => null,
  token: null,
  isAuthorized: false,
  isLoading: false,
})

// This hook can be used to access the user info.
export function useAuth() {
  const value = use(AuthContext)
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />')
  }

  return value
}

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient()
  const { data: token, isLoading } = useTokenQuery()

  return (
    <AuthContext
      value={{
        async setToken(val) {
          await AsyncStorage.setItem('token', val)
          queryClient.setQueryData(['token'], val)
        },
        async removeToken() {
          await AsyncStorage.removeItem('token')
          queryClient.setQueryData(['token'], null)
        },
        token,
        isLoading,
        isAuthorized: !!token,
      }}
    >
      {children}
    </AuthContext>
  )
}
