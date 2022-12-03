export default data = [
  {
    question: "Kosakata baru!",
    type: "new",
  },
  {
    question: "Apa bahasa Betawinya 'aku'?",
    options: ["aye", "babe", "ema", "elu"],
    correct_option: "aye",
    type: "choice",
  },
  {
    question: "Ketik bahasa Indonesianya 'keduman'",
    correct_answer: "kebagian",
    type: "input",
  },
  {
    from: "BI: Nama aku Budi. Kalau dia Asep.",
    to: "BB: Nama [...] Budi. Kalau [...] Asep.",
    answers: ["aye", "Budi"],
    type: "fillBlank",
  },
  {
    question: "Apa bahasa Betawinya 'siapa'?",
    options: ["sigrah", "poko", "siape", "pilon"],
    correct_option: "siape",
    type: "choice",
  },
  {
    question: "Apa bahasa Betawinya 'dia'?",
    options: ["die", "mau", "teler", "ketawe"],
    correct_answer: "die",
    type: "input",
  },
  {
    question: "Apa bahasa Indonesianya 'bagenin'?",
    options: ["beliin", "ngantuk", "biarin", "simpenkan"],
    correct_answer: "biarin",
    type: "input",
  },
  {
    question: "Apa bahasa Indonesianya 'keduman'?",
    options: ["kebagian", "gentong", "dompet", "penutupan"],
    correct_option: "kebagian",
    type: "choice",
  },
];

//change it so correct_option and correct_answer is the same, make it like an array and check for if the user's answer is in the list.
