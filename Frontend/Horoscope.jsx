import { useState, useEffect } from "react";

function Horoscope({ token }) {
  const [horoscope, setHoroscope] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/myhoroscope?day=today", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setHoroscope(data))
      .catch(err => console.error(err));
  }, [token]);

  if (!horoscope) return <div>Loading...</div>;

  return (
    <div>
      <h2>Horoscope for {horoscope.sign} ({horoscope.day})</h2>
      <p>{horoscope.horoscope.description}</p>
      <ul>
        <li>Mood: {horoscope.horoscope.mood}</li>
        <li>Color: {horoscope.horoscope.color}</li>
        <li>Lucky Number: {horoscope.horoscope.lucky_number}</li>
        <li>Lucky Time: {horoscope.horoscope.lucky_time}</li>
      </ul>
    </div>
  );
}

export default Horoscope;
