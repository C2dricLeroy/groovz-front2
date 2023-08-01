import {useEffect, useState} from "react";
import {Customer} from "@/models/Customer";


export default function useRecommendationViewModel() {
    const [newRecommendations, setRecommendations] = useState<any>([]);
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

    return {
        newRecommendations,
        loading,
        setLoading,
        setRecommendations
    }
}
