import React, { useEffect, useState, useRef } from 'react';
import { getEventsByCountry, searchEventsByKeyword } from '../services/api';

export default function Explore(){
  const [selectedCountry,setSelectedCountry] = useState(null);
  const [events,setEvents] = useState([]);
  const [participation,setParticipation] = useState({});
  const [search,setSearch] = useState('');
  const [loading,setLoading] = useState(false);
  const isInitialLoad = useRef(true);

  const countryMap = { Poland:'PL', Polonia:'PL' };

  useEffect(()=>{
    const stored = localStorage.getItem('participation');
    if(stored) setParticipation(JSON.parse(stored));
  },[]);

  const saveParticipation = (newP) => {
    localStorage.setItem('participation', JSON.stringify(newP));
  };

  useEffect(()=>{
    const handler = (e)=>{
      const name = typeof e.data === 'string' ? e.data.trim() : null;
      if(!name || isInitialLoad.current){ isInitialLoad.current=false; return; }
      const code = countryMap[name];
      if(!code) return;
      setLoading(true);
      setSelectedCountry(name);
      getEventsByCountry(code).then(data=>setEvents(data)).finally(()=>setLoading(false));
    };
    window.addEventListener('message', handler);
    return ()=>window.removeEventListener('message', handler);
  },[]);

  const handleSearch = ()=>{
    if(!search.trim()) return;
    setLoading(true);
    setSelectedCountry(null);
    searchEventsByKeyword(search).then(data=>setEvents(data)).finally(()=>{ setLoading(false); setSearch(''); });
  };

  const toggleParticipate = (title)=>{
    const newP = {...participation, [title]: !participation[title] };
    setParticipation(newP); saveParticipation(newP);
  };

  return (
    <div>
      <div className="top"><div className="logo">Folkline</div></div>
      <div style={{padding:10, display:'flex', gap:10}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Caută..." style={{flex:1,padding:8,borderRadius:5,background:'#34495E',color:'#fff',border:'none'}} />
        <button onClick={handleSearch} style={{background:'#FFB162',border:'none',padding:'8px 12px',borderRadius:5}}>Search</button>
      </div>

      <div style={{padding:10}}>
        <iframe src="%PUBLIC_URL%/map.html" title="map" style={{width:'100%',height:400,border:0}} />
      </div>

      {loading && <div style={{padding:20}}>Loading…</div>}

      {events.length>0 && (
        <div className="panel" style={{padding:15}}>
          <h3 style={{color:'#FFB162',textAlign:'center'}}>{selectedCountry || 'Rezultate'}</h3>
          <div>
            {events.map((e,i)=> (
              <div key={i} className="card" style={{marginBottom:12}}>
                {e.image && <img src={e.image} alt="" style={{width:'100%',height:180,objectFit:'cover',borderRadius:8,marginBottom:10}} />}
                <div style={{fontWeight:'bold',color:'#fff'}}>{e.title || 'Postare'}</div>
                <div style={{color:'#ddd'}}>{e.description}</div>
                {e.title && <div style={{marginTop:10}}>
                  <button className={`btn ${participation[e.title] ? 'active' : ''}`} onClick={()=>toggleParticipate(e.title)}>
                    {participation[e.title] ? 'Participi' : 'Participă'}
                  </button>
                </div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && events.length===0 && (
        <div style={{padding:20,textAlign:'center'}}>
          <div style={{color:'#EEE9DF',fontStyle:'italic'}}>Selectează o țară de pe hartă sau caută un eveniment.</div>
        </div>
      )}
    </div>
  );
}
