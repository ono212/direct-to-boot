export function getMessage(status: string) {
  switch (status) {
    case "initialized":
      return "아직 주문 내역을 준비 중이에요!";
    case "ready":
      return "가게에 도착하셨다면 버튼을 눌러주세요! 주문하신 물건을 저희 직원이 가져다 드리겠습니다!";
    case "error":
      return "문제가 생겼습니다. 이 번호로 전화를 걸어주세요.";
  }
}
