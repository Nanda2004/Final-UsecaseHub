import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SignInPage.module.css';

function SignInPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        organization: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Store user info in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(formData));

        // Navigate to browse page
        navigate('/browse');
    };

    return (
        <div className={styles.signinPage}>
            <div className={styles.signinContainer}>
                {/* Left Panel */}
                <div className={styles.signinLeft}>
                    <div className={styles.logoContainer}>
                        <img src="/logo.png" alt="Usecase Hub Logo" className={styles.logo} />
                    </div>
                    <h1 className={styles.brandTitle}>Usecase Hub</h1>
                    <p className={styles.brandDescription}>
                        Discover 101 real-world Gen AI use cases from the world's leading organizations
                    </p>

                    <div className={styles.statsContainer}>
                        <div className={styles.statBox}>
                            <div className={styles.statNumber}>101</div>
                            <div className={styles.statLabel}>Use Cases</div>
                        </div>
                        <div className={styles.statBox}>
                            <div className={styles.statNumber}>10+</div>
                            <div className={styles.statLabel}>Industries</div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className={styles.signinRight}>
                    <div className={styles.signinFormContainer}>
                        <h2 className={styles.welcomeTitle}>Welcome</h2>
                        <p className={styles.welcomeSubtitle}>
                            Enter your details to access the use case library
                        </p>

                        <form onSubmit={handleSubmit} className={styles.signinForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="organization">Organization</label>
                                <input
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    placeholder="Your Company"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.btnPrimary}>
                                Access Use Cases
                            </button>

                            <p className={styles.disclaimer}>
                                By signing in, you agree to explore our curated collection of AI use cases
                                from leading organizations worldwide.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
