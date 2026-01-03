import styles from '../styles/Header.module.css';

function Header({ searchQuery, setSearchQuery, toggleSidebar }) {
    return (
        <header className={styles.mainHeader}>
            <div className={styles.headerLeft}>
                <button
                    className={styles.hamburger}
                    onClick={toggleSidebar}
                    aria-label="Toggle filters"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <img src="/logo.png" alt="Usecase Hub Logo" className={styles.headerLogo} />
                <h1 className={styles.headerTitle}>Usecase Hub</h1>
            </div>
            <div className={styles.headerSearch}>
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search use cases (title, description, tags)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </header>
    );
}

export default Header;
