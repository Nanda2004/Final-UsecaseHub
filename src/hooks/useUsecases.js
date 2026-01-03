import { useState, useEffect } from 'react';
import usecasesData from '../data/usecases_101.json';

export function useUsecases() {
    const [allUsecases, setAllUsecases] = useState([]);
    const [filteredUsecases, setFilteredUsecases] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        categories: [],
        industries: [],
        techStack: []
    });

    // Load use cases on mount
    useEffect(() => {
        setAllUsecases(usecasesData);
        setFilteredUsecases(usecasesData);
    }, []);

    // Apply filters and search
    useEffect(() => {
        let filtered = [...allUsecases];

        // Apply category filters
        if (activeFilters.categories.length > 0) {
            filtered = filtered.filter(usecase =>
                activeFilters.categories.includes(usecase.category)
            );
        }

        // Apply industry filters
        if (activeFilters.industries.length > 0) {
            filtered = filtered.filter(usecase =>
                activeFilters.industries.includes(usecase.industry)
            );
        }

        // Apply tech stack filters
        if (activeFilters.techStack.length > 0) {
            filtered = filtered.filter(usecase => {
                const techStack = usecase.sections?.tech_stack?.items || [];
                return techStack.some(tech =>
                    activeFilters.techStack.includes(tech)
                );
            });
        }

        // Apply search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(usecase => {
                const techStack = usecase.sections?.tech_stack?.items || [];
                const businessChallenge = usecase.sections?.business_challenge?.content || '';
                const searchableText = [
                    usecase.title,
                    businessChallenge,
                    usecase.category,
                    usecase.industry,
                    ...techStack
                ].join(' ').toLowerCase();

                return searchableText.includes(query);
            });
        }

        setFilteredUsecases(filtered);
    }, [allUsecases, activeFilters, searchQuery]);

    const toggleFilter = (filterType, value) => {
        setActiveFilters(prev => {
            const currentFilters = prev[filterType];
            const newFilters = currentFilters.includes(value)
                ? currentFilters.filter(item => item !== value)
                : [...currentFilters, value];

            return {
                ...prev,
                [filterType]: newFilters
            };
        });
    };

    const clearFilters = () => {
        setActiveFilters({
            categories: [],
            industries: [],
            techStack: []
        });
        setSearchQuery('');
    };

    return {
        allUsecases,
        filteredUsecases,
        searchQuery,
        setSearchQuery,
        activeFilters,
        toggleFilter,
        clearFilters
    };
}
