
import { useNavigate } from 'react-router-dom'
import PokemonList from '../components/PokemonList'

const ListPage = () => {
  const navigate = useNavigate()

  const handleSelect = (name: string) => {
    navigate(`/pokemon/${name}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pokédex</h1>
      <PokemonList onSelect={handleSelect} />
    </div>
  )
}

export default ListPage