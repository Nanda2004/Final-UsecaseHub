import { useEffect } from 'react';
import styles from '../styles/Sidebar.module.css';

function Sidebar({ filterOptions, activeFilters, toggleFilter, clearFilters, isOpen, closeSidebar }) {
    // Close sidebar on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeSidebar();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, closeSidebar]);

    const hasActiveFilters =
        activeFilters.categories.length > 0 ||
        activeFilters.industries.length > 0 ||
        activeFilters.techStack.length > 0;

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={closeSidebar}
                />
            )}

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <h3 className={styles.filterTitle}>Filters</h3>
                    {hasActiveFilters && (
                        <button
                            className={styles.clearButton}
                            onClick={clearFilters}
                        >
                            Clear All
                        </button>
                    )}
                    <button
                        className={styles.closeButton}
                        onClick={closeSidebar}
                        aria-label="Close filters"
                    >
                        ×
                    </button>
                </div>

                <div className={styles.filtersSection}>
                    {/* Category Filters */}
                    <div className={styles.filterGroup}>
                        <h4 className={styles.filterHeading}>Category</h4>
                        <div className={styles.filterOptions}>
                            {filterOptions.categories.map(category => (
                                <label key={category} className={styles.filterOption}>
                                    <input
                                        type="checkbox"
                                        checked={activeFilters.categories.includes(category)}
                                        onChange={() => toggleFilter('categories', category)}
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Industry Filters */}
                    <div className={styles.filterGroup}>
                        <h4 className={styles.filterHeading}>Industry</h4>
                        <div className={styles.filterOptions}>
                            {filterOptions.industries.map(industry => (
                                <label key={industry} className={styles.filterOption}>
                                    <input
                                        type="checkbox"
                                        checked={activeFilters.industries.includes(industry)}
                                        onChange={() => toggleFilter('industries', industry)}
                                    />
                                    <span>{industry}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack Filters */}
                    <div className={styles.filterGroup}>
                        <h4 className={styles.filterHeading}>Tech Stack</h4>
                        <div className={styles.filterOptions}>
                            {filterOptions.techStack.map(tech => (
                                <label key={tech} className={styles.filterOption}>
                                    <input
                                        type="checkbox"
                                        checked={activeFilters.techStack.includes(tech)}
                                        onChange={() => toggleFilter('techStack', tech)}
                                    />
                                    <span>{tech}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
