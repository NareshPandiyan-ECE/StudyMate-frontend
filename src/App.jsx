import "./styles.css";
import { useState } from 'react';

const studyPlan = [
  { day: 'Day 1', topic: 'Engineering Mathematics', progress: 80 },
  { day: 'Day 2', topic: 'Engineering Physics', progress: 55 },
  { day: 'Day 3', topic: 'Electronic Devices', progress: 30 },
  { day: 'Day 4', topic: 'Digital Electronics', progress: 0 },
  { day: 'Day 5', topic: 'Communication Systems', progress: 0 },
];

const questions = [
  {
    question: 'Which component stores electrical energy?',
    options: ['Resistor', 'Capacitor', 'Diode', 'Transistor'],
    answer: 'Capacitor',
  },
  {
    question: 'What does CPU stand for?',
    options: [
      'Central Processing Unit',
      'Computer Personal Unit',
      'Central Program Utility',
      'Control Processing User',
    ],
    answer: 'Central Processing Unit',
  },
];

function App() {
  const [page, setPage] = useState('dashboard');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState('');
  const [inputMsg, setInputMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'plan', icon: '📅', label: 'Study Plan' },
    { id: 'tutor', icon: '🤖', label: 'AI Tutor' },
    { id: 'quiz', icon: '📝', label: 'Quiz' },
    { id: 'progress', icon: '📊', label: 'Progress' },
  ];

  const handleUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
      setUploadMsg('Notes uploaded successfully!');
    }
  };

  const askTutor = () => {
    if (!inputMsg.trim()) return;
    const userMessage = inputMsg;
    setChat(prev => [
      ...prev,
      { type: 'user', text: userMessage },
      {
        type: 'ai',
        text: `Great question! Here's a simple explanation of "${userMessage}".\n\nStudyMate AI would normally analyse your uploaded study material and provide an answer based on your notes.`,
      },
    ]);
    setInputMsg('');
  };

  const answerQuiz = option => {
    if (option === questions[questionIndex].answer) {
      setScore(s => s + 1);
    }
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(i => i + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div
      style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}
    >
      <aside
        style={{
          width: '240px',
          background: '#111827',
          color: 'white',
          padding: '20px',
        }}
      >
        <h2>StudyMate</h2>
        <p style={{ fontSize: '12px', opacity: 0.7 }}>AI Learning Assistant</p>
        <nav
          style={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                textAlign: 'left',
                padding: '10px',
                background: page === item.id ? '#2563eb' : 'transparent',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
          <button
            onClick={() => setPage('upload')}
            style={{
              textAlign: 'left',
              padding: '10px',
              background: page === 'upload' ? '#2563eb' : 'transparent',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            📄 Upload Notes
          </button>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '24px', background: '#f3f4f6' }}>
        {page === 'dashboard' && (
          <h1>Welcome Back 👋 - Let's continue learning.</h1>
        )}

        {page === 'upload' && (
          <div>
            <h1>Upload Study Material 📄</h1>
            <input
              type='file'
              accept='.pdf,.doc,.docx'
              onChange={handleUpload}
            />
            {uploadedFile && <p>✅ {uploadedFile}</p>}
            {uploadMsg && <p style={{ color: 'green' }}>{uploadMsg}</p>}
          </div>
        )}

        {page === 'plan' && (
          <div>
            <h1>Your Study Plan 📅</h1>
            {studyPlan.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  padding: '12px',
                  margin: '8px 0',
                  borderRadius: '8px',
                }}
              >
                <b>
                  {item.day}: {item.topic}
                </b>{' '}
                - {item.progress}%
              </div>
            ))}
          </div>
        )}

        {page === 'tutor' && (
          <div>
            <h1>AI Tutor 🤖</h1>
            <div
              style={{
                background: 'white',
                padding: '16px',
                borderRadius: '8px',
                minHeight: '300px',
              }}
            >
              {chat.length === 0 && (
                <p>Hello! Ask me anything about your notes.</p>
              )}
              {chat.map((c, i) => (
                <div
                  key={i}
                  style={{
                    margin: '8px 0',
                    textAlign: c.type === 'user' ? 'right' : 'left',
                  }}
                >
                  <span
                    style={{
                      background: c.type === 'user' ? '#2563eb' : '#e5e7eb',
                      color: c.type === 'user' ? 'white' : 'black',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      display: 'inline-block',
                    }}
                  >
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <input
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && askTutor()}
                placeholder='Ask something...'
                style={{ flex: 1, padding: '10px' }}
              />
              <button
                onClick={askTutor}
                style={{
                  padding: '10px 20px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                }}
              >
                Send
              </button>
            </div>
          </div>
        )}

        {page === 'quiz' && (
          <div>
            <h1>Practice Quiz 📝</h1>
            {!quizFinished ? (
              <div
                style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                }}
              >
                <p>
                  Question {questionIndex + 1} of {questions.length} | Score:{' '}
                  {score}
                </p>
                <h2>{questions[questionIndex].question}</h2>
                {questions[questionIndex].options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => answerQuiz(opt)}
                    style={{
                      display: 'block',
                      width: '100%',
                      margin: '8px 0',
                      padding: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <h2>Quiz Completed! 🏆</h2>
                <p>
                  You scored {score} out of {questions.length}
                </p>
                <button onClick={resetQuiz}>Try Again</button>
              </div>
            )}
          </div>
        )}

        {page === 'progress' && <h1>Your Progress 📊 - 72% Overall</h1>}
      </main>
    </div>
  );
}

export default App;
