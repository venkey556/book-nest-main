
import React from 'react';

const BookFilter = ({ genres, authors, selectedGenre, selectedAuthor, selectedPriceRange, onGenreChange, onAuthorChange, onPriceRangeChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="genre" className="block text-gray-600">Filter by Genre</label>
      <select
        id="genre"
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">All</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <label htmlFor="author" className="block text-gray-600 mt-4">Filter by Author</label>
      <select
        id="author"
        value={selectedAuthor}
        onChange={(e) => onAuthorChange(e.target.value)}
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">All</option>
        {authors.map((author) => (
          <option key={author} value={author}>{author}</option>
        ))}
      </select>

      <label htmlFor="priceRange" className="block text-gray-600 mt-4">Filter by Price</label>
      <select
        id="priceRange"
        value={selectedPriceRange}
        onChange={(e) => onPriceRangeChange(e.target.value)}
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">All</option>
        <option value="0-10">$0 - $10</option>
        <option value="10-20">$10 - $20</option>
        <option value="20-50">$20 - $50</option>
        <option value="50+">$50+</option>
      </select>
    </div>
  );
};

export default BookFilter;