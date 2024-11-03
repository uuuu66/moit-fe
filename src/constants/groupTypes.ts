import type strings from './strings'
import { theme } from './theme'

export interface GroupType {
  groupName: (typeof strings.groupTypes)[keyof typeof strings.groupTypes]
  groupKey: keyof typeof strings.groupTypes
  groupColor: (typeof theme.color)[keyof typeof theme.color]
  groupBgColor: (typeof theme.color)[keyof typeof theme.color]
}
const groupTypes: { [key in keyof typeof strings.groupTypes]: GroupType } = {
  recommends: {
    groupName: '추천',
    groupKey: 'recommends',
    groupColor: theme.color.white,
    groupBgColor: theme.color.purple3,
  },
  socialing: {
    groupName: '소셜링',
    groupKey: 'socialing',
    groupColor: theme.color.white,
    groupBgColor: theme.color.bg4,
  },
  bungae: {
    groupName: '번개',
    groupKey: 'bungae',
    groupColor: theme.color.white,
    groupBgColor: theme.color.bg4,
  },
  mogakjak: {
    groupName: '모각작',
    groupKey: 'mogakjak',
    groupColor: theme.color.white,
    groupBgColor: theme.color.bg4,
  },
}

export default groupTypes
