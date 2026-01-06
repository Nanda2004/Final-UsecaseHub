import { useState } from 'react';
import { useUsecases } from '../hooks/useUsecases';
import { useFilters } from '../hooks/useFilters';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UsecaseGrid from '../components/UsecaseGrid';
import UsecaseModal from '../components/UsecaseModal';
import styles from '../styles/BrowsePage.module.css';

function BrowsePage() {
    const [selectedUsecase, setSelectedUsecase] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const {
        allUsecases,
        filteredUsecases,
        searchQuery,
        setSearchQuery,
        activeFilters,
        toggleFilter,
        clearFilters
    } = useUsecases();

    const filterOptions = useFilters(allUsecases);

    const handleCardClick = (usecase) => {
        setSelectedUsecase(usecase);
    };

    const handleCloseModal = () => {
        setSelectedUsecase(null);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.browsePage}>
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                toggleSidebar={toggleSidebar}
            />

            <div className={styles.mainContainer}>
                <Sidebar
                    filterOptions={filterOptions}
                    activeFilters={activeFilters}
                    toggleFilter={toggleFilter}
                    clearFilters={clearFilters}
                    isOpen={isSidebarOpen}
                    closeSidebar={() => setIsSidebarOpen(false)}
                />

                <main className={styles.mainContent}>
                    <div className={styles.resultsHeader}>
                        <p>
                            Showing {filteredUsecases.length} of {allUsecases.length} use cases
                        </p>
                    </div>

                    <UsecaseGrid
                        usecases={filteredUsecases}
                        onCardClick={handleCardClick}
                    />
                </main>
            </div>

            {selectedUsecase && (
                <UsecaseModal
                    usecase={selectedUsecase}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default BrowsePage;
