import useCalculateTotal from "@/hooks/useCalculateTotal";
import { PieChart } from "react-minimal-pie-chart";
import useExpenseData from "@/hooks/useExpenseData";
import ExpenseTable from "@/components/ExpenseTable";
import Button from "@/components/Button";
import { dateRanges } from "@/utils/dateRanges";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Stats() {
  const navigate = useNavigate();
  const { total } = useCalculateTotal();
  const { data, chartData, dateFilter, setDateFilter } = useExpenseData();

  return (
    <div className="mx-2 mt-[59px]">
      <span className="text-3xl font-medium">{total.toFixed(2)} DKK</span>
      <div className="flex items-center justify-between">
        <div className="w-full mt-4 relative mb-7 max-w-[170px]">
          <div className="absolute inset-[25%] bg-white rounded-full" />
          <PieChart
            data={
              chartData.length === 0
                ? [
                    { title: "Groceries", value: 100, color: "#E38627" },
                    { title: "Rent", value: 300, color: "#6A2135" },
                    { title: "Gas", value: 400, color: "#1F77B4" },
                  ]
                : chartData
            }
          />
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
      {data.length === 0 && (
        <div className="text-center flex flex-col items-center mx-1 h-[300px]">
          <BsFillInfoSquareFill size="30px" className="mx-auto text-slate-300 mb-4 mt-[70px]" />
          <span className="text-lg mb-1">No expenses yet</span>
          <span className="text-slate-500 font-light mb-6">Add some to get shown your data</span>
          <Button type="primary" text="Add expense" clickHandler={() => navigate("/expense")} />
        </div>
      )}
    </div>
  );
}
