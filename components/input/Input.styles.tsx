import styled from 'styled-components/native'
import { boolean } from 'yup'

export const Wrapper = styled.View`
  margin-bottom: 12px;
`

export const InputWrapper = styled.View<{ error: boolean; focused: boolean }>`
  border-color: ${({ error, focused }) => {
    if (error) return '#FF3336'
    if (focused) return '#338BFF'
    return '#d8e2e6'
  }};
  border-width: 1px;
  border-radius: 8px;
  position: relative;
  padding-top: 15px;
`

export const Input = styled.TextInput`
  padding: 10px 45px 10px 15px;
`

export const Label = styled.Text<{
  error: boolean
  focused: boolean
  empty: boolean
}>`
  position: absolute;
  top: 17px;
  left: 15px;

  color: ${({ error, focused }) => {
    if (error) return '#FF3336'
    if (focused) return '#338BFF'
    return '#879399'
  }};
  ${({ focused, empty }) =>
    (focused || !empty) &&
    `
    top: 6px;
    font-size: 12px;
  `}
`

export const Error = styled.Text`
  color: #ff3336;
  font-size: 12px;
`
export const ErrorWrapper = styled.View`
  height: 14px;
  margin-top: 2px;
`

export const ClearButtonWrapper = styled.View`
  position: absolute;
  right: 0;
  top: 17px;
  right: 16px;
`
