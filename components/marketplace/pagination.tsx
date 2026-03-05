'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5

    let start = Math.max(1, currentPage - Math.floor(showPages / 2))
    let end = Math.min(totalPages, start + showPages - 1)

    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {/* Précédent */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-2"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Précédent
      </Button>

      {/* Première page */}
      {getPageNumbers()[0] > 1 && (
        <>
          <Button
            variant="outline"
            onClick={() => onPageChange(1)}
            className="w-10 h-10 border-2"
          >
            1
          </Button>
          {getPageNumbers()[0] > 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Pages numérotées */}
      {getPageNumbers().map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 ${
            currentPage === page
              ? 'bg-agri-green-500 hover:bg-agri-green-600 text-white'
              : 'border-2'
          }`}
        >
          {page}
        </Button>
      ))}

      {/* Dernière page */}
      {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <Button
            variant="outline"
            onClick={() => onPageChange(totalPages)}
            className="w-10 h-10 border-2"
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Suivant */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-2"
      >
        Suivant
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  )
}
