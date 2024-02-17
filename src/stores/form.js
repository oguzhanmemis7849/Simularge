import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { simplifyFirestoreData } from 'src/utils';

export const useFormStore = defineStore('form', {
    state: () => ({
        inputForm: null,
        outputForm: null,
        x: null,
        y: null,
        addition: null,
        multiplication: null,
        operationCounter: 0,
        allOperations: [],
        allAdditionResults: [],
        operationList: [],
        additionResultList: []
    }),
    actions: {
        async getInputsAndOutputs() {
            try {
                const response = await api.get();
                const parsedData = simplifyFirestoreData(response.data.fields);
                return { success: true, data: parsedData };
            } catch (error) {
                return { success: false, error: error.message };
            }
        },
        setInputForm(inputForm) {
            this.inputForm = inputForm;
        },
        setOutputForm(outputForm) {
            this.outputForm = outputForm;
        },
        setX(x) {
            this.x = x;
        },
        setY(y) {
            this.y = y;
        },
        executeCalculation() {
            if (this.x && this.y) {
                this.addition = parseInt(this.x) + parseInt(this.y);
                this.multiplication = parseInt(this.x) * parseInt(this.y);
                this.operationCounter++;
                this.allOperations.push(this.operationCounter);
                this.allAdditionResults.push(this.addition);
                // Last 5 operations and results
                if (this.operationCounter > 5) {
                    this.operationList = this.allOperations.slice(-5);
                    this.additionResultList = this.allAdditionResults.slice(-5);
                } else {
                    this.operationList.push(this.operationCounter);
                    this.additionResultList.push(this.addition);
                }

            }
        },

    },
    getters: {
        getInputForm: (state) => state.inputForm,
        getOutputForm: (state) => state.outputForm,
        getX: (state) => state.x,
        getY: (state) => state.y,
        getAddition: (state) => state.addition,
        getMultiplication: (state) => state.multiplication,
        getOperationList: (state) => state.operationList,
        getAdditionResultList: (state) => state.additionResultList,
    },
});
