"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiTrendingUp, FiClock, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { PRODUCT_CATEGORIES } from "../constants";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState([
    "smartphone", "laptop", "headphones", "running shoes", "wireless earbuds"
  ]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    
    const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      saveSearch(trimmedQuery);
      const params = new URLSearchParams();
      params.set("q", trimmedQuery);
      router.push(`/products?${params.toString()}`);
      setShowSuggestions(false);
      setQuery("");
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    saveSearch(suggestion);
    const params = new URLSearchParams();
    params.set("q", suggestion);
    router.push(`/products?${params.toString()}`);
    setShowSuggestions(false);
    setQuery("");
  };

  const clearRecentSearch = (searchTerm: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== searchTerm);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0 || isFocused);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <form onSubmit={submit} className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="search"
          placeholder="Search for products, brands, and categories..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-full rounded-lg border border-border bg-background px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setShowSuggestions(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <FiX className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </form>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-ecommerce-lg z-50 max-h-96 overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <FiClock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Recent Searches</span>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group cursor-pointer p-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    <span className="text-sm text-foreground">{search}</span>
                    <button
                      onClick={(e) => clearRecentSearch(search, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-muted-foreground/20 transition-all"
                    >
                      <FiX className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <FiTrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Popular Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="px-3 py-1 text-xs bg-muted text-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Categories */}
          <div className="p-4">
            <div className="text-sm font-medium text-foreground mb-3">Quick Categories</div>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCT_CATEGORIES.slice(0, 6).map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    router.push(`/products?category=${category.id}`);
                    setShowSuggestions(false);
                  }}
                  className="flex items-center gap-2 p-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors text-left"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
