

import Card from "@/app/components/homepage/Card";
import HomeFooter from "@/app/components/homepage/homeFooter";

import styles from '@/styles/styles.module.css';
import Image from "next/image";
import ScrollButton from "@/app/components/homepage/scrollButton";
import HomeButton from "@/app/components/homepage/homeButton";

function HomePage() {

    const handlePress = () => {
        const element = document.querySelector("#homePage");
        if(element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div>
            <div id={"homePage"} className={styles.homePage}>
                <div>
                    <h1 className={styles.mainTitle}>Groovz</h1>
                    <p className={styles.mainText}>A playlist sharing platform</p>
                </div>
                <div className={styles.buttonContainer}>
                    <HomeButton title={"Login"} link={"/signin"}/>
                    <HomeButton title={"Signup"} link={"/signup"}/>
                </div>
                <ScrollButton/>
            </div>
            <div className={styles.container}>
                <p className={styles.homeText}>Lorem ipsum...</p>
                <div className={styles.cardWrapper}>
                    <div>
                        <Card />
                        <p className={styles.cardText}>Lorem ipsum...</p>
                    </div>
                    <div>
                        <Card />
                        <p className={styles.cardText}>Lorem ipsum...</p>
                    </div>
                    <div>
                        <Card />
                        <p className={styles.cardText}>Lorem ipsum...</p>
                    </div>
                </div>
            </div>
            <HomeFooter />
        </div>
    );
}

export default HomePage;
