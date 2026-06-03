import { usePokemonTypes } from '../hooks/usePokemonTypes'

interface Props {
  selected: string
  onSelect: (type: string) => void
}

const FilterBar = ({ selected, onSelect }: Props) => {
  const { data, isLoading } = usePokemonTypes()

  if (isLoading) return <div className="h-10 animate-pulse bg-gray-100 rounded-xl" />

  const types = data?.results.filter(
    (t: { name: string }) => !['unknown', 'shadow'].includes(t.name)
  ) ?? []

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect('')}
        className={`px-3 py-1 rounded-full text-sm capitalize transition 
          ${selected === ''
            ? 'bg-gray-800 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        All
      </button>

      {types.map((t: { name: string }) => (
        <button
          key={t.name}
          onClick={() => onSelect(t.name)}
          className={`px-3 py-1 rounded-full text-sm capitalize transition
            ${selected === t.name
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}

export default FilterBar