'use client';

import { useProjectTrackingContext } from '@/context/ProjectTracking.context';
import { TaskState, TaskT } from '@/types/project tracking/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  FiX,
  FiCheckCircle,
  FiCalendar,
  FiAlignLeft,
} from 'react-icons/fi';
import { getAvatarColor, getInitials } from './utils';

const columnLabels: Record<string, string> = {
  'not started': 'TO DO',
  'in progress': 'IN PROGRESS',
  hold: 'HOLD',
  completed: 'DONE',
};

const columnColors: Record<string, string> = {
  'not started': 'bg-[#0a0a0a]/5 text-[#0a0a0a]/50',
  'in progress': 'bg-[#0004ff]/5 text-[#0004ff]',
  hold: 'bg-amber-50 text-amber-600',
  completed: 'bg-emerald-50 text-emerald-600',
};

const STATES: TaskState[] = [
  'not started',
  'in progress',
  'hold',
  'completed',
];

type ErrorState = Record<string, string>;

export default function CreateNewTaskForm() {
  const {
    isTaskModalOpen,
    taskModalMode,
    editingTask,
    taskModalColumn,
    currentProject,
    closeTaskModal,
    addTask,
    updateTask,
  } = useProjectTrackingContext();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [state, setState] = useState<TaskState>('not started');
  const [assignToMemberId, setAssignToMemberId] = useState<string>('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<ErrorState>({});
  const [isLoading, setIsLoading] = useState(false);

  const members = currentProject?.memberDetails ?? [];
  const isEdit = taskModalMode === 'edit';

  useEffect(() => {
    if (!isTaskModalOpen) return;

    if (isEdit && editingTask) {
      setTitle(editingTask.title);
      setSummary(editingTask.summary);
      setState(editingTask.state);
      setAssignToMemberId(editingTask.assignToMemberId ?? '');
      setDueDate(
        editingTask.dueDate
          ? new Date(editingTask.dueDate).toISOString().split('T')[0]
          : ''
      );
    } else {
      setTitle('');
      setSummary('');
      setState(taskModalColumn);
      setAssignToMemberId('');
      setDueDate('');
    }
    setErrors({});
  }, [isTaskModalOpen, isEdit, editingTask, taskModalColumn]);

  if (!isTaskModalOpen || !currentProject) return null;

  const resetForm = () => {
    setTitle('');
    setSummary('');
    setState('not started');
    setAssignToMemberId('');
    setDueDate('');
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    closeTaskModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: ErrorState = {};

    if (!title.trim()) newErrors.title = 'Task title is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      if (isEdit && editingTask) {
        const res = await axios.patch('/api/projecttracking/update-task', {
          taskId: editingTask._id,
          projectId: currentProject._id,
          title: title.trim(),
          summary: summary.trim(),
          state,
          assignToMemberId: assignToMemberId || null,
          dueDate: dueDate || null,
        });

        if (!res.data.task) {
          throw new Error('No task returned from API');
        }

        updateTask(res.data.task as TaskT);
        resetForm();
      } else {
        const res = await axios.post('/api/projecttracking/create-task', {
          projectId: currentProject._id,
          title: title.trim(),
          summary: summary.trim(),
          state,
          assignToMemberId: assignToMemberId || undefined,
          dueDate: dueDate || undefined,
        });

        if (!res.data.task) {
          throw new Error('No task returned from API');
        }

        addTask(res.data.task as TaskT);
        resetForm();
      }
    } catch (error) {
      console.error('TASK_FORM_ERROR:', error);
      setErrors({
        form: isEdit
          ? 'Unable to update task. Please try again.'
          : 'Unable to create task. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0a0a0a]/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg bg-white rounded-2xl border border-[#0a0a0a]/5 shadow-2xl shadow-[#0a0a0a]/5 overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0a0a0a]/5">
          <div>
            <h2 className="font-['inter-bold'] text-lg text-[#0a0a0a]">
              {isEdit ? 'Edit Task' : 'Add Task'}
            </h2>
            <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 mt-0.5">
              {isEdit
                ? 'Update task details'
                : 'Create a new task for this project'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-[#f9fafb] flex items-center justify-center text-[#0a0a0a]/30 hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-all"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title)
                  setErrors((prev) => ({ ...prev, title: '' }));
              }}
              placeholder="Enter task title..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1.5 font-['inter-rag']">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Summary
            </label>
            <div className="relative">
              <FiAlignLeft
                size={14}
                className="absolute left-3 top-3 text-[#0a0a0a]/20"
              />
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Describe the task..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-rag'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/20 focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all resize-none"
              />
            </div>
          </div>

          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Status
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {STATES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setState(s)}
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-['inter-semi'] border transition-all ${
                    state === s
                      ? columnColors[s]
                      : 'bg-[#0a0a0a]/5 text-[#0a0a0a]/30 border-[#0a0a0a]/5'
                  }`}
                >
                  {columnLabels[s]}
                </button>
              ))}
            </div>
          </div>

          {members.length > 0 && (
            <div>
              <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
                Assign To
              </label>
              <div className="grid grid-cols-2 gap-2">
                {members.map((member) => {
                  const isSelected = assignToMemberId === member.id;
                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() =>
                        setAssignToMemberId(
                          isSelected ? '' : member.id
                        )
                      }
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-left ${
                        isSelected
                          ? 'bg-[#0004ff]/5 border-[#0004ff]/30'
                          : 'bg-[#f9fafb] border-[#0a0a0a]/5 hover:border-[#0004ff]/20 hover:bg-white'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-['inter-semi'] ${getAvatarColor(member.name)}`}
                      >
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          getInitials(member.name)
                        )}
                      </div>
                      <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/60 truncate">
                        {member.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <label className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
              Due Date
            </label>
            <div className="relative">
              <FiCalendar
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/20"
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 text-sm font-['inter-rag'] text-[#0a0a0a] focus:outline-none focus:border-[#0004FF]/50 focus:bg-white transition-all"
              />
            </div>
          </div>

          {errors.form && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100">
              <p className="text-xs text-red-500 font-['inter-rag']">
                {errors.form}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#0a0a0a]/5">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl text-sm font-['inter-semi'] text-[#0a0a0a]/50 hover:text-[#0a0a0a] hover:bg-[#f9fafb] transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-[#0004FF] text-white text-sm font-['inter-semi'] hover:bg-[#0004FF]/90 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <FiCheckCircle size={14} />
            {isLoading
              ? isEdit
                ? 'Saving...'
                : 'Creating...'
              : isEdit
                ? 'Save Changes'
                : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}
