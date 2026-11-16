import { ExplanationResponse } from "@/types";

export const SAMPLE_DATA: ExplanationResponse = {
  title: "Photosynthesis (روشنی سے خوراک بنانا)",
  explanation:
    "Photosynthesis darasal podhon (plants) ka khana banane ka qudrati tareeqa hai. Podhe suraj ki dhoop (sunlight), hawa se carbon dioxide (CO2), aur zameen se paani (water) jazb karte hain. Apne patton ke andar mojud 'Chlorophyll' (jo unhein hara rang deta hai) ki madad se yeh cheezain Glucose (podhe ki khorak) aur Oxygen mein badal jati hain. Wahi oxygen hum insaan saans lene ke liye istemal karte hain!",
  example:
    "🇵🇰 Pakistani Misaal: Sochain jaise Lahore ya Karachi mein load shedding ke doraan solar panel dhoop se bijli banata hai, bilkul wese hi podhe ke patte qudrati solar panels hain! Jaise Ammi kitchen mein gas, aatay aur paani se garam roti banati hain, wese hi podha dhoop, hawa aur paani se apne liye roti (glucose) tayyar karta hai.",
  quiz: [
    {
      question: "Podhon ke patton ko hara rang (green color) kis cheez ki wajah se milta hai?",
      options: ["Carbon Dioxide", "Chlorophyll", "Oxygen", "Glucose"],
      correctIndex: 1,
      explanation: "Chlorophyll podhon ka qudrati pigment hai jo suraj ki roshni ko pakarta hai aur patton ko hara rang deta hai.",
    },
    {
      question: "Photosynthesis ke process mein podhe hawa se konsi gas lete hain aur konsi bahar chortay hain?",
      options: [
        "Oxygen lete hain, Carbon Dioxide chortay hain",
        "Nitrogen lete hain, Hydrogen chortay hain",
        "Carbon Dioxide lete hain, Oxygen chortay hain",
        "Methane lete hain, Oxygen chortay hain",
      ],
      correctIndex: 2,
      explanation: "Podhe hawa se harmful CO2 jazb karte hain aur badle mein humare saans lene ke liye taaza Oxygen faraham karte hain.",
    },
    {
      question: "Photosynthesis ka mukammal amal hone ke liye in mein se konsi cheez zaroori NAHI hai?",
      options: ["Suraj ki roshni (Sunlight)", "Paani (Water)", "Andhera (Darkness)", "Chlorophyll"],
      correctIndex: 2,
      explanation: "Photosynthesis din ke waqt roshni ki mojoodgi mein hota hai, andhera iske liye zaroori nahi hai.",
    },
  ],
};
