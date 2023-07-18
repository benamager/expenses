import useCalculateTotal from "@/hooks/useCalculateTotal";
import { PieChart } from "react-minimal-pie-chart";
import useExpenseData from "@/hooks/useExpenseData";
import ExpenseTable from "@/components/ExpenseTable";

export default function Stats() {
  const { total } = useCalculateTotal();
  const { data, chartData } = useExpenseData();

  return (
    <div className="mx-2 mt-[59px]">
      <span className="text-3xl font-medium">{total.toFixed(2)} DKK</span>
      <div className="w-[55%] mt-4 relative mb-7 max-w-sm">
        <div className="absolute inset-[25%] bg-white rounded-full" />
        <PieChart data={chartData} />
      </div>
      <ExpenseTable data={data} />
    </div>
  );
}
