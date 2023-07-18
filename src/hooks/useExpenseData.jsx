import ExpensesContext from "@/contexts/Expenses";
import useFindCategory from "@/hooks/useFindCategory";
import { useState, useEffect, useContext } from "react";
import { colors } from "@/utils/colors";

// This hook is used to calculate the total amount of money spent and return it to the Stats page
export default function useExpenseData() {
  const { expenses } = useContext(ExpensesContext);
  const { findCategory } = useFindCategory();

  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let totalSpent = expenses.reduce((total, current) => total + current.price, 0);
    let tempData = {};
    let categoryIds = {};

    expenses.forEach((expense) => {
      if (!categoryIds[expense.categoryId]) {
        categoryIds[expense.categoryId] = true;
      }

      if (!tempData[expense.categoryId]) {
        tempData[expense.categoryId] = {
          icon: "🤷‍♂️", // default icon
          categoryName: "No Category", // default name
          spent: 0,
          color: colors[Object.keys(tempData).length % colors.length], // assigning color
        };
      }
      tempData[expense.categoryId].spent += expense.price;
    });

    // Get category details for each unique ID
    Object.keys(categoryIds).forEach((categoryId) => {
      const category = findCategory(categoryId);
      if (category) {
        tempData[categoryId].icon = category.icon;
        tempData[categoryId].categoryName = category.name;
      }
    });

    const processedData = Object.values(tempData)
      .map((item) => ({
        ...item,
        percent: Math.round((item.spent / totalSpent) * 100),
      }))
      .sort((a, b) => b.percent - a.percent); // sort from highest to lowest

    setData(processedData);

    // Prepare data for the PieChart
    const processedChartData = processedData
      .map((item) => ({
        title: item.categoryName,
        value: item.percent,
        color: item.color,
      }))
      .sort((a, b) => b.value - a.value); // sort from highest to lowest

    setChartData(processedChartData);
  }, [expenses]);

  return { data, chartData };
}
