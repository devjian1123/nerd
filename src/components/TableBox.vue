<script setup>
import ColumnItem from '@/components/ColumnItem.vue';
import { reactive } from 'vue';

const props = defineProps({ table: Object, onDelete: Function });

const addColumn = () => {
  props.table.columns.push({ name: '', type: '', description: '' });
};
</script>

<template>
  <div class="border p-4 rounded bg-white shadow mb-4">
    <input v-model="table.name" placeholder="테이블 이름" class="mb-2 p-1 border" />

    <div v-for="(col, idx) in table.columns" :key="idx">
      <ColumnItem :column="col" />
    </div>

    <button @click="addColumn" class="text-sm text-blue-500 mt-2">+ 컬럼 추가</button>
    <button @click="onDelete" class="text-sm text-red-500 ml-2">삭제</button>
  </div>
</template>
