"use client";

import React, { useEffect, useMemo, useState } from "react";
import sentences from "../sentences.json";
import words from "../word.json";

type Lang = "auto" | "en" | "zh" | "id";

const TRANSLATE_API = "/api/translate";

async function translateText(text: string, target: Lang) {
  try {
    const res = await fetch(TRANSLATE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, target, source: "auto" }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("translateText failed", err);
      throw new Error("Translate API failed");
    }

    const data = await res.json();
    // LibreTranslate returns { translatedText }
    return data.translatedText || data.translated_text || "";
  } catch (e) {
    console.error("translateText error", e);
    throw e;
  }
}

export default function Header() {
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState<Lang>("en");
  const [resultsOpen, setResultsOpen] = useState(false);
  const [translatedPreview, setTranslatedPreview] = useState<Record<string, string>>({});
  const [translatingKey, setTranslatingKey] = useState<string | null>(null);
  const [translateError, setTranslateError] = useState<string | null>(null);

  const allItems = useMemo(() => {
    return [
      ...sentences.map((s: any) => ({
        type: "sentence",
        key: s.hanzi + s.pinyin,
        hanzi: s.hanzi,
        pinyin: s.pinyin,
        english: s.english,
        emoji: s.emoji,
      })),
      ...words.map((w: any) => ({
        type: "word",
        key: w.hanzi + w.pinyin,
        hanzi: w.hanzi,
        pinyin: w.pinyin,
        english: w.english,
        emoji: w.emoji,
      })),
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allItems.filter((it: any) => {
      return (
        (it.hanzi || "").toLowerCase().includes(q) ||
        (it.pinyin || "").toLowerCase().includes(q) ||
        (it.english || "").toLowerCase().includes(q)
      );
    }).slice(0, 20);
  }, [query, allItems]);

  useEffect(() => {
    setResultsOpen(Boolean(query));
  }, [query]);

  async function onTranslate(key: string, text: string) {
    setTranslateError(null);
    try {
      setTranslatingKey(key);
      setTranslatedPreview((p) => ({ ...p, [key]: "Translating..." }));
      const tr = await translateText(text, target);
      setTranslatedPreview((p) => ({ ...p, [key]: tr || "(no translation)" }));
    } catch (e: any) {
      setTranslatedPreview((p) => ({ ...p, [key]: "" }));
      setTranslateError("Translation failed. Try again or check network.");
    } finally {
      setTranslatingKey(null);
    }
  }

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="app-brand">
          <div className="logo">BC</div>
          <div className="title">Baby Chinese</div>
        </div>

        <div className="search-area">
          <input
            aria-label="Search sentences and words"
            placeholder="Search words, sentences, pinyin..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            aria-label="Translation target"
            className="lang-select"
            value={target}
            onChange={(e) => setTarget(e.target.value as Lang)}
          >
            <option value="en">English</option>
            <option value="id">Indonesian</option>
            <option value="zh">Chinese</option>
          </select>
        </div>

        <nav className="app-actions">
          <a className="action" href="/">Home</a>
          <a className="action" href="/words">Words</a>
          <a className="action" href="/sentences">Sentences</a>
        </nav>
      </div>

      {resultsOpen && (
        <div className="results-panel" role="list">
          {results.length === 0 ? (
            <div className="no-results">No matches</div>
          ) : (
            results.map((r: any) => (
              <div key={r.key} className="result-item" role="listitem">
                <div className="res-left">
                  <div className="res-hanzi">{r.hanzi}</div>
                  <div className="res-pinyin">{r.pinyin}</div>
                </div>
                <div className="res-right">
                  <div className="res-english">{r.english}</div>
                  <div className="res-actions">
                    <button
                      className="btn-translate"
                      onClick={() => onTranslate(r.key, r.hanzi || r.english)}
                      disabled={translatingKey !== null}
                    >
                      {translatingKey === r.key ? "Translating..." : "Translate"}
                    </button>
                    {translatedPreview[r.key] && (
                      <div className="translated">{translatedPreview[r.key]}</div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {translateError && (
        <div className="translate-error">{translateError}</div>
      )}
    </header>
  );
}
