import { getUserInfo } from '@/services/user'
import { create } from 'zustand'

type Logged = {
    user: any,
    update: (state:any) => void,
}

// export const useLogged = create<Logged>((set) => ({
//     user: 0,
//     update: (state) => {
//         state()
//     }),
// }));

export const useLogged = create((set) => ({
    user: {},
    fetch: async () => {
      await getUserInfo()
      .then((res) => {
          const user = res.data
          if(res.data?.error) {
            set({ user: false })
          } else {
            
              set({ user: user })
          }
      })
      .catch((e) => {
          set({ user: false })
          console.error(e)       
      })
    },
}))







// import {create} from 'zustand';

// const useAuthStore = create((set) => ({
//   user: false,
//   login: () => set({ isLoggedIn: true }),
//   logout: () => set({ isLoggedIn: false }),
// }));

// export default useAuthStore;
