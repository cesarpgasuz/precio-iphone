function formatCurrency(value, currency = 'MXN') {
  const formatter = new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'es-MX', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  })

  return formatter.format(value)
}

export default function PriceTable({ models, searchTerm, onSearchChange, onSelectModel, currency }) {
  const filteredModels = models.filter((model) =>
    model.modelName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Catálogo</p>
          <h3 className="mt-1 text-xl font-bold text-slate-900">Tabla de precios guía</h3>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar modelo..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none sm:max-w-xs"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Modelo</th>
                <th className="px-4 py-3 font-semibold">Año</th>
                <th className="px-4 py-3 font-semibold">Base</th>
                <th className="px-4 py-3 font-semibold">Rango actual</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((model) => (
                <tr
                  key={model.modelId}
                  onClick={() => onSelectModel(model.modelId)}
                  className="cursor-pointer border-t border-slate-200 bg-white transition hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{model.modelName}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{model.releaseYear}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700">
                      {formatCurrency(model.baseMsrpMXN, currency)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                      {formatCurrency(model.minPrice, currency)} - {formatCurrency(model.maxPrice, currency)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
