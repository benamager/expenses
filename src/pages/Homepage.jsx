import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import ExpenseList from "@/components/ExpenseList";
import SpentHeading from "@/components/SpentHeading";
import useCalculateTotal from "@/hooks/useCalculateTotal";

export default function Homepage() {
  const { total } = useCalculateTotal();

  return (
    <>
      <Link to="expense" className="ml-auto">
        <AiFillPlusCircle size="35px" className="p-3 box-content ml-auto" />
      </Link>
      <SpentHeading hasTitle={true} className="" amount={total} />
      <ExpenseList />
    </>
  );
}
