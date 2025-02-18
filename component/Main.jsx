import React, { useEffect, useState } from 'react';

const Main = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");


    const sendRequestHandler = async() => {
      const res = await fetch('/api/Db', {
        method:"POST",
        body: JSON.stringify({name, email, course}),
        headers: {"Content-Type": "application/json"}
      })
      const data = await res.json();
      console.log(data)
  
    };

  return (
    <section style={{ margin: "0.5rem 1rem" }}>
      <h2>connecting next.js app to dataBase</h2>
      <label htmlFor="text">enter something</label>
      <input type="text" id="text" value={name} onChange={e=> setName(e.target.value)} />

      <br />
      <label htmlFor="email">enter email</label>
      <input type="text" id="email" value={email} onChange={e=> setEmail(e.target.value)} />

      <br />

      <label htmlFor="course">enter courses name</label>
      <input type="text" id="course" value={course} onChange={e=> setCourse(e.target.value)} />

      <button style={{cursor:"pointer"}} onClick={sendRequestHandler}>send Obj</button>
    </section>
  );
};

export default Main;