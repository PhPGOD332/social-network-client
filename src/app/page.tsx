'use client'
import Image from "next/image";
import styles from "./page.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {IUser} from "@/types/IUser";

export default function Home() {
  const [users, setUsers] = useState<IUser>({email: "", id: 0, login: "", password: ""});

  useEffect(() => {
    const { response } = axios.get<IUser>('http://social-network.tw1.ru/users/1')
        .then((response) => {
          response.data
          setUsers(response.data);
        });

  }, []);

  return (
    <div className={styles.page}>
      <h1>Список пользователей</h1>
      {users && users.login}
    </div>
  );
}