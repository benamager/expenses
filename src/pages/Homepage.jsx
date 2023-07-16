import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import ExpenseList from "@/components/ExpenseList";
import SpentHeading from "@/components/SpentHeading";

export default function Homepage() {
  return (
    <>
      <Link to="add">
        <AiFillPlusCircle size="35px" className="p-3 box-content ml-auto" />
      </Link>
      <SpentHeading hasTitle={true} className="" amount={2000.5} />
      <ExpenseList />
    </>
  );
}
