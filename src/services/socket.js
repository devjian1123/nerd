import { useTableStore } from '@/stores/useTableStore';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const socketUrl = import.meta.env.VITE_SOCKET_URL;

const client = new Client({
  webSocketFactory: () => new SockJS(socketUrl),
  reconnectDelay: 5000,
});

export function connectWebSocket(projectId) {
  client.onConnect = () => {
    console.log('🔗 WebSocket connected');

    const store = useTableStore();

    client.subscribe(`/topic/projects/${projectId}/position`, (message) => {
      const data = JSON.parse(message.body);
      console.log('📦 Position update received:', data);

      store.updateTablePosition(data);
    });

    client.subscribe(`/topic/projects/${projectId}/column/update`, (message) => {
      const data = JSON.parse(message.body);
      console.log('📦 Column update received:', data);

      store.updateColumnField(data);
    });

    client.subscribe(`/topic/projects/${projectId}/column/add`, (message) => {
      const data = JSON.parse(message.body);
      console.log('📦 Column add received:', data);
      const store = useTableStore();
      store.addColumnToTable(data);
    });
  };

  if (!client.active) client.activate();
}

export function sendPosition(x, y, projectId, tableId) {
  client.publish({
    destination: `/app/projects/${projectId}/move`,
    body: JSON.stringify({ x, y, tableId }),
  });
}

export function sendColumnUpdate({ projectId, tableId, columnId, field, value }) {
  client.publish({
    destination: `/app/projects/${projectId}/column/update`,
    body: JSON.stringify({ tableId, columnId, field, value }),
  });
}

export function sendColumnAdd({ projectId, tableId, column }) {
  client.publish({
    destination: `/app/projects/${projectId}/column/add`,
    body: JSON.stringify({ tableId, column }),
  });
}
