const REDIRECT_BASE_URL = import.meta.env.VITE_REDIRECT_URL

const KAKAO_OAUTH = {
  url: 'https://kauth.kakao.com/oauth/authorize',
  client_id: `${import.meta.env.VITE_KAKAO_CLIENT_ID}`,
  redirect_uri: `${REDIRECT_BASE_URL}/login/kakao`,
  response_type: 'code',
}

const NAVER_OAUTH = {
  url: 'https://nid.naver.com/oauth2.0/authorize',
  client_id: `${import.meta.env.VITE_NAVER_CLIENT_ID}`,
  redirect_uri: `${REDIRECT_BASE_URL}/login/naver`,
  response_type: 'code',
}

export { KAKAO_OAUTH, NAVER_OAUTH }
