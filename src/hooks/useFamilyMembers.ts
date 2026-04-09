"use client";

import { useCallback, useState } from "react";
import type { FamilyMemberInput } from "@/types/astrology";
import { MAX_MEMBERS_FREE } from "@/types/astrology";

/**
 * Hook to manage the list of family members.
 * Handles add, edit, remove, and validation.
 */
export function useFamilyMembers() {
  const [members, setMembers] = useState<FamilyMemberInput[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const maxMembers = MAX_MEMBERS_FREE; // TODO: check user tier for premium limit

  const canAddMore = members.length < maxMembers;

  const addMember = useCallback(
    (member: FamilyMemberInput) => {
      if (!canAddMore) return;
      setMembers((prev) => [...prev, member]);
    },
    [canAddMore],
  );

  const updateMember = useCallback(
    (id: string, updates: Partial<FamilyMemberInput>) => {
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updates } : m)),
      );
    },
    [],
  );

  const removeMember = useCallback((id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setEditingId((prev) => (prev === id ? null : prev));
  }, []);

  const clearAll = useCallback(() => {
    setMembers([]);
    setEditingId(null);
  }, []);

  const startEditing = useCallback((id: string) => {
    setEditingId(id);
  }, []);

  const stopEditing = useCallback(() => {
    setEditingId(null);
  }, []);

  return {
    members,
    editingId,
    maxMembers,
    canAddMore,
    addMember,
    updateMember,
    removeMember,
    clearAll,
    startEditing,
    stopEditing,
  };
}
