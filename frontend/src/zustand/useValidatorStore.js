import { create } from 'zustand';

// Create a store for managing validator data
const useValidatorStore = create((set, get) => ({
  validatorData: [], // Initial state for validator data

  // Function to set the latest validator data
  setLatestData: (newData) => {
    const newDataArray = Array.isArray(newData) ? newData : [newData];
    set({ validatorData: newDataArray });
  },

  // Function to add new validator data to the existing state
  addValidatorData: (newData) => {
    set((state) => ({
      validatorData: [...state.validatorData, newData],
    }));
  },

  // Function to get validator data by ID
  getValidatorDataById: (id) => {
    const state = get();
    return state.validatorData.find((data) => data._id === id);
  },

  // Function to get all validator data
  getValidatorData: () => {
    const state = get();
    return state.validatorData;
  },

  // Function to delete validator data by ID
  deleteValidatorDataById: (id) => {
    set((state) => {
      return {
        validatorData: state.validatorData.filter((data) => data._id !== id),
      };
    });
  },

  // Function to clear all validator data
  clearValidatorData: () => set({ validatorData: [] }), // Set the state to an empty array
}));

export default useValidatorStore;
