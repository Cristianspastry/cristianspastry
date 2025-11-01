'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

const sortOptions = [
  { value: 'newest', label: 'Più recenti' },
  { value: 'oldest', label: 'Più vecchie' },
  { value: 'title-asc', label: 'Titolo (A-Z)' },
  { value: 'title-desc', label: 'Titolo (Z-A)' },
  { value: 'time-asc', label: 'Tempo (crescente)' },
  { value: 'time-desc', label: 'Tempo (decrescente)' },
];

export function RecipeSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') ?? 'newest';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    
    // Reset to page 1 when sorting
    params.delete('page');
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 min-w-[200px]">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ordina per" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}