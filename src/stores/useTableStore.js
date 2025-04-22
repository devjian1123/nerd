import { ref } from 'vue';

export const useTableStore = () => {
  const tables = ref([
    {
      id: 'table1',
      name: 'users',
      x: 100,
      y: 150,
      columns: [
        { name: 'id', type: 'INT', description: 'primary key' },
        { name: 'email', type: 'VARCHAR(255)', description: 'user email' },
      ],
    },
    {
      id: 'table2',
      name: 'posts',
      x: 400,
      y: 300,
      columns: [
        { name: 'id', type: 'INT', description: 'primary key' },
        { name: 'title', type: 'VARCHAR(255)', description: 'post title' },
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
