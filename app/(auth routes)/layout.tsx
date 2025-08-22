import { ReactNode } from "react";
// import css from "./layout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
    //   className={css.authContainer}
    <div > 
      {children}
    </div>
  );
}
