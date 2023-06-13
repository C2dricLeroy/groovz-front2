import {inspect} from "util";
import styles from "@/app/components/profile/desktop/styles.module.css"
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Buffer} from "buffer";
import {User} from "@/classes/User";

const WhiteSearchIcon = styled(SearchIcon)(({ theme }) => ({
    color: '#ffffff',
}));
export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<{ userName: string }[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);



    const handleInputChange = (event: any) => {
        setSearchTerm(event.target.value);
    }


    const handleSearch = async () => {
        setSearchResults([]);

        if (!searchTerm.trim()) {
            return;
        }

        try {
            let token = await User.getToken();
            if (token !== null) {
                const response = await axios.get(`http://localhost:3333/search/${searchTerm}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                console.log(response.data);
                setSearchResults(response.data);
            }
        } catch (error) {
            console.error('An error occurred while searching:', error);
        }
    }

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
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
                {searchResults.map((result, index) => (
                    <p key={index} className={styles.searchResults}>{result?.userName}</p>
                ))}
            </div>
        </div>
    )
}