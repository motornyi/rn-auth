import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { queryClient } from './context/queryClientContext'
axios.defaults.baseURL = `https://dummyjson.com`

axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      AsyncStorage.removeItem('token')
      queryClient.setQueryData(['token'], null)
    }
    return Promise.reject(error)
  }
)

export default axios
