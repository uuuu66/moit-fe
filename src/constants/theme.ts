export const theme = {
  color: {
    primary100: '#667AE4',
    primary90: '#7587E6',
    primary80: '#8393E7',
    primary70: '#919FE9',
    primary60: '#9FABEB',
    primary50: '#ADB7EC',
    primary40: '#BCC4EE',
    primary30: '#CBD1F0',
    primary20: '#D8DCF2',
    primary10: '#E9EAF4',
    black100: '#000000',
    black90: '#191919',
    black80: '#313131',
    black70: '#4A4A4A',
    black60: '#626262',
    black50: '#7A7A7A',
    black40: '#939393',
    black30: '#ACACAC',
    black20: '#DDDDDD',
    black10: '#f3f3f3',
    white: '#FFFFFF',
    yellow: '#F7E600',
    green: '#57B04B',
    pg1: '#F3F4FC', // 수정필요
  },
  fontSize: {
    large: '2.4rem',
    larger: '2.0rem',
    larger2: '1.8rem',
    medium: '1.6rem',
    small: '1.4rem',
  },
  fontWeight: {
    bold: 700,
    normal: 600,
    light: 500,
  },
}

export type ThemeType = typeof theme
