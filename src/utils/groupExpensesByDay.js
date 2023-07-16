export default function groupExpensesByDay(expenses) {
  // First group expenses by date
  const grouped = expenses.reduce((acc, expense) => {
    const expenseDate = new Date(expense.date).toLocaleDateString();
    if (!acc[expenseDate]) {
      acc[expenseDate] = [];
    }
    acc[expenseDate].push(expense);
    return acc;
  }, {});

  // Then convert the object into the desired array format
  return Object.keys(grouped).map((date) => {
    const total = grouped[date].reduce((sum, expense) => sum + Number(expense.price), 0);
    const formattedTotal = Math.floor(total) === total ? total : total.toFixed(2);

    return {
      day: date,
      expenses: grouped[date],
      total: formattedTotal,
    };
  });
}
