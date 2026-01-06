import { useMemo } from 'react';

export function useFilters(allUsecases) {
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(allUsecases.map(u => u.category))];
        return uniqueCategories.sort();
    }, [allUsecases]);

    const industries = useMemo(() => {
        const uniqueIndustries = [...new Set(allUsecases.map(u => u.industry))];
        return uniqueIndustries.sort();
    }, [allUsecases]);

    const techStack = useMemo(() => {
        const allTech = allUsecases.flatMap(u => u.sections?.tech_stack?.items || []);
        const uniqueTech = [...new Set(allTech)];
        return uniqueTech.sort();
    }, [allUsecases]);

    return {
        categories,
        industries,
        techStack
    };
}
