import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchBar } from '../components/SearchBar';
import { Filters } from '../components/Filters';
import { PokemonList } from '../components/PokemonList';
import { usePokemon } from '../hooks/usePokemon';
import { useFavorites } from '../hooks/useFavorites';
import { SortOption } from '../types/pokemon';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function HomeContent() {
  const router = useRouter();
  const {
    pokemonList,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    showFavorites,
    setShowFavorites,
    types,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemon();

  const { isFavorite, toggleFavorite, favorites } = useFavorites();

  // Sync URL with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (typeFilter !== 'all') params.set('type', typeFilter);
    if (sortBy !== 'name') params.set('sort', sortBy);
    if (showFavorites) params.set('favorites', 'true');

    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.replace(newUrl, undefined, { shallow: true });
  }, [searchQuery, typeFilter, sortBy, showFavorites, router]);

  // Read initial state from URL
  useEffect(() => {
    const { q, type, sort, favorites } = router.query;
    if (q) setSearchQuery(q as string);
    if (type) setTypeFilter(type as string);
    if (sort) setSortBy(sort as SortOption);
    if (favorites) setShowFavorites(true);
  }, [router.query]);

  const filteredAndSortedPokemon = pokemonList
    .filter(pokemon => {
      if (showFavorites && !isFavorite(pokemon.id)) return false;
      if (typeFilter !== 'all' && !pokemon.types.some(t => t.type.name === typeFilter)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'id': return a.id - b.id;
        case 'height': return a.height - b.height;
        case 'weight': return a.weight - b.weight;
        case 'name':
        default: return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pokédex Explorer</h1>
          <p className="text-gray-600">Discover and favorite your Pokémon</p>
        </header>

        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Pokémon by name or ID..."
          />
        </div>

        <Filters
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          types={types}
          favoritesCount={favorites.length}
        />

        <PokemonList
          pokemonList={filteredAndSortedPokemon}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeContent />
    </QueryClientProvider>
  );
}