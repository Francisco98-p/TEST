import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../../utils/api';
import { useFavorites } from '../../hooks/useFavorites';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const queryClient = new QueryClient();

function PokemonDetailContent() {
  const router = useRouter();
  const { id } = router.query;
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemon-detail', id],
    queryFn: () => fetchPokemonDetail(id as string),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Error loading Pokémon</h2>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Pokédex
        </Link>
      </div>
    </div>
  );
  if (!pokemon) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Pokémon not found</h2>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Pokédex
        </Link>
      </div>
    </div>
  );

  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          ← Back to Pokédex
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gray-100 p-8 flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={pokemon.name}
                  className="h-64 w-64 object-contain"
                />
              ) : (
                <div className="text-gray-400 text-lg">No image available</div>
              )}
            </div>

            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
                  <p className="text-gray-600">#{pokemon.id.toString().padStart(3, '0')}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(pokemon.id)}
                  className="text-2xl p-2 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                  aria-label={isFavorite(pokemon.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite(pokemon.id) ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Types</h3>
                  <div className="flex space-x-2">
                    {pokemon.types.map(type => (
                      <span
                        key={type.type.name}
                        className="px-3 py-1 bg-gray-200 rounded-full capitalize"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-lg">Abilities</h3>
                  <div className="space-y-1">
                    {pokemon.abilities.map(ability => (
                      <div key={ability.ability.name} className="capitalize">
                        {ability.ability.name}
                        {ability.is_hidden && ' (hidden)'}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text