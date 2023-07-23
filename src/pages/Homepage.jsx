import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import ExpenseList from "@/components/ExpenseList";
import SpentHeading from "@/components/SpentHeading";
import useExpenseData from "@/hooks/useExpenseData";

export default function Homepage() {
  const { totalForPeriod } = useExpenseData();

  return (
    <>
      <Link to="expense" className="ml-auto">
        <AiFillPlusCircle size="35px" className="p-3 box-content ml-auto" />
      </Link>
      <SpentHeading hasTitle={true} amount={totalForPeriod} />
      <ExpenseList />
    </>
  );
}
