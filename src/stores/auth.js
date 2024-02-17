import { defineStore } from 'pinia';
import { auth } from 'src/boot/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useFormStore } from './form';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    email: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const userCredantials = await signInWithEmailAndPassword(auth, email, password);
        if (userCredantials.user) {
          this.token = userCredantials.user.accessToken;
          this.email = userCredantials.user.email;
          return { success: true }
        } else {
          this.token = null;
          this.email = null;
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    async logout() {
      try {
        const formInfo = useFormStore();
        await signOut(auth);
        this.token = null;
        this.email = null;
        formInfo.setInputForm(null);
        formInfo.setOutputForm(null);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  persist: true,
});
