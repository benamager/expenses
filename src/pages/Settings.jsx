import Button from "@/components/Button";
import useResetExpensesData from "@/hooks/useResetExpensesData";
import useDeleteCategories from "@/hooks/useDeleteCategories";
import useCategoriesModal from "@/hooks/useCategoriesModal";

export default function Settings() {
  const { resetExpensesData } = useResetExpensesData();
  const { categoriesModal, setIsCategoriesModalOpen } = useCategoriesModal();
  const { deleteCategories } = useDeleteCategories(setIsCategoriesModalOpen);

  return (
    <div className="mx-2 mt-[59px]">
      {categoriesModal}
      <h1 className="text-3xl mb-4 font-medium">Settings</h1>
      <ul>
        <li className="grid grid-cols-7 items-center gap-2 border-b py-3">
          <div className="col-span-5 flex flex-col">
            <span className="text-base font-medium">Edit categories</span>
            <span className="text-sm text-slate-500">Wanna customize them or make new ones?</span>
          </div>
          <Button className="text-sm col-span-2" type="primary" text="Edit" clickHandler={() => setIsCategoriesModalOpen(true)} />
        </li>
        <li className="grid grid-cols-7 items-center gap-2 border-b py-3">
          <div className="col-span-5 flex flex-col">
            <span className="text-base font-medium">Delete all categories</span>
            <span className="text-sm text-slate-500">Wanna make your own from scratch?</span>
          </div>
          <Button className="text-sm bg-red-400 col-span-2" text="Delete" clickHandler={() => deleteCategories()} />
        </li>
        <li className="grid grid-cols-7 items-center gap-2 py-3">
          <div className="col-span-5 flex flex-col">
            <span className="text-base font-medium">Reset expenses data</span>
            <span className="text-sm text-slate-500">This deletes all your expenses, so think twice.</span>
          </div>
          <Button className="text-sm bg-red-400 col-span-2" text="Reset" clickHandler={() => resetExpensesData()} />
        </li>
      </ul>
    </div>
  );
}
