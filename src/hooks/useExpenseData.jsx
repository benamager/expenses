import ExpensesContext from "@/contexts/Expenses";
import useFindCategory from "@/hooks/useFindCategory";
import { useState, useEffect, useContext } from "react";
import { colors } from "@/utils/colors";
import { dateRanges } from "@/utils/dateRanges"; // import our enumeration

// This hook is used to calculate the total amount of money spent and return it to the Stats page
export default function useExpenseData() {
  const [dateFilter, setDateFilter] = useState(dateRanges.ALL_TIME);
  const { expenses } = useContext(ExpensesContext);
  const { findCategory } = useFindCategory();

  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Get current date
    const now = new Date();
    // Get date for one week ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    // Get date for two weeks ago
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(now.getDate() - 14);

    // Initialize our expenses as the entire list
    let filteredExpenses = expenses;

    // Check the current date filter state and filter the expenses accordingly
    switch (dateFilter) {
      case dateRanges.LAST_WEEK:
        // If the filter is set to 'Last Week', only include expenses from the last week
        filteredExpenses = expenses.filter((expense) => new Date(expense.date) >= oneWeekAgo);
        break;
      case dateRanges.LAST_TWO_WEEKS:
        // If the filter is set to 'Last Two Weeks', only include expenses from the last two weeks
        filteredExpenses = expenses.filter((expense) => new Date(expense.date) >= twoWeeksAgo);
        break;
      case dateRanges.ALL_TIME:
      default:
        // If the filter is set to 'All Time' or if the filter is not recognized, include all expenses
        break;
    }

    // Calculate the total amount spent
    let totalSpent = filteredExpenses.reduce((total, current) => total + current.price, 0);
    // Temporarily hold our data in an object format for easier manipulation
    let tempData = {};
    // Hold unique category IDs to avoid duplicating category lookups
    let categoryIds = {};

    // Process each expense
    filteredExpenses.forEach((expense) => {
      // If the category ID of the current expense hasn't been seen before, mark it
      if (!categoryIds[expense.categoryId]) {
        categoryIds[expense.categoryId] = true;
      }

      // If the category ID of the current expense hasn't been added to our data, add it
      if (!tempData[expense.categoryId]) {
        tempData[expense.categoryId] = {
          iconUrl: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f937-200d-2642-fe0f.png",
          categoryName: "No Category",
          spent: 0,
          color: colors[Object.keys(tempData).length % colors.length],
        };
      }
      // Increase the amount spent for the current expense's category
      tempData[expense.categoryId].spent += expense.price;
    });

    // For each unique category ID, find the category details and add them to our data
    Object.keys(categoryIds).forEach((categoryId) => {
      const category = findCategory(categoryId);
      if (category) {
        tempData[categoryId].iconUrl = category.iconUrl;
        tempData[categoryId].categoryName = category.name;
      }
    });

    // Convert our data to an array format and calculate the percent spent for each category
    const processedData = Object.values(tempData)
      .map((item) => ({
        ...item,
        percent: Math.round((item.spent / totalSpent) * 100),
      }))
      .sort((a, b) => b.percent - a.percent); // sort from highest to lowest

    // Set the data state to our processed data
    setData(processedData);

    // Prepare data for the PieChart
    const processedChartData = processedData
      .map((item) => ({
        title: item.categoryName,
        value: item.percent,
        color: item.color,
      }))
      .sort((a, b) => b.value - a.value); // sort from highest to lowest

    // Set the chart data state to our processed chart data
    setChartData(processedChartData);
  }, [expenses, dateFilter]); // Run this hook whenever the expenses or date filter state changes

  return { data, chartData, dateFilter, setDateFilter };
}
