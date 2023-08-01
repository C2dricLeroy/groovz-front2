import { useState, useCallback } from 'react';
import axios from 'axios';
import { User } from "@/models/User";
import { Buffer } from "buffer";
import { UserDataType } from "@/models/User"

export function useSearchViewModel() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchDone, setIsSearchDone] = useState(false);
    const [searchResults, setSearchResults] = useState<UserDataType[]>([]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleSearch = useCallback(async () => {
        setSearchResults([]);
        if (!searchTerm.trim()) {
            setIsSearchDone(true);
            return;
        }
        try {
            let token = await User.getToken();
            if (token !== null) {
                let payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                let userId = payload.userId;
                const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_HTTP + `/search/${searchTerm}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                let results = response.data.filter((item: UserDataType) => item.userId !== userId);
                setIsSearchDone(true);
                setSearchResults(results);
            }
        } catch (error) {
            console.error('An error occurred while searching:', error);
        }
    }, [searchTerm]);

    return {
        searchTerm,
        isSearchDone,
        searchResults,
        setSearchResults,
        setIsSearchDone,
        handleInputChange,
        handleSearch,
    }
}
