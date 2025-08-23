import type { Metadata } from "next";
import css from "./EditProfilePage.module.css";
import { getUserServer, patchUserProfileServer } from "@/lib/api/serverApi";
import EditProfileForm from "./EditProfileForm.client";
import type { User } from "@/types/user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Edit Profile | NoteHub",
  robots: { index: false, follow: false },
};

export type FormState = {
  ok: boolean;
  error?: string;
  user?: User;
};

export default async function EditProfilePage() {
  const user = await getUserServer();
  if (!user) {
    redirect("/sign-in");
  }

  async function updateProfileAction(_: FormState, formData: FormData): Promise<FormState> {
    "use server";

    const username = (formData.get("username") || "").toString().trim();
    if (!username) {
      return { ok: false, error: "Username is required" };
    }

    try {
      const updated = await patchUserProfileServer({ username });
      revalidatePath("/profile");
      return { ok: true, user: updated };
    } catch (e) {
      return { ok: false, error: "Failed to update profile" };
    }
  }

  return (
    <main className={css.mainContent}>
      <EditProfileForm user={user} updateProfile={updateProfileAction} />
    </main>
  );
}
