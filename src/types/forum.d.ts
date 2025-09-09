type ThreadCategory = "NoCategory" | "QNA" | "Diskussion" | "Meddelande" | "Hitta gruppmedlem";

type ThreadCategoryType = Thread | QNAThread

type User = {
	id: number;
	userName: string;
	password: string;
	isModerator: boolean;
}

type Thread = {
	id: number;
	title: string;
	category: ThreadCategory;
	creationDate: string;
	description: string;
	creator: User;
	commentsLocked?: boolean;
}

type QNAThread = Thread & { //Type extension
	category: "QNA";
	isAnswered: boolean;
	commentAnswerId?: number;
}

type ForumComment = {
	id: number;
	thread: number;
	content: string;
	creator: User;
}

// Användare kan endast editera sina egna trådar - OK

// Avändare kan vara moderatorer i vilket fall dem ska kunna hantera all data

// Kommentarer på QNA trådar ska kunna markeras som svar endast av skaparen