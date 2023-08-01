import styles from '@/app/components/common/styles.module.css'
import {useEffect, useState} from "react";
import {Customer} from "@/models/Customer";
import useRecommendationViewModel from "@/viewModels/common/RecommendationViewModel";
export default function Recommendations() {
    const recommendationViewModel = useRecommendationViewModel();

    return(
        <div className = {styles.recommandationsContainer}>
            {recommendationViewModel.newRecommendations.map((recommendation: any) => (
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