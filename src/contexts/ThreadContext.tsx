import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import LocalStorageService from "../utils/LocalStorageService";
import { dummyThreads } from "../data/threads";
import type { QNAThread, Thread } from "../types/forum";

type ThreadState = {
  threads: Thread[] | QNAThread[];
  comments: Comment[];
  actions: {
    createThread: (thread: Thread) => void;
    getThreadByID: (threadId: Thread['id']) => Thread | undefined;
    addComment: (comment: Comment) => void;
    isQNAAnswered: (threadId: Thread['id']) => boolean;
  }
};

const defaultState: ThreadState = {
  threads: [],
  comments: [],
  actions: {
    createThread: () => { },
    getThreadByID: () => undefined,
    addComment: () => { },
    isQNAAnswered: () => false,
  }
};

const ThreadContext = createContext<ThreadState>(defaultState);

function ThreadProvider({ children }: PropsWithChildren) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    _getThreads();
  }, [])

  const _getThreads = () => {
    const _threads: Thread[] | QNAThread[] = LocalStorageService.getItem('@forum/threads', dummyThreads);
    setThreads(_threads)
  }

  const createThread: typeof defaultState.actions.createThread = (thread) => {
    const newThreads = [...threads, thread]
    setThreads(newThreads)
    LocalStorageService.setItem<Thread[]>('@forum/threads', newThreads)
  }
  const getThreadByID: typeof defaultState.actions.getThreadByID = (threadId: number): Thread | undefined => {
    return threads.find(thread => thread.id === threadId)
  }
  const addComment: typeof defaultState.actions.addComment = (comment): void => {
    const newComments = [...comments, comment]
    setComments(newComments)
    LocalStorageService.setItem<Comment[]>('@forum/comments', newComments)
  }
  const isQNAAnswered: typeof defaultState.actions.isQNAAnswered = (threadId: number): boolean => {
    const thread = threads.find(t => t.id === threadId)

    if (thread && thread.category === "QNA") {
      const qnaThread = thread as QNAThread
      return qnaThread.isAnswered
    }

    return false;
  }

  const actions: typeof defaultState.actions = {
    createThread,
    getThreadByID,
    addComment,
    isQNAAnswered
  }

  return (
    <ThreadContext.Provider value={{
      threads,
      comments,
      actions
    }}>
      {children}
    </ThreadContext.Provider>
  )
}
function useThread() {
  const context = useContext(ThreadContext);
  return context;
}
export {
  ThreadProvider,
  useThread
}