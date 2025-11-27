import { describe, it, expect } from 'vitest'
import filterAndSort from '../../../src/utils/filterProperties.js'

const base = [
  { id: 1, title: 'A', location: 'X', price: 100 },
  { id: 2, title: 'B', location: 'Y', price: 200, available: false },
  { id: 3, title: 'Seaside', location: 'C', price: 150 }
]

describe('filterAndSort', () => {
  it('filters by query', () => {
    const out = filterAndSort(base, { search: 'sea' })
    expect(out).toHaveLength(1)
    expect(out[0].id).toBe(3)
  })

  it('filters by price range', () => {
    const out = filterAndSort(base, { minPrice: 110, maxPrice: 190 })
    expect(out.map(i => i.id)).toEqual([3])
  })

  it('sorts low to high by default', () => {
    const out = filterAndSort(base, { sort: 'low' })
    expect(out.map(i => i.price)).toEqual([100,150,200])
  })

  it('sorts high to low', () => {
    const out = filterAndSort(base, { sort: 'high' })
    expect(out.map(i => i.price)).toEqual([200,150,100])
  })

  it('filters favourites only', () => {
    const out = filterAndSort(base, { favsOnly: true, bookmarks: [1,3] })
    expect(out.map(i => i.id)).toEqual([1,3])
  })
})
