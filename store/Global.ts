import { defineStore } from 'pinia'
export const useGlobalStore = defineStore('global', {
    state: () => ({
        userName:null
    }),
    actions: {
      setuserName(newuserName: any){
        this.userName = newuserName
      },
    },
    getters: {
      getuserName():any{
        return this. userName
      }
    },
  
})