![모잇_브로셔이미지](https://github.com/moit03/moit-fe/assets/124010808/165a641e-0a0e-44d8-87d9-e21b31232c3f)
![최고 인기 프로젝트상](https://sable-archer-b55.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F7f569f52-5779-4051-b82c-bcd90fcfb7a1%2Fc125a262-3e06-415d-b7ff-97899a404a4b%2F%25E1%2584%258E%25E1%2585%25AC%25E1%2584%2580%25E1%2585%25A9_%25E1%2584%258B%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2580%25E1%2585%25B5%25E1%2584%2589%25E1%2585%25A1%25E1%2586%25BC_MOIT.png?table=block&id=c2d7a166-4da0-4f48-adc5-735f37a4e708&spaceId=7f569f52-5779-4051-b82c-bcd90fcfb7a1&width=1920&userId=&cache=v2)

# MOIT 설명

평생 공부하는! 혼자 공부하다가 지친! 공부하는 방법 자체가 역량인!

💙 개발자들을 위한스터디, 모각코 등 모임을 게시하고 참여할 수 있는 커뮤니티 [<모잇> 바로가기 →](https://moit.me/)

📆 개발 기간: 2024.03.26 ~ 2024.05.07 (총 6주)

🔀 트러블 슈팅: [링크](https://sable-archer-b55.notion.site/MOIT-FE-1898feaf67e340d98b5e619b7c8ae954?pvs=4)

🔗 MOIT 브로셔: [링크](https://sumptuous-aragon-de9.notion.site/MOIT-b20d01a1bc67427bbd8a9f6c74cb98d4)

## 👥 팀원 역할

| 역할  | 이름                                 | 분담                                                                                                          |
| ----- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| FE 👑 | [강성지](https://github.com/vjiji)   | 소셜로그인 (카카오, 네이버), 메인페이지 (전체 조회, 필터별로 조회), 검색페이지, 마이페이지, 배포(Cloud Front) |
| FE    | [이예진](https://github.com/yeeendy) | 모임 등록페이지, 모임 상세페이지, 모임 수정/삭제/참여/탈퇴, 채팅, 안내 모달창, 토스트 알림                    |

<br />

# 🏗️ 서비스 아키텍처

![image](https://github.com/moit03/moit-fe/assets/124010808/2c928dab-21a9-4517-ae88-b466d824781c)

# 🛠️ 기술 스택

<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/-styled components-DB7093?style=for-the-badge&logo=styled components&logoColor=white"/> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/>

# ✨ 기능 소개

### 🌱 회원가입 / 로그인

- 소셜로그인 (kakao, naver)
  ![Untitled](https://github.com/moit03/moit-fe/assets/124010808/6d9046c6-889c-4eb0-a655-c61bcda4ebef)

### 🌱 모임 조회하기 (메인페이지)

- 위치 기반으로 모집 중인 모임을 조회할 수 있습니다.
- 지역, 경력, 기술스택 필터별로 조회가 가능합니다.
- 선택 지역에서 반경 5km 이내 모임을 조회할 수 있습니다.
  ![메인페이지 조회](https://github.com/moit03/moit-fe/assets/124010808/b293c019-49f7-4cd1-9c97-114d99e67787)

![image](https://github.com/moit03/moit-fe/assets/124010808/e54cf6d2-7fd2-4ab3-866d-2b67dd8ca02a)

### 🌱 검색

- 제목, 내용, 위치로 검색 가능합니다.
- 인기 모임 TOP5 조회 가능합니다.
- 최근검색어 확인이 가능합니다. (최대 10개)
  ![검색페이지](https://github.com/moit03/moit-fe/assets/124010808/e35167a1-d60f-4592-b64e-ba8a8d7ccb6f)

### 🌱 상세페이지

- 지도로 모임 장소를 확인할 수 있습니다.
- 원하는 모임에 참여버튼을 통해 참여할 수 있습니다.
- 버튼을 통해 참여 중인지, 마감되었는 지 확인할 수 있습니다.
- 내가 개최한 모임일 때는 수정, 삭제 버튼이 보입니다.
  ![상세페이지](https://github.com/moit03/moit-fe/assets/124010808/dd680470-2481-45c9-a353-4a2efd673343)

### 🌱 모임 CRUD

- 제목, 내용, 날짜, 시간, 장소, 인원, 기술, 경력을 선택할 수 있습니다.
- 빈칸을 다 채우면 생성하기 버튼이 활성화 됩니다.
- 날짜, 시간 제외 수정이 가능합니다.
- 모임 상세페이지에서 ‘**수정**’ 버튼을 눌러 수정할 수 있습니다.
- 수정, 삭제는 본인 게시글만 할 수 있습니다.
  ![모임생성](https://github.com/moit03/moit-fe/assets/124010808/bd9ed309-4ca6-4a09-b179-5706d47162ee)
  ![모임 수정, 삭제](https://github.com/moit03/moit-fe/assets/124010808/61fa0b76-e64d-4734-a0ea-5f8db0355b82)

### 🌱 채팅

- 모임에 참여한 사람들끼리 그룹채팅이 가능합니다.
  ![채팅](https://github.com/moit03/moit-fe/assets/124010808/c8eb09a1-3e91-4130-87d9-a7541b982d66)

### 🌱 북마크

- 리스트, 개인카드, 상세페이지에서 원하는 모임을 북마크할 수 있습니다.
- 북마크 목록은 마이페이지에서 조회 가능합니다.
  ![image](https://github.com/moit03/moit-fe/assets/124010808/ec9f38aa-0c03-4d62-9f04-0d454bf0270b)

### 🌱 마이페이지

- 참여한 모임 / 스터디 시간 / 내가 개최한 모임 개수 확인 가능합니다.
- 참여 중 / 참여 완료 / 내가 개최한 모임 조회 가능합니다.
- 북마크 리스트
- 로그아웃 / 회원탈퇴
  ![마이페이지](https://github.com/moit03/moit-fe/assets/124010808/489aa8ff-4b08-47da-8688-b48d2dd5bb55)
