import UsecaseCard from './UsecaseCard';
import styles from '../styles/UsecaseGrid.module.css';

function UsecaseGrid({ usecases, onCardClick }) {
    if (usecases.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>No use cases found matching your criteria.</p>
                <p className={styles.emptySubtext}>Try adjusting your filters or search query.</p>
            </div>
        );
    }

    return (
        <div className={styles.usecasesGrid}>
            {usecases.map(usecase => (
                <UsecaseCard
                    key={usecase.usecase_id}
                    usecase={usecase}
                    onClick={() => onCardClick(usecase)}
                />
            ))}
        </div>
    );
}

export default UsecaseGrid;
