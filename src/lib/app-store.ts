import { create } from 'zustand'
import { type DataStructure } from '~/types/data-structure'

interface AlgorithmOption {
  algorithmKey: string
  dataStructureKey: string
}

interface AppStore {
  sortAlgorithms: {
    selectedAlgorithms: AlgorithmOption[]
    getSelectedCount: () => number
    createCompositeKey: (selectedAlgorithm: AlgorithmOption) => string
    getSelectedAlgorithmKeys: () => string[]
    isAlgorithmSelected: (algorithmOption: AlgorithmOption) => boolean
    getAllAlgorithms: (dataStructures: DataStructure[]) => AlgorithmOption[]
    getAllAlgorithmKeys: (dataStructures: DataStructure[]) => string[]
    isAllSelected: (dataStructures: DataStructure[]) => boolean
    toggleSelectAll: (dataStructures: DataStructure[]) => void
    toggleAlgorithm: (algorithmOption: AlgorithmOption) => void
  }
}

export const useAppStore = create<AppStore>((set, get) => ({
  sortAlgorithms: {
    selectedAlgorithms: [],
    getSelectedCount: () => {
      return get().sortAlgorithms.selectedAlgorithms.length
    },
    createCompositeKey: (selectedAlgorithm: AlgorithmOption) => {
      const { algorithmKey, dataStructureKey } = selectedAlgorithm
      return `${dataStructureKey}:${algorithmKey}`
    },
    getSelectedAlgorithmKeys: () => {
      return get().sortAlgorithms.selectedAlgorithms.map((alg) =>
        get().sortAlgorithms.createCompositeKey(alg)
      )
    },
    isAlgorithmSelected: (algorithmOption: AlgorithmOption) => {
      const { createCompositeKey, getSelectedAlgorithmKeys } =
        get().sortAlgorithms

      const selectedAlgorithmKeys = getSelectedAlgorithmKeys()
      return selectedAlgorithmKeys.includes(createCompositeKey(algorithmOption))
    },
    getAllAlgorithms: (dataStructures: DataStructure[]) => {
      return dataStructures.flatMap((ds) =>
        ds.algorithms.map((alg) => ({
          algorithmKey: alg.key,
          dataStructureKey: ds.key,
        }))
      )
    },
    getAllAlgorithmKeys: (dataStructures: DataStructure[]) => {
      const { getAllAlgorithms } = get().sortAlgorithms
      const allAlgorithms = getAllAlgorithms(dataStructures)

      return allAlgorithms.map((alg) =>
        get().sortAlgorithms.createCompositeKey(alg)
      )
    },
    isAllSelected: (dataStructures: DataStructure[]) => {
      const { getAllAlgorithmKeys, getSelectedAlgorithmKeys } =
        get().sortAlgorithms

      const selectedAlgorithmKeys = getSelectedAlgorithmKeys()
      const allAlgorithmKeys = getAllAlgorithmKeys(dataStructures)

      return (
        allAlgorithmKeys.length > 0 &&
        allAlgorithmKeys.every((algorithmKey) =>
          selectedAlgorithmKeys.includes(algorithmKey)
        )
      )
    },
    toggleSelectAll: (dataStructures: DataStructure[]) => {
      const { isAllSelected, getAllAlgorithms } = get().sortAlgorithms

      if (isAllSelected(dataStructures)) {
        set({
          sortAlgorithms: {
            ...get().sortAlgorithms,
            selectedAlgorithms: [],
          },
        })
      } else {
        const allAlgorithms = getAllAlgorithms(dataStructures)

        set({
          sortAlgorithms: {
            ...get().sortAlgorithms,
            selectedAlgorithms: allAlgorithms,
          },
        })
      }
    },
    toggleAlgorithm: (algorithmOption: AlgorithmOption) => {
      const { selectedAlgorithms, createCompositeKey, isAlgorithmSelected } =
        get().sortAlgorithms

      if (isAlgorithmSelected(algorithmOption)) {
        set({
          sortAlgorithms: {
            ...get().sortAlgorithms,
            selectedAlgorithms: selectedAlgorithms.filter(
              (alg) =>
                createCompositeKey(alg) !== createCompositeKey(algorithmOption)
            ),
          },
        })
      } else {
        set({
          sortAlgorithms: {
            ...get().sortAlgorithms,
            selectedAlgorithms: [...selectedAlgorithms, algorithmOption],
          },
        })
      }
    },
  },
}))
