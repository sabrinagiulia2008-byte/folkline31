import React, { useEffect, useState } from 'react';

export default function Account(){
  const [participation,setParticipation] = useState({});

  useEffect(()=>{
    const stored = localStorage.getItem('participation');
    if(stored) setParticipation(JSON.parse(stored));
    const iv = setInterval(()=>{
      const s = localStorage.getItem('participation');
      if(s) setParticipation(JSON.parse(s));
    },1000);
    return ()=>clearInterval(iv);
  },[]);

  const participatingEvents = Object.keys(participation).filter(t=>participation[t]);

  return (
    <div style={{padding:20}}>
      <h2 style={{color:'#FFB162'}}>Contul Meu</h2>
      <p style={{color:'#EEE9DF'}}>Evenimente la care participi:</p>
      {participatingEvents.length>0 ? (
        <div>
          {participatingEvents.map(title=> (
            <div key={title} style={{background:'#2C3B4D',padding:12,borderRadius:8,marginBottom:8}}>
              <div style={{color:'#EEE9DF'}}>{title}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">Nu participi la niciun eveniment încă.</div>
      )}
    </div>
  );
}
