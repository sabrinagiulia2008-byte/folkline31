import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Account() {
  const [participation, setParticipation] = useState({});

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem("participation");
      if (stored) setParticipation(JSON.parse(stored));
    };
    load();
    const interval = setInterval(load, 1000);
    return () => clearInterval(interval);
  }, []);

  const participatingEvents = Object.keys(participation).filter(title => participation[title]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contul Meu</Text>
      <Text style={styles.subtitle}>Evenimente la care participi:</Text>
      {participatingEvents.length > 0 ? (
        <ScrollView>
          {participatingEvents.map(title => (
            <View key={title} style={styles.item}>
              <Text style={styles.text}>{title}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.empty}>Nu participi la niciun eveniment încă.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1B2632", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#FFB162", marginBottom: 20 },
  subtitle: { fontSize: 18, color: "#EEE9DF", marginBottom: 15 },
  item: { backgroundColor: "#2C3B4D", padding: 15, borderRadius: 10, marginBottom: 10 },
  text: { color: "#EEE9DF" },
  empty: { color: "#C9C1B1", fontStyle: "italic" },
});
