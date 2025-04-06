import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Report: React.FC = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <div className="p-6">Loading transactions...</div>;
  if (error) return <div className="p-6 text-red-500">Error loading data.</div>;

  const transactions = data.transactions;

  // 💰 Compute totals
  const income = transactions
    .filter((t: any) => t.type === "Income")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const expense = transactions
    .filter((t: any) => t.type === "Expense")
    .reduce((sum: number, t: any) => sum + t.amount, 0);

  const balance = income - expense;

  // 📊 Group by month for the chart
  const monthlyMap: { [key: string]: { income: number; expense: number } } = {};

  transactions.forEach((t: any) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });
    if (!monthlyMap[month]) {
      monthlyMap[month] = { income: 0, expense: 0 };
    }
    monthlyMap[month][t.type.toLowerCase()] += t.amount;
  });

  const monthly = Object.entries(monthlyMap).map(([month, values]) => ({
    month,
    ...values,
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">📊 Financial Report</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-100 text-green-800 rounded-lg p-4 shadow">
          <p className="text-lg">Total Income</p>
          <h2 className="text-2xl font-bold">${income}</h2>
        </div>
        <div className="bg-red-100 text-red-800 rounded-lg p-4 shadow">
          <p className="text-lg">Total Expense</p>
          <h2 className="text-2xl font-bold">${expense}</h2>
        </div>
        <div className="bg-blue-100 text-blue-800 rounded-lg p-4 shadow">
          <p className="text-lg">Net Balance</p>
          <h2 className="text-2xl font-bold">${balance}</h2>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthly}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#4ade80" />
            <Bar dataKey="expense" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 font-semibold">Date</th>
                <th className="p-2 font-semibold">Type</th>
                <th className="p-2 font-semibold">Category</th>
                <th className="p-2 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t: any) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td
                    className={`p-2 ${
                      t.type === "Income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type}
                  </td>
                  <td className="p-2">{t.category}</td>
                  <td className="p-2 font-medium">${t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
