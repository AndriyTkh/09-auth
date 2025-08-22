import type { Metadata } from "next";
import ProfileClient from "./ProfilePage.client";
import css from "./ProfilePage.module.css";

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

export default function ProfilePage() {
  return (
    <main className={css.mainContent}>
      <ProfileClient />
    </main>
  );
}
