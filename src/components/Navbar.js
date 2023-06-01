import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        ColorFOO
      </div>
      <div className={styles.navLinks}>
        <div onClick={() => router.push("/About")}>About</div>
        <div onClick={() => router.push("/Schedule")}>Schedule</div>
        <div onClick={() => router.push("/booking")}>Tickets</div>
      </div>
    </nav>
  );
};

export default Navbar;
