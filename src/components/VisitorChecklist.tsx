import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Trophy, Sparkles, RefreshCw } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  category: 'Spotted' | 'Experience' | 'Photo';
  completed: boolean;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: 'item-1', label: 'Watch an Emirates or Singapore Airbus A380 roar overhead', category: 'Spotted', completed: false },
  { id: 'item-2', label: 'Take a 0.5x ultra-wide photo of a plane filling the whole sky', category: 'Photo', completed: false },
  { id: 'item-3', label: 'Feel the warm jet wash breeze 5 seconds after a widebody crosses', category: 'Experience', completed: false },
  { id: 'item-4', label: 'Spot a British Airways A350-1000 with curved winglets', category: 'Spotted', completed: false },
  { id: 'item-5', label: 'Stand by the famous corner fence bordering the airport perimeter', category: 'Experience', completed: false },
  { id: 'item-6', label: 'Experience the famous 3:00 PM Heathrow runway switch', category: 'Experience', completed: false },
  { id: 'item-7', label: 'Capture a slow-motion video of main landing gear wheels', category: 'Photo', completed: false },
  { id: 'item-8', label: 'Spot a Virgin Atlantic aircraft with scarlet red tailfin', category: 'Spotted', completed: false },
];

export const VisitorChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('myrtle_visitor_checklist');
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return DEFAULT_ITEMS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('myrtle_visitor_checklist', JSON.stringify(items));
    } catch {
      // Ignored
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const resetItems = () => {
    setItems(DEFAULT_ITEMS);
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Myrtle Avenue Visitor Bucket List</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1">
            Track Your Visit Checklist
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Tap each experience as you check it off during your day at London Heathrow.
          </p>
        </div>

        {/* Progress Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4 shrink-0">
          <div className="text-right">
            <div className="text-2xl font-bold font-mono text-amber-400">
              {completedCount} / {items.length}
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {progressPercent}% Complete
            </div>
          </div>
          <button
            onClick={resetItems}
            className="p-2 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset checklist"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
              item.completed
                ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 text-slate-400 transition-colors shrink-0"
            >
              {item.completed ? (
                <CheckSquare className="w-5 h-5 text-emerald-400" />
              ) : (
                <Square className="w-5 h-5 text-slate-600 hover:text-slate-400" />
              )}
            </button>

            <div className="flex-1">
              <span
                className={`text-xs sm:text-sm font-medium leading-relaxed block ${
                  item.completed ? 'line-through text-slate-400' : 'text-slate-100'
                }`}
              >
                {item.label}
              </span>
              <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                Category: {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
