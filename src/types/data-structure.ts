export interface Algorithm {
  key: string
  name: string
  description: string
  needs_sort?: boolean
  space_complexity: string
  best_time_complexity: string
  worst_time_complexity: string
  average_time_complexity: string
}

export interface DataStructure {
  key: string
  name: string
  description: string
  algorithms: Algorithm[]
}
