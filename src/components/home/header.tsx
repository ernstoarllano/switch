type HeaderProps = {
    devices: number;
    categories: number;
    selectedCategories: number;
}

export function Header({ devices, categories, selectedCategories }: HeaderProps) {
    const categoryCount = selectedCategories > 0 ? selectedCategories : categories;
    const categoryLabel = categoryCount === 1 ? 'category' : 'categories';

    return (
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mini Catalog</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            <span className="tabular-nums">{devices}</span> devices across <span className="tabular-nums">{categoryCount}</span> {categoryLabel}
          </p>
        </header>
    )
}