<script setup>
const props = defineProps({
  table: Object,
});

const emit = defineEmits(['drag', 'dragEnd', 'columnUpdate', 'columnAdd']);

// 랜덤 col id 생성
function createColumnId() {
  return 'col_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

let startX = 0;
let startY = 0;
let dragging = false;

const startDrag = (event) => {
  startX = event.clientX;
  startY = event.clientY;
  dragging = true;

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', endDrag);
};

const onDrag = (event) => {
  if (!dragging) return;
  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;
  startX = event.clientX;
  startY = event.clientY;
  emit('drag', deltaX, deltaY);
};

const endDrag = () => {
  dragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', endDrag);
  emit('dragEnd');
};

const onColumnInput = (column, field, value) => {
  emit('columnUpdate', {
    tableId: props.table.id,
    columnId: column.id,
    field,
    value,
  });
};

function handleAddColumn() {
  const newColumn = {
    id: createColumnId(),
    name: '',
    type: '',
    description: '',
  };

  emit('columnAdd', {
    tableId: props.table.id,
    column: newColumn,
  });
}
</script>

<template>
  <div class="w-[250px] rounded border border-gray-300 bg-white p-4 shadow">
    <!-- 드래그 핸들러 영역 -->
    <div class="mb-2 cursor-move text-xs text-gray-500 select-none" @mousedown="startDrag">
      드래그하려면 박스를 클릭한 채 이동하세요
    </div>
    <input
      v-model="table.name"
      placeholder="테이블 이름"
      class="mb-2 w-full border-b border-gray-400 pb-1 text-lg font-semibold"
    />

    <div v-for="(col, idx) in table.columns" :key="col.id" class="mb-1 flex gap-2">
      <input
        v-model="col.name"
        placeholder="컬럼명"
        class="w-1/3 border px-2 py-1"
        @input="onColumnInput(col, 'name', $event.target.value)"
      />
      <input
        v-model="col.type"
        placeholder="타입"
        class="w-1/3 border px-2 py-1"
        @input="onColumnInput(col, 'type', $event.target.value)"
      />
      <input
        v-model="col.description"
        placeholder="설명"
        class="w-1/3 border px-2 py-1"
        @input="onColumnInput(col, 'description', $event.target.value)"
      />
    </div>

    <button
      @click="handleAddColumn"
      class="mt-2 cursor-pointer text-sm text-blue-500 hover:underline"
    >
      + 컬럼 추가
    </button>
  </div>
</template>

<style scoped></style>
