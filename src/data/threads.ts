import { dummyUsers } from "./users";

export const dummyThreads: ( Thread | QNAThread )[] = [
    {
    id: 1,
	title: "Testtråd",
	category: "THREAD",
	creationDate: "2025-09-01",
	description: "Det här är ett test",
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