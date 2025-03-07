import Head from "next/head";
import Image from "next/image";
import {Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import UserLayout from "@/layout/UserLayout";

const inter=Inter({subsets:["latin"]});

export default function Home() {
  const router=useRouter();
  return (
    <UserLayout>
      
      <div className={styles.mainContainer}>
          <h1>It is a long established fact that a reader</h1>
          <button onClick={()=>router.push("/login")}>Connect</button>
      </div>
    </UserLayout>
  );
}
