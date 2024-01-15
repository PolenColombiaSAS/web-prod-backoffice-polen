import styles from './loadingAnimation.module.css';

const LoadingAnimation = () => {
    return (
        <div className={styles.container}>
            <img
                src="/LogoSplashScreen.svg"
                alt="Imagen"
                className={styles.logo}
            />
        </div>
    );
};

export default LoadingAnimation;