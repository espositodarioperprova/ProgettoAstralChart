"use client";

import { useState, useRef, useEffect } from "react";
import type { FamilyMemberInput, Relationship } from "@/types/astrology";
import { RELATIONSHIPS } from "@/types/astrology";
import { searchCities, type CityData } from "@/lib/geo/italian-cities";

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
  const [birthCity, setBirthCity] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [citySuggestions, setCitySuggestions] = useState<CityData[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleCityInput(value: string) {
    setBirthCity(value);
    setSelectedCity(null);
    if (value.length >= 2) {
      const results = searchCities(value);
      setCitySuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setCitySuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleCitySelect(city: CityData) {
    setBirthCity(`${city.name} (${city.province})`);
    setSelectedCity(city);
    setShowSuggestions(false);
  }

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
      birthCity: selectedCity
        ? `${selectedCity.name} (${selectedCity.province})`
        : birthCity || undefined,
      birthLat: selectedCity?.lat,
      birthLng: selectedCity?.lng,
    };

    onAdd(member);

    // Reset form
    setName("");
    setRelationship("Altro");
    setBirthDate("");
    setBirthTime("");
    setBirthCity("");
    setSelectedCity(null);
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
        <div>
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
        </div>

        {/* Birth city (optional, with autocomplete) */}
        <div className="relative" ref={suggestionsRef}>
          <label
            htmlFor="member-birthcity"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Luogo di nascita{" "}
            <span className="font-normal text-slate-400">(opzionale)</span>
          </label>
          <input
            id="member-birthcity"
            type="text"
            value={birthCity}
            onChange={(e) => handleCityInput(e.target.value)}
            onFocus={() => {
              if (citySuggestions.length > 0) setShowSuggestions(true);
            }}
            placeholder="es. Roma, Milano..."
            autoComplete="off"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
          />
          {selectedCity && (
            <p className="mt-1 text-xs text-emerald-600">
              📍 {selectedCity.name} ({selectedCity.lat.toFixed(2)}°N,{" "}
              {selectedCity.lng.toFixed(2)}°E)
            </p>
          )}

          {/* Autocomplete dropdown */}
          {showSuggestions && (
            <div className="absolute right-0 left-0 z-20 mt-1 max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
              {citySuggestions.map((city) => (
                <button
                  key={`${city.name}-${city.province}`}
                  type="button"
                  onClick={() => handleCitySelect(city)}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-indigo-50"
                >
                  <span className="text-slate-400">📍</span>
                  <span className="font-medium text-slate-900">
                    {city.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({city.province})
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Helper text */}
      <div className="rounded-lg bg-indigo-50/50 p-3">
        <p className="text-xs leading-relaxed text-indigo-600/70">
          💡 <strong>Solo la data è obbligatoria.</strong> Con l&apos;ora e il
          luogo di nascita sblocchi Luna, Ascendente e case — un&apos;analisi
          molto più ricca.
        </p>
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
