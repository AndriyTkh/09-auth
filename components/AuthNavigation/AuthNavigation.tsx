"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import styles from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { isAuthenticated, user, logout } = useAuthStore();

  if (isAuthenticated && user) {
    return (
      <nav className={styles.navigationItem}>
        <span className={styles.userEmail}>
          {user.email}
        </span>
        <Link href="/profile" className={styles.navigationLink}>
          Profile
        </Link>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </nav>
    );
  }

  return (
    <nav className={styles.navigationItem}>
      <Link href="/sign-in" className={styles.navigationLink}>
        Login
      </Link>
      <Link href="/sign-up" className={styles.navigationLink}>
        Sign Up
      </Link>
    </nav>
  );
}
