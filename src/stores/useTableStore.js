import { ref } from 'vue';

export const useTableStore = () => {
  const tables = ref([
    {
      id: 'table_1',
      name: 'users',
      columns: [
        { name: 'id', type: 'INT', description: '' },
        { name: 'email', type: 'VARCHAR(255)', description: '' },
      ],
    },
  ]);

  const addTable = () => {
    tables.value.push({
      id: `table_${Date.now()}`,
      name: '',
      columns: [],
    });
  };

  const removeTable = (id) => {
    tables.value = tables.value.filter((t) => t.id !== id);
  };

  return { tables, addTable, removeTable };
};
