import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Settings, Trophy, CheckCircle2, XCircle, Clock, Home } from "lucide-react";

// ---------------------------
// Utility helpers
// ---------------------------
const ls = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const DEFAULT_DATA = {
  categories: [
    {
      id: "math",
      name: "Mathematics",
      color: "bg-indigo-500",
      questions: [
        {
          id: "m1",
          type: "mcq",
          question: "What is 7 × 8?",
          options: ["54", "56", "64", "58"],
          answer: 1,
          explanation: "7 times 8 equals 56.",
          points: 5,
          difficulty: "easy",
        },
        {
          id: "m2",
          type: "tf",
          question: "The number 0 is an even integer.",
          answer: true,
          explanation: "Even integers are divisible by 2. 0 ÷ 2 = 0.",
          points: 5,
          difficulty: "easy",
        },
        {
          id: "m3",
          type: "short",
          question: "Round 7.25 to the nearest integer.",
          answer: ["7"],
          explanation: "7.25 is closer to 7 than 8.",
          points: 5,
          difficulty: "easy",
        },
        {
          id: "m4",
          type: "multi",
          question: "Select all prime numbers.",
          options: ["2", "9", "11", "21"],
          answer: [0, 2],
          explanation: "2 and 11 are prime; 9 and 21 are composite.",
          points: 10,
          difficulty: "medium",
        },
      ],
    },
    {
      id: "js",
      name: "JavaScript Basics",
      color: "bg-emerald-500",
      questions: [
        {
          id: "j1",
          type: "mcq",
          question: "Inside which HTML element do we put JavaScript?",
          options: ["<script>", "<scripting>", "<js>", "<javascript>"],
          answer: 0,
          explanation: "The <script> tag is used for JavaScript.",
          points: 5,
          difficulty: "easy",
        },
        {
          id: "j2",
          type: "mcq",
          question: "Correct syntax to reference an external script 'xxx.js'?",
          options: ["<script src=\"xxx.js\"></script>", "<script href=\"xxx.js\"></script>", "<script name=\"xxx.js\"></script>"],
          answer: 0,
          explanation: "Use the src attribute to link external JS.",
          points: 5,
          difficulty: "easy",
        },
        {
          id: "j3",
          type: "mcq",
          question: "How to write a single-line comment in JavaScript?",
          options: ["' This is a comment", "// This is a comment", "<!-- This is a comment -->"],
          answer: 1,
          explanation: "Use // for single-line comments in JS.",
          points: 5,
          difficulty: "easy",
        },
        {
          id: "j4",
          type: "mcq",
          question: "Round 7.25 to the nearest integer.",
          options: ["Math.rnd(7.25)", "round(7.25)", "Math.round(7.25)", "rnd(7.25)"],
          answer: 2,
          explanation: "Math.round returns the nearest integer.",
          points: 5,
          difficulty: "easy",
        },
        {
          id: "j5",
          type: "mcq",
          question: "Find the highest value of x and y.",
          options: ["Math.ceil(x, y)", "top(x, y)", "Math.max(x, y)", "ceil(x, y)"],
          answer: 2,
          explanation: "Use Math.max to get the largest number.",
          points: 5,
          difficulty: "easy",
        },
      ],
    },
    {
      id: "science",
      name: "Science",
      color: "bg-rose-500",
      questions: [
        {
          id: "s1",
          type: "short",
          question: "What gas do plants primarily absorb for photosynthesis?",
          answer: ["carbon dioxide", "co2"],
          explanation: "Plants take in carbon dioxide (CO₂) and release oxygen.",
          points: 5,
          difficulty: "easy",
        },
        {
          id: "s2",
          type: "tf",
          question: "Sound can travel through a vacuum.",
          answer: false,
          explanation: "Sound needs a medium like air, liquid, or solid.",
          points: 5,
          difficulty: "easy",
        },
      ],
    },
  ],
};

const DATA_KEY = "quiz_app_data_v1";
const LB_KEY = "quiz_app_leaderboard_v1";

function usePersistentData() {
  const [data, setData] = useState(() => ls.get(DATA_KEY, DEFAULT_DATA));
  useEffect(() => ls.set(DATA_KEY, data), [data]);
  return [data, setData];
}

function useLeaderboard() {
  const [board, setBoard] = useState(() => ls.get(LB_KEY, []));
  useEffect(() => ls.set(LB_KEY, board), [board]);
  return [board, setBoard];
}

function Title({ children }) {
  return (
    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
      {children}
    </h1>
  );
}

function Kbd({ children }) {
  return (
    <kbd className="rounded-lg border px-2 py-0.5 text-xs shadow bg-white">{children}</kbd>
  );
}

function HeaderBar({ onOpenAdmin, onHome }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onHome}>
          <Home className="w-5 h-5" />
        </Button>
        <Title>📚 Quiz & Exercises</Title>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onOpenAdmin}>
          <Settings className="w-4 h-4 mr-2" /> Admin
        </Button>
      </div>
    </div>
  );
}

function StartScreen({ name, setName, duration, setDuration, onStart, categories }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Welcome! 👋</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Your name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Alice" />
            <p className="text-xs text-gray-500">Stored locally to show on the leaderboard.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Time limit (minutes)</label>
            <Select value={String(duration)} onValueChange={(v) => setDuration(Number(v))}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[0, 5, 10, 15, 20, 30, 45].map((m) => (
                  <SelectItem key={m} value={String(m)}>
                    {m === 0 ? "No timer" : `${m} min`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Optional timer for each quiz session.</p>
          </div>
        </div>
        <Separator />
        <div className="grid md:grid-cols-3 gap-4">
          {categories.map((c) => (
            <motion.div key={c.id} whileHover={{ scale: 1.02 }}>
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{c.name}</span>
                    <Badge className={`${c.color} text-white`}>{c.questions.length} Qs</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">Practice and test your knowledge in {c.name}.</p>
                  <Button className="w-full" onClick={() => onStart(c.id)}>
                    Start {c.name}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <Separator />
        <div className="text-sm text-gray-600">
          Tips: Press <Kbd>Enter</Kbd> to submit, use <Kbd>←</Kbd>/<Kbd>→</Kbd> to navigate, and <Kbd>Esc</Kbd> to review.
        </div>
      </CardContent>
    </Card>
  );
}

function QuestionView({ q, index, total, value, setValue, onNext, onPrev, onSubmit, showExplain, disabled }) {
  const isLast = index === total - 1;
  const percent = Math.round(((index + 1) / total) * 100);

  const renderInput = () => {
    switch (q.type) {
      case "mcq":
        return (
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <Button
                key={i}
                variant={value === i ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setValue(i)}
                disabled={disabled}
              >
                {opt}
              </Button>
            ))}
          </div>
        );
      case "tf":
        return (
          <div className="grid grid-cols-2 gap-2">
            {[true, false].map((opt, i) => (
              <Button
                key={i}
                variant={value === opt ? "default" : "outline"}
                className="w-full"
                onClick={() => setValue(opt)}
                disabled={disabled}
              >
                {opt ? "True" : "False"}
              </Button>
            ))}
          </div>
        );
      case "short":
        return (
          <Input
            placeholder="Type your answer"
            value={value ?? ""}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
          />
        );
      case "multi":
        return (
          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const checked = Array.isArray(value) && value.includes(i);
              return (
                <label key={i} className="flex items-center gap-2 rounded-xl border p-3">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(v) => {
                      if (disabled) return;
                      const arr = Array.isArray(value) ? [...value] : [];
                      if (v) {
                        if (!arr.includes(i)) arr.push(i);
                      } else {
                        const idx = arr.indexOf(i);
                        if (idx >= 0) arr.splice(idx, 1);
                      }
                      setValue(arr);
                    }}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            Question {index + 1} / {total}
          </span>
          <div className="w-40">
            <Progress value={percent} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-lg font-medium">{q.question}</div>
        {renderInput()}
        <AnimatePresence>
          {showExplain && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-gray-600">Explanation: {q.explanation}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onPrev} disabled={index === 0}>
            Previous
          </Button>
          {!isLast ? (
            <Button onClick={onNext}>Next</Button>
          ) : (
            <Button onClick={onSubmit}>Submit</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function calcScore(questions, answers) {
  let score = 0;
  let max = 0;
  const results = questions.map((q, i) => {
    max += q.points ?? 1;
    const a = answers[i];
    let correct = false;
    if (q.type === "mcq" || q.type === "tf") {
      correct = a === q.answer;
    } else if (q.type === "short") {
      if (typeof a === "string") {
        const norm = a.trim().toLowerCase();
        correct = (q.answer || []).some((acc) => norm === String(acc).trim().toLowerCase());
      }
    } else if (q.type === "multi") {
      const ans = Array.isArray(a) ? [...a].sort() : [];
      const key = Array.isArray(q.answer) ? [...q.answer].sort() : [];
      correct = JSON.stringify(ans) === JSON.stringify(key);
    }
    if (correct) score += q.points ?? 1;
    return { correct, user: a };
  });
  return { score, max, results };
}

function Timer({ seconds, onExpire }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => setLeft(seconds), [seconds]);
  useEffect(() => {
    if (!left && left !== 0) return;
    if (left <= 0) return onExpire?.();
    const id = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [left, onExpire]);
  const mins = Math.floor(left / 60);
  const secs = left % 60;
  const pct = Math.max(0, Math.min(100, (left / seconds) * 100));
  return (
    <div className="flex items-center gap-3">
      <Clock className="w-4 h-4" />
      <div className="w-40"><Progress value={pct} /></div>
      <div className={`text-sm font-medium ${left <= 10 ? "text-rose-600" : "text-gray-700"}`}>
        {mins}:{secs.toString().padStart(2, "0")}
      </div>
    </div>
  );
}

function Results({ name, category, questions, answers, onRetry, onHome, onSaveLeaderboard }) {
  const { score, max, results } = useMemo(() => calcScore(questions, answers), [questions, answers]);
  const pct = Math.round((score / max) * 100);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Results — {category.name}</span>
            <Badge variant="secondary" className="text-base">{pct}%</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border bg-white">
              <div className="text-sm text-gray-500">Name</div>
              <div className="text-lg font-semibold">{name || "Anonymous"}</div>
            </div>
            <div className="p-4 rounded-2xl border bg-white">
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-lg font-semibold">{score} / {max}</div>
            </div>
            <div className="p-4 rounded-2xl border bg-white">
              <div className="text-sm text-gray-500">Grade</div>
              <div className="text-lg font-semibold">{pct >= 80 ? "A" : pct >= 65 ? "B" : pct >= 50 ? "C" : pct >= 40 ? "D" : "E"}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={onRetry}>Retry</Button>
            <Button variant="outline" onClick={onHome}>Home</Button>
            <Button variant="secondary" onClick={onSaveLeaderboard}>
              <Trophy className="w-4 h-4 mr-2" /> Save to Leaderboard
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Review Answers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((q, i) => {
            const r = results[i];
            const isCorrect = r.correct;
            return (
              <div key={q.id} className="rounded-2xl border p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Q{i + 1}. {q.question}</div>
                  {isCorrect ? (
                    <Badge className="bg-emerald-500">Correct</Badge>
                  ) : (
                    <Badge className="bg-rose-500">Wrong</Badge>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <span className="font-medium">Your answer:</span> {renderAnswer(q, r.user)}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Correct:</span> {renderAnswer(q, q.answer)}
                </div>
                <div className="mt-2 flex items-center gap-2 text-gray-600 text-sm">
                  {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                  <span>{q.explanation}</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function renderAnswer(q, a) {
  if (q.type === "mcq") return q.options[a] ?? String(a ?? "—");
  if (q.type === "tf") return a === true ? "True" : a === false ? "False" : "—";
  if (q.type === "short") return a ?? "—";
  if (q.type === "multi") {
    const arr = Array.isArray(a) ? a : [];
    return arr.length ? arr.map((i) => q.options[i]).join(", ") : "—";
  }
  return String(a ?? "—");
}

function Leaderboard({ board }) {
  const sorted = [...board].sort((a, b) => b.pct - a.pct).slice(0, 20);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5" />Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 text-xs font-medium text-gray-500 px-2 py-1">
          <div>#</div><div>Name</div><div>Category</div><div>Score</div><div>Percent</div><div>Date</div>
        </div>
        <Separator />
        {sorted.map((r, i) => (
          <div key={i} className="grid grid-cols-6 items-center px-2 py-2 border-b text-sm">
            <div className="font-semibold">{i + 1}</div>
            <div>{r.name}</div>
            <div>{r.category}</div>
            <div>{r.score}/{r.max}</div>
            <div>{r.pct}%</div>
            <div>{new Date(r.at).toLocaleString()}</div>
          </div>
        ))}
        {sorted.length === 0 && (
          <div className="text-sm text-gray-500">No scores yet. Complete a quiz and save your result.</div>
        )}
      </CardContent>
    </Card>
  );
}

function AdminPanel({ data, setData }) {
  const [cat, setCat] = useState(data.categories[0]?.id ?? "");
  const category = data.categories.find((c) => c.id === cat);
  const [newQ, setNewQ] = useState({ type: "mcq", question: "", options: ["", "", "", ""], answer: 0, explanation: "", points: 5, difficulty: "easy" });

  const addQuestion = () => {
    if (!category) return;
    const id = `${cat}_${Math.random().toString(36).slice(2, 8)}`;
    const q = { ...newQ, id };
    const updated = {
      ...data,
      categories: data.categories.map((c) => (c.id === cat ? { ...c, questions: [...c.questions, q] } : c)),
    };
    setData(updated);
    setNewQ({ type: "mcq", question: "", options: ["", "", "", ""], answer: 0, explanation: "", points: 5, difficulty: "easy" });
  };

  const removeQuestion = (qid) => {
    const updated = {
      ...data,
      categories: data.categories.map((c) => (c.id === cat ? { ...c, questions: c.questions.filter((q) => q.id !== qid) } : c)),
    };
    setData(updated);
  };

  const addCategory = () => {
    const baseId = prompt("Category ID (e.g., history)")?.trim();
    const name = prompt("Category name (display)")?.trim();
    if (!baseId || !name) return;
    const color = ["bg-indigo-500","bg-emerald-500","bg-rose-500","bg-amber-500","bg-sky-500"][Math.floor(Math.random()*5)];
    const updated = { ...data, categories: [...data.categories, { id: baseId, name, color, questions: [] }] };
    setData(updated);
    setCat(baseId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Admin — Manage Questions</span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={addCategory}><Plus className="w-4 h-4 mr-2"/>Add Category</Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-1 space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {data.categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {category && (
              <div className="text-xs text-gray-500">{category.questions.length} questions</div>
            )}
          </div>

          <div className="md:col-span-3 space-y-4">
            <div className="grid md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={newQ.type} onValueChange={(v) => setNewQ((s) => ({ ...s, type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice</SelectItem>
                    <SelectItem value="multi">Multiple Answers</SelectItem>
                    <SelectItem value="tf">True / False</SelectItem>
                    <SelectItem value="short">Short Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Points</label>
                <Input type="number" value={newQ.points} onChange={(e) => setNewQ((s) => ({ ...s, points: Number(e.target.value) }))} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={newQ.difficulty} onValueChange={(v) => setNewQ((s) => ({ ...s, difficulty: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Question</label>
              <Textarea value={newQ.question} onChange={(e) => setNewQ((s) => ({ ...s, question: e.target.value }))} placeholder="Enter the question text" />
            </div>

            {(newQ.type === "mcq" || newQ.type === "multi") && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Options</label>
                <div className="grid md:grid-cols-2 gap-2">
                  {newQ.options.map((op, i) => (
                    <Input key={i} value={op} onChange={(e) => setNewQ((s) => ({ ...s, options: s.options.map((o, j) => (j === i ? e.target.value : o)) }))} placeholder={`Option ${i + 1}`} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm">Correct answer{newQ.type === "multi" ? "(s) (use indexes)" : " (index)"}</label>
                  {newQ.type === "multi" ? (
                    <Input
                      placeholder="e.g., 0,2"
                      value={Array.isArray(newQ.answer) ? newQ.answer.join(",") : ""}
                      onChange={(e) => {
                        const val = e.target.value
                          .split(",")
                          .map((x) => x.trim())
                          .filter(Boolean)
                          .map((n) => Number(n));
                        setNewQ((s) => ({ ...s, answer: val }));
                      }}
                    />
                  ) : (
                    <Input type="number" value={Number(newQ.answer)} onChange={(e) => setNewQ((s) => ({ ...s, answer: Number(e.target.value) }))} />
                  )}
                </div>
              </div>
            )}

            {newQ.type === "short" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Accepted answers (comma‑separated)</label>
                <Input
                  placeholder="e.g., carbon dioxide, CO2"
                  value={Array.isArray(newQ.answer) ? newQ.answer.join(",") : ""}
                  onChange={(e) => setNewQ((s) => ({ ...s, answer: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }))}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Explanation</label>
              <Textarea value={newQ.explanation} onChange={(e) => setNewQ((s) => ({ ...s, explanation: e.target.value }))} placeholder="Short explanation" />
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={addQuestion}><Plus className="w-4 h-4 mr-2"/>Add Question</Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="text-sm font-medium">Existing Questions</div>
              <div className="space-y-2">
                {category?.questions.map((q) => (
                  <div key={q.id} className="flex items-center justify-between rounded-xl border p-3">
                    <div className="text-sm w-[80%] truncate">{q.question}</div>
                    <Button variant="destructive" size="icon" onClick={() => removeQuestion(q.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {category?.questions.length === 0 && (
                  <div className="text-sm text-gray-500">No questions yet. Add your first question above.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function QuizApp() {
  const [data, setData] = usePersistentData();
  const [board, setBoard] = useLeaderboard();
  const [screen, setScreen] = useState("home"); // home | quiz | results | admin
  const [name, setName] = useState(ls.get("quiz_name", ""));
  const [duration, setDuration] = useState(10); // minutes
  const [catId, setCatId] = useState(null);
  const category = useMemo(() => data.categories.find((c) => c.id === catId), [data, catId]);

  // quiz state
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplain, setShowExplain] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => ls.set("quiz_name", name), [name]);

  const startQuiz = (cid) => {
    setCatId(cid);
    setIdx(0);
    setAnswers([]);
    setShowExplain(false);
    setExpired(false);
    setScreen("quiz");
  };

  const onAnswerChange = (v) => {
    const arr = [...answers];
    arr[idx] = v;
    setAnswers(arr);
  };

  const onNext = () => {
    setShowExplain(false);
    setIdx((i) => Math.min(i + 1, (category?.questions.length ?? 1) - 1));
  };
  const onPrev = () => setIdx((i) => Math.max(i - 1, 0));

  const onSubmit = () => {
    setScreen("results");
  };

  const saveToLeaderboard = () => {
    if (!category) return;
    const { score, max } = calcScore(category.questions, answers);
    const record = {
      name: name || "Anonymous",
      category: category.name,
      score,
      max,
      pct: Math.round((score / max) * 100),
      at: Date.now(),
    };
    setBoard((b) => [record, ...b]);
  };

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (screen !== "quiz") return;
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Enter") onSubmit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, idx, category, answers]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <HeaderBar onOpenAdmin={() => setScreen("admin")} onHome={() => setScreen("home")} />

        <Tabs value={screen} onValueChange={setScreen} className="hidden" />

        {screen === "home" && (
          <div className="space-y-6">
            <StartScreen
              name={name}
              setName={setName}
              duration={duration}
              setDuration={setDuration}
              categories={data.categories}
              onStart={startQuiz}
            />
            <Leaderboard board={board} />
          </div>
        )}

        {screen === "quiz" && category && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Category: <span className="font-medium">{category.name}</span></div>
              {duration > 0 && (
                <Timer seconds={duration * 60} onExpire={() => { setExpired(true); setScreen("results"); }} />
              )}
            </div>
            <QuestionView
              q={category.questions[idx]}
              index={idx}
              total={category.questions.length}
              value={answers[idx]}
              setValue={onAnswerChange}
              onNext={onNext}
              onPrev={onPrev}
              onSubmit={onSubmit}
              showExplain={showExplain}
              disabled={expired}
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                Answered {answers.filter((a) => a !== undefined && a !== null && (Array.isArray(a) ? a.length : String(a).length)).length} / {category.questions.length}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setShowExplain((s) => !s)}>
                  {showExplain ? "Hide" : "Show"} Explanation
                </Button>
                <Button onClick={onSubmit}>Submit Now</Button>
              </div>
            </div>
          </div>
        )}

        {screen === "results" && category && (
          <Results
            name={name}
            category={category}
            questions={category.questions}
            answers={answers}
            onRetry={() => startQuiz(category.id)}
            onHome={() => setScreen("home")}
            onSaveLeaderboard={saveToLeaderboard}
          />
        )}

        {screen === "admin" && (
          <AdminPanel data={data} setData={setData} />
        )}

        <footer className="text-xs text-center text-gray-500 pt-6">
          Built with React • Tailwind • shadcn/ui • Framer Motion
        </footer>
      </div>
    </div>
  );
}
