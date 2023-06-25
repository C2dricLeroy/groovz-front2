import {inspect} from "util";
import styles from "@/app/components/profile/mobile/styles.module.css"
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Buffer} from "buffer";
import {User} from "@/classes/User";
import Link from "next/link";

interface UserDataType {
    userId: string;
}

const WhiteSearchIcon = styled(SearchIcon)(({ theme }) => ({
    color: '#ffffff',
}));
export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchDone, setIsSearchDone] = useState(false);

    const [searchResults, setSearchResults] = useState<{ userName: string, userId: string }[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);




    const handleInputChange = (event: any) => {
        setSearchTerm(event.target.value);
    }


    const handleSearch = async () => {
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
                const response = await axios.get(`http://localhost:3333/search/${searchTerm}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                let results = response.data.filter((item: UserDataType) => item.userId !== userId);
                setIsSearchDone(true);
                setSearchResults(results);
            }
        } catch (error) {
            console.error('An error occurred while searching:', error);
        }
    }

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
                setIsSearchDone(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    return (
        <div className={styles.search} ref={searchRef}>
            <div className={styles.searchBox}>
                <input className={styles.searchInput} value={searchTerm} type="text" name="" placeholder="Search" onChange={handleInputChange}></input>
                <button className={styles.searchButton} onClick={handleSearch} >
                    <WhiteSearchIcon />
                </button>
            </div>
            <div className={styles.results}>
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <div className={styles.searchResults} key={result?.userId}>
                            <Link key={result?.userId} href={`/profile/userProfile/${result?.userId}`}>{result?.userName}</Link>
                        </div>
                    ))
                ) : (
                    isSearchDone && <div>No results found</div>
                )}
            </div>

        </div>
    )
}