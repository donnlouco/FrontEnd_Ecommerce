// Link de página que ainda não existe (Termos, Ajuda...). Não rola a tela para o topo.
export default function DeadLink({ children, ...rest }) {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} {...rest}>
      {children}
    </a>
  )
}
