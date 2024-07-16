import { create } from 'zustand';

const usePdfStore = create((set, get) => ({
  pdfData: [],

  setLatestData: (newData) => {
    const newDataArray = Array.isArray(newData) ? newData : [newData];
    set({ pdfData: newDataArray });
  },
  addPdfData: (newData) => {
    const currentData = get().pdfData;
    console.log(
      'New data to be added:',
      newData,
      'Current pdf data:',
      currentData
    );
    set((state) => ({
      pdfData: [...state.pdfData, newData],
    }));
  },

  getPdfDataById: (id) => {
    const state = get();
    return state.pdfData.find((data) => data._id === id);
  },

  getPdfData: () => {
    const state = get();
    return state.pdfData;
  },

  deletePdfDataById: (id) => {
    set((state) => ({
      pdfData: state.pdfData.filter((data) => data._id !== id),
    }));
  },

  clearPdfData: () => set({ pdfData: [] }),
}));

export default usePdfStore;
