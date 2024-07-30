import { create } from 'zustand';

/**
 * @typedef {Object} CurrentUser
 * @property {string} _id - The user's unique identifier
 * @property {string} username - The user's name
 * @property {string} email - The user's email address
 */

// Create a store for managing user data
const useUserStore = create((set, get) => ({
  // Initial state for the user, fetched from localStorage if available
  user: JSON.parse(localStorage.getItem('user')) || null,

  // Function to set the user data
  setUser: (user) => {
    const currentUser = get().user;
    const updatedUser = { ...currentUser, ...user };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  // Function to clear the user data
  clearUser: () => {
    console.log('Clearing user');
    set({ user: null });
  },

  // Function to get the user data
  getUser: () => {
    const state = get();
    return state?.user?.user ? state?.user?.user : null;
  },

  // Function to update the user's Google profile picture
  updateGoogleImage: (googlePicture) => {
    const currentState = get().user;
    const updatedUser = { ...currentState.user, googlePicture };
    const updatedState = { ...currentState, user: updatedUser };
    localStorage.setItem('user', JSON.stringify(updatedState));
    set({ user: updatedState });
  },

  // Function to update the user's username
  updateUsername: (username) => {
    const currentState = get().user;
    const updatedUser = { ...currentState.user, username };
    const updatedState = { ...currentState, user: updatedUser };
    localStorage.setItem('user', JSON.stringify(updatedState));
    set({ user: updatedState });
  },

  // Function to update the user's GLN (Global Location Number)
  updateGLN: (gln) => {
    const currentState = get().user;
    const updatedUser = { ...currentState.user, gln };
    const updatedState = { ...currentState, user: updatedUser };
    localStorage.setItem('user', JSON.stringify(updatedState));
    set({ user: updatedState });
  },
}));

export default useUserStore;
