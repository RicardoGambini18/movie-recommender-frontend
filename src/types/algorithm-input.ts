export type AlgorithmInput = {
  algorithmKey: string
  dataStructureKey: string
}

export type GetSortResultsInput = {
  algorithms: AlgorithmInput[]
}

export type GetSearchResultsInput = {
  movieIds: number[]
  algorithms: AlgorithmInput[]
}
