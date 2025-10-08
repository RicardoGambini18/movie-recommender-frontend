export enum Metric {
  TIME = 'time',
  MEMORY = 'memory',
  COMPARISONS = 'comparisons',
}

type AlgorithmMetric = {
  time: number
  memory: number
  comparisons: number
}

type SubAlgorithmMetric = AlgorithmMetric & {
  item_found_index?: number | null
}

export interface AlgorithmResult<T = object> {
  algorithm: string
  sorted_data?: T[]
  item_count: number
  item_found?: T | null
  data_structure: string
  metrics: AlgorithmMetric
  item_found_index?: number | null
  sub_metrics?: SubAlgorithmMetric[]
}
