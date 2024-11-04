const placeholders = {
  search_placeholder: '모임 이름, 모임 내용, 주소를 검색해 보세요',
}
const groupTypes = {
  recommends: '추천',
  socialing: '소셜링',
  bungae: '번개',
  mogakjak: '모각작',
} as const
const pageTransitionTypes = {
  'fade-right-navigate': 'fade-right-navigate',
  'slide-left-navigate': 'slide-left-navigate',
  'fade-in': 'fade-in',
} as const
const strings = { placeholders, groupTypes, pageTransitionTypes }

export default strings
