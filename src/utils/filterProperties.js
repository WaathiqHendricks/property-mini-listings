export function filterAndSort(properties, { search = '', minPrice = 0, maxPrice = Infinity, sort = 'low', favsOnly = false, bookmarks = [] } = {}) {
  const q = (search || '').trim().toLowerCase()
  const min = Number.isFinite(Number(minPrice)) ? Number(minPrice) : 0
  const max = Number.isFinite(Number(maxPrice)) ? Number(maxPrice) : Infinity

  let list = properties.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
    const withinPrice = p.price >= min && p.price <= max
    const isFav = bookmarks.includes(p.id)
    return matchesQuery && withinPrice && (!favsOnly || isFav)
  })

  // sort copy to avoid mutations
  list = [...list].sort((a, b) => (sort === 'low' ? a.price - b.price : b.price - a.price))
  return list
}

export default filterAndSort
