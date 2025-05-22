import { SafeAreaView, View, RefreshControl } from 'react-native'
import Button from '@/components/button/Button'
import { useRouter } from 'expo-router'
import { useAuth } from '@/helpers/context/authContext'

import * as S from './Home.styles'

const Home = () => {
  const router = useRouter()
  const { isAuthorized } = useAuth()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <S.Wrapper>
        <View>
          {!isAuthorized && (
            <Button
              onPress={() => router.replace('/(auth)/login')}
              title="Go to login"
            />
          )}
          {isAuthorized && (
            <Button
              onPress={() => router.replace('/(private)/profile')}
              title="Go to profile"
            />
          )}
        </View>
      </S.Wrapper>
    </SafeAreaView>
  )
}

export default Home
