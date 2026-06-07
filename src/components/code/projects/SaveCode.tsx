'use client';

import { useEditor } from '@/context/EditorProvider.context';
import axios from 'axios';
import { useState } from 'react';
import { RiSaveLine, RiCheckLine } from 'react-icons/ri';

export default function SaveCodePopup() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [UiError, setUiError] = useState('');
  const { IsSaveCodeIsOpen, ProjectDetiles, setIsSaveCodeIsOpen, CodeValue } =
    useEditor();
  console.log(CodeValue);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.patch('/api/codeproject/savecode', {
        code: CodeValue,
        projectId: ProjectDetiles?._id,
        userid: ProjectDetiles?.CreatedUserid,
      });
      console.log(res);

      setLoading(false);
      setSaved(true);
      setIsSaveCodeIsOpen(false);
    } catch (error) {
      let message = 'Something went wrong';
      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message;
      }
      setUiError(message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => setIsSaveCodeIsOpen(false)}
      />

      {/* Card */}
      <div className="relative w-full max-w-[400px] bg-[#1a1a1a] rounded-[24px] border border-white/[0.06] overflow-hidden">
        {/* Content */}
        <div className="p-6 pb-5">
          {/* Title */}
          <h2 className="text-white font-['inter-semi'] text-lg mb-2">
            Save your code?
          </h2>

          {/* Description */}
          <p className="text-white/50 font-['inter-rag'] text-sm leading-relaxed">
            This will save your current code to the project. You can access it
            later from your dashboard.
          </p>
          <p>
            {UiError && (
              <span className="text-red-500 text-sm mt-2 block">{UiError}</span>
            )}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.08]" />

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 p-4">
          {/* Cancel */}
          <button
            onClick={() => setIsSaveCodeIsOpen(false)}
            className="px-5 py-2.5 rounded-[14px] bg-[#2a2a2a] border border-white/[0.08] text-white/80 text-sm font-['inter-semi'] hover:bg-[#333333] hover:text-white transition-all"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={loading || saved}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#0004ff] text-white text-sm font-['inter-semi'] hover:bg-[#0004ff]/85 active:scale-[0.97] transition-all disabled:opacity-60 min-w-[100px]"
          >
            {loading ? (
              <div className="w-4 h-4 border-[1.5px] border-white/30 border-t-white rounded-full animate-spin" />
            ) : saved ? (
              <>
                <RiCheckLine className="w-4 h-4" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <RiSaveLine className="w-4 h-4" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
