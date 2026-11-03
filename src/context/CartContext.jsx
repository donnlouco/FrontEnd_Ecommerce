import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const KEY = 'eh-cart-items'
const MAX_QTY = 10

function readItems() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readItems)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* sem storage */ }
  }, [items])

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: items.reduce((s, i) => s + i.price * i.qty, 0),
      maxQty: MAX_QTY,
      add(item) {
        setItems((prev) => {
          const found = prev.find((i) => i.id === item.id)
          if (found) return prev.map((i) => (i.id === item.id ? { ...i, qty: Math.min(MAX_QTY, i.qty + 1) } : i))
          return [...prev, { ...item, qty: 1 }]
        })
      },
      setQty(id, qty) {
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : i)))
      },
      remove(id) {
        setItems((prev) => prev.filter((i) => i.id !== id))
      },
      clear() {
        setItems([])
      },
    }),
    [items]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
