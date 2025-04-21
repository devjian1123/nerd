<script setup>
import TableBox from '@/components/TableBox.vue';
import { useTableStore } from '@/stores/useTableStore';

const { tables, addTable, removeTable } = useTableStore();
</script>

<template>
  <div class="p-6">
    <button @click="addTable" class="mb-4 bg-blue-500 text-white px-3 py-1 rounded">
      + 테이블 추가
    </button>

    <TableBox
      v-for="table in tables"
      :key="table.id"
      :table="table"
      :onDelete="() => removeTable(table.id)"
    />
  </div>
</template>
