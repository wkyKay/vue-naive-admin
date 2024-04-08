import { defineStore } from 'pinia'

export const useModelStore = defineStore('model', {
  state: () => ({
    model_info: {
      dataset: null,
      method: null,
      isDefault: true,
      model_type: '',
      example_input: [1,3,224,224],
      ratio: 50,
      save_location: null,
      model_params: null,
      ifFineTuning: false,
    },
    train_info: {
      epochs: 20,
      lr: 0.01,
      print_freq: 100,
      batch_size: 128,
    },
  }),
  getters: {
    getModelInfo() {
      return this.model_info;
    },
    getTrainInfo() {
      return this.train_info;
    }
  },
  actions: {
    setModelInfo(model) {
      const {
        dataset,
        method,
        isDefault,
        model_type,
        example_input,
        ratio,
        save_location,
        model_params,
        ifFineTuning,
      } = model;

      this.model_info.dataset = dataset || '123';
      this.model_info.method = method || '';
      this.model_info.isDefault = isDefault || true;
      this.model_info.model_type = model_type || '';
      this.model_info.example_input = example_input || [];
      this.model_info.ratio = ratio || 50;
      this.model_info.save_location = save_location || null;
      this.model_info.model_params = model_params || null;
      this.model_info.ifFineTuning = ifFineTuning || false;
    },

    setTrainInfo(train) {
      const {
        epochs,
        lr,
        print_freq,
        batch_size,
      } = train

      this.train_info.epochs = epochs || 20;
      this.train_info.lr = lr || 0.01
      this.train_info.batch_size = batch_size || 128;
      this.train_info.print_freq = print_freq || 100;
    }
  }
})
