import React from 'react';
import styles from "./loader.module.css";

const Loader = () => {
    return (
        <section className={styles.container}>
            <img src='./image/Spinner.svg' width={100} />
        </section>
    );
};

export default Loader