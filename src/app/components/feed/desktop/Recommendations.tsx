import styles from '@/app/components/feed/desktop/styles.module.css'
import {useEffect, useState} from "react";
import {Customer} from "@/classes/Customer";
export default function Recommendations() {
    const [newRecommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const newRecommendations = await Customer.getRecommendations()
                setRecommendations(newRecommendations);
            } catch (error) {
                console.error("Failed to fetch new releases:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, []);


    return(
        <div className = {styles.recommandationsContainer}>
            {newRecommendations.map((recommendation) => (
                <a
                    key={recommendation.id}
                    href={recommendation.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className={styles.recommendation}>
                        <img
                            src={recommendation.album.images[0]?.url || 'defaultImageURL'}
                            alt={recommendation.name}
                        />
                        <h2 className={styles.recommandationName}>{recommendation.name}</h2>
                    </div>
                </a>
            ))}


        </div>
    )
}