// 초기화 함수 (예: 카운터 값 초기화)
function resetCounter() {
  localStorage.setItem('counterValue', '0');
  // 카운터 화면도 초기화 해주기
  document.getElementById('counter').textContent = '0';
}

// 페이지 로드 시 실행
window.onload = function() {
  const today = new Date();
  const lastReset = localStorage.getItem('lastResetDate');

  if (lastReset) {
    const lastDate = new Date(lastReset);

    // 월이 다르면 (즉, 새 달이면) 초기화
    if (today.getMonth() !== lastDate.getMonth() || today.getFullYear() !== lastDate.getFullYear()) {
      resetCounter();
      localStorage.setItem('lastResetDate', today.toISOString());
    }
  } else {
    // 저장된 날짜가 없으면 오늘 날짜 저장하고 초기화
    resetCounter();
    localStorage.setItem('lastResetDate', today.toISOString());
  }
}
