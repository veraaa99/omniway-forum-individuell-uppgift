import type { ForumThread } from "../types/forum";
import { dummyUsers } from "./users";

export const dummyThreads: ForumThread[] = [
	{
		id: 1,
		title: "Testartråden nummer 1",
		category: "THREAD",
		creationDate: "2025-09-01",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis facilis iste aliquam earum itaque rerum veniam eligendi minus dignissimos vitae quidem ex, expedita deserunt obcaecati vero fugit pariatur ipsa est!",
		creator: dummyUsers[0]
	},
	{
		id: 2,
		title: "Testtråd",
		category: "QNA",
		creationDate: "2025-09-01",
		description: "Det här är ett test",
		creator: dummyUsers[1],
		isAnswered: false,
		commentAnswerId: 1
	}
]
