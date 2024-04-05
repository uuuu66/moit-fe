/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string
  readonly VITE_REDIRECT_URL: string
  readonly VITE_KAKAO_CLIENT_ID: string
  readonly VITE_NAVER_CLIENT_ID: string
  readonly VITE_KAKAO_MAP_API_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
