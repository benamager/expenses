import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import Modal from "react-modal";
import { nanoid } from "nanoid";

export default function OldApp() {
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState(0);
  const [editExpense, setEditExpense] = useState({});
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  function addExpenseHandler(event) {
    event.preventDefault();

    if (title.trim().length === 0 || price.trim().length === 0) {
      alert("Please enter your expense");
      return;
    }

    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        {
          id: nanoid(),
          date: new Date(),
          title: title,
          price: price,
        },
      ];
    });

    setTitle("");
    setPrice("");
  }

  // calculate total expenses in state
  useEffect(() => {
    let totalCalculated = 0;

    expenses.forEach((expense) => {
      totalCalculated += parseInt(expense.price);
    });

    setTotal(totalCalculated);
  }, [expenses]);

  function openEditExpense(expense) {
    setEditModalIsOpen(true);
    setEditExpense(expense);
  }

  function handleEditExpense(e) {
    e.preventDefault();

    const title = e.target.title.value;
    const price = e.target.price.value;

    setEditModalIsOpen(false);
    setExpenses(expenses.map((expense) => (expense.id === editExpense.id ? { ...expense, title: title, price: price } : expense)));
  }

  function deleteExpense() {
    setEditModalIsOpen(false);
    setExpenses(expenses.filter((expense) => expense.id !== editExpense.id));
  }

  function resetExpenses() {
    setDeleteModalIsOpen(false);
    setExpenses([]);
  }

  return (
    <div className="w-full">
      <Modal isOpen={deleteModalIsOpen} onRequestClose={() => setDeleteModalIsOpen(false)} contentLabel="Delete modal">
        <div className="flex flex-col">
          <button onClick={() => setDeleteModalIsOpen(false)} className="ml-auto">
            Close
          </button>
          <p className="mt-6 mb-4">Are you sure you want to reset your expenses.</p>
          <button className="w-full bg-red-400 rounded-md py-2" onClick={() => resetExpenses()}>
            Reset
          </button>
        </div>
      </Modal>
      <Modal isOpen={editModalIsOpen} onRequestClose={() => setEditModalIsOpen(false)} contentLabel="Edit modal">
        <div className="flex flex-col">
          <button onClick={() => setEditModalIsOpen(false)} className="ml-auto">
            Close
          </button>
          <p className="mt-6 mb-2">Editing expense</p>
          <span className="mb-4">{editExpense?.date && new Date(editExpense.date).toLocaleDateString()}</span>
          <form onSubmit={handleEditExpense} className="flex gap-2 flex-col bg-white mb-8">
            <input className="px-2 py-3 border bg-slate-200 rounded-md w-full" type="text" name="title" id="title" placeholder="Title" defaultValue={editExpense?.title ? editExpense.title : ""} />
            <input className="px-2 py-3 border bg-slate-200 rounded-md w-full" type="number" name="price" id="price" placeholder="0" defaultValue={editExpense?.price ? editExpense.price : ""} />
            <button className="w-full bg-slate-300 rounded-md py-2" type="submit">
              Confirm
            </button>
          </form>
          <button className="w-full bg-red-300 rounded-md py-2" onClick={() => deleteExpense()}>
            Delete
          </button>
        </div>
      </Modal>
      <div className="w-full p-4">
        <div className="fixed left-2 top-0 right-2">
          <div className="flex justify-between items-center bg-slate-300 px-2 py-3 rounded-md mt-2">
            <h1 className="text-xl">Expenses</h1>
            <p className="text-md">Total spent: {total} kr.</p>
            <p className="bg-red-300 py-1 px-2 rounded-md" onClick={() => setDeleteModalIsOpen(true)}>
              Reset
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-4 mb-[130px] mt-[60px]">
          {expenses.map((expense, index) => {
            return (
              <div key={index} className="bg-slate-100 p-4 flex justify-between rounded-md items-center" onClick={() => openEditExpense(expense)}>
                <div>
                  <span className="font-light">{new Date(expense.date).toLocaleDateString()}</span>
                  <p>{expense.title}</p>
                </div>
                <p className="font-medium">{expense.price} kr.</p>
              </div>
            );
          })}
        </div>
        <form onSubmit={addExpenseHandler} className="flex gap-2 flex-col fixed left-2 right-2 pb-2 bottom-0 bg-white z-20">
          <div className="flex">
            <input className="px-2 py-3 border bg-slate-200 rounded-md w-[48%]" type="text" name="title" id="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="px-2 py-3 border bg-slate-200 rounded-md w-[48%] ml-auto" type="number" name="price" id="price" placeholder="0" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <button className="bg-slate-300 py-3 rounded-md" type="submit">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}
