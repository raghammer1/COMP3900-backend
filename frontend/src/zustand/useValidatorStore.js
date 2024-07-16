import { create } from 'zustand';

const useValidatorStore = create((set, get) => ({
  validatorData: [],

  setLatestData: (newData) => {
    const newDataArray = Array.isArray(newData) ? newData : [newData];
    set({ validatorData: newDataArray });
  },
  addValidatorData: (newData) => {
    const currentData = get().validatorData;
    console.log(
      'New data to be added:',
      newData,
      'Current validator data:',
      currentData
    );
    set((state) => ({
      validatorData: [...state.validatorData, newData],
    }));
  },

  getValidatorDataById: (id) => {
    const state = get();
    return state.validatorData.find((data) => data._id === id);
  },

  getValidatorData: () => {
    const state = get();
    return state.validatorData;
  },

  deleteValidatorDataById: (id) => {
    set((state) => ({
      validatorData: state.validatorData.filter((data) => data._id !== id),
    }));
  },

  clearValidatorData: () => set({ validatorData: [] }),
}));

export default useValidatorStore;
