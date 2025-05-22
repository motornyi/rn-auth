import { Button as RnButton, TouchableOpacity } from 'react-native'

export type Props = RnButton['props'] & { white: boolean }

import * as S from './Button.styles'

const Button = ({ title, onPress, disabled, light }: any) => {
  const content = (
    <S.ButtonShadow disabled={disabled} light={light}>
      <S.Button disabled={disabled} light={light}>
        {!disabled && !light && (
          <S.Background
            colors={['#338BFF', '#51C7FE']}
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 1.0, y: 0.5 }}
          />
        )}
        <S.Text light={light}>{title}</S.Text>
      </S.Button>
    </S.ButtonShadow>
  )

  if (disabled) return content

  return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
}

export default Button
