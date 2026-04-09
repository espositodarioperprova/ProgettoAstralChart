"use client";

import { AnimatePresence } from "framer-motion";
import type { FamilyMemberInput } from "@/types/astrology";
import { MemberCard } from "./MemberCard";

interface MembersListProps {
  members: FamilyMemberInput[];
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

export function MembersList({ members, onRemove, onEdit }: MembersListProps) {
  if (members.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-200 px-6 py-12 text-center">
        <div className="mx-auto mb-4 text-4xl">👨‍👩‍👧‍👦</div>
        <h3 className="text-base font-semibold text-slate-600">
          Nessun membro aggiunto
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Usa il form qui sopra per aggiungere i membri della tua famiglia.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {members.map((member, i) => (
          <MemberCard
            key={member.id}
            member={member}
            index={i}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
