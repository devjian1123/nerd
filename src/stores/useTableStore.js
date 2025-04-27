import { defineStore } from 'pinia';

export const useTableStore = defineStore('table', {
  state: () => ({
    tables: [
      {
        id: 'table1',
        name: 'users',
        x: 100,
        y: 150,
        columns: [
          { id: 'col1', name: 'id', type: 'INT', description: 'primary key' },
          { id: 'col2', name: 'email', type: 'VARCHAR(255)', description: 'user email' },
        ],
      },
      {
        id: 'table2',
        name: 'posts',
        x: 400,
        y: 300,
        columns: [
          { id: 'col3', name: 'id', type: 'INT', description: 'primary key' },
          { id: 'col4', name: 'title', type: 'VARCHAR(255)', description: 'post title' },
        ],
      },
    ],
  }),
  actions: {
    addTable() {
      this.tables.push({
        id: `table_${Date.now()}`,
        name: '',
        x: 0,
        y: 0,
        columns: [],
      });
    },
    removeTable(id) {
      this.tables = this.tables.filter((t) => t.id !== id);
    },
    updateTablePosition({ tableId, x, y }) {
      const table = this.tables.find((t) => t.id === tableId);
      if (table) {
        table.x = x;
        table.y = y;
      }
    },
    updateColumnField({ tableId, columnId, field, value }) {
      const table = this.tables.find((t) => t.id === tableId);
      if (!table) return;

      const column = table.columns.find((c) => c.id === columnId);
      if (!column) return;

      column[field] = value;
    },
    addColumnToTable({ tableId, column }) {
      const table = this.tables.find((t) => t.id === tableId);
      if (!table) return;

      table.columns.push(column);
    },
  },
});
