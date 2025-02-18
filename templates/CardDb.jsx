import React, { useState } from "react";
import styles from "../component/db.module.css";
const CardDb = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const editHandler = async (user) => {
    setIsEdit(user._id);
    setName(user.name);
    setLastName(user.lastName);
    setEmail(user.email);
  };

  const saveHandler = async (id) => {
    await fetch(`/api/Db/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, lastName, email }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const removeHandler = async (id) => {
    await fetch(`/api/Db/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <section className={styles.card_container}>
      {data.length ? (
        data.map((user) => (
          <section className={styles.db_card} key={user._id}>
            <div className={styles.card_info}>
              <p> Name: {user.name}</p>

              <p> Last name: {user.lastName}</p>
              <p>
                {" "}
                Email: {user.email ? (
                  user.email
                ) : (
                  <span>email not found</span>
                )}{" "}
              </p>
              {isEdit && isEdit === user._id ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <span>{`edit name => `} </span>
                  <input
                    style={{
                      padding: " 0.3rem 0.5rem",
                      marginTop: "0.3rem",
                      outline: "dotted",
                      borderRadius: "0.3rem",
                    }}
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span>{`edit lastName => `} </span>
                  <input
                    style={{
                      padding: " 0.3rem 0.5rem",
                      marginTop: "0.3rem",
                      outline: "dotted",
                      borderRadius: "0.3rem",
                    }}
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <span>{`edit email => `} </span>
                  <input
                    style={{
                      padding: " 0.3rem 0.5rem",
                      marginTop: "0.3rem",
                      outline: "dotted",
                      borderRadius: "0.3rem",
                    }}
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.card_tools}>
              <span onClick={() => editHandler(user)}>
                <img src="./icon/pen.svg" width={20} height={20} alt="" />
              </span>
              <span onClick={() => saveHandler(user._id)}>
                {" "}
                <img src="./icon/save.svg" width={20} height={20} alt="" />{" "}
              </span>
              <span onClick={() => removeHandler(user._id)}>
                <img src="./icon/trash.svg" width={20} height={20} alt="" />
              </span>
            </div>
          </section>
        ))
      ) : (
        <div style={{ display: "flex" }}>
          <h3 style={{ border: "none", marginRight: "0.5rem" }}>
            {" "}
            Data not found
          </h3>
          <img src="./icon/face-worried.svg" width={20} height={20} alt="" />
        </div>
      )}
    </section>
  );
};

export default CardDb;
