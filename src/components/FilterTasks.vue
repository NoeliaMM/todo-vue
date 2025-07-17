<script setup lang="ts">
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()
</script>

<template>


<div class="flex  px-4 text-sm font-medium  text-center text-grey-500  justify-end mr-6">
    <ul class="flex flex-wrap -mb-px">
      <li class="me-2">
        <button
          @click="tasksStore.setFilter('pending')"
          :class="[
            'inline-block p-4 border-b-2 rounded-t-lg',
            tasksStore.filter === 'pending'
              ? 'text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500'
              : 'border-transparent hover:text-emerald-300 hover:border-emerald-300'
          ]"
        >
          Pending
        </button>
      </li>
        <li class="me-2">
          <button
          @click="tasksStore.setFilter('completed')"
          :class="[
            'inline-block p-4 border-b-2 rounded-t-lg',
            tasksStore.filter === 'completed'
              ? 'text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500'
              : 'border-transparent hover:text-emerald-300 hover:border-emerald-300'
          ]"
        >
          Completed
        </button>
        </li>
        <li class="me-2">
        <button
          @click="tasksStore.setFilter('all')"
          :class="[
            'inline-block p-4 border-b-2 rounded-t-lg',
            tasksStore.filter === 'all'
              ? 'text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500'
              : 'border-transparent hover:text-emerald-300 hover:border-emerald-300'
          ]"
        >
          All
        </button>
      </li>
    </ul>
</div>
</template>
