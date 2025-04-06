import React from "react";

const transactions = [
  { id: 1, description: "Groceries", amount: -40.5, date: "Today" },
  { id: 2, description: "Freelance", amount: 300, date: "Today" },
  { id: 3, description: "Electric Bill", amount: -60, date: "Yesterday" },
];

const Home: React.FC = () => {
  const balance = 500;
  const income = 1000;
  const expenses = 500;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Money Tracker</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-500">Balance</h2>
          <p className="text-2xl font-bold text-blue-600">${balance}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-500">Income</h2>
          <p className="text-2xl font-bold text-green-500">${income}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-500">Expenses</h2>
          <p className="text-2xl font-bold text-red-500">${expenses}</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        {["Today", "Yesterday"].map((section) => (
          <div key={section}>
            <h3 className="text-md font-semibold text-gray-600 mb-2">
              {section}
            </h3>
            <ul>
              {transactions
                .filter((t) => t.date === section)
                .map((t) => (
                  <li key={t.id} className="flex justify-between py-2 border-b">
                    <span>{t.description}</span>
                    <span
                      className={`font-semibold ${
                        t.amount < 0 ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      ${Math.abs(t.amount)}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Add Transaction Button */}
      <div className="flex justify-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">
          + Add New Transaction
        </button>
      </div>
    </div>
  );
};

export default Home;
