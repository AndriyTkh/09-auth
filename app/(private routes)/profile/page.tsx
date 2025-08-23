import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getUserServer } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "User Profile | NoteHub",
  description: "Profile page for the logged in user",
  robots: { index: false, follow: false },
  openGraph: {
    title: "User Profile",
    description: "Manage your account details on NoteHub",
    type: "profile",
  },
};

export default async function ProfilePage() {
  const user = await getUserServer();

  if (!user) {
    return (
      <main className={css.mainContent}>
        <p>Failed to load profile</p>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "/avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
