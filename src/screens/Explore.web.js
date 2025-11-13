import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { getEventsByCountry, searchEventsByKeyword } from "../services/api";

export default function Explore() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [events, setEvents] = useState([]);
  const [participation, setParticipation] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const isInitialLoad = useRef(true);

  const countryMap = { Poland: "PL", Polonia: "PL" };

  useEffect(() => {
    const stored = localStorage.getItem("participation");
    if (stored) setParticipation(JSON.parse(stored));
  }, []);

  const saveParticipation = (newP) => {
    localStorage.setItem("participation", JSON.stringify(newP));
  };

  useEffect(() => {
    const handler = (e) => {
      const name = typeof e.data === "string" ? e.data.trim() : null;
      if (!name || isInitialLoad.current) { isInitialLoad.current = false; return; }
      const code = countryMap[name];
      if (!code) return;
      setLoading(true);
      setSelectedCountry(name);
      getEventsByCountry(code)
        .then(setEvents)
        .finally(() => setLoading(false));
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    setLoading(true);
    setSelectedCountry(null);
    searchEventsByKeyword(search)
      .then(setEvents)
      .finally(() => { setLoading(false); setSearch(""); });
  };

  const toggleParticipate = (title) => {
    const newP = { ...participation, [title]: !participation[title] };
    setParticipation(newP);
    saveParticipation(newP);
  };

  return (
    <View style={s.container}>
      <View style={s.top}><Text style={s.logo}>Folkline</Text></View>
      <View style={s.search}>
        <TextInput
          style={s.input}
          placeholder="Caută..."
          placeholderTextColor="#ccc"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Text style={s.searchBtn}>Search</Text>
        </TouchableOpacity>
      </View>
      <iframe src="/map.html" style={{ width:"100%", height:400, border:0 }} title="map" />
      {loading && <View style={{ padding:20 }}><ActivityIndicator color="#FFB162" /></View>}
      {events.length > 0 && (
        <View style={s.panel}>
          <Text style={s.title}>{selectedCountry || "Rezultate"}</Text>
          <ScrollView>
            {events.map((e,i)=>(
              <View key={i} style={s.card}>
                {e.image && <Image source={{ uri: e.image }} style={s.img} />}
                <Text style={s.event}>{e.title || "Postare"}</Text>
                <Text style={s.desc}>{e.description}</Text>
                {e.title && (
                  <TouchableOpacity
                    style={[s.btn, participation[e.title] && s.btnActive]}
                    onPress={()=>toggleParticipate(e.title)}
                  >
                    <Text style={s.btnText}>{participation[e.title]?"Participi":"Participă"}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      {!loading && events.length===0 && (
        <View style={{ padding:20, alignItems:"center" }}>
          <Text style={{ color:"#EEE9DF", fontStyle:"italic" }}>Selectează o țară de pe hartă sau caută un eveniment.</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1,backgroundColor:"#1B2632"},
  top:{padding:15,alignItems:"center"},
  logo:{fontSize:22,fontWeight:"bold",color:"#FFB162"},
  search:{flexDirection:"row",padding:10,backgroundColor:"#2C3E50",alignItems:"center"},
  input:{flex:1,color:"#fff",backgroundColor:"#34495E",padding:8,borderRadius:5},
  searchBtn:{color:"#FFB162",fontSize:16,marginLeft:10},
  panel:{backgroundColor:"#2C3E50",padding:15,borderTopLeftRadius:15,borderTopRightRadius:15},
  title:{color:"#FFB162",fontWeight:"bold",textAlign:"center",marginBottom:10},
  card:{backgroundColor:"#34495E",padding:12,borderRadius:10,marginBottom:12},
  img:{width:"100%",height:180,borderRadius:8,marginBottom:10},
  event:{color:"#fff",fontWeight:"bold"},
  desc:{color:"#ddd"},
  btn:{backgroundColor:"#FFB162",padding:10,borderRadius:5,alignItems:"center",marginTop:10},
  btnActive:{backgroundColor:"#F5F5DC"},
  btnText:{color:"#1B2632",fontWeight:"bold"},
});
