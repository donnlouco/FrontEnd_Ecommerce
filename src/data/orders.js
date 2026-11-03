// Pedidos de demonstração. Quando o back-end estiver ligado, vêm de api.listOrders().
// DEMO_TODAY fixa a "data de hoje" para os filtros de período não esvaziarem a lista com o tempo.
export const DEMO_TODAY = new Date(2026, 10, 1)

export const ORDERS = [
  { id: 'EH10482', date: new Date(2026, 9, 28), label: '28 out. 2026', status: 'transit', name: 'GeForce RTX 4060 + SSD NV2 1 TB', meta: '2 itens • Pagamento via Pix', total: 2589.8, art: 'gpu', track: 'Seu upgrade está a caminho. Entrega prevista: 03 nov.' },
  { id: 'EH10391', date: new Date(2026, 9, 20), label: '20 out. 2026', status: 'done', name: 'Ryzen 7 7700 + Fury Beast 32 GB', meta: '2 itens • Pagamento via Pix', total: 2549.8, art: 'cpu' },
  { id: 'EH10322', date: new Date(2026, 9, 15), label: '15 out. 2026', status: 'pick', name: 'TUF Gaming B650M-Plus', meta: '1 item • Pagamento via Pix', total: 1299.9, art: 'board' },
  { id: 'EH10264', date: new Date(2026, 9, 8), label: '08 out. 2026', status: 'cancel', name: 'Core i5-14400F', meta: '1 item • Pagamento via Pix', total: 1249.9, art: 'intel' },
]

export const STATUS = {
  transit: ['Em transporte', 'b-transit'],
  done: ['Entregue', 'b-done'],
  pick: ['Em separação', 'b-pick'],
  cancel: ['Cancelado', 'b-cancel'],
}
