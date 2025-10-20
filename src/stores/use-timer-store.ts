import { create } from 'zustand';
import { MOCK_PROJECTS } from '@shared/mock-data';
interface TimerState {
  isRunning: boolean;
  elapsedSeconds: number;
  projectId: string | null;
  intervalId: NodeJS.Timeout | null;
}
interface TimerActions {
  start: () => void;
  pause: () => void;
  reset: () => void;
  setProjectId: (id: string | null) => void;
}
const useTimerStore = create<TimerState & TimerActions>((set, get) => ({
  isRunning: false,
  elapsedSeconds: 0,
  projectId: MOCK_PROJECTS[0]?.id || null,
  intervalId: null,
  start: () => {
    if (get().isRunning) return;
    const intervalId = setInterval(() => {
      set((state) => ({ elapsedSeconds: state.elapsedSeconds + 1 }));
    }, 1000);
    set({ isRunning: true, intervalId });
  },
  pause: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({ isRunning: false, intervalId: null });
  },
  reset: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({ isRunning: false, elapsedSeconds: 0, intervalId: null });
  },
  setProjectId: (id: string | null) => {
    set({ projectId: id });
  },
}));
export default useTimerStore;