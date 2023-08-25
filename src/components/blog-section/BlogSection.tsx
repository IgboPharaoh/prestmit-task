import React from 'react';
import styles from './styles.module.css';
import Wrapper from '../../Wrapper';
import Button from '../button/Button';
import { ReactComponent as DownwardIcon } from '../../assets/downward.svg';
import OfficeSpace from '../../assets/office-space.webp';
import BlogImage1 from '../../assets/blog-image1.webp';
import BlogImage2 from '../../assets/blog-image2.webp';
import BlogImage3 from '../../assets/blog-image3.webp';
import CardImage1 from '../../assets/walking-human.webp';
import CardImage2 from '../../assets/woman.webp';
import CardImage3 from '../../assets/holding-document.webp';

const BlogList: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className={styles.blogListWrapper}>
            <p className={styles.blogListText}>{text}</p>
            <section className={styles.blogListIconWrapper}>
                <DownwardIcon />
            </section>
        </div>
    );
};

interface BlogCardProps {
    cardSrc: string;
    profileSrc: string;
    name: string;
    content: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ name, content, cardSrc, profileSrc }) => {
    return (
        <div className={styles.blogCardWrapper}>
            <section className={styles.blogCardContentImageWrapper}>
                <img src={cardSrc} alt='' className={styles.blogCardContentImage} />
            </section>
            <section className={styles.spanNDateTextWrapper}>
                <p className={styles.blogCardDate}>
                    <span className={styles.blogCardSpanText}>Category</span> November 22, 2021
                </p>
                <p className={styles.blogCardContentText}>{content}</p>
            </section>
            <section className={styles.blogCardProfileWrapper}>
                <img src={profileSrc} alt={`${name}`} className={styles.blogCardProfileImage} />
                <p className={styles.blogCardProfileText}>{name}</p>
            </section>
        </div>
    );
};

const BlogSection = () => {
    return (
        <div>
            <Wrapper>
                <div className={styles.blogSectionWrapper}>
                    <section className={styles.blogTopSectionWrapper}>
                        <div className={styles.blogTopSectionImageWrapper}>
                            <img src={OfficeSpace} alt='office-space' className={styles.blogTopSectionImage} />
                        </div>
                        <section className={styles.blogTopSectionBottom}>
                            <h1 className={styles.blogTopSectionBottomText}>
                                We connect our customers with the best, and help them keep up-and stay open.
                            </h1>
                            <div className={styles.bloglistsCompWrapper}>
                                <BlogList text='We connect our customers with the best?' />
                                <BlogList text='Android research & development rockstar?' />
                            </div>
                        </section>
                    </section>

                    <section className={styles.blogBottomSection}>
                        <div className={styles.bottomSectionTextWrapper}>
                            <p className={styles.bottomSectionSubText}>Our Blog</p>
                            <h1 className={styles.bottomSectionHeadingText}>Value proposition accelerator product management venture</h1>
                        </div>
                        <div>
                            <section className={styles.blogCardsWrapper}>
                                <BlogCard
                                    cardSrc={CardImage1}
                                    profileSrc={BlogImage1}
                                    name='Chandler Bing'
                                    content='Pitch termsheet backing validation focus release.'
                                />
                                <BlogCard
                                    cardSrc={CardImage2}
                                    profileSrc={BlogImage2}
                                    name='Rachel Green'
                                    content='Seed round direct mailing non-disclosure agreement graphical user interface rockstar.'
                                />
                                <BlogCard
                                    cardSrc={CardImage3}
                                    profileSrc={BlogImage3}
                                    name='Monica Geller'
                                    content='Beta prototype sales iPad gen-z marketing network effects value proposition'
                                />
                            </section>
                            <section className={styles.sectionButtonWrapper}>
                                <Button name='Load more' border='2px solid #0A2640' backgroundColor='transparent' color={'#0A2640'} height='60px' />
                            </section>
                        </div>
                    </section>
                </div>
            </Wrapper>
        </div>
    );
};

export default BlogSection;
