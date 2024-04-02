import { useNavigate } from 'react-router-dom'
import { NavBtn, TabBarContainer } from './styles'

function TabBar(): JSX.Element {
  const navi = useNavigate()
  return (
    <TabBarContainer>
      <NavBtn
        type="button"
        onClick={() => {
          navi('/')
        }}
      >
        {/* TODO : 추후 각 아이콘 생성 시 div => 아이콘으로 변경 */}
        <div />
        <span>홈</span>
      </NavBtn>
      {/* TODO : 추후 생성페이지 생성시 navi 추가 */}
      <NavBtn type="button">
        <div />
        <span>생성</span>
      </NavBtn>
      {/* TODO : 추후 마이페이지 생성시 navi 추가 */}
      <NavBtn type="button">
        <div />
        <span>마이페이지</span>
      </NavBtn>
    </TabBarContainer>
  )
}

export default TabBar
