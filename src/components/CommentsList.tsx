import { useThread } from "../contexts/ThreadContext";
import Comment from "./Comment";

type CommentsListProps = {
  threadId: Thread['id'];
  threadCategory: Thread['category']
}

function CommentsList({ threadId, threadCategory }: CommentsListProps) {
  const { comments } = useThread();

  const threadComments = comments.filter(
    (c) => c.thread === threadId
  );

   if (!threadComments) {
    return <p>Inga kommentarer än.</p>;
  }

  return (
    <div className="container mx-auto px-4 lg: max-w-6xl mt-6">
      <h3 className="text-xl font-bold text-white my-4">Alla kommentar</h3>
      <div>
        {
          threadComments.map((c) => <Comment key={c.id} comment={c} thread={threadCategory}/>)
        }
      </div>
    </div>
  )
}
export default CommentsList