const processes = [
  { id: "assess", number: "01", label: "Assess" },
  { id: "analyze", number: "02", label: "Analyze" },
  { id: "plan", number: "03", label: "Plan" },
  { id: "implement", number: "04", label: "Implement" },
  { id: "evaluate", number: "05", label: "Evaluate" },
];

const categories = ["General", "Patient Teaching", "Medication", "Laboratory", "Delegation"];
const systems = [
  "Day 0",
  "Cardiovascular",
  "Respiratory",
  "Gastrointestinal",
  "Urinary",
  "Hematology",
  "Infectious Diseases",
  "Neurology",
  "Endocrine",
  "Musculoskeletal",
  "Integumentary",
  "Oncology",
  "Gynecology",
];

const systemBackgrounds = {
  "Day 0": "assets/body-systems/day-0.png",
  Cardiovascular: "assets/body-systems/cardiovascular.png",
  Respiratory: "assets/body-systems/respiratory.png",
  Gastrointestinal: "assets/body-systems/gastrointestinal.png",
  Urinary: "assets/body-systems/urinary.png",
  Hematology: "assets/body-systems/hematology.png",
  "Infectious Diseases": "assets/body-systems/infectious-diseases.png",
  Neurology: "assets/body-systems/neurology.png",
  Endocrine: "assets/body-systems/endocrine.png",
  Musculoskeletal: "assets/body-systems/musculoskeletal.png",
  Integumentary: "assets/body-systems/integumentary.png",
  Oncology: "assets/body-systems/oncology.png",
  Gynecology: "assets/body-systems/gynecology.png",
  ICU: "assets/body-systems/icu.png",
  ER: "assets/body-systems/er.png",
  "Nurses Station": "assets/body-systems/nurses-station.png",
};

/** Excel revLNum → body system (1-based; Day 0 is app-only) */
const revLNumSystems = [
  null,
  "Cardiovascular",
  "Respiratory",
  "Gastrointestinal",
  "Urinary",
  "Hematology",
  "Infectious Diseases",
  "Neurology",
  "Endocrine",
  "Musculoskeletal",
  "Integumentary",
  "Oncology",
  "Gynecology",
];

const qgCategoryMap = {
  general: "General",
  labs: "Laboratory",
  lab: "Laboratory",
  laboratory: "Laboratory",
  teaching: "Patient Teaching",
  "patient teaching": "Patient Teaching",
  medication: "Medication",
  meds: "Medication",
  delegation: "Delegation",
};

const qgLevelMap = {
  regular: "R",
  r: "R",
  super: "S",
  s: "S",
  superlative: "S",
};

const dissectBackground = "assets/body-systems/dissect-tutorial-bg.png?v=5";

const dissectLesson = {
  title: "Dissecting the NCLEX",
  questions: [
    {
      stem: "An elderly client with a history of glaucoma is recently diagnosed with a gastrointestinal disorder. The nurse would consult with the physician after noting the medication order for which of the following medications that should be used very cautiously, if at all, for this client?",
      choices: [
        "Omeprazole (Prilosec)",
        "Dicyclomine (Bentyl)",
        "Metoclopramide (Reglan)",
        "Aluminum/Magnesium hydroxide (Maalox)",
      ],
      correctIndex: 1,
    },
    {
      stem: "Which of the following blood products does the nurse anticipate the physician will order for a client diagnosed with hemophilia?",
      choices: [
        "Fresh frozen plasma",
        "Whole blood",
        "Packed Red Blood Cells (RBCs)",
        "Albumin",
      ],
      correctIndex: 0,
    },
    {
      stem: "Frequently, sodium consumption and substance abuse are linked to hypertension. These factors are classified as:",
      choices: [
        "Gender risk factors",
        "Non-modifiable risk factors",
        "Personal risk factors",
        "Modifiable risk factors",
      ],
      correctIndex: 3,
    },
    {
      stem: "In evaluating the electrocardiogram (ECG) of the client in the Emergency Department, the nurse notes ST segment depression and inverted T waves, indicating which of the following?",
      choices: [
        "Atrial wall infarction",
        "Myocardial ischemia",
        "Right ventricular infarction",
        "Left ventricular hypertrophy",
      ],
      correctIndex: 1,
    },
    {
      stem: "The physician prescribes losartan (Cozaar) for a client with hypertension. The nurse carrying out the order teaches the client that this medication promotes vasodilation by:",
      choices: [
        "Promoting release of aldosterone.",
        "Preventing calcium from going into the cells.",
        "Promoting epinephrine and norepinephrine.",
        "Inhibiting conversion of a substance that would cause vasoconstriction.",
      ],
      correctIndex: 3,
    },
    {
      stem: "An inpatient client diagnosed with thromboangiitis obliterans (Buerger's disease) is about to be discharged. Which of the following items is most important to include in the instructions given to the client to prevent advancement of the disease?",
      choices: [
        "Smoking cessation",
        "Checking blood pressure weekly",
        "Daylight driving restriction",
        "Weighing self every day and reporting gains of more than 3 pounds",
      ],
      correctIndex: 0,
    },
    {
      stem: "Which of the following outcomes would the nurse anticipate after infusion of 25% albumin to a client in hypovolemic shock?",
      choices: [
        "Increase in heart rate",
        "Increase in blood pressure",
        "Decrease in temperature",
        "Decrease in peripheral perfusion",
      ],
      correctIndex: 1,
    },
    {
      stem: "A hospitalized client with a history of hypertension is ordered hydralazine (Apresoline) 20 mg PO. An hour after taking the medication, the nurse notes that the client's BP is 70/40. The client mentions taking this medication for several years now at home without difficulty or issue. Which of the following factors most likely contributed to this episode of hypotension?",
      choices: [
        "Heart rate is 145 beats per minute.",
        "Total intake for the previous 24 hours is 1,000 mL",
        "Serum potassium is 5.8 mEq/L.",
        "The ordered dose is excessive for this medication.",
      ],
      correctIndex: 1,
    },
    {
      stem: 'A client taking nitroglycerin patches states, "I always put my nitroglycerin (NTG) patch in the same place, so I do not forget to take it off." The nurse\'s response would be:',
      choices: [
        '"Sometimes the patch should be placed over hairy areas to vary the absorption."',
        '"It does not matter if you leave your patch on when you put the next one on. The medication is all gone."',
        '"This is good, but it is very important to take the patch off each night."',
        '"You should rotate the NTG patch to a different hairless area each day."',
      ],
      correctIndex: 3,
    },
    {
      stem: "The nurse is teaching a newly diagnosed client with hypertension about her medications. The client has a history of chronic obstructive pulmonary disease (COPD). The nurse informs the client that she should avoid which antihypertensive medication?",
      choices: [
        "Diuretics",
        "Beta Blockers",
        "Calcium Channel Blockers",
        "Angiotensin-converting Enzyme (ACE) inhibitors",
      ],
      correctIndex: 1,
    },
  ],
};

const day0Questions = [
  {
    id: "D001",
    process: "plan",
    category: "Laboratory",
    system: "Day 0",
    theme: "Cardiovascular",
    variant: "R",
    stem: "Troponin levels are ordered on a client to confirm a myocardial infarction. When should the nurse plan to have blood drawn for this test?",
    choices: [
      "Within 1-2 hours of chest pain onset",
      "Within the first 24 hours of chest pain onset",
      "Between 6 and 24 hours of chest pain onset",
      "Between 24 and 36 hours of chest pain onset",
    ],
    correctIndex: 2,
  },
  {
    id: "D002",
    process: "analyze",
    category: "Medication",
    system: "Day 0",
    theme: "Cardiovascular",
    variant: "R",
    stem: "The nurse informs the client that oxymetazoline (Afrin) should NOT be utilized if the client has which of the following conditions?",
    choices: [
      "Emphysema",
      "Hypotension",
      "Hypertension",
      "Hypothyroidism",
    ],
    correctIndex: 2,
  },
  {
    id: "D003",
    process: "analyze",
    category: "Patient Teaching",
    system: "Day 0",
    theme: "Cardiovascular",
    variant: "R",
    stem: "A client is being discharged with a diagnosis of angina. The nurse is teaching the client about the use of nitroglycerine (NTG) tablets at home. What client teaching is needed related to this medication?",
    choices: [
      '"Stop your activities, swallow two NTG tablets, and drive immediately to your doctor\'s office."',
      '"Stop your activities, and place one NTG under your tongue. Take no more than three tablets, one every five minutes. If the pain is unrelieved after a total of three NTG tablets, call and seek help."',
      '"Keep NTG tablets in your pants pocket next to your body to keep them handy at all times. Take three NTG tablets with a glass of water, and then go back to your activities."',
      '"Continue your activities but slowly. Take three NTG tablets every five minutes until your chest pain is gone."',
    ],
    correctIndex: 1,
  },
  {
    id: "D004",
    process: "evaluate",
    category: "Patient Teaching",
    system: "Day 0",
    theme: "Cardiovascular",
    variant: "R",
    stem: "A client is prescribed sublingual nitroglycerine for the treatment of angina pectoris. Which of the following responses below from the client indicates that the client understands the proper use of this medication?",
    choices: [
      "I have a small, labeled case for a few nitroglycerine tablets that I carry with me when I go out.",
      "The physician will give me a year's supply of nitroglycerine tablets.",
      "I will carry my nitroglycerine tablets in the inside pocket of my jacket wrapped in paper, so they are always close.",
      "I will take three nitroglycerine tablets all at the same time when needed.",
    ],
    correctIndex: 0,
  },
  {
    id: "D005",
    process: "evaluate",
    category: "Patient Teaching",
    system: "Day 0",
    theme: "Musculoskeletal",
    variant: "R",
    stem: "The nurse is preparing to discharge a client with chronic low back pain. Which statement by the client indicates the need for additional teaching?",
    choices: [
      "I will use heat or ice to help control the pain.",
      "I will avoid doing exercises because the pain might get worse.",
      "I will purchase a firm mattress to replace my old one.",
      "I will not wear high-heeled shoes at work or even at home.",
    ],
    correctIndex: 1,
  },
  {
    id: "D006",
    process: "analyze",
    category: "General",
    system: "Day 0",
    theme: "Respiratory",
    variant: "S",
    stem: "A patient admitted with chronic emphysema is receiving oxygen at a flow rate of 5 L/min by nasal cannula. Which of the following patient findings is of immediate concern to the nurse?",
    choices: [
      "A large barrel chest",
      "Fine basilar crackles",
      "The patient sitting up and leaning over",
      "Respiratory rate of 8 breaths per minute",
    ],
    correctIndex: 3,
  },
  {
    id: "D007",
    process: "assess",
    category: "General",
    system: "Day 0",
    theme: "ICU",
    variant: "S",
    stem: "Following placement of a central venous line, which of the following findings should the nurse report immediately to the physician?",
    choices: [
      "Fever",
      "Pain at the insertion site",
      "Increased heart rate and/or respiratory rate",
      "Diminished breath sounds in lung bases",
    ],
    correctIndex: 2,
  },
  {
    id: "D008",
    process: "assess",
    category: "General",
    system: "Day 0",
    theme: "ER",
    variant: "S",
    stem: "Which of the following needs immediate medical attention and emergency intervention? The client who:",
    choices: [
      "Has asthma, and complains of effort and congestion of breathing after exercise.",
      "Excessive coughing, and complains of sharp pain upon taking a deep breath.",
      "Exhibits yellow, productive sputum, low-grade fever, and crackles.",
      "Has a shift of the trachea to the left, with no breath sounds on the right side of the lung.",
    ],
    correctIndex: 3,
  },
  {
    id: "D009",
    process: "plan",
    category: "General",
    system: "Day 0",
    theme: "Nurses Station",
    variant: "S",
    stem: "The incoming day shift nurse has finished reviewing the shift report on a cardiac care unit (CCU). The nurse should plan to see which of the following assigned clients first?",
    choices: [
      "A client who had a cardiac catheterization and will be ambulating for the first time.",
      "A client with hypertrophic cardiomyopathy who is reporting dyspnea.",
      "A client who is recovering from coronary artery bypass grafting (CABG) surgery with a temperature of 101 degrees F",
      "A client receiving antibiotics for bacterial endocarditis who is reporting anxiety and chest pain.",
    ],
    correctIndex: 3,
  },
  {
    id: "D010",
    process: "plan",
    category: "General",
    system: "Day 0",
    theme: "Nurses Station",
    variant: "S",
    stem: "Which of the following tasks concerning care for a client with GERD would be appropriate to assign to an Unlicensed Assistive Personnel (UAP)?",
    choices: [
      "Explaining the rationale for eating small frequent meals.",
      "Reminding the client not to lie down for 2 to 3 hours after eating.",
      "Sharing successful strategies for weight reduction.",
      "Encouraging client to express concerns about lifestyle modification.",
    ],
    correctIndex: 1,
  },
  {
    id: "D011",
    process: "plan",
    category: "General",
    system: "Day 0",
    theme: "Nurses Station",
    variant: "S",
    stem: "Being the charge nurse, which patient will you assign to a float nurse coming from the surgical intensive care unit (ICU)?",
    choices: [
      "Newly-admitted client with acute UTI.",
      "Post-op client for renal stent placement.",
      "Client with kidney stones scheduled for lithotripsy later in the day.",
      "Client with chronic kidney failure who needs teaching.",
    ],
    correctIndex: 1,
  },
  {
    id: "D012",
    process: "plan",
    category: "General",
    system: "Day 0",
    theme: "Nurses Station",
    variant: "S",
    stem: "A client with neuromuscular impairment has been admitted to the unit and diagnosed with Parkinson's Disease. Which of the following actions by the UAP below would the nurse intervene?",
    choices: [
      "Performing the client's complete bathing and oral care.",
      "Reminding the client not to look at his feet when he is walking.",
      "Helping the client ambulate to the bathroom and back to bed.",
      "Setting up the client's food tray and encouraging the client to feed himself.",
    ],
    correctIndex: 0,
  },
  {
    id: "D013",
    process: "analyze",
    category: "Laboratory",
    system: "Day 0",
    theme: "Respiratory",
    variant: "R",
    stem: "A client is admitted to the hospital with an acid–base imbalance. ABG results are pH 7.33; PaCO2 = 49; HCO3 = 28. The nurse interprets these results as which of the following?",
    choices: [
      "Respiratory acidosis",
      "Metabolic acidosis",
      "Respiratory alkalosis",
      "Metabolic alkalosis",
    ],
    correctIndex: 0,
  },
  {
    id: "D014",
    process: "analyze",
    category: "Laboratory",
    system: "Day 0",
    theme: "Respiratory",
    variant: "R",
    stem: "A client presents to the ER with acute respiratory distress and the following arterial blood gases (ABGs): pH 7.35; PCO2 40 mmHg; PO2 63 mmHg; HCO3 23; oxygen saturation (SO2) 93%. Which of the following represents the best analysis of the etiology of these ABGs?",
    choices: [
      "Pleural Effusion",
      "Hypoxia",
      "Tuberculosis",
      "Pneumonia",
    ],
    correctIndex: 1,
  },
  {
    id: "D015",
    process: "analyze",
    category: "Laboratory",
    system: "Day 0",
    theme: "Respiratory",
    variant: "R",
    stem: "A client is admitted to the hospital with complaints of sudden onset of severe abdominal pain. Which of the following values in the arterial blood gas would the nurse expect to see?",
    choices: [
      "PaCO2 = 48",
      "HCO3 = 18",
      "pH = 7.32",
      "SaO2 = 90",
    ],
    correctIndex: 1,
  },
  {
    id: "D016",
    process: "analyze",
    category: "Laboratory",
    system: "Day 0",
    theme: "Respiratory",
    variant: "R",
    stem: "A client is admitted to the hospital after vomiting for three days. Which of the following ABG results would the nurse expect?",
    choices: [
      "pH 7.30; PaCO2 50; HCO3 27",
      "pH 7.34; PaCO2 50; HCO3 28",
      "pH 7.47; PaCO2 43; HCO3 28",
      "pH 7.47; PaCO2 30; HCO3 23",
    ],
    correctIndex: 2,
  },
  {
    id: "D017",
    process: "analyze",
    category: "Laboratory",
    system: "Day 0",
    theme: "Respiratory",
    variant: "R",
    stem: "A client is admitted with a diagnosis of renal failure. Which of the following ABG results would the nurse expect to see with this client?",
    choices: [
      "pH 7.49; PaCO2 36; HCO3 30",
      "pH 7.30; PaCO2 35; HCO3 18",
      "pH 7.31; PaCO2 50; HCO3 23",
      "pH 7.43; PaCO2 48; HCO3 30",
    ],
    correctIndex: 1,
  },
];

const sampleQuestions = [
  {
    id: "CV01",
    process: "assess",
    category: "General",
    system: "Cardiovascular",
    variant: "R",
    stem: "The early stage of left ventricular failure would most likely result in which of the following changes in the client?",
    choices: [
      "Right ventricular failure",
      "Diminished left atrial pressures",
      "Higher pulmonary pressures",
      "Low pulmonary pressure",
    ],
    correctIndex: 2,
  },
  {
    id: "CV02",
    process: "assess",
    category: "General",
    system: "Cardiovascular",
    variant: "R",
    stem: "The client appears in the Emergency Department with distended neck veins, a large, round abdomen, palpable liver edges, and peripheral edema. These signs are suggestive of which of the following?",
    choices: [
      "Congestive heart failure (CHF)",
      "Acute liver dysfunction",
      "Chronic liver disease",
      "Restrictive lung disease",
    ],
    correctIndex: 0,
  },
  {
    id: "CV03",
    process: "analyze",
    category: "General",
    system: "Cardiovascular",
    variant: "R",
    stem: "Secondary hypertension (HTN) is an elevated blood pressure caused by a number of underlying physiological processes. Which of the following statements about secondary HTN is correct?",
    choices: [
      "A nonsystematic, short-term use of contraceptives containing estrogen can cause HTN.",
      "Coarctation of the aorta has little to no relationship with the renin-angiotension-aldosterone system of the kidney.",
      "Hypertension in pregnancy is a frequent cause for maternal and fetal morbidity and mortality.",
      "Hypertension with an endocrine disorder accounts for a large population of clients.",
    ],
    correctIndex: 2,
  },
  {
    id: "CV04",
    process: "analyze",
    category: "General",
    system: "Cardiovascular",
    variant: "R",
    stem: "Raynaud's disease is a disease of the small arteries and arterioles, which constrict in the presence of stimuli. Which of the following is true?",
    choices: [
      "Vasospasm occurs, causing inflammation of the veins.",
      "Stimuli include cold temperatures and caffeine.",
      "Smoking triggers an event and claudication of the leg occurs.",
      "Smoking is the primary cause.",
    ],
    correctIndex: 1,
  },
  {
    id: "CV05",
    process: "analyze",
    category: "Laboratory",
    system: "Cardiovascular",
    variant: "R",
    stem: "The nurse is caring for a client with a history of renal failure and a new myocardial infarction. The nurse who is reviewing laboratory findings would call the doctor to report which of the following results?",
    choices: [
      "Potassium level of 5.0 mEq/L",
      "Sodium level of 145 mEq/L",
      "Calcium level of 7.0 mg/dL",
      "Digoxin/digitalis level of 0.8 ng/mL",
    ],
    correctIndex: 2,
  },
  {
    id: "CV06",
    process: "plan",
    category: "General",
    system: "Cardiovascular",
    variant: "R",
    stem: "The nursing management for a client with thrombophlebitis would include:",
    choices: [
      "The use of anticoagulant therapy to inhibit the clotting factors.",
      "Keeping the client's legs in a position of comfort.",
      "Using low molecular weight heparin (LMWH) once a confirmed diagnosis exists.",
      "Elevating the head of the bed 6 inches on wooden blocks.",
    ],
    correctIndex: 0,
  },
  {
    id: "CV07",
    process: "implement",
    category: "General",
    system: "Cardiovascular",
    variant: "R",
    stem: "A client is due to receive a calcium channel blocker and a beta blocker for angina. Vital signs are BP 100/68, pulse 52 bpm, respirations 20. Which of the following is an appropriate action by the nurse?",
    choices: [
      "Give the medicine and check vital signs in 30 minutes.",
      "Hold the medicine until the physician makes rounds.",
      "Call the physician first.",
      "Give the medicine as usual.",
    ],
    correctIndex: 2,
  },
  {
    id: "CV08",
    process: "evaluate",
    category: "General",
    system: "Cardiovascular",
    variant: "R",
    stem: "The medical management of thrombophlebitis is through the use of anticoagulant therapy. The nurse will determine the effectiveness of heparin therapy by assessing which of the following?",
    choices: [
      "Glutamate pyruvate transaminase (GPT)",
      "Prothrombin time (PT)",
      "Partial thromboplastin time (PTT)",
      "Fasting blood sugar (FBS)",
    ],
    correctIndex: 2,
  },
  {
    id: "CV09",
    process: "evaluate",
    category: "Patient Teaching",
    system: "Cardiovascular",
    variant: "R",
    stem: "Effective teaching for a client with Raynaud's disease is evident in which of the following statements? \"I will:",
    choices: [
      "\"Decrease my smoking to 6 cigarettes per day.\"",
      "\"Try to learn to relax, but I can't promise anything.\"",
      "\"Wear gloves and socks to bed at night.\"",
      "\"Try to eat a healthier diet.\"",
    ],
    correctIndex: 2,
  },
  {
    id: "CV10",
    process: "analyze",
    category: "Laboratory",
    system: "Cardiovascular",
    variant: "S",
    stem: "The nurse is discharging a client to home with a new diagnosis of atrial fibrillation. The nurse explains that which of the following is the most important symptom to report to the physician?",
    choices: [
      "Irregular pulse",
      "Fever",
      "Hemoptysis",
      "Fatigue",
    ],
    correctIndex: 2,
  },
  {
    id: "CV11",
    process: "analyze",
    category: "Patient Teaching",
    system: "Cardiovascular",
    variant: "S",
    stem: "The client is being discharged from the hospital and asks the nurse to explain to him what congestive heart failure (CHF) really is. The nurse's best response would be that CHF is:",
    choices: [
      "Circulatory congestion resulting from extracellular fluid volume excess.",
      "Inadequate myocardial function due to damage of the cardiac muscle.",
      "Circulatory congestion resulting from heart failure and its compensatory mechanisms.",
      "Cardiac output insufficient to supply the metabolic needs of the peripheral tissues caused by an inefficient pump.",
    ],
    correctIndex: 3,
  },
  {
    id: "CV12",
    process: "evaluate",
    category: "Medication",
    system: "Cardiovascular",
    variant: "S",
    stem: "When caring for a client with Raynaud's disease, which of the following outcomes concerning medication regimen is of highest priority?",
    choices: [
      "Relaxing smooth muscle to avoid vasospasms",
      "Controlling the pain once vasospasms occur",
      "Avoiding lesions on the feet",
      "Preventing major disabilities that may occur",
    ],
    correctIndex: 0,
  },
  {
    id: "CV13",
    process: "plan",
    category: "General",
    system: "Cardiovascular",
    variant: "S",
    stem: "An aggressive teaching plan is devised with the client for the purpose of reducing the risk of untoward reactions of hypertension. The highest priority would be to:",
    choices: [
      "Prevent poor compliance.",
      "Identify unawareness of noncompliance.",
      "Actively monitor the blood pressure (BP).",
      "Manage medication therapy.",
    ],
    correctIndex: 3,
  },
  {
    id: "CV14",
    process: "plan",
    category: "Patient Teaching",
    system: "Cardiovascular",
    variant: "S",
    stem: "Priority teaching for a client with Buerger's disease would include which of the following?",
    choices: [
      "Wear gloves if the extremities are cold and painful.",
      "Avoid wearing flat-heeled shoes.",
      "Report severe pain that may require analgesics.",
      "Cessation of smoking",
    ],
    correctIndex: 3,
  },
];



const state = {
  variant: "R",
  system: "Cardiovascular",
  category: null,
  process: "assess",
  questionIndex: 0,
  selectedAnswer: null,
  answerVisible: false,
  questions: [...day0Questions, ...sampleQuestions],
  dissect: {
    active: false,
    index: 0,
    answerVisible: false,
    introComplete: false,
    typeTimer: null,
    typeToken: 0,
    choiceTimers: [],
  },
  tour: {
    active: false,
    busy: false,
    groups: [],
    groupIndex: 0,
    qIndex: 0,
  },
  bgImage: null,
  bgFadeTimer: null,
  bgShiftTimer: null,
  bgFrontIsA: true,
};

const els = {
  shell: document.querySelector(".stage-shell"),
  stage: document.getElementById("deckStage"),
  systemBg: document.getElementById("systemBg"),
  systemBgA: document.getElementById("systemBgA"),
  systemBgB: document.getElementById("systemBgB"),
  homeView: document.getElementById("homeView"),
  questionView: document.getElementById("questionView"),
  dissectView: document.getElementById("dissectView"),
  dissectTitle: document.getElementById("dissectTitle"),
  dissectStem: document.getElementById("dissectStem"),
  dissectStemText: document.getElementById("dissectStemText"),
  dissectCaret: document.getElementById("dissectCaret"),
  dissectChoices: document.getElementById("dissectChoices"),
  dissectAnswer: document.getElementById("dissectAnswer"),
  dissectAnswerText: document.getElementById("dissectAnswerText"),
  dissectPanel: document.getElementById("dissectPanel"),
  dissectBack: document.getElementById("dissectBack"),
  dissectScan: document.getElementById("dissectScan"),
  nodeTrack: document.getElementById("nodeTrack"),
  categoryTabs: document.getElementById("categoryTabs"),
  variantToggle: document.getElementById("variantToggle"),
  variantLabel: document.getElementById("variantLabel"),
  miniVariant: document.getElementById("miniVariant"),
  systemSelect: document.getElementById("systemSelect"),
  systemPicker: document.getElementById("systemPicker"),
  systemPickerTrigger: document.getElementById("systemPickerTrigger"),
  systemPickerMenu: document.getElementById("systemPickerMenu"),
  systemPickerLabel: document.getElementById("systemPickerLabel"),
  systemTitle: document.getElementById("systemTitle"),
  sheetInput: document.getElementById("sheetInput"),
  backHome: document.getElementById("backHome"),
  sideNumber: document.getElementById("sideNumber"),
  sideTotal: document.getElementById("sideTotal"),
  sideType: document.getElementById("sideType"),
  sideProcessNum: document.getElementById("sideProcessNum"),
  sideCategory: document.getElementById("sideCategory"),
  progressText: document.getElementById("progressText"),
  progressFill: document.getElementById("progressFill"),
  progressSegments: document.getElementById("progressSegments"),
  questionCount: document.getElementById("questionCount"),
  miniLogo: document.getElementById("backHome"),
  cardMode: document.getElementById("cardMode"),
  questionCard: document.getElementById("questionCard"),
  questionStem: document.getElementById("questionStem"),
  answerList: document.getElementById("answerList"),
  revealAnswer: document.getElementById("revealAnswer"),
  nextQuestion: document.getElementById("nextQuestion"),
  prevQuestion: document.getElementById("prevQuestion"),
  canvas: document.getElementById("fieldCanvas"),
  dissectLaunch: document.getElementById("dissectLaunch"),
  hudControls: document.getElementById("hudControls"),
  hudSecret: document.getElementById("hudSecret"),
};

function init() {
  const params = new URLSearchParams(window.location.search);
  const debugMode = params.get("debug") === "1";
  renderSystems();
  renderNodes();
  renderCategories();
  setSystemBackground();
  bindEvents();
  selectFirstAvailable(true, { lockCategory: true, preferCategory: null });
  showView("home");
  if (debugMode && params.get("view") === "question") {
    showView("question");
  }
  const autoMorph = debugMode ? params.get("auto") : null;
  if (autoMorph) {
    window.setTimeout(() => {
      els.nodeTrack.querySelector(`[data-process="${autoMorph}"]`)?.click();
    }, 300);
  }
  drawField();
}

function renderSystems() {
  els.systemSelect.innerHTML = systems
    .map((system) => `<option value="${system}">${system}</option>`)
    .join("");
  els.systemSelect.value = state.system;
  syncSystemPicker();
}

function syncSystemPicker() {
  if (els.systemPickerLabel) els.systemPickerLabel.textContent = state.system;
  if (!els.systemPickerMenu) return;
  els.systemPickerMenu.innerHTML = systems
    .map((system) => {
      const active = system === state.system ? "is-active" : "";
      return `
        <li role="none">
          <button class="system-picker-option ${active}" type="button" role="option" data-system="${system}" aria-selected="${system === state.system}">
            ${system}
          </button>
        </li>
      `;
    })
    .join("");
}

function setSystemPickerOpen(open) {
  if (!els.systemPicker || !els.systemPickerTrigger || !els.systemPickerMenu) return;
  els.systemPicker.classList.toggle("is-open", open);
  els.systemPickerTrigger.setAttribute("aria-expanded", String(open));
  els.systemPickerMenu.hidden = !open;
}

function chooseSystem(system) {
  if (!systems.includes(system) || system === state.system) {
    setSystemPickerOpen(false);
    return;
  }
  if (els.systemSelect) els.systemSelect.value = system;
  setSystemPickerOpen(false);
  applySystemChange(system);
}

function applySystemChange(system) {
  resetTour();
  state.system = system;
  state.selectedAnswer = null;
  state.answerVisible = false;
  state.category = null;
  setSystemBackground(true);
  els.systemTitle.textContent = formatSystemTitle();
  syncSystemPicker();
  renderCategories();
  selectFirstAvailable(true, { lockSystem: true, lockCategory: true, preferCategory: null });
}

function renderNodes() {
  els.nodeTrack.innerHTML = processes
    .map(
      (process) => `
        <button class="process-node" type="button" data-process="${process.id}">
          <span class="node-number">${process.number}</span>
          <span class="node-label">${process.label}</span>
        </button>
      `
    )
    .join("");
}

function renderCategories() {
  els.shell?.classList.toggle("is-day0", state.system === "Day 0");
  els.categoryTabs.innerHTML = categories
    .map((category, index) => {
      const selected = state.category && category === state.category ? "is-selected" : "";
      const general = index === 0 ? "is-general" : "";
      return `
        <button class="category-tab ${selected} ${general}" type="button" data-category="${category}">
          ${category}
        </button>
      `;
    })
    .join("");
}

function bindEvents() {
  els.nodeTrack.addEventListener("click", (event) => {
    if (state.dissect.active || state.tour.busy) return;
    const node = event.target.closest(".process-node");
    if (!node) return;
    resetTour();
    const processId = node.dataset.process;
    state.process = processId;
    state.selectedAnswer = null;
    state.answerVisible = false;
    selectFirstAvailable(false, { preferProcess: processId });
    morphToQuestion(node);
  });

  els.categoryTabs.addEventListener("click", (event) => {
    if (state.dissect.active || state.tour.busy) return;
    const tab = event.target.closest(".category-tab");
    if (!tab) return;
    resetTour();
    state.category = tab.dataset.category;
    state.selectedAnswer = null;
    state.answerVisible = false;
    selectFirstAvailable(true, { lockCategory: true });
  });

  els.variantToggle.addEventListener("click", () => {
    if (state.tour.busy) return;
    resetTour();
    flipVariant();
  });

  els.systemSelect.addEventListener("change", () => {
    applySystemChange(els.systemSelect.value);
  });
  els.systemPickerTrigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = !els.systemPicker?.classList.contains("is-open");
    setSystemPickerOpen(open);
  });
  els.systemPickerMenu?.addEventListener("click", (event) => {
    const option = event.target.closest("[data-system]");
    if (!option) return;
    event.preventDefault();
    chooseSystem(option.dataset.system);
  });
  document.addEventListener("click", (event) => {
    if (!els.systemPicker?.classList.contains("is-open")) return;
    if (event.target.closest("#systemPicker")) return;
    setSystemPickerOpen(false);
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && els.systemPicker?.classList.contains("is-open")) {
      setSystemPickerOpen(false);
    }
  });

  els.backHome.addEventListener("click", () => {
    resetTour();
    returnHome();
  });
  els.answerList.addEventListener("click", selectAnswer);
  els.answerList.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (!event.target.closest(".answer-option")) return;
    event.preventDefault();
    selectAnswer(event);
  });
  els.revealAnswer.addEventListener("click", revealAnswer);
  els.nextQuestion.addEventListener("click", () => {
    if (state.tour.active) advanceTour();
    else moveQuestion(1);
  });
  els.prevQuestion.addEventListener("click", () => {
    if (state.tour.active) retreatTour();
    else moveQuestion(-1);
  });
  els.sheetInput.addEventListener("change", importQuestions);
  els.dissectLaunch?.addEventListener("click", () => {
    if (state.dissect.active) closeDissectPage();
    else {
      resetTour();
      openDissectPage();
    }
  });
  els.dissectBack?.addEventListener("click", closeDissectPage);
  els.hudSecret?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleHudControls();
  });
  window.addEventListener("keydown", (event) => {
    if (event.target?.closest?.("button, input, select, textarea, a")) return;

    if (
      event.key === "Escape" &&
      els.shell.classList.contains("hud-unlocked") &&
      !state.dissect.active &&
      !state.tour.active &&
      !els.questionView?.classList.contains("is-active")
    ) {
      event.preventDefault();
      setHudControlsVisible(false);
      return;
    }

    if (state.dissect.active) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDissectPage();
        return;
      }
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        advanceDissect();
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        retreatDissect();
      }
      return;
    }

    if (event.key === "Escape") {
      if (!state.tour.active && !els.questionView?.classList.contains("is-active")) return;
      event.preventDefault();
      resetTour();
      returnHome();
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      advanceTour();
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      retreatTour();
    }
  });
  window.addEventListener("resize", () => {
    scheduleFitQuestionLayout();
  });
}

function setHudControlsVisible(visible) {
  els.shell?.classList.toggle("hud-unlocked", Boolean(visible));
}

function toggleHudControls() {
  setHudControlsVisible(!els.shell?.classList.contains("hud-unlocked"));
}

function updateVariantLabels() {
  if (els.variantLabel) els.variantLabel.textContent = state.variant;
  if (els.miniVariant) els.miniVariant.textContent = state.variant;
  if (els.shell) els.shell.dataset.variant = state.variant;
  if (els.variantToggle) {
    els.variantToggle.dataset.variant = state.variant;
    els.variantToggle.setAttribute(
      "aria-label",
      state.variant === "S" ? "Superlative version active. Switch to Regular" : "Regular version active. Switch to Superlative"
    );
  }
  if (els.miniLogo) {
    els.miniLogo.dataset.variant = state.variant;
  }
}

function flipVariant() {
  if (!els.variantToggle || els.variantToggle.classList.contains("is-flipping")) return;

  const next = state.variant === "R" ? "S" : "R";
  els.variantToggle.classList.add("is-flipping");
  els.variantToggle.disabled = true;

  window.setTimeout(() => {
    state.variant = next;
    state.selectedAnswer = null;
    state.answerVisible = false;
    updateVariantLabels();
    selectFirstAvailable(true, { lockVariant: true, preferVariant: next });
  }, 250);

  window.setTimeout(() => {
    els.variantToggle.classList.remove("is-flipping");
    els.variantToggle.disabled = false;
  }, 660);
}

function formatSystemTitle(system = state.system) {
  return system === "Day 0" ? "Introducing the QGrid" : `${system} System`;
}

function themeForQuestion(question) {
  if (!question) return null;
  return question.theme || question.questionType || null;
}

function backgroundForTheme(theme) {
  if (!theme) return null;
  return systemBackgrounds[theme] || null;
}

function applyDay0Theme(question, animate = true) {
  if (state.system !== "Day 0") return;
  const theme = themeForQuestion(question);
  const image = backgroundForTheme(theme) || systemBackgrounds["Day 0"];
  setSystemBackground(animate, image);
}

function restoreSystemBackground(animate = true) {
  setSystemBackground(animate, null);
}

function resolveBackgroundImage(overrideImage = null) {
  return (
    overrideImage ||
    systemBackgrounds[state.system] ||
    systemBackgrounds["Day 0"] ||
    systemBackgrounds.Cardiovascular
  );
}

function setSystemBackground(animate = false, overrideImage = null) {
  const image = resolveBackgroundImage(overrideImage);
  const nextUrl = `url("${image}")`;
  if (state.bgImage === image) return;

  document.documentElement.style.setProperty("--bg-image", nextUrl);

  const front = state.bgFrontIsA ? els.systemBgA : els.systemBgB;
  const back = state.bgFrontIsA ? els.systemBgB : els.systemBgA;

  if (!front || !back) {
    state.bgImage = image;
    return;
  }

  if (!state.bgImage || !animate) {
    front.style.backgroundImage = nextUrl;
    front.classList.add("is-shown");
    back.classList.remove("is-shown");
    back.style.backgroundImage = nextUrl;
    state.bgImage = image;
    return;
  }

  // Crossfade: load next on the hidden layer, then swap visibility.
  back.style.backgroundImage = nextUrl;
  void back.offsetWidth;
  back.classList.add("is-shown");
  front.classList.remove("is-shown");
  state.bgFrontIsA = !state.bgFrontIsA;
  state.bgImage = image;

  if (state.bgFadeTimer) window.clearTimeout(state.bgFadeTimer);
  state.bgFadeTimer = window.setTimeout(() => {
    front.style.backgroundImage = nextUrl;
  }, 720);

  // Soft pulse only — avoid the old hard opacity dip that felt like a Day 0 flash.
  if (state.bgShiftTimer) window.clearTimeout(state.bgShiftTimer);
  els.shell.classList.add("system-shift");
  state.bgShiftTimer = window.setTimeout(() => els.shell.classList.remove("system-shift"), 480);
}

function filteredQuestions() {
  return state.questions.filter(
    (question) =>
      normalized(question.process) === state.process &&
      question.category === state.category &&
      question.system === state.system &&
      question.variant === state.variant
  );
}

function processQuestions() {
  return state.questions.filter(
    (question) =>
      normalized(question.process) === state.process &&
      question.system === state.system &&
      question.variant === state.variant
  );
}

function processQuestionsAnyVariant() {
  return state.questions.filter(
    (question) =>
      normalized(question.process) === state.process &&
      question.system === state.system
  );
}

function selectFirstAvailable(renderUi = true, options = {}) {
  const preferProcess = normalized(options.preferProcess || state.process);
  const preferVariant = options.preferVariant || state.variant;
  const preferCategory = options.preferCategory || state.category;
  const preferSystem = options.preferSystem || state.system;
  const lockProcess = options.lockProcess !== false;
  const lockSystem = Boolean(options.lockSystem);
  const lockCategory = Boolean(options.lockCategory);
  const lockVariant = Boolean(options.lockVariant);

  state.process = preferProcess;
  if (lockVariant) state.variant = preferVariant;
  if (lockCategory) state.category = preferCategory;
  if (lockSystem) state.system = preferSystem;

  const matches = () => filteredQuestions();

  // Relax only unlocked filters, from strict → loose, without overwriting locked choices.
  if (!matches().length && !lockCategory) {
    const hit = processQuestions()[0];
    if (hit) state.category = hit.category;
  }

  if (!matches().length && !lockVariant) {
    const hit = processQuestionsAnyVariant()[0];
    if (hit) {
      state.category = hit.category;
      state.variant = hit.variant;
      updateVariantLabels();
    }
  }

  if (!matches().length && !lockSystem) {
    const hit = state.questions.find(
      (question) =>
        normalized(question.process) === preferProcess &&
        (!lockVariant || question.variant === state.variant) &&
        (!lockCategory || question.category === state.category)
    );
    if (hit) {
      if (!lockCategory) state.category = hit.category;
      if (!lockVariant) {
        state.variant = hit.variant;
        updateVariantLabels();
      }
      state.system = hit.system;
      if (els.systemSelect) els.systemSelect.value = state.system;
      syncSystemPicker();
      if (els.systemTitle) els.systemTitle.textContent = formatSystemTitle();
      setSystemBackground();
    }
  }

  if (lockProcess) state.process = preferProcess;
  if (lockVariant) state.variant = preferVariant;
  if (lockCategory) state.category = preferCategory;
  if (lockSystem) state.system = preferSystem;

  if (lockSystem && els.systemSelect) {
    els.systemSelect.value = state.system;
    syncSystemPicker();
  }
  if (lockVariant) updateVariantLabels();

  state.questionIndex = 0;
  state.selectedAnswer = null;
  if (renderUi) {
    renderNodes();
    renderCategories();
  }
  renderQuestion();
}

function currentQuestion() {
  if (state.tour.active) {
    const group = state.tour.groups[state.tour.groupIndex];
    const question = group?.questions?.[state.tour.qIndex];
    if (question) return question;
  }

  const questions = filteredQuestions();
  return questions[state.questionIndex] || {
    process: state.process,
    category: state.category,
    system: state.system,
    variant: state.variant,
    stem: "No matching question yet. Import the Excel sheet once your data is ready, or switch the process/category/version.",
    choices: ["Waiting for imported data", "Try another filter", "Use this as a preview shell", "Return to the grid"],
    correctIndex: 2,
  };
}

function activeQuestionList() {
  if (state.tour.active) {
    return state.tour.groups[state.tour.groupIndex]?.questions || [];
  }
  return filteredQuestions();
}

function activeQuestionIndex() {
  return state.tour.active ? state.tour.qIndex : state.questionIndex;
}

function renderQuestion({ keepVisible = false, syncFit = false } = {}) {
  const question = currentQuestion();
  const questions = activeQuestionList();
  const totalQuestions = questions.length;
  const index = activeQuestionIndex();
  const currentNumber = totalQuestions ? Math.min(index + 1, totalQuestions) : 0;
  const progress = totalQuestions ? Math.round((currentNumber / totalQuestions) * 100) : 0;
  const process =
    processes.find((item) => item.id === state.process) ||
    processes.find((item) => item.id === normalized(question.process)) ||
    processes[0];
  // Keep the selected process node; do not inherit a different process from fallback data.
  state.process = process.id;
  state.category = question.category || state.category;

  applyDay0Theme(question, true);

  if (!keepVisible) {
    els.questionCard?.classList.add("is-layout-pending");
  }
  els.sideNumber.textContent = String(currentNumber).padStart(2, "0");
  els.sideTotal.textContent = `/ ${String(totalQuestions).padStart(2, "0")}`;
  if (els.sideProcessNum) els.sideProcessNum.textContent = `NODE ${process.number}`;
  els.sideType.textContent = process.label;
  els.sideCategory.textContent = question.category;
  els.progressText.textContent = `${progress}%`;
  if (els.progressFill) els.progressFill.style.width = `${progress}%`;
  if (els.progressSegments) {
    const lit = Math.round(progress / 10);
    els.progressSegments.querySelectorAll("i").forEach((seg, index) => {
      seg.classList.toggle("is-lit", index < lit);
    });
  }
  if (els.questionCount) {
    els.questionCount.style.setProperty("--q-progress", String(progress));
  }
  els.questionStem.textContent = question.stem;
  els.cardMode.textContent = state.answerVisible ? "Answer State" : "Question State";
  els.revealAnswer.textContent = state.answerVisible ? "Hide Answer" : "Reveal Answer";
  updateVariantLabels();
  const choices = normalizeChoices(question.choices);

  els.answerList.innerHTML = choices
    .map((choice, index) => {
      const isCorrect = state.answerVisible && Number(question.correctIndex) === index;
      const isSelected = state.selectedAnswer === index;
      const isWrong = state.answerVisible && isSelected && !isCorrect;
      return `
        <li class="answer-option ${isSelected ? "is-selected" : ""} ${isCorrect ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}" data-index="${index}" role="button" tabindex="0">
          <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
          <span>${choice}</span>
          <b class="checkmark">OK</b>
        </li>
      `;
    })
    .join("");

  if (syncFit) {
    cancelAnimationFrame(fitLayoutRaf);
    fitQuestionLayout({ soft: false });
  } else if (keepVisible) {
    els.questionCard?.classList.remove("is-layout-pending");
    scheduleFitQuestionLayout({ soft: true });
  } else {
    scheduleFitQuestionLayout();
  }
}

let fitLayoutRaf = 0;

function scheduleFitQuestionLayout({ soft = false } = {}) {
  cancelAnimationFrame(fitLayoutRaf);
  fitLayoutRaf = requestAnimationFrame(() => {
    fitLayoutRaf = requestAnimationFrame(() => fitQuestionLayout({ soft }));
  });
}

function fitQuestionLayout({ soft = false } = {}) {
  const card = els.questionCard;
  const content = card?.querySelector(".question-content");
  const flow = card?.querySelector(".question-flow");
  if (!card || !content || !flow) return;
  if (!els.questionView?.classList.contains("is-active")) {
    card.classList.remove("is-layout-pending");
    return;
  }

  // Hide while measuring so --q-fit binary search doesn't flash a zoom.
  if (!soft) card.classList.add("is-layout-pending");
  card.style.setProperty("--q-fit", "1");
  card.style.setProperty("--q-foot-space", "0px");
  void content.offsetHeight;

  const available = content.clientHeight;
  if (available <= 0) {
    card.classList.remove("is-layout-pending");
    return;
  }

  const breathingRoom = 10;
  const overflows = () => getNaturalQuestionHeight(flow) > available - breathingRoom;
  const fillRatio = () => getNaturalQuestionHeight(flow) / Math.max(available, 1);

  if (!overflows()) {
    if (fillRatio() > 0.9) {
      const target = Math.max(0.9, (available - breathingRoom) * 0.92 / getNaturalQuestionHeight(flow));
      card.style.setProperty("--q-fit", Math.min(1, target).toFixed(3));
      card.dataset.qDensity = "snug";
      card.style.setProperty("--q-foot-space", "0px");
    } else {
      card.dataset.qDensity = "roomy";
      const spare = Math.max(0, available - getNaturalQuestionHeight(flow) - breathingRoom);
      const foot = Math.min(56, Math.max(16, Math.round(spare * 0.28)));
      card.style.setProperty("--q-foot-space", `${foot}px`);
    }
    void content.offsetHeight;
    card.classList.remove("is-layout-pending");
    return;
  }

  let lo = 0.58;
  let hi = 1;
  let best = lo;
  for (let i = 0; i < 12; i += 1) {
    const mid = (lo + hi) / 2;
    card.style.setProperty("--q-fit", mid.toFixed(3));
    void content.offsetHeight;
    if (!overflows()) {
      best = mid;
      lo = mid;
    } else {
      hi = mid;
    }
  }

  card.style.setProperty("--q-fit", best.toFixed(3));
  card.dataset.qDensity = best < 0.72 ? "compact" : "snug";
  card.style.setProperty("--q-foot-space", "0px");
  void content.offsetHeight;
  if (overflows()) {
    card.style.setProperty("--q-fit", Math.max(0.58, best - 0.03).toFixed(3));
    void content.offsetHeight;
  }
  card.classList.remove("is-layout-pending");
}

function getNaturalQuestionHeight(flow) {
  const stem = flow.querySelector("h2");
  const answers = flow.querySelector(".answers");
  if (!stem || !answers) return flow.scrollHeight;

  const stemMargin = Number.parseFloat(getComputedStyle(stem).marginBottom) || 0;
  const answerOptions = [...answers.querySelectorAll(".answer-option")];
  const answerGap = Number.parseFloat(getComputedStyle(answers).rowGap) || 0;
  const answersHeight = answerOptions.reduce((total, option) => {
    const style = getComputedStyle(option);
    const text = option.querySelector("span:nth-child(2)");
    const letter = option.querySelector(".answer-letter");
    const contentHeight = Math.max(
      text?.scrollHeight || 0,
      letter?.offsetHeight || 0
    );
    const chrome =
      (Number.parseFloat(style.paddingTop) || 0) +
      (Number.parseFloat(style.paddingBottom) || 0) +
      (Number.parseFloat(style.borderTopWidth) || 0) +
      (Number.parseFloat(style.borderBottomWidth) || 0);
    return total + Math.max(contentHeight + chrome, Number.parseFloat(style.minHeight) || 0);
  }, answerGap * Math.max(0, answerOptions.length - 1));

  return stem.offsetHeight + stemMargin + answersHeight;
}

function paintAnswerStates() {
  const question = currentQuestion();
  const options = els.answerList?.querySelectorAll(".answer-option");
  if (!options?.length) return;

  options.forEach((option) => {
    const index = Number(option.dataset.index);
    const isCorrect = state.answerVisible && Number(question.correctIndex) === index;
    const isSelected = state.selectedAnswer === index;
    const isWrong = state.answerVisible && isSelected && !isCorrect;
    option.classList.toggle("is-selected", isSelected);
    option.classList.toggle("is-correct", isCorrect);
    option.classList.toggle("is-wrong", isWrong);
  });

  els.cardMode.textContent = state.answerVisible ? "Answer State" : "Question State";
  els.revealAnswer.textContent = state.answerVisible ? "Hide Answer" : "Reveal Answer";
  // Do not re-fit here — refitting on reveal/hide changes --q-fit and reflows the stem.
}

function selectAnswer(event) {
  const option = event.target.closest(".answer-option");
  if (!option || state.answerVisible) return;
  const nextIndex = Number(option.dataset.index);
  if (state.selectedAnswer === nextIndex) return;
  state.selectedAnswer = nextIndex;
  paintAnswerStates();
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function resetTour() {
  const wasActive = state.tour.active;
  state.tour.active = false;
  state.tour.busy = false;
  state.tour.groups = [];
  state.tour.groupIndex = 0;
  state.tour.qIndex = 0;
  els.shell?.classList.remove("in-tour");
  els.nodeTrack?.querySelectorAll(".process-node.is-tour-target").forEach((node) => {
    node.classList.remove("is-tour-target");
  });
  // Only restore Day 0 art when the intro tour fully ends on home — never mid-transition.
  if (
    wasActive &&
    state.system === "Day 0" &&
    els.homeView?.classList.contains("is-active")
  ) {
    restoreSystemBackground(true);
  }
}

function buildTourGroups(system) {
  const list = state.questions.filter((question) => question.system === system);
  const groups = [];

  list.forEach((question) => {
    const process = normalized(question.process);
    const last = groups[groups.length - 1];
    if (
      last &&
      last.process === process &&
      last.category === question.category &&
      last.variant === question.variant
    ) {
      last.questions.push(question);
      return;
    }
    groups.push({
      process,
      category: question.category,
      variant: question.variant,
      questions: [question],
    });
  });

  return groups;
}

function currentTourGroup() {
  return state.tour.groups[state.tour.groupIndex] || null;
}

function syncStateToTourGroup(group, qIndex = 0) {
  if (!group) return;
  state.process = group.process;
  state.category = group.category;
  state.variant = group.variant;
  state.questionIndex = 0;
  state.tour.qIndex = qIndex;
  state.selectedAnswer = null;
  state.answerVisible = false;
  updateVariantLabels();
  renderCategories();
  renderNodes();
  markTourProcessNode(group.process);
}

function markTourProcessNode(processId) {
  els.nodeTrack?.querySelectorAll(".process-node").forEach((node) => {
    node.classList.toggle("is-tour-target", node.dataset.process === processId);
  });
}

async function animateSelectCategory(category) {
  // Always start with no subcategory selected.
  state.category = null;
  renderCategories();
  await wait(320);

  const tab = els.categoryTabs?.querySelector(`[data-category="${category}"]`);
  if (!tab) {
    state.category = category;
    renderCategories();
    return;
  }

  tab.classList.add("is-tour-aim");
  await wait(260);
  tab.classList.remove("is-tour-aim");
  tab.classList.add("is-tour-press");
  await wait(480);

  state.category = category;
  renderCategories();
  const selected = els.categoryTabs?.querySelector(`[data-category="${category}"]`);
  selected?.classList.add("is-tour-settle");
  await wait(420);
  selected?.classList.remove("is-tour-settle");
}

async function animateFlipToVariant(variant) {
  if (state.variant === variant || !els.variantToggle) {
    state.variant = variant;
    updateVariantLabels();
    return;
  }

  els.variantToggle.classList.add("is-flipping");
  els.variantToggle.disabled = true;
  await wait(250);
  state.variant = variant;
  state.selectedAnswer = null;
  state.answerVisible = false;
  updateVariantLabels();
  await wait(420);
  els.variantToggle.classList.remove("is-flipping");
  els.variantToggle.disabled = false;
}

async function animatePressProcessNode(processId) {
  renderNodes();
  markTourProcessNode(processId);
  const node = els.nodeTrack?.querySelector(`[data-process="${processId}"]`);
  if (!node) return null;
  node.classList.add("is-tour-press");
  await wait(560);
  node.classList.remove("is-tour-press");
  return node;
}

function morphToQuestionAsync(sourceNode, options = {}) {
  return new Promise((resolve) => {
    morphToQuestion(sourceNode, {
      ...options,
      onDone: () => {
        if (typeof options.onDone === "function") options.onDone();
        resolve();
      },
    });
  });
}

async function zoomOutToGrid() {
  if (els.homeView?.classList.contains("is-active")) {
    state.category = null;
    renderCategories();
    return;
  }
  showView("home");
  state.category = null;
  renderNodes();
  renderCategories();
  markTourProcessNode(state.process);
  await wait(420);
}

async function enterTourGroup({ fromQuestion = false, qIndex = 0 } = {}) {
  const group = currentTourGroup();
  if (!group) {
    resetTour();
    showView("home");
    if (state.system === "Day 0") restoreSystemBackground(true);
    return;
  }

  const startIndex = Math.max(0, Math.min(qIndex, group.questions.length - 1));
  const leadQuestion = group.questions[startIndex];
  state.tour.busy = true;
  els.shell.classList.add("in-tour");

  try {
    if (fromQuestion) await zoomOutToGrid();
    else if (!els.homeView?.classList.contains("is-active")) await zoomOutToGrid();
    else {
      // First group on home: clear any existing subcategory glow first.
      state.category = null;
      renderCategories();
      await wait(220);
    }

    // Day 0: preview the theme background while aiming the category/process.
    applyDay0Theme(leadQuestion, true);

    const variantChanged = state.variant !== group.variant;

    // Always animate subcategory press before the main process node.
    await animateSelectCategory(group.category);

    if (variantChanged) await animateFlipToVariant(group.variant);
    else {
      state.variant = group.variant;
      updateVariantLabels();
    }

    state.process = group.process;
    state.tour.qIndex = startIndex;
    state.selectedAnswer = null;
    state.answerVisible = false;
    renderCategories();
    renderNodes();

    const node = await animatePressProcessNode(group.process);
    if (!node) {
      syncStateToTourGroup(group, startIndex);
      showView("question");
      renderQuestion();
      return;
    }

    await morphToQuestionAsync(node, {
      beforeShow: () => {
        syncStateToTourGroup(group, startIndex);
      },
    });
  } finally {
    state.tour.busy = false;
  }
}

function startTourForCurrentSystem() {
  const groups = buildTourGroups(state.system);
  if (!groups.length) return false;
  state.tour.active = true;
  state.tour.groups = groups;
  state.tour.groupIndex = 0;
  state.tour.qIndex = 0;
  return true;
}

function advanceTour() {
  if (state.dissect.active || state.tour.busy) return;

  if (!state.tour.active) {
    if (!els.homeView?.classList.contains("is-active")) {
      moveQuestion(1);
      return;
    }
    if (!startTourForCurrentSystem()) return;
    enterTourGroup({ fromQuestion: false, qIndex: 0 });
    return;
  }

  const group = currentTourGroup();
  if (!group) {
    resetTour();
    return;
  }

  const onQuestion = els.questionView?.classList.contains("is-active");

  if (onQuestion) {
    if (!state.answerVisible) {
      const question = currentQuestion();
      state.selectedAnswer = Number(question.correctIndex);
      state.answerVisible = true;
      paintAnswerStates();
      if (els.questionCard) pulse(els.questionCard);
      return;
    }

    if (state.tour.qIndex < group.questions.length - 1) {
      state.tour.qIndex += 1;
      state.selectedAnswer = null;
      state.answerVisible = false;
      renderQuestion({ keepVisible: true });
      if (els.questionCard) pulse(els.questionCard);
      return;
    }

    const nextIndex = state.tour.groupIndex + 1;
    if (nextIndex >= state.tour.groups.length) {
      resetTour();
      showView("home");
      if (state.system === "Day 0") restoreSystemBackground(true);
      return;
    }

    state.tour.groupIndex = nextIndex;
    state.tour.qIndex = 0;
    enterTourGroup({ fromQuestion: true, qIndex: 0 });
    return;
  }

  enterTourGroup({ fromQuestion: false, qIndex: 0 });
}

function retreatTour() {
  if (state.dissect.active || state.tour.busy) return;

  if (!state.tour.active) {
    if (els.questionView?.classList.contains("is-active")) moveQuestion(-1);
    return;
  }

  const group = currentTourGroup();
  if (!group) {
    resetTour();
    return;
  }

  const onQuestion = els.questionView?.classList.contains("is-active");

  if (onQuestion) {
    if (state.answerVisible) {
      state.selectedAnswer = null;
      state.answerVisible = false;
      paintAnswerStates();
      if (els.questionCard) pulse(els.questionCard);
      return;
    }

    if (state.tour.qIndex > 0) {
      state.tour.qIndex -= 1;
      state.selectedAnswer = null;
      state.answerVisible = false;
      renderQuestion({ keepVisible: true });
      if (els.questionCard) pulse(els.questionCard);
      return;
    }

    if (state.tour.groupIndex === 0) {
      resetTour();
      showView("home");
      return;
    }

    state.tour.groupIndex -= 1;
    const prev = currentTourGroup();
    const lastIndex = Math.max(0, (prev?.questions.length || 1) - 1);
    enterTourGroup({ fromQuestion: true, qIndex: lastIndex });
    return;
  }

  if (state.tour.groupIndex > 0) {
    state.tour.groupIndex -= 1;
    const prev = currentTourGroup();
    const lastIndex = Math.max(0, (prev?.questions.length || 1) - 1);
    enterTourGroup({ fromQuestion: false, qIndex: lastIndex });
  }
}

function morphToQuestion(sourceNode, options = {}) {
  const processId = sourceNode?.dataset?.process || state.process;
  state.process = processId;
  const process = processes.find((item) => item.id === processId) || processes[0];
  const rect = sourceNode.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const baseSize = Math.max(rect.width, rect.height);
  const coverPeakScale = 1.06;
  const farthestCornerDistance = Math.max(
    Math.hypot(centerX, centerY),
    Math.hypot(window.innerWidth - centerX, centerY),
    Math.hypot(centerX, window.innerHeight - centerY),
    Math.hypot(window.innerWidth - centerX, window.innerHeight - centerY)
  );
  const coverSize = Math.max((farthestCornerDistance * 2.12) / coverPeakScale, baseSize);
  const startScale = (baseSize / coverSize) * 0.42;
  const endScale = (baseSize / coverSize) * 0.12;

  const pulse = document.createElement("div");
  pulse.className = "warp-pulse";
  pulse.style.left = `${centerX}px`;
  pulse.style.top = `${centerY}px`;
  pulse.style.width = `${baseSize * 1.15}px`;
  pulse.innerHTML = `
    <span class="warp-pulse-ring"></span>
    <span class="warp-pulse-ring warp-pulse-ring-b"></span>
    <span class="warp-pulse-core"></span>
  `;

  const backdrop = document.createElement("div");
  backdrop.className = "morph-backdrop";

  const cover = document.createElement("div");
  cover.className = "morph-cover warp-portal";
  cover.style.left = `${centerX - coverSize / 2}px`;
  cover.style.top = `${centerY - coverSize / 2}px`;
  cover.style.width = `${coverSize}px`;
  cover.style.height = `${coverSize}px`;
  cover.style.opacity = "0";
  cover.style.transform = `perspective(1100px) scale(${startScale}) rotateX(28deg)`;
  cover.innerHTML = `
    <span class="warp-orbit" aria-hidden="true"></span>
    <span class="warp-orbit warp-orbit-b" aria-hidden="true"></span>
    <div class="morph-cover-label">
      <span>${process.number}</span>
      <strong>${process.label}</strong>
    </div>
  `;

  document.body.append(backdrop, pulse, cover);

  const coverDelay = 320;
  const zoomInDuration = 800;
  const apexDuration = 120;
  const zoomOutDuration = 1500;
  const coverDuration = zoomInDuration + apexDuration + zoomOutDuration;
  const coverAt = coverDelay + zoomInDuration + Math.round(apexDuration * 0.45);
  const doneAt = coverDelay + coverDuration;
  const holdScale = coverPeakScale;
  let morphFrame = 0;

  els.stage.classList.add("is-transitioning");
  els.shell.classList.add("morphing");
  sourceNode.classList.add("is-warping");

  window.setTimeout(() => {
    cover.classList.add("is-running");
    const start = performance.now();
    const apexAt = zoomInDuration / coverDuration;
    const pageSwitchAt = (coverAt - coverDelay) / coverDuration;
    const fadeAt = 0.96;
    const easeOut = (value) => 1 - Math.pow(1 - value, 3);
    const easeInOut = (value) => (value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2);
    const lerp = (from, to, value) => from + (to - from) * value;

    const step = (time) => {
      const progress = Math.min((time - start) / coverDuration, 1);
      const exitProgress = progress <= apexAt ? 0 : (progress - apexAt) / (1 - apexAt);
      const scale =
        progress <= apexAt
          ? lerp(startScale, holdScale, easeOut(progress / apexAt))
          : lerp(holdScale, endScale, Math.pow(exitProgress, 1.05));
      const tilt =
        progress <= apexAt
          ? lerp(28, 0, easeOut(progress / apexAt))
          : lerp(0, -8, easeInOut(exitProgress));
      const coverOpacity =
        progress < 0.1 ? progress / 0.1 : progress > fadeAt ? 1 - (progress - fadeAt) / (1 - fadeAt) : 1;
      const backdropFadeStart = pageSwitchAt + 0.03;
      const backdropFadeEnd = pageSwitchAt + 0.2;
      const backdropOpacity =
        progress < 0.18
          ? progress / 0.18
          : progress < backdropFadeStart
            ? 1
            : progress < backdropFadeEnd
              ? 1 - (progress - backdropFadeStart) / (backdropFadeEnd - backdropFadeStart)
              : 0;

      cover.style.opacity = String(Math.max(0, Math.min(1, coverOpacity)));
      cover.style.transform = `perspective(1100px) scale(${scale}) rotateX(${tilt}deg)`;
      backdrop.style.opacity = String(Math.max(0, Math.min(1, backdropOpacity)));

      if (progress < 1) {
        morphFrame = requestAnimationFrame(step);
      }
    };

    morphFrame = requestAnimationFrame(step);
  }, coverDelay);

  window.setTimeout(() => {
    pulse.remove();
    sourceNode.classList.remove("is-warping");
  }, coverDelay + 380);

  setTimeout(() => {
    els.shell.classList.remove("morphing");
    if (typeof options.beforeShow === "function") options.beforeShow();
    // Fit under the morph cover so the card is ready before the portal clears.
    showView("question", { fit: false });
    void els.questionView?.offsetHeight;
    void els.questionCard?.offsetHeight;
    renderQuestion({ syncFit: true });
  }, coverAt);

  setTimeout(() => {
    els.stage.classList.remove("is-transitioning");
    renderNodes();
    renderCategories();
    cancelAnimationFrame(morphFrame);
    pulse.remove();
    backdrop.remove();
    cover.remove();
    sourceNode.classList.remove("is-warping");
    els.questionCard?.classList.remove("is-layout-pending");
    if (typeof options.onDone === "function") options.onDone();
  }, doneAt);

  window.setTimeout(() => {
    backdrop.remove();
    cover.remove();
  }, doneAt + 140);
}

function returnHome() {
  if (state.dissect.active) {
    closeDissectPage();
    return;
  }
  showView("home");
  if (state.system === "Day 0") restoreSystemBackground(true);
}

function showView(view, options = {}) {
  const isQuestion = view === "question";
  const isDissect = view === "dissect";
  const isHome = view === "home";

  els.shell.classList.toggle("in-question", isQuestion);
  els.shell.classList.toggle("in-dissect", isDissect);

  els.homeView.classList.toggle("is-active", isHome);
  els.homeView.setAttribute("aria-hidden", String(!isHome));

  els.questionView.classList.toggle("is-active", isQuestion);
  els.questionView.setAttribute("aria-hidden", String(!isQuestion));

  if (els.dissectView) {
    els.dissectView.classList.toggle("is-active", isDissect);
    els.dissectView.setAttribute("aria-hidden", String(!isDissect));
  }

  if (isQuestion && options.fit !== false) scheduleFitQuestionLayout();
}

function applyDissectBackground() {
  setSystemBackground(true, dissectBackground);
}

function clearDissectBackground() {
  // Force a fresh swap back to the active system theme.
  state.bgImage = null;
  setSystemBackground(true);
}

function openDissectPage() {
  state.dissect.active = true;
  state.dissect.index = 0;
  state.dissect.answerVisible = false;
  state.dissect.introComplete = false;
  els.shell.classList.add("is-dissecting");
  applyDissectBackground();
  els.systemTitle.textContent = dissectLesson.title;
  if (els.dissectTitle) els.dissectTitle.textContent = dissectLesson.title;
  showView("dissect");
  els.dissectLaunch?.blur();
  renderDissectLesson({ animate: true });
}

function closeDissectPage() {
  state.dissect.active = false;
  state.dissect.index = 0;
  state.dissect.answerVisible = false;
  state.dissect.introComplete = false;
  stopDissectTypewriter();
  setDissectCaret(false);
  els.dissectScan?.classList.remove("is-firing");
  els.shell.classList.remove("is-dissecting");
  els.dissectPanel?.classList.remove("is-entered", "is-instant");
  els.systemTitle.textContent = formatSystemTitle();
  clearDissectBackground();
  showView("home");
}

function currentDissectQuestion() {
  const list = dissectLesson.questions || [];
  return list[state.dissect.index] || null;
}

function setDissectCaret(on) {
  els.dissectStem?.classList.toggle("is-typing", on);
  if (els.dissectCaret) els.dissectCaret.hidden = !on;
}

function stopDissectTypewriter() {
  if (state.dissect.typeTimer) {
    window.clearTimeout(state.dissect.typeTimer);
    state.dissect.typeTimer = null;
  }
  state.dissect.choiceTimers.forEach((id) => window.clearTimeout(id));
  state.dissect.choiceTimers = [];
  state.dissect.typeToken += 1;
}

function fireDissectScan() {
  if (!els.dissectScan) return;
  els.dissectScan.classList.remove("is-firing");
  void els.dissectScan.offsetWidth;
  els.dissectScan.classList.add("is-firing");
}

function buildDissectChoices(question, showAnswer) {
  return question.choices
    .map((choice, index) => {
      const isCorrect = showAnswer && index === question.correctIndex;
      return `
        <li class="dissect-choice ${isCorrect ? "is-correct" : ""}" style="--delay: ${0.12 + index * 0.2}s">
          <span class="dissect-letter">${String.fromCharCode(65 + index)}</span>
          <span class="dissect-choice-text">${choice}</span>
          ${isCorrect ? '<b class="dissect-badge">Correct</b>' : ""}
        </li>
      `;
    })
    .join("");
}

function revealDissectChoices({ instant = false } = {}) {
  const token = state.dissect.typeToken;
  const items = [...(els.dissectChoices?.querySelectorAll(".dissect-choice") || [])];

  items.forEach((item, index) => {
    item.style.setProperty("--delay", `${0.08 + index * 0.2}s`);
    if (instant) {
      item.classList.add("is-shown");
      return;
    }

    const timerId = window.setTimeout(() => {
      if (!state.dissect.active || token !== state.dissect.typeToken) return;
      item.classList.add("is-shown");
    }, 120 + index * 220);

    state.dissect.choiceTimers.push(timerId);
  });

  state.dissect.introComplete = true;
}

function finishDissectIntro() {
  const question = currentDissectQuestion();
  const target = els.dissectStemText || els.dissectStem;
  if (!question || !target) return;
  stopDissectTypewriter();
  setDissectCaret(false);
  target.textContent = question.stem;
  revealDissectChoices({ instant: true });
}

function startDissectTypewriter(fullText, onDone) {
  stopDissectTypewriter();
  const runId = state.dissect.typeToken;
  const target = els.dissectStemText || els.dissectStem;
  if (!target || !fullText) {
    onDone?.();
    return;
  }

  target.textContent = "";
  setDissectCaret(true);

  let index = 0;
  const baseDelay = 5;

  const step = () => {
    if (runId !== state.dissect.typeToken || !state.dissect.active) return;

    if (index >= fullText.length) {
      setDissectCaret(false);
      state.dissect.typeTimer = null;
      onDone?.();
      return;
    }

    target.textContent = fullText.slice(0, index + 1);
    const char = fullText.charAt(index);
    index += 1;

    let delay = baseDelay;
    if (char === "," || char === ";") delay = 15;
    else if (char === "." || char === ":") delay = 20;
    else if (char === "?" || char === "!") delay = 27;
    else if (char === " ") delay = 2;

    state.dissect.typeTimer = window.setTimeout(step, delay);
  };

  // Let the panel fade in first, then start typing
  state.dissect.typeTimer = window.setTimeout(step, 45);
}

function advanceDissect() {
  const list = dissectLesson.questions || [];
  if (!list.length) return;

  if (!state.dissect.introComplete) {
    finishDissectIntro();
    return;
  }

  if (!state.dissect.answerVisible) {
    state.dissect.answerVisible = true;
    renderDissectLesson({ animate: false });
    return;
  }

  state.dissect.index = (state.dissect.index + 1) % list.length;
  state.dissect.answerVisible = false;
  renderDissectLesson({ animate: true });
}

function retreatDissect() {
  const list = dissectLesson.questions || [];
  if (!list.length) return;

  if (!state.dissect.introComplete) {
    finishDissectIntro();
    return;
  }

  if (state.dissect.answerVisible) {
    state.dissect.answerVisible = false;
    renderDissectLesson({ animate: false });
    return;
  }

  state.dissect.index = (state.dissect.index - 1 + list.length) % list.length;
  state.dissect.answerVisible = false;
  renderDissectLesson({ animate: true });
}

function renderDissectLesson({ animate = false } = {}) {
  const question = currentDissectQuestion();
  const stemTarget = els.dissectStemText || els.dissectStem;
  if (!question || !stemTarget || !els.dissectChoices || !els.dissectAnswerText) return;

  stopDissectTypewriter();
  setDissectCaret(false);

  const showAnswer = state.dissect.answerVisible;

  els.dissectChoices.innerHTML = buildDissectChoices(question, showAnswer);
  els.dissectAnswerText.textContent = question.choices[question.correctIndex];
  els.dissectAnswer?.classList.toggle("is-visible", showAnswer);
  els.dissectAnswer?.setAttribute("aria-hidden", String(!showAnswer));
  els.dissectView?.classList.toggle("is-answer-shown", showAnswer);

  if (animate) {
    state.dissect.introComplete = false;
    stemTarget.textContent = "";
    fireDissectScan();
    els.dissectPanel?.classList.remove("is-entered", "is-instant");
    void els.dissectPanel?.offsetWidth;
    requestAnimationFrame(() => els.dissectPanel?.classList.add("is-entered"));
    startDissectTypewriter(question.stem, () => {
      revealDissectChoices({ instant: false });
    });
    return;
  }

  state.dissect.introComplete = true;
  stemTarget.textContent = question.stem;
  els.dissectPanel?.classList.add("is-entered", "is-instant");
  revealDissectChoices({ instant: true });
}

function revealAnswer() {
  if (state.dissect.active) return;
  state.answerVisible = !state.answerVisible;
  if (els.answerList?.querySelector(".answer-option")) {
    paintAnswerStates();
  } else {
    renderQuestion();
  }
  pulse(els.questionCard);
}

function moveQuestion(delta) {
  if (state.dissect.active) return;
  const questions = filteredQuestions();
  if (!questions.length) return;
  state.questionIndex = (state.questionIndex + delta + questions.length) % questions.length;
  state.selectedAnswer = null;
  state.answerVisible = false;
  renderQuestion();
  pulse(els.questionCard);
}

function pulse(element) {
  element.animate(
    [
      { transform: "scale(1)", filter: "brightness(1)" },
      { transform: "scale(1.025)", filter: "brightness(1.18)" },
      { transform: "scale(1)", filter: "brightness(1)" },
    ],
    { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" }
  );
}

async function importQuestions(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const extension = file.name.split(".").pop().toLowerCase();
  try {
    let incoming = [];
    if (extension === "json") {
      const text = await file.text();
      incoming = normalizeRows(JSON.parse(text));
    } else if (extension === "csv") {
      incoming = normalizeRows(parseCsv(await file.text()));
    } else if (window.XLSX) {
      const buffer = await file.arrayBuffer();
      const workbook = window.XLSX.read(buffer);
      incoming = workbook.SheetNames.flatMap((name) =>
        normalizeRows(window.XLSX.utils.sheet_to_json(workbook.Sheets[name]))
      );
    } else {
      throw new Error("Excel parser is still loading. Try again in a moment, or export the sheet as CSV.");
    }

    incoming = incoming.filter((question) => question.stem);
    if (!incoming.length) throw new Error("No valid questions found in that file.");

    state.questions = mergeQuestionBank(state.questions, incoming);
    state.answerVisible = false;
    selectFirstAvailable();
    showView("home");
  } catch (error) {
    alert(error.message);
  } finally {
    event.target.value = "";
  }
}

function mergeQuestionBank(existing, incoming) {
  const touchedSystems = new Set(incoming.map((question) => question.system).filter(Boolean));
  const kept = existing.filter((question) => !touchedSystems.has(question.system));
  return [...kept, ...incoming];
}

function mapQgCategory(value) {
  const key = String(value || "General").trim().toLowerCase();
  return qgCategoryMap[key] || String(value || "General").trim() || "General";
}

function mapQgVariant(value) {
  const key = String(value || "R").trim().toLowerCase();
  if (qgLevelMap[key]) return qgLevelMap[key];
  return key.startsWith("s") ? "S" : "R";
}

function mapQgSystem(row) {
  const rev = Number(row.revLNum ?? row.RevLNum ?? row["rev l num"]);
  if (Number.isFinite(rev) && revLNumSystems[rev]) return revLNumSystems[rev];
  return (
    row["Type of body system question"] ||
    row.system ||
    row.System ||
    "Cardiovascular"
  );
}

function normalizeRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((row) => {
      const id = row.id || row.ID || row.Id || "";
      const stem = String(row.question || row["Question stem"] || row.stem || row.Question || "").trim();
      const process = normalized(row.QGNP || row["Type of question"] || row.process || row.type || row.Process);
      const category = mapQgCategory(
        row.QGSpef || row["Sub question type"] || row.category || row.Category || "General"
      );
      const system = mapQgSystem(row);
      const variant = mapQgVariant(
        row.QGLevel || row["Question category type"] || row.variant || row.Version || "R"
      );
      const choices = normalizeChoices([
        row.choice_1 || row["Answer A"] || row.A || row.choiceA || row["Multiple choice answer 1"],
        row.choice_2 || row["Answer B"] || row.B || row.choiceB || row["Multiple choice answer 2"],
        row.choice_3 || row["Answer C"] || row.C || row.choiceC || row["Multiple choice answer 3"],
        row.choice_4 || row["Answer D"] || row.D || row.choiceD || row["Multiple choice answer 4"],
      ]);
      const correctIndex = correctIndexFrom(
        row.correct || row["Correct answer"] || row.answer || row["Correct Answer"]
      );

      return {
        id: id ? String(id) : undefined,
        process,
        category,
        system,
        stem,
        variant,
        choices,
        correctIndex,
      };
    })
    .filter((question) => question.stem);
}

function normalizeChoices(choices) {
  return Array.from({ length: 4 }, (_, index) => String(choices?.[index] ?? "").trim());
}

function correctIndexFrom(value) {
  const text = String(value ?? "A").trim().toUpperCase();
  if (/^[A-D]$/.test(text)) return text.charCodeAt(0) - 65;
  const number = Number(text);
  return Number.isFinite(number) ? Math.max(0, Math.min(3, number - 1)) : 0;
}

function parseCsv(text) {
  const rows = text.trim().split(/\r?\n/).map((line) => line.split(",").map((cell) => cell.trim()));
  const headers = rows.shift() || [];
  return rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])));
}

function normalized(value) {
  return String(value || "assess").trim().toLowerCase().replace(/\s+/g, "-");
}

function drawField() {
  const canvas = els.canvas;
  const context = canvas.getContext("2d");
  const points = Array.from({ length: 64 }, () => ({
    x: Math.random(),
    y: Math.random(),
    z: Math.random() * 0.8 + 0.2,
    vx: (Math.random() - 0.5) * 0.00025,
    vy: (Math.random() - 0.5) * 0.00025,
  }));

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
  }

  function frame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1 * devicePixelRatio;
    points.forEach((point) => {
      point.x = (point.x + point.vx + 1) % 1;
      point.y = (point.y + point.vy + 1) % 1;
    });

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 0.13) {
          context.strokeStyle = `rgba(91, 231, 255, ${(0.13 - distance) * 1.6})`;
          context.beginPath();
          context.moveTo(a.x * canvas.width, a.y * canvas.height);
          context.lineTo(b.x * canvas.width, b.y * canvas.height);
          context.stroke();
        }
      }
    }

    points.forEach((point) => {
      context.fillStyle = `rgba(255,255,255,${0.34 * point.z})`;
      context.beginPath();
      context.arc(point.x * canvas.width, point.y * canvas.height, 1.8 * devicePixelRatio * point.z, 0, Math.PI * 2);
      context.fill();
    });

    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  frame();
}

init();
