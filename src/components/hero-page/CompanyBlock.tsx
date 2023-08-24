import React from 'react';
import BoldoLogo from '../../assets/boldo-logo.svg';
import PrestoLogo from '../../assets/presto-logo.svg';
import styles from './styles.module.css';

const CompanyBlock = React.memo(function CompanyBlock() {
    const companiesLogo = [BoldoLogo, PrestoLogo, BoldoLogo, PrestoLogo, BoldoLogo, PrestoLogo];

    return (
        <div className={styles.companyBlockWrapper}>
            {companiesLogo.map((company, index) => (
                <img src={company} alt={`company logo ${index}`} key={index} className={styles.companiesLogo} />
            ))}
        </div>
    );
});

export default CompanyBlock;
