import { create } from "zustand";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (data ) => {
    set({ isLoading: true, error: null });

    try {

      const response = await axios.post(`${baseUrl}/register`, data);

      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Failed to sign up",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (data) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await axios.post(`${baseUrl}/login`, data);

      localStorage.setItem("token", response.data.token);
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },
}));
