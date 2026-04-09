"use client";

import { motion } from "framer-motion";
import type { FamilyMemberInput } from "@/types/astrology";
import { getSunSign, getZodiacSymbol } from "@/lib/astrology";

interface MemberCardProps {
  member: FamilyMemberInput;
  index: number;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function MemberCard({
  member,
  index,
  onRemove,
  onEdit,
}: MemberCardProps) {
  const sunSign = getSunSign(member.birthDate);
  const symbol = getZodiacSymbol(sunSign);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Top row: zodiac symbol + name + relationship */}
      <div className="flex items-start gap-4">
        {/* Zodiac badge */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 text-2xl">
          {symbol}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {member.name}
            </h3>
            <span className="flex-shrink-0 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
              {member.relationship}
            </span>
          </div>

          {/* Sun sign */}
          <p className="mt-1 text-sm font-medium text-indigo-500">
            {symbol} {sunSign}
          </p>

          {/* Birth info */}
          <p className="mt-1 text-sm text-slate-500">
            {formatDate(member.birthDate)}
            {member.birthTime && (
              <span className="text-slate-400"> • ore {member.birthTime}</span>
            )}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit(member.id)}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          title="Modifica"
          aria-label={`Modifica ${member.name}`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button
          onClick={() => onRemove(member.id)}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
          title="Rimuovi"
          aria-label={`Rimuovi ${member.name}`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
