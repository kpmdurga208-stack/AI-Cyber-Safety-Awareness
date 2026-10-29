const lessons = {
  phishing: {
    title: "📧 Phishing Attacks",
    text: "Phishing uses fake emails, SMS messages or websites to trick people into revealing information or clicking unsafe links.",
    tips: [
      "Check the complete sender address.",
      "Be careful with unexpected links and attachments.",
      "Visit the official website yourself instead of using a message link."
    ]
  },
  deepfake: {
    title: "🤖 AI Voice & Deepfakes",
    text: "AI can imitate a person's voice, face or writing style. A familiar voice or realistic video is not proof of identity.",
    tips: [
      "Call the person back using a known number.",
      "Agree on a family verification phrase for emergencies.",
      "Never transfer money based only on a voice or video request."
    ]
  },
  impersonation: {
    title: "🎭 Impersonation Scams",
    text: "A scammer may pretend to be a bank employee, teacher, friend or technical support worker to gain your trust.",
    tips: [
      "Verify identity through a separate trusted channel.",
      "Never share OTPs, passwords or recovery codes.",
      "Do not trust caller ID alone."
    ]
  },
  urgency: {
    title: "⏳ Urgency & Fear Tactics",
    text: "Scammers create panic with threats, account suspension warnings, unexpected prizes or urgent payment requests.",
    tips: [
      "Pause and think before responding.",
      "Check claims through official channels.",
      "Never bypass normal security checks because someone pressures you."
    ]
  }
};

function openLesson(name) {
  const lesson = lessons[name];
  const output = document.getElementById("lesson-output");

  output.innerHTML = `
    <h3>${lesson.title}</h3>
    <p>${lesson.text}</p>
    <ul>${lesson.tips.map(tip => `<li>${tip}</li>`).join("")}</ul>
  `;

  output.hidden = false;
  output.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function showTips() {
  const tips = [
    "Pause before clicking unexpected links.",
    "Verify requests using a known phone number or official website.",
    "Never share passwords, OTPs or recovery codes.",
    "Use unique passwords and multifactor authentication.",
    "Report suspicious messages through official channels."
  ];

  const output = document.getElementById("lesson-output");
  output.innerHTML = `
    <h3>🔐 Your Cyber Safety Checklist</h3>
    <ul>${tips.map(tip => `<li>${tip}</li>`).join("")}</ul>
    <p>Remember: even a convincing AI-generated message can be fraudulent.</p>
  `;
  output.hidden = false;
  output.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Training examples only. This is a rule-based demonstration,
// not a real AI model or a security guarantee.
const scenarios = {
  bank: {
    subject: "URGENT: Bank Account Suspension",
    sender: "From: security-alert@example.invalid",
    message: "Your account will be suspended today. Verify your details immediately through the link provided.",
    flags: [
      "Creates urgency and fear.",
      "Requests account verification through an unexpected message.",
      "The example.invalid address is reserved for illustrative use."
    ],
    verdict: "High-risk indicators",
    advice: "Do not click. Open your bank's official app or call the number on your bank card."
  },
  prize: {
    subject: "Congratulations! You Won a Prize",
    sender: "From: winner-notice@example.invalid",
    message: "You have won a surprise prize! Pay a processing fee now to receive your reward.",
    flags: [
      "Unexpected prize claim.",
      "Requests advance payment.",
      "Uses excitement to encourage a quick decision."
    ],
    verdict: "Suspicious message",
    advice: "Do not pay. Verify the promotion independently through the official organization."
  },
  friend: {
    subject: "Please Help Me Immediately!",
    sender: "From: unknown-sender@example.invalid",
    message: "I am in trouble and need money immediately. Please transfer it now and do not call me.",
    flags: [
      "Uses emotional pressure.",
      "Requests money urgently.",
      "Discourages independent verification."
    ],
    verdict: "Suspicious message",
    advice: "Contact your friend using their saved number or another trusted channel before acting."
  },
  safe: {
    subject: "Class Schedule Update",
    sender: "From: training-example@example.invalid",
    message: "Your classroom schedule has been updated. Please check the college notice board for the latest timetable.",
    flags: [
      "Does not request passwords or money.",
      "Directs students to verify information through a separate source.",
      "Still verify the sender and announcement before trusting it."
    ],
    verdict: "Fewer obvious warning signs",
    advice: "This sample looks less suspicious, but a message cannot be declared safe from its wording alone. Verify it independently."
  }
};

document.getElementById("message-choice").addEventListener("change", function () {
  const sample = scenarios[this.value];

  document.getElementById("email-subject").textContent = sample.subject;
  document.getElementById("email-sender").textContent = sample.sender;
  document.getElementById("email-message").textContent = sample.message;

  document.getElementById("analysis-result").innerHTML = `
    <strong>Ready to analyze?</strong>
    <p>Press Analyze Message to review the warning signs.</p>
  `;
});

function checkMessage() {
  const selected = document.getElementById("message-choice").value;
  const sample = scenarios[selected];
  const result = document.getElementById("analysis-result");

  result.innerHTML = `
    <strong>🔎 ${sample.verdict}</strong>
    <ul>${sample.flags.map(flag => `<li>${flag}</li>`).join("")}</ul>
    <p><strong>Recommended action:</strong> ${sample.advice}</p>
    <p><small>Educational heuristic only; this is not a real AI detection service.</small></p>
  `;
}

// Interactive quiz
const questions = [
  {
    q: "An unknown message demands immediate payment. What should you do?",
    options: [
      "Pay immediately to avoid trouble",
      "Pause and verify through an official channel",
      "Forward it to all your friends"
    ],
    answer: 1,
    explanation: "Correct! Independent verification helps prevent fraud."
  },
  {
    q: "Someone claiming to be your bank asks for your OTP. What is safest?",
    options: [
      "Share it if they sound professional",
      "Send it only by SMS",
      "Never share it; contact your bank independently"
    ],
    answer: 2,
    explanation: "Never disclose OTPs or authentication codes to callers or message senders."
  },
  {
    q: "Can an AI-generated voice convincingly imitate a family member?",
    options: [
      "Yes, so verify unusual requests independently",
      "No, AI cannot imitate voices",
      "Yes, so every request must be trusted"
    ],
    answer: 0,
    explanation: "AI voice cloning is possible. Verify urgent requests using a known contact method."
  },
  {
    q: "Which is a warning sign of a phishing message?",
    options: [
      "An unexpected link demanding urgent action",
      "Checking a notice on an official website",
      "Using multifactor authentication"
    ],
    answer: 0,
    explanation: "Unexpected links and pressure to act quickly are common warning signs."
  },
  {
    q: "What should you do if you suspect a message is fraudulent?",
    options: [
      "Reply with your personal details",
      "Click the link to investigate",
      "Avoid the link and report it through official channels"
    ],
    answer: 2,
    explanation: "Avoid interacting with suspicious links and report the message safely."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  answered = false;

  const question = questions[currentQuestion];
  document.getElementById("question-number").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  document.getElementById("live-score").textContent = `Score: ${score}`;
  document.getElementById("progress-bar").style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  document.getElementById("question-text").textContent = question.q;
  document.getElementById("quiz-feedback").textContent = "";
  document.getElementById("quiz-feedback").className = "";
  document.getElementById("next-btn").disabled = true;

  document.getElementById("next-btn").textContent =
    currentQuestion === questions.length - 1
      ? "View Final Score →"
      : "Next Question →";

  const optionsBox = document.getElementById("answer-options");
  optionsBox.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index));
    optionsBox.appendChild(button);
  });
}

function chooseAnswer(selected) {
  if (answered) return;
  answered = true;

  const question = questions[currentQuestion];
  const buttons = document.querySelectorAll(".answer-option");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    } else if (index === selected) {
      button.classList.add("wrong");
    }
  });

  const feedback = document.getElementById("quiz-feedback");
  const isCorrect = selected === question.answer;

  if (isCorrect) score++;

  feedback.textContent =
    `${isCorrect ? "✓ Correct! " : "✗ Not quite. "}${question.explanation}`;

  feedback.className = isCorrect ? "good" : "bad";
  document.getElementById("live-score").textContent = `Score: ${score}`;
  document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    return;
  }

  showFinalScore();
}

function showFinalScore() {
  document.getElementById("progress-bar").style.width = "100%";
  document.getElementById("question-number").textContent = "Training complete";
  document.getElementById("live-score").textContent = `Score: ${score}/5`;
  document.getElementById("question-text").textContent =
    score >= 4 ? "🎉 Excellent cyber awareness!" :
    score >= 3 ? "👏 Good effort! Keep learning." :
    "💡 Keep practicing your cyber safety skills.";

  document.getElementById("answer-options").innerHTML = `
    <p>You answered ${score} out of ${questions.length} questions correctly.</p>
    <p>${Math.round((score / questions.length) * 100)}% quiz score</p>
    <p>Review the learning modules to strengthen your awareness.</p>
  `;

  document.getElementById("quiz-feedback").textContent =
    "This is a learning score, not a certification.";
  document.getElementById("quiz-feedback").className = "good";

  const nextButton = document.getElementById("next-btn");
  nextButton.disabled = false;
  nextButton.textContent = "↻ Try Again";
  nextButton.onclick = restartQuiz;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  const nextButton = document.getElementById("next-btn");
  nextButton.onclick = nextQuestion;

  renderQuestion();
}

renderQuestion();