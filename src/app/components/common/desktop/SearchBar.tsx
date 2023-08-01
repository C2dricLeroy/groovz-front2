import styles from "@/app/components/profile/desktop/styles.module.css"
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchViewModel } from "@/app/viewModels/SearchViewModel";

const WhiteSearchIcon = styled(SearchIcon)(({ theme }) => ({
    color: '#ffffff',
}));

export default function SearchBar() {
    const searchViewModel = useSearchViewModel();
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                searchViewModel.setSearchResults([]);
                searchViewModel.setIsSearchDone(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    return (
        <div className={styles.search} ref={searchRef}>
            <div className={styles.searchBox}>
                <input className={styles.searchInput} value={searchViewModel.searchTerm} type="text" name="" placeholder="Search" onChange={searchViewModel.handleInputChange} />
                <button className={styles.searchButton} onClick={searchViewModel.handleSearch} >
                    <WhiteSearchIcon />
                </button>
            </div>
            <div className={styles.results}>
                {searchViewModel.searchResults.length > 0 ? (
                    searchViewModel.searchResults.map((result) => (
                        <div className={styles.searchResults} key={result.userId}>
                            <Link key={result.userId} href={`/profile/userProfile/${result.userId}`}>{result.userName}</Link>
                        </div>
                    ))
                ) : (
                    searchViewModel.isSearchDone && <div>No results found</div>
                )}
            </div>
        </div>
    )
}
