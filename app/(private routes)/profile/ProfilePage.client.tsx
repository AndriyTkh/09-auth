"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from '@/lib/api/clientApi';
import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ProfileClient() {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  if (isLoading) return <p>Loading profile...</p>;
  if (isError || !user) return <p>Failed to load profile</p>;

  return (
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
  );
}
