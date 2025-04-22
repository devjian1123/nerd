<script setup>
const props = defineProps({
  table: Object,
});

const addColumn = () => {
  props.table.columns.push({ name: '', type: '', description: '' });
};

const startDrag = (event) => {
  // 추후 드래그 동작 구현을 위해 좌표 저장 or emit 예정
  console.log('드래그 시작', event.clientX, event.clientY);
};
</script>

<template>
  <div
    class="w-[250px] cursor-move rounded border border-gray-300 bg-white p-4 shadow"
    @mousedown="startDrag"
  >
    <!-- 드래그 핸들러 영역 -->
    <div class="mb-2 text-xs text-gray-500 select-none">
      드래그하려면 박스를 클릭한 채 이동하세요
    </div>
    <input
      v-model="table.name"
      placeholder="테이블 이름"
      class="mb-2 w-full border-b border-gray-400 pb-1 text-lg font-semibold"
    />

    <div v-for="(col, idx) in table.columns" :key="idx" class="mb-1 flex gap-2">
      <input v-model="col.name" placeholder="컬럼명" class="w-1/3 border px-2 py-1" />
      <input v-model="col.type" placeholder="타입" class="w-1/3 border px-2 py-1" />
      <input v-model="col.description" placeholder="설명" class="w-1/3 border px-2 py-1" />
    </div>

    <button @click="addColumn" class="mt-2 cursor-pointer text-sm text-blue-500 hover:underline">
      + 컬럼 추가
    </button>
  </div>
</template>

<style scoped></style>
