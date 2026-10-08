import { useEffect, useMemo, useState } from 'react'
import Calculator from './components/Calculator.jsx'
import Header from './components/Header.jsx'
import PriceTable from './components/PriceTable.jsx'
import TipsGuide from './components/TipsGuide.jsx'
import { IPHONE_MODELS } from './data/iphoneData.js'
import { calculatePriceRangeForModelId, getAllModelPriceRanges } from './utils/calculator.js'

function App() {
  const [currency, setCurrency] = useState('MXN')
  const [selectedModelId, setSelectedModelId] = useState('iphone-13')
  const [batteryPercentage, setBatteryPercentage] = useState(92)
  const [storage, setStorage] = useState('128GB')
  const [condition, setCondition] = useState('Excelente')
  const [screenStatus, setScreenStatus] = useState('Original')
  const [batteryOriginality, setBatteryOriginality] = useState('Original')
  const [searchTerm, setSearchTerm] = useState('')

  const selectedModel = IPHONE_MODELS.find((model) => model.id === selectedModelId) ?? IPHONE_MODELS[0]

  useEffect(() => {
    if (!selectedModel.availableStorages.includes(storage)) {
      setStorage(selectedModel.availableStorages[0])
    }
  }, [selectedModel, storage])

  const result = useMemo(
    () =>
      calculatePriceRangeForModelId(selectedModelId, {
        batteryPercentage,
        storage,
        condition,
        screenStatus,
        batteryOriginality,
        currency,
      }),
    [selectedModelId, batteryPercentage, storage, condition, screenStatus, batteryOriginality, currency],
  )

  const priceTable = useMemo(
    () =>
      getAllModelPriceRanges({
        currency,
        batteryPercentage: 85,
        storage: '128GB',
        condition: 'Bueno',
      }),
    [currency],
  )

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-slate-900">
      <Header currency={currency} onCurrencyChange={setCurrency} />

      <main className="mx-auto max-w-[860px] px-4 py-4 sm:px-6 lg:px-8">
        <section className="mb-4 pt-2 text-center">
          <h2 className="text-[2.2rem] font-black leading-none tracking-[-0.06em] text-slate-900">¿Cuánto vale tu iPhone usado?</h2>
          <p className="mx-auto mt-2 max-w-xl text-[13px] text-slate-500">
            Estima el precio justo de tu equipo según el modelo, la salud de la batería, el almacenamiento y el estado estético.
          </p>
        </section>

        <section className="mb-8">
          <Calculator
            models={IPHONE_MODELS}
            selectedModelId={selectedModelId}
            onModelChange={setSelectedModelId}
            batteryPercentage={batteryPercentage}
            setBatteryPercentage={setBatteryPercentage}
            storage={storage}
            setStorage={setStorage}
            condition={condition}
            setCondition={setCondition}
            screenStatus={screenStatus}
            setScreenStatus={setScreenStatus}
            batteryOriginality={batteryOriginality}
            setBatteryOriginality={setBatteryOriginality}
            result={result}
            currency={currency}
          />
        </section>

        <section className="mb-8">
          <PriceTable
            models={priceTable.map((item) => ({
              modelId: item.modelId,
              modelName: item.modelName,
              releaseYear: item.releaseYear,
              baseMsrpMXN: item.baseMsrpMXN ?? 0,
              minPrice: item.minPrice,
              maxPrice: item.maxPrice,
            }))}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSelectModel={setSelectedModelId}
            currency={currency}
          />
        </section>

        <TipsGuide />
      </main>
    </div>
  )
}

export default App
