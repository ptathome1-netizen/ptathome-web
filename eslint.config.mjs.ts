/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    // eslint가 보고하지 않아도 되는 파일들
    ignores: ["**/*.config.*"],
  },
  {
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      // any 허용 (배포를 위해 규칙 완화)
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
