export default function ExpenseTable({ data }) {
  return (
    <table className="w-full text-center">
      <thead>
        <tr className="text-sm">
          <th className="font-normal text-slate-300 text-left w-[14%]"></th>
          <th className="font-normal text-slate-300 border-b text-left pb-1">Category Name</th>
          <th className="font-normal text-slate-300 border-b text-center pb-1">Percent</th>
          <th className="font-normal text-slate-300 border-b text-right w-[26%] pb-1">Spent</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="text-sm rounded-md">
            <td className="text-2xl text-left">{item.icon}</td>
            <td className="text-left py-4 border-b truncate">{item.categoryName}</td>
            <td className="text-center py-4 border-b flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
              {item.percent}%
            </td>
            <td className="text-right py-4 border-b">{item.spent} DKK</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
