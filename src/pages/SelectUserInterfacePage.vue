<template>
    <q-page class="flex column flex-center">
        <p class="text-h6 text-center">Please select a user interface</p>
        <div class="user-interface">
            <q-card v-for="(type, index) in userInterfaceTypes" :key="index" class="ui-card"
                :class="{ 'selected': selectedId === type.id }" @click="selectCard(type.id)">
                <div v-if="type.name === 'Pro User'" class="card-label">{{ type.name }}</div>
                <div :class="type.container">
                    <div :class="type.input" class="card">Inputs</div>
                    <div :class="type.output" class="card">Outputs</div>
                    <button :class="type.button">Button</button>
                    <div v-if="type.chart" :class="type.graph" class="card">Graph</div>
                </div>
            </q-card>
        </div>
        <q-card-actions align="center">
            <q-btn label="Next" color="primary" :disabled="!selectedId" @click="handleClickNext" />
        </q-card-actions>
    </q-page>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useUserSelectionStore } from 'src/stores/userSelection';
import { useRouter } from 'vue-router';

const router = useRouter();
const userSelectionStore = useUserSelectionStore();

const userInterfaceTypes = ref([
    {
        id: 1,
        name: '',
        container: 'container1',
        input: 'input1',
        output: 'output1',
        button: 'button1',
        chart: false,
    },
    {
        id: 2,
        name: '',
        container: 'container2',
        input: '',
        output: '',
        button: '',
        chart: false,
    },
    {
        id: 3,
        name: '',
        container: 'container3',
        input: 'input3',
        output: 'output3',
        button: 'button3',
        chart: false,
    },
    {
        id: 4,
        name: 'Pro User',
        container: 'container4',
        input: 'input4',
        output: 'output4',
        button: 'button4',
        graph: 'graph',
        chart: true,
    }
]);

const selectedId = computed(() => {
    return userSelectionStore.getSelectedUserInterface;
});
const selectCard = (id) => {
    selectedId.value = id;
    userSelectionStore.setSelectedUserInterface(id);
};

const handleClickNext = () => {
    router.push('/calculation');
};
</script>

<style scoped>
.user-interface {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 50px;
    padding: 20px;
}

.ui-card {
    position: relative;
    width: 250px;
    cursor: pointer;
}

.ui-card.selected {
    border: 2px solid rgb(77, 77, 218);
}

.card-label {
    position: absolute;
    top: -20px;
    left: -35px;
    background-color: rgb(255, 0, 0);
    color: white;
    padding: 0.25rem;
    transform: rotate(-45deg);
}

.card {
    background-color: rgb(170, 170, 170);
}

.container1 {
    padding: 0.5rem;
    display: grid;
    grid-template-columns: repeat(2, 3fr);
    grid-template-rows: 3fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
}

.input1 {
    grid-area: 1 / 1 / 2 / 2;
}

.output1 {
    grid-area: 1 / 2 / 2 / 3;
}

.button1 {
    grid-area: 2 / 1 / 3 / 2;
}

.container2 {
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 3fr;
    grid-template-rows: repeat(2, 2fr) 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
}

.container3 {
    padding: 0.5rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
}

.input3 {
    grid-area: 1 / 1 / 3 / 4;
}

.output3 {
    grid-area: 3 / 1 / 5 / 4;
}

.button3 {
    grid-area: 1 / 4 / 5 / 6;
    width: 100%;
    height: 150px;
}

.container4 {
    padding: 0.5rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
}

.input4 {
    grid-area: 1 / 1 / 3 / 4;
}

.output4 {
    grid-area: 3 / 1 / 5 / 4;
}

.button4 {
    grid-area: 5 / 2 / 6 / 3;
}

.graph {
    grid-area: 1 / 4 / 5 / 6;
    width: 100%;
    height: auto;
}
</style>



