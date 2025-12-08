// src/data/revies.ts

export type Review = {
  id: number;
  name: string;
  title: string;
  content: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    name: "박OO (40대 / 포레온)",
    title: "허리 통증이 정말 많이 줄었어요",
    content:
      "헬스장 가기 싫어서 방문 PT 선택했는데, 코어 위주로 꾸준히 하다 보니 아침마다 쑤시던 허리가 지금은 거짓말처럼 편해졌어요. 집에서 하니까 빠지지도 못하고 너무 좋아요."
  },
  {
    id: 2,
    name: "김OO (30대 / 워킹맘)",
    title: "아이 재우고 집에서 편하게 운동 중",
    content:
      "퇴근하고 헬스장 갈 힘이 1도 없었는데, 트레이너님이 집으로 와주시니까 진짜 삶의 질이 달라졌어요. 체력도 올라가고 몸매도 조금씩 변하고 있어요."
  },
  {
    id: 3,
    name: "이OO (50대 / 부부 PT)",
    title: "부부가 같이 하니까 더 재밌습니다",
    content:
      "무릎이 안 좋아서 걱정했는데, 관절에 부담 덜 가는 동작들로 잘 맞춰 주셔서 부담 없이 하고 있어요. 남편이랑 같이 받으니까 서로 자극도 되고요."
  }
];

export default reviews;
