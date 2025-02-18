import React, { useEffect, useState } from "react";
import styles from "./db.module.css";
import CardDb from "../templates/CardDb";
import Loader from "../templates/Loader";

const DbListsNew = () => {
  const [response, setResponse] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dataFetcher = () => {
    fetch("/api/Db/main")
      .then((res) => res.json())
      .then((data) => setResponse(data.data))
      .finally(() => setIsLoading(true));
  };

  useEffect(() => {
    dataFetcher();
  }, []);

  const postHandler = async () => {
    await fetch("api/Db/main", {
      method: "POST",
      body: JSON.stringify({ name, lastName, email }),
      headers: { "Content-Type": "application/json" },
    });

    dataFetcher();
  };

  const deleteAllData = async () => {
    const res = await fetch("/api/Db/main", {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <section className={styles.container}>
      <h3>create data in db</h3>
      <div className={styles.container_fields}>
        <div className={styles.input_wrapper}>
          <div className={styles.input_container}>
            <label htmlFor="name">name: </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="name..."
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="lastName">Last name: </label>
            <input
              type="text"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="lastName"
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="email..."
              style={{ marginBottom: "0" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button style={{ background: "red" }} onClick={deleteAllData}>
            delete db
          </button>

          <button onClick={postHandler}>save data</button>
        </div>
      </div>
      <h3 style={{ textAlign: "center" }}>db lists</h3>

      {isLoading ? (
        <CardDb dataFetcher={dataFetcher()} data={response} />
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default DbListsNew;
