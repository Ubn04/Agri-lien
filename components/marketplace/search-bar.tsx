'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { debounce } from '@/lib/utils/helpers'

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'Rechercher des produits...' }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSearch = debounce((value: string) => {
    onSearch?.(value)
  }, 300)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    handleSearch(value)
  }

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  )
}
