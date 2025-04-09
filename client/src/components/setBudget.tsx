import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query {
    myProjects {
      id
      title
    }
  }
`;

const SET_BUDGET = gql`
  mutation SetBudget($projectId: ID!, $budgetData: [BudgetEntryInput!]!) {
    updateBudgetData(projectId: $projectId, budgetData: $budgetData) {
      id
      budgetData {
        category
        amount
      }
    }
  }
`;

const SetBudget = () => {
  interface Project {
    id: string;
    title: string;
  }

  const { data, loading, error } = useQuery<{ myProjects: Project[] }>(GET_PROJECTS);
  const [setBudget] = useMutation(SET_BUDGET);

  interface BudgetEntry {
    category: string;
    amount: string;
  }

  const [entries, setEntries] = useState<Record<string, BudgetEntry>>({});

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error loading projects</p>;

  const handleChange = (projectId: string, field: string, value: string) => {
    setEntries((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    for (const [projectId, entry] of Object.entries(entries)) {
      await setBudget({
        variables: {
          projectId,
          budgetData: [
            {
              category: entry.category,
              amount: parseFloat(entry.amount),
            },
          ],
        },
      });
    }
    console.log("Budget data saved!");
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Set Budget for Your Projects</h2>
      {data?.myProjects?.map((project) => (
        <div key={project.id} className="mb-6 border-b pb-4">
          <h3 className="font-bold">{project.title}</h3>
          <input
            placeholder="Category"
            value={entries[project.id]?.category || ""}
            onChange={(e) => handleChange(project.id, "category", e.target.value)}
            className="block my-1"
          />
          <input
            placeholder="Amount"
            type="number"
            value={entries[project.id]?.amount || ""}
            onChange={(e) => handleChange(project.id, "amount", e.target.value)}
            className="block my-1"
          />
        </div>
      ))}
      <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Submit Budgets
      </button>
    </div>
  );
};

export default SetBudget;
