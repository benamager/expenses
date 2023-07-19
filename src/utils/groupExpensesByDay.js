export default function groupExpensesByDay(expenses) {
  // Creating today and yesterday date strings
  const today = new Date().toLocaleDateString();
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

  // Grouping expenses by date
  const grouped = expenses.reduce((acc, expense) => {
    const expenseDate = new Date(expense.date).toLocaleDateString();

    // If the date is today or yesterday, use the appropriate label instead of the actual date
    const label = expenseDate === today ? "Today" : expenseDate === yesterday ? "Yesterday" : expenseDate;

    if (!acc[label]) {
      acc[label] = [];
    }
    acc[label].push(expense);
    return acc;
  }, {});

  // Convert the object into the desired array format
  return Object.keys(grouped).map((date) => {
    // Calculate the total for each date
    const total = grouped[date].reduce((sum, expense) => sum + Number(expense.price), 0);
    const formattedTotal = Math.floor(total) === total ? total : total.toFixed(2);

    // Return the final object for each date
    return {
      day: date,
      expenses: grouped[date],
      total: formattedTotal,
    };
  });
}
