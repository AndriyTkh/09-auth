"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import type { User } from "@/types/user";
import type { FormState } from "./page";

type Props = {
  user: User;
  updateProfile: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export default function EditProfileForm({ user, updateProfile }: Props) {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [state, formAction] = useActionState<FormState, FormData>(updateProfile, { ok: false });
  const [username, setUsername] = useState<string>(user.username ?? "");

  useEffect(() => {
    if (state?.ok && state.user) {
      setUser(state.user);
      router.push("/profile");
    }
  }, [state, setUser, router]);

  return (
    <div className={css.profileCard}>
      <h1 className={css.formTitle}>Edit Profile</h1>

      <Image
        src={user.avatar || "/avatar.png"}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />

      <form className={css.profileInfo} action={formAction}>
        <div className={css.usernameWrapper}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            className={css.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <p>Email: {user.email}</p>

        {state?.error && <p className={css.error}>{state.error}</p>}

        <div className={css.actions}>
          <button type="submit" className={css.saveButton}>
            Save
          </button>
          <button
            type="button"
            className={css.cancelButton}
            onClick={() => router.push("/profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
