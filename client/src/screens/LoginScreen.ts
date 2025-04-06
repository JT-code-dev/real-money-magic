import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
      console.log("Login successful:", data.login.user);
      // redirect to dashboard or update auth state
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ variables: { ...formState } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-500 mt-2 text-sm">{error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
