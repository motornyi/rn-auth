import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { object, string } from 'yup'
import { useMutation } from '@tanstack/react-query'
import { Formik } from 'formik'

import Button from '@/components/button/Button'
import Input from '@/components/input/Input'
import { useAuth } from '@/helpers/context/authContext'

import ErrorIcon from './icons/Error'

import * as S from './Login.styles'

let validationSchema = object({
  username: string().required('Username is required').min(4, 'Username is invalid'),
  password: string().required('Password is required').min(4, 'Password is invalid'),
})

const Home = () => {
  const router = useRouter()
  const { setToken } = useAuth()

  const { mutate: signIn, isError } = useMutation({
    mutationFn: (data: any) => {
      return axios.post('/auth/login', {
        ...data,
        expiresInMins: 1,
      })
    },
    onSuccess: async ({ data }) => {
      await setToken(data.accessToken)
      router.navigate('/(private)/profile')
    },
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <S.Wrapper>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => signIn(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isValid,
            }) => (
              <>
                <Input
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  label="Username"
                  error={touched.username ? errors.username : undefined}
                />

                <Input
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  label="Password"
                  error={touched.password ? errors.password : undefined}
                  secureTextEntry
                />
                {isError && (
                  <S.ErrorWrapper>
                    <ErrorIcon />
                    <S.ErrorText>User email doesn’t exist</S.ErrorText>
                  </S.ErrorWrapper>
                )}
                <Button onPress={handleSubmit} title="Login" disabled={!isValid} />
              </>
            )}
          </Formik>
        </S.Wrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Home
