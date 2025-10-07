export enum Metric {
  TIME = 'time',
  MEMORY = 'memory',
  COMPARISONS = 'comparisons',
}

export interface AlgorithmResult {
  algorithm: string
  item_count: number
  data_structure: string
  metrics: {
    time: number
    memory: number
    comparisons: number
  }
}
