import { Redirect, Stack } from 'expo-router'

import { useTokenQuery } from '@/helpers/context/authContext'

export default function PrivateLayout() {
  const { data: token, isLoading } = useTokenQuery()

  if (isLoading) {
    return null
  }

  if (!token) {
    return <Redirect href="/" />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" />
    </Stack>
  )
}
