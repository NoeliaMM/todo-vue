<script setup lang="ts">
import { ref } from 'vue'

const taskInput = ref('')

const tasksStore = useTasksStore()

const addTask = () => {
  if (taskInput.value.trim() === '') {
    return
  }
  if (tasksStore.tasks.some((task) => task.text === taskInput.value)) {
    alert('Task already exists')
    return
  }
  tasksStore.addTask(taskInput.value)
  taskInput.value = ''
  tasksStore.filter= 'pending'

}

import { useTasksStore } from '@/stores/tasksStore'
</script>

<template>
  <form class="w-full max-w-sm mx-auto px-4 py-2" @submit.prevent="addTask">
    <div class="flex items-center border-b-2 border-emerald-500 py-2">
      <input
        v-model="taskInput"
        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Add a task"
        aria-label="Add a task"
        @keyup.enter="addTask"
        @keyup.esc="taskInput = ''"
      />
      <div

        class="bg-emerald-500 hover:bg-emerald-700 p-1 rounded flex items-center justify-center cursor-pointer"
        aria-label="Add task"
        title="Add task"
        role="button"
        tabindex="0"
        @click="addTask"
      >
        <font-awesome-icon

        :icon="['fas', 'plus']" class="text-white text-lg"
        role="button"
            tabindex="0"
           />
      </div>
    </div>
  </form>
</template>
