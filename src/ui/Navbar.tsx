import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  showBack?: boolean;
}

const Navbar = ({ title = "Pokédex", showBack = false }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-white/10 px-4 py-4 flex items-center gap-3">
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="text-white/70 hover:text-white transition"
        >
          ←
        </button>
      ) : (
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="pokeball"
          className="w-8 h-8 animate-bounce"
        />
      )}
      <span className="font-bold text-white capitalize">{title}</span>
    </div>
  );
};

export default Navbar;
