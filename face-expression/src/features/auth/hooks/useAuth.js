// HOOKS => State & API mange
import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handleLogin({ username, email, password }) {
    setLoading(true);
    const data = await login({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handlegetMe() {
    setLoading(true);

    try {
      const data = await getMe();
      setUser(data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handlelogout() {
    setLoading(true);
    const data = await logout();
    setUser(data.user);
    setLoading(false);
  }

  useEffect(() => {
    handlegetMe();
  }, []);

  return {
    user,
    setUser,
    loading,
    setLoading,
    handleRegister,
    handleLogin,
    handlegetMe,
    handlelogout,
  };
};
