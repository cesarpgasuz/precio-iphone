export default function Header({ currency, onCurrencyChange }) {
  const currentLabel = new Date().toLocaleDateString('es-MX', {
    month: 'short',
    year: 'numeric',
  })

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[860px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white shadow-sm">
            i
          </div>
          <div>
            <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-slate-500">Price Check</p>
            <h1 className="text-base font-bold text-slate-900">iCheck Price</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {currentLabel}
          </div>

          <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm text-slate-700 shadow-sm">
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-500">Moneda</span>
            <select
              value={currency}
              onChange={(event) => onCurrencyChange(event.target.value)}
              className="bg-transparent text-sm font-medium text-slate-900 outline-none"
              aria-label="Cambiar moneda"
            >
              <option value="MXN">MXN</option>
              <option value="USD">USD</option>
            </select>
          </label>
        </div>
      </div>
    </header>
  )
}
