import { RefreshControl, SafeAreaView, View, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'

import Button from '@/components/button/Button'
import { useAuth } from '@/helpers/context/authContext'

import BackIcon from './icons/Back'

import * as S from './Profile.styles'

const Profile = () => {
  const router = useRouter()

  const { removeToken } = useAuth()
  const { data, refetch, isRefetching } = useQuery({
    queryKey: ['me'],
    queryFn: () => axios.get('/auth/me').then(({ data }) => data),
  })

  const logout = async () => {
    await removeToken()
    router.replace('/')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <S.Wrapper
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        contentContainerStyle={{ flex: 1 }}
      >
        <View>
          <S.Header>
            <TouchableOpacity onPress={() => router.navigate('/')}>
              <S.BackButton>
                <BackIcon />
              </S.BackButton>
            </TouchableOpacity>

            {!!data && (
              <S.HeaderText>
                Hi, {data.firstName} {data.lastName}
              </S.HeaderText>
            )}
          </S.Header>

          <Button onPress={() => logout()} title="Logout" light />
        </View>
      </S.Wrapper>
    </SafeAreaView>
  )
}

export default Profile
