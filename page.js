const now = new Date();
const seconds = now.getSeconds();
console.log(seconds);
function getHalfYearAgo(date) {
  const d = new Date(date);
  d.setMonth(d.getMonth() - 6);
  return d.toISOString().slice(0, 10);
}

// 示例：获取当前日期的半年前的年月日
const halfYearAgo = getHalfYearAgo(now);
console.log(halfYearAgo);
