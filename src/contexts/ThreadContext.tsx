import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import LocalStorageService from "../utils/LocalStorageService";
import { dummyThreads } from "../data/threads";
import { dummyComments } from "../data/comments";

type ThreadState = {
  threads: Thread[] | QNAThread[];
  comments: ForumComment[];
  actions: {
    createThread: (thread: Thread) => void;
    getThreadByID: (threadId: Thread['id']) => Thread | undefined;
    addComment: (comment: ForumComment) => void;
    isQNAAnswered: (threadId: Thread['id']) => boolean;
    toggleCommentsLock: (threadId: Thread['id']) => void;
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
    toggleCommentsLock: () => { }
  }
};

const ThreadContext = createContext<ThreadState>(defaultState);

function ThreadProvider({ children }: PropsWithChildren) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [comments, setComments] = useState<ForumComment[]>([]);

  useEffect(() => {
    _getThreads();
    getComments();
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
    LocalStorageService.setItem<ForumComment[]>('@forum/comments', newComments)

    setComments(newComments)
  }

  const getComments = () => {
    const _comments: ForumComment[] = LocalStorageService.getItem('@forum/comments', dummyComments)
    setComments(_comments)
  }

  const isQNAAnswered: typeof defaultState.actions.isQNAAnswered = (threadId: number): boolean => {
    const thread = threads.find(t => t.id === threadId)

    if (thread && thread.category === "QNA") {
      const qnaThread = thread as QNAThread;
      return qnaThread.isAnswered;
    }

    return false;
  }

  const toggleCommentsLock: typeof defaultState.actions.toggleCommentsLock = (threadId: number): void => {
    const updatedThreads = threads.map((thread) =>
      thread.id === threadId
        ? { ...thread, commentsLocked: !thread.commentsLocked }
        : thread
    );

    setThreads(updatedThreads);
    LocalStorageService.setItem('@forum/threads', updatedThreads);
  }

  const actions: typeof defaultState.actions = {
    createThread,
    getThreadByID,
    addComment,
    isQNAAnswered,
    toggleCommentsLock
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