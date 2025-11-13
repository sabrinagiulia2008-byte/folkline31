import { getEmbedding, cosineSimilarity } from "./aiSearch";

// Exemple de date
const DATA = [
  { id: 1, title: "Festival Polonia", description: "Eveniment cultural în Polonia.", country: "PL", image: "https://picsum.photos/seed/pol1/400/300" },
  { id: 2, author: "Maria Kowalski", description: "Dansuri tradiționale", country: "PL", image: "https://picsum.photos/seed/pol2/400/300" }
];

let embeddings = [];

// Pre-calculează embedding-urile la start
const load = async () => {
  for (const item of DATA) {
    const text = `${item.title || ""} ${item.description || ""} ${item.author || ""}`.trim();
    const emb = await getEmbedding(text);
    if (emb) embeddings.push({ item, emb });
  }
};
load();

// Returnează evenimente după cod țară
export const getEventsByCountry = async (code) => {
  await new Promise(r => setTimeout(r, 500));
  return DATA.filter(i => i.country === code);
};

// Căutare după keyword
export const searchEventsByKeyword = async (kw) => {
  if (!kw?.trim()) return [];
  const q = kw.trim().toLowerCase();

  // Căutare după autor
  if (q.startsWith("@")) {
    return DATA.filter(i => i.author?.toLowerCase().includes(q.slice(1)));
  }

  // Căutare semantică cu embedding
  const qEmb = await getEmbedding(q);
  if (qEmb && embeddings.length) {
    return embeddings
      .map(({ item, emb }) => ({ item, score: cosineSimilarity(qEmb, emb) }))
      .filter(r => r.score > 0.25)
      .sort((a,b)=>b.score-a.score)
      .map(r => r.item);
  }

  // Căutare simplă text
  return DATA.filter(i => {
    const full = `${i.title || ""} ${i.description || ""} ${i.author || ""}`.toLowerCase();
    return full.includes(q);
  });
};
