import {inspect} from "util";
import styles from "@/app/components/profile/desktop/styles.module.css"
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const WhiteSearchIcon = styled(SearchIcon)(({ theme }) => ({
    color: '#ffffff',
}));
export default function SearchBar() {
    return (

        <div className={styles.searchBox}>
            <input className={styles.searchInput} type="text" name="" placeholder="Search"></input>
                <button className={styles.searchButton} >
                    <WhiteSearchIcon />
                </button>
        </div>
    )
}