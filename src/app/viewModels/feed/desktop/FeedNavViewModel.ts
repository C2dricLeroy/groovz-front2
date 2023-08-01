import {useRouter} from "next/navigation";

export default function useFeedNavViewModel() {
    const router = useRouter();
    const signOut = async () => {
        try {
            localStorage.removeItem('userToken');
            router.push('/');
        } catch (error) {
            console.error('Error during sign out', error);
        }
    };

    return {
        router,
        signOut
    }
}