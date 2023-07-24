import { useContext } from "react";
import SettingsContext from "@/contexts/Settings";
import Button from "@/components/Button";
import useResetExpensesData from "@/hooks/useResetExpensesData";
import useDeleteCategories from "@/hooks/useDeleteCategories";
import useResetCategories from "@/hooks/useResetCategories";
import useCategoriesModal from "@/hooks/useCategoriesModal";
import Switch from "react-switch";
import usePopup from "@/hooks/usePopup";

export default function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);

  const { resetExpensesData } = useResetExpensesData();
  const { categoriesModal, setIsCategoriesModalOpen } = useCategoriesModal(true);
  const { deleteCategories } = useDeleteCategories(setIsCategoriesModalOpen);
  const { resetCategories } = useResetCategories(setIsCategoriesModalOpen);

  const { popupJSX: resetPopup, triggerPopup: confirmReset } = usePopup({
    title: "Reset expenses?",
    text: "This deletes all of your expenses, think twice.",
    confirmText: "Delete",
    confirmType: "danger",
    cancelText: "Cancel",
    confirmHandler: () => resetExpensesData(),
  });

  const { popupJSX: resetCategoriesPopup, triggerPopup: confirmResetCategories } = usePopup({
    title: "Reset categories?",
    text: "This resets your categories to the default ones, think twice.",
    confirmText: "Reset",
    confirmType: "danger",
    cancelText: "Cancel",
    confirmHandler: () => resetCategories(),
  });

  const { popupJSX: deleteCategoriesPopup, triggerPopup: confirmDeleteCategories } = usePopup({
    title: "Delete categories?",
    text: "This deletes all of your categories, think twice.",
    confirmText: "Delete",
    confirmType: "danger",
    cancelText: "Cancel",
    confirmHandler: () => deleteCategories(),
  });

  return (
    <div className="mx-2 mt-[59px]">
      {categoriesModal}
      <h1 className="text-3xl mb-1 font-medium">Settings</h1>
      <p className="text-slate-500 mb-4">Customize your experience</p>
      <ul>
        <li className="grid grid-cols-7 items-center gap-2 border-b py-3">
          <div className="col-span-5 flex flex-col">
            <span className="text-base">Enable animations</span>
            <span className="text-sm text-slate-500 font-light">Want things to look niiiice?</span>
          </div>
          <Switch
            className="col-span-2 ml-auto"
            onChange={() =>
              setSettings((prevSettings) => ({
                ...prevSettings,
                enableAnimations: !prevSettings.enableAnimations,
              }))
            }
            checked={settings?.enableAnimations}
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </li>
        <li className="grid grid-cols-7 items-center gap-2 border-b py-3">
          <div className="col-span-5 flex flex-col">
            <span className="text-base">Edit categories</span>
            <span className="text-sm text-slate-500 font-light">Customize them or make new ones</span>
          </div>
          <Button className="text-sm col-span-2" type="primary" text="Edit" clickHandler={() => setIsCategoriesModalOpen(true)} />
        </li>
        <li className="grid grid-cols-7 items-center gap-2 border-b py-3">
          <div className="col-span-5 flex flex-col">
            <span className="text-base">Delete all categories</span>
            <span className="text-sm text-slate-500 font-light">Wanna make your own from scratch?</span>
          </div>
          <Button type="danger" className="text-sm col-span-2" text="Delete" clickHandler={() => confirmDeleteCategories()} />
          {deleteCategoriesPopup}
        </li>
        <li className="grid grid-cols-7 items-center gap-2 border-b py-3">
          <div className="col-span-5 flex flex-col">
            <span className="text-base">Reset to default categories</span>
            <span className="text-sm text-slate-500 font-light">Tired of your own categories?</span>
          </div>
          <Button type="danger" className="text-sm col-span-2" text="Reset" clickHandler={() => confirmResetCategories()} />
          {resetCategoriesPopup}
        </li>
        <li className="grid grid-cols-7 items-center gap-2 py-3">
          <div className="col-span-5 flex flex-col">
            <span className="text-base">Reset expenses data</span>
            <span className="text-sm text-slate-500  font-light">This deletes all your expenses, so think twice.</span>
          </div>
          <Button type="danger" className="text-sm col-span-2" text="Reset" clickHandler={() => confirmReset()} />
          {resetPopup}
        </li>
      </ul>
    </div>
  );
}
