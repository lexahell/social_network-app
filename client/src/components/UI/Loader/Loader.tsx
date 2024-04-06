import styles from './Loader.module.css'
import {BounceLoader} from "react-spinners";
import React from "react";
interface LoaderPops {
    size: number
}
const Loader: React.FC<LoaderPops> = ({size}) => {
    return (
        <div className={styles.loader}>
            <BounceLoader color={"rgb(29 78 216)"} size={size}/>
        </div>
    );
};

export default Loader;