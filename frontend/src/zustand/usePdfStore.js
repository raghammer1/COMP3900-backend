import { create } from 'zustand';

// Create a store for managing PDF data
const usePdfStore = create((set, get) => ({
  pdfData: [], // Initial state for PDF data

  // Function to set the latest PDF data
  setLatestData: (newData) => {
    const newDataArray = Array.isArray(newData) ? newData : [newData]; // Ensure newData is an array
    set({ pdfData: newDataArray }); // Set the state with the new data
  },

  // Function to add new PDF data to the existing state
  addPdfData: (newData) => {
    const currentData = get().pdfData; // Get the current state
    console.log(
      'New data to be added:',
      newData,
      'Current pdf data:',
      currentData
    );
    set((state) => ({
      pdfData: [...state.pdfData, newData], // Append the new data to the existing data
    }));
  },

  // Function to get PDF data by ID
  getPdfDataById: (id) => {
    const state = get(); // Get the current state
    return state.pdfData.find((data) => data._id === id); // Find and return the data with the matching ID
  },

  // Function to get all PDF data
  getPdfData: () => {
    const state = get(); // Get the current state
    return state.pdfData; // Return all PDF data
  },

  // Function to delete PDF data by ID
  deletePdfDataById: (id) => {
    set((state) => ({
      pdfData: state.pdfData.filter((data) => data._id !== id),
    }));
  },

  // Function to clear all PDF data
  clearPdfData: () => set({ pdfData: [] }), // Set the state to an empty array
}));

export default usePdfStore;
