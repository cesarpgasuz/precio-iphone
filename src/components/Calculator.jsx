function formatCurrency(value, currency = 'MXN') {
  const formatter = new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'es-MX', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  })

  return formatter.format(value)
}

const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB']
const conditionOptions = ['Excelente', 'Bueno', 'Usado']
const screenOptions = ['Original', 'Cambiada']
const batteryOriginalityOptions = ['Original', 'Reemplazada']

export default function Calculator({
  models,
  selectedModelId,
  onModelChange,
  batteryPercentage,
  setBatteryPercentage,
  storage,
  setStorage,
  condition,
  setCondition,
  screenStatus,
  setScreenStatus,
  batteryOriginality,
  setBatteryOriginality,
  result,
  currency,
}) {
  const batteryStatus =
    batteryPercentage >= 90
      ? {
          label: 'Salud Óptima',
          badgeClass: 'border-emerald-500/30 bg-emerald-50 text-emerald-700',
          dotClass: 'bg-emerald-500',
        }
      : batteryPercentage >= 80
        ? {
            label: 'Salud Aceptable',
            badgeClass: 'border-amber-500/30 bg-amber-50 text-amber-700',
            dotClass: 'bg-amber-500',
          }
        : {
            label: 'Batería Degradada',
            badgeClass: 'border-rose-500/30 bg-rose-50 text-rose-700',
            dotClass: 'bg-rose-500',
          }

  return (
    <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Calculadora</p>
          <h2 className="mt-2 text-[1.85rem] font-black leading-none tracking-[-0.05em] text-slate-900">Valora tu iPhone usado</h2>
        </div>
        <div className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold ${batteryStatus.badgeClass}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${batteryStatus.dotClass}`} />
          {batteryStatus.label}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Modelo</label>
            <select
              value={selectedModelId}
              onChange={(event) => onModelChange(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
              <label htmlFor="battery-slider">Salud de la batería</label>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                {batteryPercentage}%
              </span>
            </div>
            <input
              id="battery-slider"
              type="range"
              min="0"
              max="100"
              value={batteryPercentage}
              onChange={(event) => setBatteryPercentage(Number(event.target.value))}
              className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-900"
            />
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-slate-400">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] bg-[#0f172a] p-4 pr-5 text-white shadow-inner shadow-slate-900/20">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">Valor estimado</p>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200">
              {currency}
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-2">
            <div className="flex items-end gap-2">
              <span className="text-[1.8rem] font-black leading-none tracking-[-0.05em] text-white">{formatCurrency(result.minPrice, currency)}</span>
              <span className="mb-1 text-sm text-slate-400">a</span>
              <span className="text-[1.8rem] font-black leading-none tracking-[-0.05em] text-slate-200">{formatCurrency(result.maxPrice, currency)}</span>
            </div>
          </div>

          <div className="mt-5 border-t border-white/10 pt-3 text-sm text-slate-200">
            <div className="flex items-center justify-between gap-2">
              <span>Precio sugerido</span>
              <strong className="text-base font-bold text-white">{formatCurrency(result.estimatedValue, currency)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Almacenamiento</label>
          <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
            {storageOptions.map((option) => {
              const selected = storage === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStorage(option)}
                  className={`flex-1 rounded-lg px-2 py-1.5 text-center text-sm leading-[1.2] font-medium tracking-[0.02em] transition ${
                    selected ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Condición estética</label>
          <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
            {conditionOptions.map((option) => {
              const selected = condition === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCondition(option)}
                  className={`flex-1 rounded-lg px-2 py-2 text-center text-[11px] font-medium transition ${
                    selected ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Pantalla</label>
          <div className="flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
            {screenOptions.map((option) => {
              const selected = screenStatus === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setScreenStatus(option)}
                  className={`flex-1 rounded-lg px-2 py-2 text-center text-[11px] font-medium transition ${
                    selected ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Batería</label>
          <div className="flex gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
            {batteryOriginalityOptions.map((option) => {
              const selected = batteryOriginality === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setBatteryOriginality(option)}
                  className={`flex-1 rounded-lg px-2 py-2 text-center text-[11px] font-medium transition ${
                    selected ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {(screenStatus === 'Cambiada' || batteryOriginality === 'Reemplazada' || result.suggestedBatteryDiscount > 0) && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {screenStatus === 'Cambiada' && batteryOriginality === 'Reemplazada'
            ? `Se descuenta por pantalla cambiada y batería reemplazada: ${formatCurrency(result.suggestedBatteryDiscount, currency)}`
            : screenStatus === 'Cambiada'
              ? `Se descuenta por pantalla cambiada: ${formatCurrency(Math.round(result.estimatedValue * 0.08), currency)}`
              : `Se descuenta por batería reemplazada: ${formatCurrency(result.suggestedBatteryDiscount, currency)}`}
        </div>
      )}
    </div>
  )
}
