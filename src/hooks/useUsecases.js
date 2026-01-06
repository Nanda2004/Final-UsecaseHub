import { useState, useEffect } from 'react';
import usecasesData from '../data/usecases_101.json';
import usecases50Data from '../data/usecases_50.json';
import usecaseLinks from '../data/usecase_links.json';

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
        // Helper to add link to use case
        const addLink = (usecase) => ({
            ...usecase,
            landing_page: usecaseLinks[usecase.usecase_id] || null
        });

        // Transform the new use cases to match the existing schema
        const transformedNewUsecases = usecases50Data.useCases.map(uc => {
            const transformed = {
                usecase_id: uc.id + 101, // Offset IDs to avoid collision
                title: uc.company, // Map Company to Title as requested
                summary: uc.businessChallenge,
                sections: {
                    business_challenge: {
                        heading: "Business challenge",
                        content: uc.businessChallenge
                    },
                    tech_stack: {
                        heading: "Tech stack",
                        items: uc.techStack
                    },
                    blueprint: {
                        heading: "Blueprint",
                        content: uc.implementationBlueprint
                    }
                },
                category: uc.agentType,
                industry: uc.industry,
                source_pdf: "New Use Cases"
            };
            return addLink(transformed);
        });

        const combinedData = [...usecasesData.map(addLink), ...transformedNewUsecases];

        setAllUsecases(combinedData);
        setFilteredUsecases(combinedData);
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
