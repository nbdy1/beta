export default data = [
  [
    //chapter 1 - stage 1
    {
      type: "new",
      content: [
        {
          new_word: "Ane",
          meaning: "saya / aku",
          example: "Ane lagi di pasar",
          alternative: "aye",
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
      options: ["Mpok", "ane", "Nyak", "die"],
      correct_option: "Nyak",
      type: "choice",
    },
    {
      question: "Apa bahasa Betawinya 'Kakak laki-laki'?",
      options: ["Abang", "Babe", "Nyak", "ane"],
      correct_option: "Abang",
      type: "choice",
    },
    {
      question: "Apa bahasa Betawinya 'Kakak perempuan'?",
      correct_answer: ["mpok", "empok"],
      type: "input",
    },
    {
      question: "Apa bahasa Indonesianya 'Babe'?",
      correct_answer: ["bapak", "papa"],
      type: "input",
    },
    {
      from: "BI: Di pasar ada Ibu",
      to: "BB: Di pasar ada [...]",
      answers: [["nyak", "enyak"]],
      type: "fillBlank",
    },
  ],
  [
    //chapter 1 - stage 2
    {
      type: "new",
      content: [
        {
          new_word: "Kite",
          meaning: "kita / kami",
          example: "Kite lagi main layang-layang",
        },
        {
          new_word: "Ntu orang",
          meaning: "mereka",
          example: "Ntu orang datang dari Jogja",
        },
      ],
    },
    {
      question: "Apa bahasa Betawinya 'kalian'?",
      options: ["mpok", "lu pade", "kite", "babe"],
      correct_option: "lu pade",
      type: "choice",
    },
    {
      question: "Apa bahasa Betawinya 'Ntu orang'?",
      options: ["nyak", "kite", "lu pade", "mereka"],
      correct_option: "mereka",
      type: "choice",
    },
    {
      question: "Apa bahasa Betawinya 'kakak laki-laki'?",
      correct_answer: "abang",
      type: "input",
    },
    {
      from: "BI: Ibu lagi nelpon kakak (laki-laki).",
      to: "BB: [...] lagi nelpon [...].",
      answers: [["nyak", "enyak"], "abang"],
      type: "fillBlank",
    },
    {
      question: "Apa bahasa Betawinya 'kakak perempuan'?",
      correct_answer: ["mpok", "empok"],
      type: "input",
    },

    {
      question: "Apa bahasa Indonesianya 'kite'?",
      options: ["ntu orang", "lu pade", "layang-layang", "kita"],
      correct_option: "kita",
      type: "choice",
    },
    {
      type: "new",
      content: [
        {
          new_word: "Gue, Gua, Ogut",
          same_with: "ane / aye",
          example: "Ogut lagi gak mau akan",
          alternative: "gw",
        },
        {
          new_word: "Lu, Lo, Elu",
          same_with: "ente",
          example: "Elu beneran gak jadi bantuin?",
          alternative: "eluh, loe",
        },
        {
          new_word: "Lu pade",
          meaning: "kalian",
          example: "Lu pade udah makan belum",
          alternative: "lu pade, lo pade, elu pade, eluh pade, loe pade",
        },
      ],
    },
    {
      question: "Apa bahasa Betawinya 'aku'?",
      options: ["lo", "ogut", "ente", "lumba-lumba"],
      correct_option: "ogut",
      type: "choice",
    },
    {
      question: "Yang mana yang BUKAN terjemahan kata 'kamu'?",
      options: ["lu", "lo", "luh", "eluh"],
      correct_option: "luh",
      type: "choice",
    },
    {
      from: "BI: Kalian dan mereka sama saja menurut aku.",
      to: "BB: [...] dan [...] sama saja menurut [...]",
      answers: [["lu pade", "lo pade"], ["ntu orang"], ["ane", "aye"]],
      type: "fillBlank",
    },
    {
      question: "Apa bahasa Indonesianya 'kamu'?",
      correct_answer: ["ente", "elu", "eluh", "loe", "lu", "lo"],
      type: "input",
    },
    {
      question: "Apa bahasa Betawinya 'dia'?",
      options: ["ntu orang", "die", "lo pade", "ente"],
      correct_option: "die",
      type: "choice",
    },
    {
      question: "Apa bahasa Indonesianya 'ogut'?",
      correct_answer: ["aku", "saya"],
      type: "input",
    },
    {
      from: "BI: Kamu punya dua kakak perempuan, aku cuma punya satu.",
      to: "BB: [...] punya dua [...], [...] cuma punya satu.",
      answers: [
        ["ente", "lo", "loe", "lu", "eluh", "elu"],
        ["mpok", "empok"],
        ["ane", "aye", "gw", "gua", "gue", "ogut"],
      ],
      type: "fillBlank",
    },
    {
      question: "Apa bahasa Indonesianya 'Nyak'?",
      correct_answer: ["ibu", "mama"],
      type: "input",
    },
    {
      from: "BB: Lo pade emang mau ngapain?",
      to: "BI: [...] emang mau ngapain?",
      answers: ["kalian"],
      type: "fillBlank",
    },
  ],
  [
    //chapter 1 - stage 3
  ],
  [
    //chapter 1 - stage 4
  ],
  [
    //chapter 1 - stage 5
  ],
  [
    //chapter 1 - stage 6
  ],
];

//change it so correct_option and correct_answer is the same, make it like an array and check for if the user's answer is in the list.

// {
//   question: "Ketik bahasa Indonesianya 'keduman'",
//   correct_answer: "kebagian",
//   type: "input",
// },

// lesson 2 show kalau some words have different spellings or alternative words

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
