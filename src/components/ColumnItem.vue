<script setup>
defineProps({ column: Object });
</script>

<template>
  <div class="flex gap-2 my-1">
    <input v-model="column.name" placeholder="컬럼명" class="border p-1 w-1/3" />
    <input v-model="column.type" placeholder="타입" class="border p-1 w-1/3" />
    <input v-model="column.description" placeholder="설명" class="border p-1 w-1/3" />
  </div>
</template>
