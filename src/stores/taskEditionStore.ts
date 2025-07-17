import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTasksStore } from './tasksStore'
import type { Task, TaskId } from '@/types'
import { taskService } from '@/services/indexDb/tasksService'

export const useTaskEditionStore = defineStore('taskEdition', () => {
  const tasksStore = useTasksStore()
  const tasks = tasksStore.tasks

  const editingTaskId = ref<TaskId | null>(null)

  const updateText = async (task: Task, newText: string) => {
    console.log(task, newText)
    await taskService.updateTaskCompletedDb({ ...task, text: newText })
    if (task) task.text = newText
  }

  const start = (id: TaskId) => {
    editingTaskId.value = id
  }

  const cancel = () => {
    editingTaskId.value = null
  }

  return {
    tasks,
    editingTaskId,
    updateText,
    start,
    cancel,
  }
})
