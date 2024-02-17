import { defineStore } from 'pinia';


export const useUserSelectionStore = defineStore('userSelection', {
  state: () => ({
    selectedUserInterface: null,
  }),
  actions: {
    setSelectedUserInterface(selectedUserInterface) {
      this.selectedUserInterface = selectedUserInterface;
    },
  },
  getters: {
    getSelectedUserInterface: (state) => state.selectedUserInterface,
  },
  persist: true,
});
