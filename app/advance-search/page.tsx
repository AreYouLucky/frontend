"use client";
import HeaderSection from '@/components/advance-search-partials/header-section';
import SearchSection from '@/components/advance-search-partials/search-section'
import { AdvanceSearchFilters } from '@/hooks/advance-search/advance-search-hooks';
import { useHandleChange } from '@/utils/use-handle-change';
import { useGetAdvanceSearchedPosts } from '@/hooks/advance-search/advance-search-hooks';
import ResultSection from '@/components/advance-search-partials/result-section';
import { useSearchParams } from "next/navigation";
import { useEffect } from 'react';

type FilterFormState = AdvanceSearchFilters;
export default function AdvanceSearch() {
    const searchParams = useSearchParams();
    const { item, handleChange, handleArrayChange, setItem } = useHandleChange<FilterFormState>({ search: "", year: "", program: "", categories: [], agencies: [], regions: [], });
    const category = searchParams.get("category");

    useEffect(() => {
        if (category) {
            setItem((prev) => ({
                ...prev,
                categories: [(category)],
            }));
        }
    }, [category, setItem]);
    const activeFilterCount =
        (item.search.trim() ? 1 : 0) +
        (item.program ? 1 : 0) +
        (item.year ? 1 : 0) +
        item.categories.length +
        item.agencies.length +
        item.regions.length;

    const hasActiveFilters = activeFilterCount > 0;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useGetAdvanceSearchedPosts({ ...item });
    return (
        <div className='w-full lg:px-13 md:px-8 px-4 pt-18 lg:pt-25  min-h-screen '>
            <section className='w-full lg:pb-15 pb-8'>
                <HeaderSection />
            </section>
            <section className='border-b border-white/20 pb-10 fade-right z-10 relative'>
                <SearchSection item={item} handleChange={handleChange} handleArrayChange={handleArrayChange} setItem={setItem} hasActiveFilters={hasActiveFilters} />
            </section>
            <section className=' relative'>
                <ResultSection
                    data={data}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetching={isFetching}
                    isFetchingNextPage={isFetchingNextPage}
                    hasActiveFilters={hasActiveFilters}
                    status={status}
                />
            </section>


        </div>
    )
}
