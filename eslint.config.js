const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  // 1. 추천 설정을 직접 배열에 넣습니다. (extends 대신 이 방법을 사용)
  js.configs.recommended,

  // 2. 프로젝트 설정
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // 브라우저 전역 변수 (console 등)
        ...globals.node, // Node.js 환경도 쓴다면 추가
      },
    },
    rules: {
      // 여기에 필요한 규칙을 추가/수정하세요.
      'no-unused-vars': 'warn',
    },
  },
]
