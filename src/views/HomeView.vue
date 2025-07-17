<script setup lang="ts">
import FilterTasks from '@/components/FilterTasks.vue';
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <main>
    <TodoForm />
    <FilterTasks />
    <TodoList />
  </main>
</template>
