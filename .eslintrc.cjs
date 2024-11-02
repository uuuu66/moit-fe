module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended',
  ],

  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off', // import React 생략
    'import/no-extraneous-dependencies': 'off', // 테스트 및 개발환경 구성 파일에서는 devDependency 사용 허용
    'import/extensions': 'off', // 절대경로 설정 관련
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelAttributes: ['htmlFor'], // label 태그 관련
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
}
