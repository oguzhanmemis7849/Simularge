<template>
  <div class="flex row flex-center">
    <q-page class="flex column flex-center q-gutter-md">
      <Card v-if="inputForm" :form="inputForm" @execute="handleClickExecute">
        <template #input1>
          <q-input v-model="x" outlined type="number" :label="inputForm.ID1.label" class="full-width" />
        </template>
        <template #input2>
          <q-input v-model="y" type="number" outlined :label="inputForm.ID2.label" class="full-width" />
        </template>
      </Card>
      <Card v-if="outputForm" :form="outputForm" :input1="addition" :input2="multiplication"
        @showHideChart="handleClickShowChart">
        <template #input1>
          <q-input v-model="addition" outlined type="number" :label="outputForm.ID1.label" class="full-width" />
        </template>
        <template #input2>
          <q-input v-model="multiplication" type="number" outlined :label="outputForm.ID2.label" class="full-width" />
        </template>
      </Card>
    </q-page>
    <Chart v-if="showChart" :xAxis="operationList" :yAxis="additionResultList"></Chart>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useFormStore } from 'src/stores/form';
import Card from 'src/components/Card.vue';
import Chart from 'src/components/Chart.vue';

const formStore = useFormStore();

const $q = useQuasar();

const getInputsAndOutputs = async () => {
  const { success, error, data } = await formStore.getInputsAndOutputs();
  if (success) {
    formStore.setInputForm(data.inputs);
    formStore.setOutputForm(data.outputs);
  } else {
    $q.notify({
      color: 'negative',
      position: 'bottom',
      message: error,
    });
  }
};

const inputForm = computed(() => formStore.getInputForm);
const outputForm = computed(() => formStore.getOutputForm);
const changeOutputForm = () => {
  const oldOutputForm = { ...outputForm.value };
  formStore.setOutputForm({ ...oldOutputForm, ID3: { ...oldOutputForm.ID3, disabled: !oldOutputForm.ID3.disabled } });
}

const handleClickShowChart = () => {
  changeOutputForm();
}
const showChart = computed(() => outputForm?.value?.ID3?.disabled || false);

const x = computed({
  get: () => formStore.getX,
  set: (value) => formStore.setX(value),
});
const y = computed({
  get: () => formStore.getY,
  set: (value) => formStore.setY(value),
});

const addition = computed(() => formStore.getAddition);
const multiplication = computed(() => formStore.getMultiplication);

const handleClickExecute = () => {
  formStore.executeCalculation();
}

const operationList = computed(() => formStore.getOperationList);
const additionResultList = computed(() => formStore.getAdditionResultList);

onMounted(getInputsAndOutputs);
</script>

<style scoped></style>
