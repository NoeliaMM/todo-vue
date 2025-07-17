<script setup lang="ts">
import { useTasksStore } from '@/stores/tasksStore'
import type { Task, TaskId } from '@/types'
import { onMounted, ref } from 'vue'
import moment from 'moment'
import { useTaskEditionStore } from '@/stores/taskEditionStore'

const tasksStore = useTasksStore()
const taskEdition = useTaskEditionStore()
const editedText = ref('')

onMounted(async () => {
  await tasksStore.loadTaskToVm()
})

const completeTask = (id: TaskId) => {
  tasksStore.toggleCompleted(id)
}

const removeTask = (id: TaskId) => {
  tasksStore.removeTask(id)
}

const saveEdit = (task: Task) => {
  if (editedText.value.trim() === '') {
    return
  }
  taskEdition.updateText(task, editedText.value)
  taskEdition.cancel()
}

const selectInputText = (event: FocusEvent) => {
  ;(event.target as HTMLInputElement).select()
}
</script>

<template>
  <ul class="divide-y divide-gray-200 px-4 mt-5" role="list">
    <li class="py-4" v-for="task in tasksStore.sortedTasks" :key="task.id">
      <form @submit.prevent>
        <div class="flex items-center justify-between">
          <font-awesome-icon
            :icon="task.completed ? ['fas', 'check-square'] : ['far', 'square']"
            class="text-emerald-500 cursor-pointer"
            @click="completeTask(task.id)"
            title="Complete task"
            aria-label="Complete task"
            role="button"
          />
          <div class="ml-3 mr-auto">
            <template v-if="taskEdition.editingTaskId === task.id && tasksStore.filter != 'completed'">
              <input
                v-model="editedText"
                @keyup.enter="saveEdit(task)"
                @blur="saveEdit(task)"
                @keyup.esc="taskEdition.cancel"
                @focus="selectInputText"
                class="border px-2 py-1 rounded"
                aria-label="Edit text task"
                autofocus
              />
            </template>
            <template v-else>
              <label
                class="block text-gray-900 cursor-pointer"
                :class="{ 'line-through text-gray-400': task.completed }"
                @dblclick="
                  () => {
                    taskEdition.start(task.id)
                    editedText = task.text
                  }
                "
              >
                <span class="text-lg font-medium">{{ task.text }}</span>
                <span class="text-sm font-light text-gray-500 ml-3">
                  ( {{ moment(task.timestamp).format('DD/MM/YYYY') }} )
                </span>
              </label>
            </template>
          </div>

          <font-awesome-icon
            icon="trash"
            title="Remove"
            aria-label="Remove task"
            role="button"
            tabindex="0"
            @click="removeTask(task.id)"
            @keydown.enter="removeTask(task.id)"
            style="cursor: pointer; color: red"
          />
        </div>
      </form>
    </li>
    <li v-if="tasksStore.filterTasks.length === 0" class="py-4">
      <p class="text-gray-500 text-center">No {{tasksStore.filter !='all' ? tasksStore.filter :''}} tasks</p>
    </li>
  </ul>
</template>
