<template>
    <div class="flex column q-gutter-md">
        <q-card class="card">
            <q-card-section class="card-section">
                <q-field :readonly="form.ID0.disabled" :bg-color="form.ID0['bg-color']" filled class="full-width">
                    <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0">{{ form.ID0.label }}</div>
                    </template>
                </q-field>
            </q-card-section>

            <q-card-section class="card-section ">
                <slot name="input1" />
            </q-card-section>

            <q-card-section class="card-section ">
                <slot name="input2" />
            </q-card-section>
        </q-card>
        <q-btn v-if="form.ID3" @click="handleClickShowHideChart"
            :color="form.ID3.disabled ? form.ID3['bg-color2'] : form.ID3['bg-color']">{{
                form.ID3.disabled ? form.ID3.label2 : form.ID3.label }}</q-btn>
        <q-btn v-else color="green" @click="handleClickExecute">Execute</q-btn>
    </div>
</template>

<script setup>
const props = defineProps({
    form: Object,
    input1: Number,
    input2: Number,
});

const emits = defineEmits(['showHideChart', 'execute']);

const handleClickExecute = () => {
    emits('execute');
};

const handleClickShowHideChart = () => {
    emits('showHideChart')
};

</script>

<style scoped>
.card {
    max-width: 400px;
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    height: 350px;
    font-size: 20px;
    color: #000;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.card-section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>
