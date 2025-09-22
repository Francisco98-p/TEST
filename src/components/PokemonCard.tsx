import React from 'react';
import Link from 'next/link';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isFavorite, onToggleFavorite }) => {
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(pokemon.id);
          }}
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        
        <Link href={`/pokemon/${pokemon.id}`} className="block">
          <div className="cursor-pointer">
            <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={pokemon.name}
                  className="h-32 w-32 object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="text-gray-400 text-lg">No image available</div>
              )}
            </div>
          </div>
        </Link>
      </div>

      <div className="p-4">
        <Link href={`/pokemon/${pokemon.id}`}>
          <h3 className="font-semibold text-lg mb-2 cursor-pointer hover:text-blue-600 focus:outline-none focus:text-blue-600">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>#{pokemon.id.toString().padStart(3, '0')}</span>
          <div className="flex flex-wrap gap-1 justify-end">
            {pokemon.types.map(type => (
              <span
                key={type.type.name}
                className="px-2 py-1 bg-gray-200 rounded-full text-xs capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};