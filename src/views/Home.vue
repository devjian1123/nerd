<script setup>
import TableBox from '@/components/TableBox.vue';
import { connectWebSocket, sendPosition } from '@/services/socket';
import { useTableStore } from '@/stores/useTableStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

// Pinia 스토어 인스턴스 가져오기
const tableStore = useTableStore();

// storeToRefs를 사용해 tables를 반응형으로 구조분해
const { tables } = storeToRefs(tableStore);
const { addTable, removeTable } = tableStore;
const isSidebarOpen = ref(false);

onMounted(() => {
  connectWebSocket();
});

const handleDrag = (table, deltaX, deltaY) => {
  table.x += deltaX;
  table.y += deltaY;
};
</script>

<template>
  <div class="relative flex h-screen">
    <!-- 왼쪽 사이드바 -->
    <aside
      class="fixed top-0 left-0 z-30 h-full border-r border-gray-300 bg-white transition-transform duration-300"
      :class="isSidebarOpen ? 'w-64 translate-x-0 p-4' : 'w-64 -translate-x-full p-4'"
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold">메뉴</h2>
        <button @click="isSidebarOpen = false" class="text-gray-500 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <button @click="addTable" class="mb-2 w-full rounded bg-blue-500 px-4 py-2 text-white">
        + 테이블 추가
      </button>
      <ul class="text-sm text-gray-700">
        <li v-for="table in tables" :key="table.id" class="py-1">
          • {{ table.name || '이름 없음' }}
        </li>
      </ul>
    </aside>

    <!-- 딤처리 배경 -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-10 bg-black opacity-20 transition-opacity duration-300"
      @click="isSidebarOpen = false"
    ></div>

    <!-- 오른쪽 메인 캔버스 -->
    <main class="relative z-0 ml-0 flex-1 overflow-auto bg-gray-100">
      <!-- 상단 헤더 -->
      <header
        class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-300 bg-white px-6 py-3 shadow"
      >
        <div class="flex items-center gap-3">
          <button
            v-if="!isSidebarOpen"
            @click="isSidebarOpen = true"
            class="text-gray-500 hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <h1 class="text-2xl font-semibold">ERDoc 작업 화면</h1>
        </div>
      </header>

      <!-- 테이블 캔버스 -->
      <div class="relative h-[1200px]">
        <div
          v-for="table in tables"
          :key="table.id"
          class="absolute"
          :style="{ left: table.x + 'px', top: table.y + 'px' }"
        >
          <TableBox
            :table="table"
            @drag="(dx, dy) => handleDrag(table, dx, dy)"
            @dragEnd="() => sendPosition(table.x, table.y, table.id)"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
