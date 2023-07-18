import Button from "@/components/Button";
import useResetExpensesData from "@/hooks/useResetExpensesData";
import useDeleteCategories from "@/hooks/useDeleteCategories";
import useCategoriesModal from "@/hooks/useCategoriesModal";

export default function Settings() {
  const { resetExpensesData } = useResetExpensesData();
  const { deleteCategories } = useDeleteCategories();
  const { categoriesModal, setIsCategoriesModalOpen } = useCategoriesModal();

  return (
    <div className="mx-2 mt-[59px]">
      {categoriesModal}
      <h1 className="text-3xl mb-4 font-medium">Settings</h1>
      <ul>
        <li className="flex items-center justify-between gap-2 border-b py-3">
          <div className="flex flex-col">
            <span className="text-base font-medium">Edit categories</span>
            <span className="text-sm">Wanna customize them or make new ones?</span>
          </div>
          <Button className="text-sm" type="primary" text="Edit" clickHandler={() => setIsCategoriesModalOpen(true)} />
        </li>
        <li className="flex items-center justify-between gap-2 border-b py-3">
          <div className="flex flex-col">
            <span className="text-base font-medium">Delete all categories</span>
            <span className="text-sm">Wanna make your own from scratch?</span>
          </div>
          <Button className="text-sm bg-red-400" text="Delete" clickHandler={() => deleteCategories()} />
        </li>
        <li className="flex items-center justify-between gap-2 py-3">
          <div className="flex flex-col">
            <span className="text-base font-medium">Reset expenses data</span>
            <span className="text-sm">This deletes all your expenses, so think twice.</span>
          </div>
          <Button className="text-sm bg-red-400" text="Reset" clickHandler={() => resetExpensesData()} />
        </li>
      </ul>
    </div>
  );
}
