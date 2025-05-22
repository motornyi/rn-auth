import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'

export const ButtonShadow = styled.View<{ disabled: boolean; light: boolean }>`
  ${({ disabled, light }) =>
    !disabled &&
    !light &&
    `
    shadow-color: #338bff;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.7;
    shadow-radius: 2px;
    elevation: 4;
  `}
`

export const Button = styled.View<{ disabled: boolean; light: boolean }>`
  height: 40px;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 80px;
  overflow: hidden;

  ${({ disabled }) =>
    disabled &&
    `
     background: #51C7FE32;
  `}

  ${({ light }) =>
    light &&
    `
     background: #fff;
  `}
`

export const Background = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
`

export const Text = styled.Text<{ light: boolean }>`
  color: ${({ light }) => (light ? '#000' : '#fff')};
  font-size: 16px;
  font-weight: 500;
`
