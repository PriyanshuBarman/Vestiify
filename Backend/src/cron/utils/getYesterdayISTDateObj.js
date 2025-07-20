export function getYesterdayISTDateObj() {
  const now = new Date();
  // Convert to IST
  const istOffset = 5.5 * 60 * 60 * 1000; // 5:30 hours
  let nowIST = new Date(now.getTime() + istOffset);

  // Set to yesterday in IST
  nowIST.setDate(nowIST.getDate() - 1);

  const yesterdayISTDateString = nowIST.toISOString().split("T")[0];
  return new Date(yesterdayISTDateString);
}
