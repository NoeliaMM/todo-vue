<script setup lang="ts">
import { RouterLink } from 'vue-router';
import {ref} from 'vue';

const title = ref('ToDo list')
</script>

<template>
  <header>
    <div class="px-4 py-2">
        <h1 class="text-gray-800 font-bold text-2xl uppercase text-center">{{title}}</h1>
    </div>
    <div >
      <nav>
        <RouterLink to="/"></RouterLink>
      </nav>
    </div>
</header>

</template>


