const tips = [
  {
    title: 'Salud de la batería',
    text: 'La batería influye mucho en el valor. Busca un diagnóstico real antes de cerrar una compra.',
  },
  {
    title: 'IMEI y bloqueo',
    text: 'Verifica que el IMEI coincida y que el equipo no esté reportado ni bloqueado por activación.',
  },
  {
    title: 'Pantalla original',
    text: 'Una pantalla original o bien reparada ayuda a conservar el valor y evita sorpresas futuras.',
  },
  {
    title: 'Estado estético',
    text: 'Rayones visibles, marcos dañados o biseles con golpes pueden justificar un descuento razonable.',
  },
]

export default function TipsGuide() {
  return (
    <div className="space-y-4">
      <div className="pt-2">
        <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-900">Factores que afectan el valor</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tips.map((tip) => (
          <div key={tip.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
              i
            </div>
            <p className="text-base font-bold text-slate-900">{tip.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{tip.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h4 className="text-lg font-bold text-slate-900">Consejos rápidos antes de comprar o vender</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">✓</span>
            <p className="text-sm text-slate-700">Revisa que la pantalla y carcasa estén en el estado descrito.</p>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">✓</span>
            <p className="text-sm text-slate-700">Confirma la salud real de la batería con una app o diagnóstico.</p>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">✓</span>
            <p className="text-sm text-slate-700">Compara el IMEI y el número de serie antes de pagar.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
