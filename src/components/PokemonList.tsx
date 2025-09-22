import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Pokemon } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';
import { LoadingSpinner } from './LoadingSpinner';

interface PokemonListProps {
  pokemonList: Pokemon[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
}

export const PokemonList: React.FC<PokemonListProps> = ({
  pokemonList,
  isFavorite,
  onToggleFavorite,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  isLoading,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasNextPage && fetchNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading && pokemonList.length === 0) {
    return <LoadingSpinner />;
  }

  if (pokemonList.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">No Pokémon found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {pokemonList.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={isFavorite(pokemon.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      <div ref={ref} className="flex justify-center items-center min-h-[100px]">
        {isFetchingNextPage ? (
          <LoadingSpinner />
        ) : hasNextPage ? (
          <button
            onClick={() => fetchNextPage?.()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Load More Pokémon
          </button>
        ) : (
          <p className="text-gray-500">All Pokémon loaded!</p>
        )}
      </div>
    </div>
  );
};