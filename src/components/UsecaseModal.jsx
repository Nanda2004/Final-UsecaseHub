import { useEffect } from 'react';
import styles from '../styles/UsecaseModal.module.css';

function UsecaseModal({ usecase, onClose }) {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const businessChallenge = usecase.sections?.business_challenge?.content || '';
    const techStack = usecase.sections?.tech_stack?.items || [];
    const blueprint = usecase.sections?.blueprint?.content || '';

    return (
        <div className={`${styles.modal} ${styles.active}`}>
            <div className={styles.modalOverlay} onClick={onClose} />
            <div className={styles.modalContent}>
                <button className={styles.modalClose} onClick={onClose}>
                    ×
                </button>

                <div className={styles.modalBody}>
                    <div className={styles.modalTitleSection}>
                        <span className={styles.usecaseNumber}>Use Case #{usecase.usecase_id}</span>
                        <h2 className={styles.modalTitle}>{usecase.title}</h2>
                    </div>

                    <div className={styles.modalCategories}>
                        <span className={`${styles.modalCategoryTag} ${styles.primary}`}>
                            {usecase.category}
                        </span>
                        <span className={`${styles.modalCategoryTag} ${styles.secondary}`}>
                            {usecase.industry}
                        </span>
                    </div>

                    <div className={styles.modalSection}>
                        <h3 className={styles.sectionHeading}>
                            <span className={styles.sectionIcon}>💼</span>
                            Business Challenge
                        </h3>
                        <div className={styles.sectionContent}>
                            {businessChallenge}
                        </div>
                    </div>

                    <div className={styles.modalSection}>
                        <h3 className={styles.sectionHeading}>
                            <span className={styles.sectionIcon}>⚙️</span>
                            Tech Stack
                        </h3>
                        <div className={styles.techStackItems}>
                            {techStack.map((tech, index) => (
                                <span key={index} className={styles.techTag}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.modalSection}>
                        <h3 className={styles.sectionHeading}>
                            <span className={styles.sectionIcon}>📋</span>
                            Implementation Blueprint
                        </h3>
                        <div className={styles.blueprintSteps}>
                            {blueprint}
                        </div>
                    </div>

                    {usecase.landing_page && (
                        <div className={styles.modalSection}>
                            <a
                                href={usecase.landing_page}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.viewMoreButton}
                                style={{
                                    display: 'inline-block',
                                    marginTop: '20px',
                                    padding: '10px 20px',
                                    backgroundColor: '#1a73e8',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '4px',
                                    fontWeight: '500'
                                }}
                            >
                                View More Details
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UsecaseModal;
