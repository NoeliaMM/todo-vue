import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task, TaskId, TaskState } from '../types'

//  import {taskService } from '@/services/firebase/tasksServices';
import {taskService} from '@/services/indexDb/tasksService';

const taskFactory = (value: string): Omit<Task,'id'> => ({
  timestamp: Date.now(),
  text: value,
  completed: false,
})

export const useTasksStore = defineStore('tasksStore', () => {
  const tasks = ref<Task[]>([])

  const filter = ref<'all' | 'completed' | 'pending'>('pending')

  const loadTaskToVm = async () => {
    tasks.value = (await taskService.loadTasksFromBd()) as Task[];
  };

  const addTask = async (task: string) => {
    const taskData = taskFactory(task);
    const newTask = await taskService.addTaskToDb(taskData) as Task;
    tasks.value.push({ ...newTask});
  }

  const toggleCompleted = async (id: string | number) => {
    const task = tasks.value.find((item) => item.id === id)
    if (task) {
      const updatedCompleted = !task.completed;
      await taskService.updateTaskCompletedDb({ ...task, completed: updatedCompleted });

      const index = findIndexTask(tasks.value, id);
      if (index !== -1) {
        tasks.value[index] = { ...task, completed: updatedCompleted };
      }
    }
  }

  const removeTask = async (id:TaskId)=>{

    const index= findIndexTask(tasks.value,id)
    if(index !== -1){
      await taskService.deleteTaskDb(id);
      tasks.value.splice(index,1);
    }
  }

  const setFilter = (value: TaskState) => {
      filter.value = value;
  }

  const filterTasks = computed(() => {
    switch (filter.value) {
      case 'completed':
        return tasks.value.filter(t => t.completed)
      case 'pending':
        return tasks.value.filter(t => !t.completed)
      default:
        return tasks.value
    }
  })

  const sortedTasks = computed(() =>
    [...filterTasks.value].sort((a, b) => {
      if (typeof a.id === 'number' && typeof b.id === 'number') {
        return b.id - a.id
      }
      return String(b.id).localeCompare(String(a.id))
    })
  )


  return { tasks,filter, addTask, toggleCompleted, removeTask, loadTaskToVm,setFilter,filterTasks,sortedTasks }
})

const findIndexTask =(tasks:Task[], id:TaskId) =>{
  return tasks.findIndex((task => task.id === id));
}
