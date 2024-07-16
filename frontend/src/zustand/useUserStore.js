import { create } from 'zustand';
/**
 * @typedef {Object} CurrentUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */
//
const useUserStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  setUser: (user) => {
    const currentUser = get().user;
    const updatedUser = { ...currentUser, ...user };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },
  clearUser: () => {
    console.log('Clearing user');
    set({ user: null });
  },
  getUser: () => {
    const state = get();
    return state.user.user;
  },
  updateGoogleImage: (googlePicture) => {
    const currentState = get().user;
    const updatedUser = { ...currentState.user, googlePicture };
    const updatedState = { ...currentState, user: updatedUser };
    localStorage.setItem('user', JSON.stringify(updatedState));
    set({ user: updatedState });
  },
}));

export default useUserStore;
