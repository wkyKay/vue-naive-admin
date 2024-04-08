import { defineStore } from 'pinia'

export const useAnalysisStore = defineStore('analysis', {
  state: () => ({
    accuracy:[],
    params:[],
    ops:[]
  }),
  getters: {
    GetAccuracy(){
      return this.accuracy
    },
    GetParams(){
      return this.params
    },
    GetOps(){
      return this.ops
    }
  },
  actions: {
    setAccuracy(a){
      this.accuracy = a
    },
    setParams(p) {
      this.params = p
    },
    setOps(o){
      this.ops = o
    }
  }
})
