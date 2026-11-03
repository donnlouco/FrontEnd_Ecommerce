export const CATS = {
  cpu: 'Processadores',
  gpu: 'Placas de vídeo',
  ram: 'Memórias',
  ssd: 'SSDs',
  board: 'Placas-mãe',
}

export const BRANDS = ['AMD', 'Intel', 'ASUS', 'Gigabyte', 'Kingston']

// price = valor à vista no Pix (já com 5% de desconto); a parcela em 12x é calculada sobre price / 0,95
export const PRODUCTS = [
  { id: 1, cat: 'cpu', brand: 'AMD', name: 'Ryzen 7 7700', spec: '8 núcleos • 16 threads • AM5', price: 1899.9, old: 2199.9, tag: 'Mais vendido', rev: 48, art: { kind: 'cpu', arg: 'RYZEN 7' }, stock: true, rel: 100 },
  { id: 2, cat: 'gpu', brand: 'Gigabyte', name: 'GeForce RTX 4060', spec: '8 GB GDDR6 • DLSS 3 • PCIe 4.0', price: 2199.9, old: 2599.9, tag: 'Oferta da semana', rev: 48, art: { kind: 'gpu' }, stock: true, rel: 98 },
  { id: 3, cat: 'ram', brand: 'Kingston', name: 'Fury Beast 32 GB', spec: '2×16 GB • DDR5 • 5600 MHz', price: 649.9, old: 749.9, tag: 'Pronta entrega', rev: 48, art: { kind: 'ram', arg: 'FURY' }, stock: true, rel: 96 },
  { id: 4, cat: 'ssd', brand: 'Kingston', name: 'SSD NV2 1 TB', spec: 'NVMe M.2 • PCIe 4.0 • 3.500 MB/s', price: 449.9, old: 529.9, tag: 'Melhor custo-benefício', rev: 48, art: { kind: 'ssd' }, stock: true, rel: 94 },
  { id: 5, cat: 'board', brand: 'ASUS', name: 'TUF Gaming B650M-Plus', spec: 'AM5 • DDR5 • Micro ATX • Wi-Fi', price: 1299.9, old: 1499.9, tag: 'Wi-Fi integrado', rev: 48, art: { kind: 'board', arg: '#e3a72f' }, stock: true, rel: 92 },
  { id: 6, cat: 'cpu', brand: 'Intel', name: 'Core i5-14400F', spec: '10 núcleos • 16 threads • LGA 1700', price: 1249.9, old: 1449.9, tag: 'Pronta entrega', rev: 48, art: { kind: 'intel' }, stock: true, rel: 90 },
  { id: 7, cat: 'cpu', brand: 'AMD', name: 'Ryzen 5 7600', spec: '6 núcleos • 12 threads • AM5', price: 1399.9, old: 1599.9, tag: 'Pronta entrega', rev: 31, art: { kind: 'cpu', arg: 'RYZEN 5' }, stock: true, rel: 80 },
  { id: 8, cat: 'gpu', brand: 'ASUS', name: 'Radeon RX 7600 Dual', spec: '8 GB GDDR6 • PCIe 4.0 • HDMI 2.1', price: 1799.9, old: 2099.9, tag: 'Oferta da semana', rev: 22, art: { kind: 'gpu', arg: '#ff5a36' }, stock: true, rel: 78 },
  { id: 9, cat: 'cpu', brand: 'Intel', name: 'Core i7-14700K', spec: '20 núcleos • 28 threads • LGA 1700', price: 2999.9, old: 3399.9, tag: 'Alto desempenho', rev: 17, art: { kind: 'intel' }, stock: false, rel: 70 },
  { id: 10, cat: 'ram', brand: 'Kingston', name: 'Fury Beast 16 GB', spec: '1×16 GB • DDR5 • 5200 MHz', price: 349.9, old: 399.9, tag: 'Mais vendido', rev: 64, art: { kind: 'ram', arg: 'FURY' }, stock: true, rel: 88 },
  { id: 11, cat: 'ssd', brand: 'Kingston', name: 'SSD NV2 2 TB', spec: 'NVMe M.2 • PCIe 4.0 • 3.500 MB/s', price: 799.9, old: 899.9, tag: 'Pronta entrega', rev: 26, art: { kind: 'ssd' }, stock: true, rel: 76 },
  { id: 12, cat: 'board', brand: 'Gigabyte', name: 'B760M DS3H', spec: 'LGA 1700 • DDR5 • Micro ATX', price: 799.9, old: 899.9, tag: 'Melhor custo-benefício', rev: 29, art: { kind: 'board' }, stock: true, rel: 74 },
]

// Ilustração de um item do carrinho (que guarda só cat e brand)
export function artForItem(item) {
  if (item.cat === 'cpu') return { kind: item.brand === 'Intel' ? 'intel' : 'cpu', arg: 'RYZEN 7' }
  return { kind: item.cat }
}
