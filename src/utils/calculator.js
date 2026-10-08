import { IPHONE_MODELS } from '../data/iphoneData.js'

export const STORAGE_FACTORS = {
  '64GB': 0.9,
  '128GB': 1,
  '256GB': 1.12,
  '512GB': 1.22,
  '1TB': 1.32,
}

export const BATTERY_FACTORS = {
  optimal: 1,
  acceptable: 0.88,
  degraded: 0.75,
}

export const CONDITION_FACTORS = {
  Excelente: 1,
  Bueno: 0.9,
  Usado: 0.8,
}

export const SCREEN_FACTORS = {
  Original: 1,
  Cambiada: 0.92,
}

export const BATTERY_ORIGINALITY_FACTORS = {
  Original: 1,
  Reemplazada: 0.9,
}

export function getBatteryBand(batteryPercentage) {
  if (batteryPercentage >= 90) return 'optimal'
  if (batteryPercentage >= 80) return 'acceptable'
  return 'degraded'
}

export function getAgeMonths(model, currentDate = new Date()) {
  const releaseDate = new Date(model.releaseYear, model.releaseMonth - 1, 1)
  const monthDifference = (currentDate.getFullYear() - releaseDate.getFullYear()) * 12
  const monthOffset = currentDate.getMonth() - releaseDate.getMonth()
  return Math.max(0, monthDifference + monthOffset)
}

export function getDepreciationRetention(months) {
  if (months <= 12) return 0.75
  if (months <= 24) return 0.63
  if (months <= 36) return 0.53

  const extraYears = Math.floor((months - 36) / 12)
  return Math.max(0.15, 0.53 - extraYears * 0.08)
}

export function calculateModelPriceRange(
  model,
  {
    batteryPercentage = 85,
    storage = '128GB',
    condition = 'Excelente',
    screenStatus = 'Original',
    batteryOriginality = 'Original',
    currency = 'MXN',
    currentDate = new Date(),
  } = {},
) {
  const safeStorage = STORAGE_FACTORS[storage] ? storage : '128GB'
  const safeCondition = CONDITION_FACTORS[condition] ? condition : 'Excelente'
  const safeScreenStatus = SCREEN_FACTORS[screenStatus] ? screenStatus : 'Original'
  const safeBatteryOriginality = BATTERY_ORIGINALITY_FACTORS[batteryOriginality] ? batteryOriginality : 'Original'
  const batteryBand = getBatteryBand(Number(batteryPercentage))
  const ageMonths = getAgeMonths(model, currentDate)
  const retention = getDepreciationRetention(ageMonths)

  const storageFactor = STORAGE_FACTORS[safeStorage] ?? 1
  const batteryFactor = BATTERY_FACTORS[batteryBand] ?? 1
  const conditionFactor = CONDITION_FACTORS[safeCondition] ?? 1
  const screenFactor = SCREEN_FACTORS[safeScreenStatus] ?? 1
  const batteryOriginalityFactor = BATTERY_ORIGINALITY_FACTORS[safeBatteryOriginality] ?? 1

  const estimatedValue =
    model.baseMsrpMXN * retention * storageFactor * batteryFactor * conditionFactor * screenFactor * batteryOriginalityFactor
  const conversionRate = currency === 'USD' ? 20 : 1
  const convertedEstimated = estimatedValue / conversionRate

  const minPrice = convertedEstimated * 0.92
  const maxPrice = convertedEstimated * 1.08

  return {
    modelId: model.id,
    modelName: model.name,
    releaseYear: model.releaseYear,
    storage: safeStorage,
    condition: safeCondition,
    screenStatus: safeScreenStatus,
    batteryOriginality: safeBatteryOriginality,
    batteryPercentage,
    currency,
    ageMonths,
    retention,
    estimatedValue: Math.round(convertedEstimated),
    minPrice: Math.round(minPrice),
    maxPrice: Math.round(maxPrice),
    suggestedBatteryDiscount: batteryPercentage < 80 || safeBatteryOriginality === 'Reemplazada' ? 1200 : 0,
  }
}

export function calculatePriceRangeForModelId(modelId, options = {}) {
  const model = IPHONE_MODELS.find((item) => item.id === modelId) ?? IPHONE_MODELS[0]
  return calculateModelPriceRange(model, options)
}

export function getAllModelPriceRanges(options = {}) {
  return IPHONE_MODELS.map((model) =>
    calculateModelPriceRange(model, {
      batteryPercentage: 85,
      storage: '128GB',
      condition: 'Bueno',
      currency: 'MXN',
      ...options,
    }),
  )
}

export default calculateModelPriceRange
