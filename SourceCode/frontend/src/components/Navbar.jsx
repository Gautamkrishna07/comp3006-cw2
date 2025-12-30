import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";
import { LogOut  } from "lucide-react";
import clsx from "clsx";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    
    return ( 
        <header className={styles.header}>
            <div className={styles.navbarContainer}>
                <h1 className={styles.title}>Social Media App</h1>
            
                <nav className={styles.navLinks}>
                    { user ? (
                        <>
                            <NavLink 
                                className={({ isActive }) => clsx(styles.navItem, { [styles.active]: isActive })}
                                to="/"
                            >Home Feed</NavLink>

                            <NavLink 
                                className={({ isActive }) => clsx(styles.navItem, { [styles.active]: isActive })}
                                to={`/profile/${user.username}`}
                            >{user.username}</NavLink>

                            <button className={clsx(styles.navItem)} onClick={logout}>
                                <LogOut size={20}/>
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink 
                                className={({ isActive }) => clsx(styles.navItem, { [styles.active]: isActive })}
                                to="/login"  
                            >Login</NavLink>

                            <NavLink 
                                className={({ isActive }) => clsx(styles.navItem, { [styles.active]: isActive })}
                                to="/signup"
                            >Signup</NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
 
export default Navbar;
