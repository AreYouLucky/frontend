"use client";
import { AdvanceSearchFilters, AdvanceSearchFilterOptions } from '@/hooks/advance-search/advance-search-hooks';
import { Search } from 'lucide-react';
import InputText from '../ui/input-text';
import { useState, useEffect } from 'react';
import { loadSearchFilters } from '@/hooks/advance-search/advance-search-hooks';
import { Filter, X } from 'lucide-react';
import FilterSingleSelect from '../ui/filter-singleselect';
import FilterMultiSelect from '../ui/filter-multiselect';
import { normalizeOptions } from '@/utils/utils';
import { generateYearOptions } from '@/utils/utils';
type SearchSectionProps = {
    item: AdvanceSearchFilters;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleArrayChange: (name: keyof AdvanceSearchFilters, value: string[]) => void;
    setItem: React.Dispatch<React.SetStateAction<AdvanceSearchFilters>>;
    hasActiveFilters: boolean;
};
export default function SearchSection({ item, handleChange, handleArrayChange, setItem, hasActiveFilters }: SearchSectionProps) {

    const [filters, setFilters] = useState<AdvanceSearchFilterOptions | null>(null);

    useEffect(() => {
        const fetchFilters = async () => {
            const data = await loadSearchFilters();
            if (data) {
                setFilters(data);
            }
        };
        fetchFilters();
    }, []);

    const categoryOptions = normalizeOptions(
        filters?.categories || [],
        (category) => category.category_id,
        (category) => category.title ?? category.category_name
    );

    const programOptions = normalizeOptions(
        filters?.programs || [],
        (program) => program.program_id,
        (program) => program.title
    )

    const regionOptions = normalizeOptions(
        filters?.regions || [],
        (region) => region.id,
        (region) => region.name
    )

    const yearOptions = generateYearOptions();

    const agencyOptions = normalizeOptions(
        filters?.agencies || [],
        (agency) => agency.id,
        (agency) => agency.name
    )
    const activeBtnClassName = "rounded-full border border-[#004a95]/90 bg-[#004a95]/30 px-5 py-2 text-[12px] text-white transition hover:bg-[#004a95]/25 hover:scale-105 duration-300";

    return (
        <div className=''>
            <div className='grid gap-2 lg:grid-cols-6 md:grid-cols-3 grid-cols-2'>
                <div className="relative h-14">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <InputText
                        name="search"
                        value={item.search}
                        onChange={handleChange}
                        placeholder="Search any keyword..."
                        className="h-14 rounded-2xl border-white/80  pl-11 text-white placeholder:text-white/90"
                    />
                </div>
                <div>
                    <FilterSingleSelect
                        label="Program"
                        options={programOptions}
                        selected={item.program}
                        onChange={(value) => setItem((prev) => ({ ...prev, program: value }))}
                    />
                </div>
                <div>
                    <FilterSingleSelect
                        label="year"
                        options={yearOptions}
                        selected={item.year}
                        onChange={(value) => setItem((prev) => ({ ...prev, year: value }))}
                    />
                </div>
                <div>
                    <FilterMultiSelect
                        label="Categories"
                        options={categoryOptions}
                        selected={item.categories}
                        onChange={(value: string[]) => handleArrayChange("categories", value)}
                    />
                </div>
                <div>
                    <FilterMultiSelect
                        label="Regions"
                        options={regionOptions}
                        selected={item.regions}
                        onChange={(value: string[]) => handleArrayChange("regions", value)}
                    />
                </div>
                <div>
                    <FilterMultiSelect
                        label="Agencies"
                        options={agencyOptions}
                        selected={item.agencies}
                        onChange={(value: string[]) => handleArrayChange("agencies", value)}
                    />
                </div>

            </div>
            <div className="mt-4 flex flex-wrap items-center gap-1">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#004a95]/80 px-3 py-2 text-[11px] uppercase tracking-[0.25em] text-white/90">
                    <Filter className="h-3.5 w-3.5" />
                    Active selection
                </div>

                {item.search.trim() && (
                    <button
                        type="button"
                        onClick={() => setItem((prev) => ({ ...prev, search: "" }))}
                        className="rounded-full border border-white/10 bg-white/7 px-3 py-2 text-sm text-white/80 transition hover:border-blue-500/45 hover:bg-blue-600/15"
                    >
                        Search: {item.search.trim()}
                    </button>
                )}
                {programOptions.find((o) => o.id === item.program) && (
                    <button
                        type="button"
                        onClick={() => setItem((prev) => ({ ...prev, program: "" }))}
                        className={activeBtnClassName}
                    >
                        {programOptions.find((o) => o.id === item.program)?.label}
                    </button>
                )}
                {yearOptions.find((o) => o.id === item.year) && (
                    <button
                        type="button"
                        onClick={() => setItem((prev) => ({ ...prev, year: "" }))}
                        className={activeBtnClassName}
                    >
                        {yearOptions.find((o) => o.id === item.year)?.label}
                    </button>
                )}
                {categoryOptions
                    .filter((option) => item.categories.includes(option.id))
                    .map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                                handleArrayChange(
                                    "categories",
                                    item.categories.filter((value) => value !== option.id)
                                )
                            }
                            className={activeBtnClassName}
                        >
                            {option.label}
                        </button>
                    ))}

                {agencyOptions
                    .filter((option) => item.agencies.includes(option.id))
                    .map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                                handleArrayChange(
                                    "agencies",
                                    item.agencies.filter((value) => value !== option.id)
                                )
                            }
                            className={activeBtnClassName}
                        >
                            {option.label}
                        </button>
                    ))}



                {regionOptions
                    .filter((option) => item.regions.includes(option.id))
                    .map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                                handleArrayChange(
                                    "regions",
                                    item.regions.filter((value) => value !== option.id)
                                )
                            }
                            className={activeBtnClassName}
                        >
                            {option.label}
                        </button>
                    ))}

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={() =>
                            setItem({
                                search: "",
                                program: "",
                                year: "",
                                categories: [],
                                agencies: [],
                                regions: [],
                            })
                        }
                        className="ml-auto flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
                    >
                        <X className="h-4 w-4" />
                        Clear filters
                    </button>
                )}
            </div>

        </div>
    )
}
