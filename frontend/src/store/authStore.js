import { create } from "zustand";
import apiClient from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (data ) => {
    set({ isLoading: true, error: null });

    try {

      const response = await apiClient.post(`/register`, data);

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
      const response = await apiClient.post(`/login`, data);
      console.log(response);
      if(response.data.role !== "2"){

        set({error: "Anauthorized"});
        throw error;
      }
      
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
  logout: () =>{
    localStorage.removeItem("token");
    set({user: null})
  }
}));
