import styles from './Loader.module.css'
import {BounceLoader} from "react-spinners";
const Loader = () => {
    return (
        <div className={styles.loader}>
            <BounceLoader color={"rgb(29 78 216)"} size={60}/>
        </div>
    );
};

export default Loader;