export type AlgorithmInput = {
  algorithmKey: string
  dataStructureKey: string
}

export type GetSortResultsInput = {
  includeResult?: boolean
  algorithms: AlgorithmInput[]
}

export type GetSearchResultsInput = {
  movieIds: number[]
  includeResult?: boolean
  algorithms: AlgorithmInput[]
}
