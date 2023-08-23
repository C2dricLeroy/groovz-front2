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
            const results = await User.searchUsers(searchTerm)
            setIsSearchDone(true);
            setSearchResults(results);
        }
        catch (error) {
            console.error('An error occurred while searching:', error);
        }
    }, [searchTerm]);

    return {
        searchTerm,
        setSearchResults,
        setIsSearchDone,
        isSearchDone,
        searchResults,
        handleInputChange,
        handleSearch,
    }
}
