import { type ThemeType } from '@/constants/theme'
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
