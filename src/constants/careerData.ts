interface Career {
  careerId: number
  careerName: string
}
const careerData: Career[] = [
  { careerId: 1, careerName: '신입' },
  { careerId: 2, careerName: '주니어(1~3)' },
  { careerId: 3, careerName: '미들(5~8)' },
  { careerId: 4, careerName: '시니어(9~12)' },
  { careerId: 5, careerName: '엑스퍼트(13이상)' },
]
export { careerData, type Career }
