import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuthCtx } from "@/context/AuthContext";
import Link from "next/link";
import Search from "./Search";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const { user, logout } = useAuthCtx();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">My Site</Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">Add Event</Link>
              </li>
              <li>
                <Link href="/account/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className="btn-secondary btn-icon"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/account/login" className="btn-secondary btn-icon">
                <FaSignInAlt /> Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
