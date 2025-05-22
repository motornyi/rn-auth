import { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'

import ClearIcon from './icons/Clear'

import * as S from './Input.styles'

export type Props = TextInput['props'] & {
  label: string
  error?: string
}

const Input = ({
  label,
  value,
  onChangeText,
  error,
  onFocus,
  onBlur,
  ...props
}: Props) => {
  const [focused, setFocused] = useState(false)
  return (
    <S.Wrapper>
      <S.InputWrapper error={!!error} focused={focused}>
        <S.Label error={!!error} focused={focused} empty={!value?.length}>
          {label}
        </S.Label>
        <S.Input
          value={value}
          onChangeText={onChangeText}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          {...props}
        />

        {value && focused && (
          <S.ClearButtonWrapper>
            <TouchableOpacity onPress={() => onChangeText?.('')}>
              <ClearIcon />
            </TouchableOpacity>
          </S.ClearButtonWrapper>
        )}
      </S.InputWrapper>
      <S.ErrorWrapper>{error && <S.Error>{error}</S.Error>}</S.ErrorWrapper>
    </S.Wrapper>
  )
}

export default Input
