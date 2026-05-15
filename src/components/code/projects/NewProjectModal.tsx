"use client";

import { useState } from "react";

interface NewProjectModalProps {
  onClose: () => void;
  onCreate: (project: {
    name: string;
    language: string;
    description: string;
  }) => void;
}

const languages = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
  "Ruby",
];

export default function NewProjectModal({ onClose, onCreate }: NewProjectModalProps) {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("TypeScript");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Project name required";
    if (!description.trim()) newErrors.description = "Description required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCreate({ name: name.trim(), language, description: description.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5">
          <h2 className="font-['inter-bold'] text-xl text-white">Create New Project</h2>
          <p className="font-['inter-rag'] text-xs text-white/30 mt-1">
            Set up your new coding project
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block font-['inter-semi'] text-xs text-white/60 mb-2 uppercase tracking-wider">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="e.g. E-Commerce API"
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#0004ff] transition-all font-['inter-rag']"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1.5 font-['inter-rag']">{errors.name}</p>
            )}
          </div>

          {/* Language */}
          <div>
            <label className="block font-['inter-semi'] text-xs text-white/60 mb-2 uppercase tracking-wider">
              Language
            </label>
            <div className="grid grid-cols-4 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-2 rounded-lg text-[10px] font-['inter-semi'] transition-all ${
                    language === lang
                      ? "bg-[#0004ff] text-white"
                      : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-['inter-semi'] text-xs text-white/60 mb-2 uppercase tracking-wider">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: "" }));
              }}
              placeholder="What does this project do?"
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#0004ff] transition-all font-['inter-rag'] resize-none"
            />
            {errors.description && (
              <p className="text-xs text-red-400 mt-1.5 font-['inter-rag']">{errors.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-sm font-['inter-semi'] text-white/60 hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#0004ff] text-sm font-['inter-semi'] text-white hover:bg-[#0004ff]/90 transition-all"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}