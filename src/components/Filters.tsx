import React from 'react';
import { SortOption, TypeFilter } from '../types/pokemon';

interface FiltersProps {
  typeFilter: TypeFilter;
  setTypeFilter: (type: TypeFilter) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
  types: { name: string; url: string }[];
  favoritesCount: number;
}

export const Filters: React.FC<FiltersProps> = ({
  typeFilter,
  setTypeFilter,
  sortBy,
  setSortBy,
  showFavorites,
  setShowFavorites,
  types,
  favoritesCount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <label htmlFor="type-filter" className="block text-sm font-medium mb-2">Type</label>
        <select
          id="type-filter"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          {types.map(type => (
            <option key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sort-by" className="block text-sm font-medium mb-2">Sort By</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Name</option>
          <option value="id">ID</option>
          <option value="height">Height</option>
          <option value="weight">Weight</option>
        </select>
      </div>

      <div className="flex items-end">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
            className="w-4 h-4 rounded focus:ring-blue-500"
          />
          <span className="select-none">Favorites ({favoritesCount})</span>
        </label>
      </div>

      <div className="flex items-end">
        <button
          onClick={() => {
            setTypeFilter('all');
            setSortBy('name');
            setShowFavorites(false);
          }}
          className="w-full p-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};