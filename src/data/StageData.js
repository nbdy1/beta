export default data = [
  {
    type: "new",
    content: [
      {
        new_word: "Ane",
        meaning: "saya / aku",
        example: "Ane lagi di pasar",
      },
      {
        new_word: "Ente",
        meaning: "kamu / engkau",
        example: "Ente gimana sih",
      },
      {
        new_word: "Die",
        meaning: "dia",
        example: "Die lagi ke warung",
      },
    ],
  },
  {
    question: "Apa bahasa Betawinya 'aku'?",
    options: ["ane", "ente", "die", "aku"],
    correct_option: "ane",
    type: "choice",
  },
  {
    question: "Apa bahasa Betawinya 'kamu'?",
    options: ["die", "aku", "ente", "ane"],
    correct_option: "ente",
    type: "choice",
  },

  {
    question: "Apa bahasa Betawinya 'dia'?",
    correct_answer: "die",
    type: "input",
  },
  {
    from: "BI: Nama aku Budi. Kalau dia Asep.",
    to: "BB: Nama [...] Budi. Kalau [...] Asep.",
    answers: ["ane", "die"],
    type: "fillBlank",
  },
  {
    from: "BI: Aku dan dia sudah dipanggil. Kalau kamu?",
    to: "BB: [...] dan [...] sudah dipanggil. Kalau [...]",
    answers: ["ane", "die", "ente"],
    type: "fillBlank",
  },
  {
    type: "new",
    content: [
      {
        new_word: "(e)nyak",
        meaning: "Ibu / Mama",
        example: "Enyak lagi masak di dapur",
      },
      {
        new_word: "Babe",
        meaning: "Bapak / Papa",
        example: "Babe die lagi kerja",
      },
      {
        new_word: "Abang",
        meaning: "Kakak laki-laki",
        example: "Abang lagi ke Tanah Abang",
      },
      {
        new_word: "(e)mpok",
        meaning: "Kakak perempuan",
        example: "Empok sedang mengerjakan tugas sekolah",
      },
    ],
  },
  {
    question: "Apa bahasa Betawinya 'Ibu'?",
    options: ["Mpok", "Ane", "Nyak", "Die"],
    correct_option: "Nyak",
    type: "choice",
  },
  {
    question: "Apa bahasa Betawinya 'Kakak laki-laki'?",
    options: ["Abang", "Babe", "Nyak", "Ane"],
    correct_option: "Abang",
    type: "choice",
  },
  {
    question: "Apa bahasa Betawinya 'Kakak perempuan'?",
    correct_answer: "mpok",
    type: "input",
  },
  {
    question: "Apa bahasa Indonesianya 'Babe'?",
    correct_answer: "bapak",
    type: "input",
  },
  {
    from: "BI: Di pasar ada Ibu",
    to: "BB: Di pasar ada [...]",
    answers: [["nyak", "enyak"]],
    type: "fillBlank",
  },
  // {
  //   question: "Apa bahasa Indonesianya 'bagenin'?",
  //   options: ["beliin", "ngantuk", "biarin", "simpenkan"],
  //   correct_answer: "biarin",
  //   type: "choice",
  // },
  // {
  //   question: "Apa bahasa Indonesianya 'keduman'?",
  //   options: ["kebagian", "gentong", "dompet", "penutupan"],
  //   correct_option: "kebagian",
  //   type: "choice",
  // },
];

//change it so correct_option and correct_answer is the same, make it like an array and check for if the user's answer is in the list.

// {
//   question: "Ketik bahasa Indonesianya 'keduman'",
//   correct_answer: "kebagian",
//   type: "input",
// },

// lesson 2 show kalau some words have different spellings or alternative words
