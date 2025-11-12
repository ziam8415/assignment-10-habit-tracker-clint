const getDailyStreak = (completionHistory) => {
  if (!completionHistory || completionHistory.length === 0) return 0;

  const sorted = completionHistory
    .map((dateStr) => new Date(dateStr.split("-").reverse().join("-")))
    .sort((a, b) => b - a);

  let streak = 1;

  for (let i = 0; i < sorted.length - 1; i++) {
    const diffInTime = sorted[i] - sorted[i + 1];
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      streak++;
    } else if (diffInDays > 1) {
      break;
    }
  }

  return streak;
};
export default getDailyStreak;
