"use client";

import { useState } from "react";
import type { FamilyMemberInput, Relationship } from "@/types/astrology";
import { RELATIONSHIPS } from "@/types/astrology";

interface AddMemberFormProps {
  onAdd: (member: FamilyMemberInput) => void;
  canAddMore: boolean;
  currentCount: number;
  maxMembers: number;
}

function generateId(): string {
  return `member_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function AddMemberForm({
  onAdd,
  canAddMore,
  currentCount,
  maxMembers,
}: AddMemberFormProps) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState<Relationship>("Altro");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Inserisci un nome";
    }
    if (!birthDate) {
      newErrors.birthDate = "Inserisci la data di nascita";
    } else {
      const d = new Date(birthDate);
      const now = new Date();
      if (d > now) {
        newErrors.birthDate = "La data non può essere nel futuro";
      }
      if (d.getFullYear() < 1900) {
        newErrors.birthDate = "Inserisci una data valida";
      }
    }
    // Birth time is optional but if provided must be valid
    if (birthTime && !/^\d{2}:\d{2}$/.test(birthTime)) {
      newErrors.birthTime = "Formato non valido (HH:MM)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !canAddMore) return;

    const member: FamilyMemberInput = {
      id: generateId(),
      name: name.trim(),
      relationship,
      birthDate,
      birthTime: birthTime || undefined,
    };

    onAdd(member);

    // Reset form
    setName("");
    setRelationship("Altro");
    setBirthDate("");
    setBirthTime("");
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-2">
          <label
            htmlFor="member-name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Nome
          </label>
          <input
            id="member-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="es. Maria"
            maxLength={50}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
              errors.name
                ? "border-red-300 focus:ring-red-200"
                : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Relationship */}
        <div>
          <label
            htmlFor="member-relationship"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Relazione
          </label>
          <select
            id="member-relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value as Relationship)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
          >
            {RELATIONSHIPS.map((rel) => (
              <option key={rel} value={rel}>
                {rel}
              </option>
            ))}
          </select>
        </div>

        {/* Birth date */}
        <div>
          <label
            htmlFor="member-birthdate"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Data di nascita
          </label>
          <input
            id="member-birthdate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            min="1900-01-01"
            className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors focus:ring-2 focus:outline-none ${
              errors.birthDate
                ? "border-red-300 focus:ring-red-200"
                : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
            }`}
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>
          )}
        </div>

        {/* Birth time (optional) */}
        <div className="sm:col-span-2">
          <label
            htmlFor="member-birthtime"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Ora di nascita{" "}
            <span className="font-normal text-slate-400">(opzionale)</span>
          </label>
          <input
            id="member-birthtime"
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors focus:ring-2 focus:outline-none ${
              errors.birthTime
                ? "border-red-300 focus:ring-red-200"
                : "border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
            }`}
          />
          {errors.birthTime && (
            <p className="mt-1 text-sm text-red-500">{errors.birthTime}</p>
          )}
          <p className="mt-1.5 text-xs text-slate-400">
            Con l&apos;ora di nascita possiamo calcolare Luna, Ascendente e
            case.
          </p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canAddMore}
        className="w-full cursor-pointer rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
      >
        {canAddMore ? (
          <>
            ✦ Aggiungi membro ({currentCount}/{maxMembers})
          </>
        ) : (
          <>Limite raggiunto ({maxMembers} membri)</>
        )}
      </button>
    </form>
  );
}
