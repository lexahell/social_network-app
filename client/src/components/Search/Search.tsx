import React from 'react';
import styles from './Search.module.css'
import {CiSearch} from "react-icons/ci";
interface SearchProps {
    placeholder: string;
}
const Search : React.FC<SearchProps> = ({placeholder}) => {
    return (
        <div className={styles.search}>
            <form>
                <div className={styles.searchGroup}>
                    <div className={styles.searchIcon}>
                        <CiSearch color={'#a7a6a8'} size={21}/>
                    </div>
                    <input type="text" placeholder={placeholder}/>
                </div>
            </form>
        </div>
    );
};

export default Search;