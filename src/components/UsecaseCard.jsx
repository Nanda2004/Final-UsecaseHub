import styles from '../styles/UsecaseCard.module.css';

function UsecaseCard({ usecase, onClick }) {
    const businessChallenge = usecase.sections?.business_challenge?.content || usecase.summary || '';
    const techStack = usecase.sections?.tech_stack?.items || [];

    return (
        <div className={styles.usecaseCard} onClick={onClick}>
            <div className={styles.usecaseHeader}>
                <h3 className={styles.usecaseTitle}>{usecase.title}</h3>
                <span className={styles.usecaseCategory}>{usecase.category}</span>
            </div>

            <p className={styles.usecaseSummary}>
                {businessChallenge.substring(0, 150)}...
            </p>

            <div className={styles.usecaseTags}>
                <span className={`${styles.tag} ${styles.tagPrimary}`}>
                    {usecase.industry}
                </span>
                {techStack.slice(0, 2).map((tech, index) => (
                    <span key={index} className={`${styles.tag} ${styles.tagSecondary}`}>
                        {tech}
                    </span>
                ))}
                {techStack.length > 2 && (
                    <span className={`${styles.tag} ${styles.tagTertiary}`}>
                        +{techStack.length - 2} more
                    </span>
                )}
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.viewDetails}>View Details →</span>
                <a
                    href={usecase.landing_page || '#'}
                    target={usecase.landing_page ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={`${styles.viewMoreLink} ${!usecase.landing_page ? styles.disabled : ''}`}
                    onClick={(e) => {
                        if (!usecase.landing_page) e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    View More
                </a>
            </div>
        </div>
    );
}

export default UsecaseCard;
