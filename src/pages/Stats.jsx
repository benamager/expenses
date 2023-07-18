import useCalculateTotal from "@/hooks/useCalculateTotal";
import { PieChart } from "react-minimal-pie-chart";
import useExpenseData from "@/hooks/useExpenseData";
import ExpenseTable from "@/components/ExpenseTable";
import Button from "@/components/Button";
import { dateRanges } from "@/utils/dateRanges";

export default function Stats() {
  const { total } = useCalculateTotal();
  const { data, chartData, dateFilter, setDateFilter } = useExpenseData();

  return (
    <div className="mx-2 mt-[59px]">
      <span className="text-3xl font-medium">{total.toFixed(2)} DKK</span>
      <div className="flex items-center justify-between">
        <div className="w-full mt-4 relative mb-7 max-w-[170px]">
          <div className="absolute inset-[25%] bg-white rounded-full" />
          <PieChart data={chartData} />
        </div>
        <div className="flex flex-col items-end gap-1">
          {Object.keys(dateRanges).map((key) => {
            // Get the corresponding value from the DateRanges object
            const range = dateRanges[key];

            return <Button key={key} clickHandler={() => setDateFilter(range)} type={dateFilter == range ? "primary" : "secondary"} text={range} className="text-sm max-w-fit whitespace-nowrap ml-2" />;
          })}
        </div>
      </div>
      <ExpenseTable data={data} />
    </div>
  );
}
