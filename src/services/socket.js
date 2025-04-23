import { useTableStore } from '@/stores/useTableStore';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const client = new Client({
  webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
  reconnectDelay: 5000,
  onConnect: () => {
    console.log('🔗 WebSocket connected');

    client.subscribe('/topic/position', (message) => {
      const data = JSON.parse(message.body);
      console.log('📦 Position update received:', data);

      // 위치 업데이트 → 전역 상태 관리 or emit 등으로 연결
      const store = useTableStore();
      store.updateTablePosition(data);
    });
  },
});

export function connectWebSocket() {
  if (!client.active) client.activate();
}

export function sendPosition(x, y, tableId) {
  client.publish({
    destination: '/app/move',
    body: JSON.stringify({ x, y, tableId }),
  });
}
