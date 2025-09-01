import { createContext, useContext, useState, type PropsWithChildren } from "react"

type UserState = {
    users: User[]
    actions: {
        createUser: (user: User) => void
    }
}

const defaultState: UserState = {
    users: [],
    actions: {
        createUser: () => {}
    }
}

const UserContext = createContext<UserState>(defaultState)

function UserProvider ({ children }: PropsWithChildren) {
    const [users, setUsers] = useState<User[]>([])

    const createUser: typeof defaultState.actions.createUser = (user) => {
        console.log("User: ", user)
    }

    const actions = {
        createUser
    }

    return (
        <UserContext.Provider value={{
            users,
            actions
        }}>
            { children }
        </UserContext.Provider>
    )

}

function useUser() {
    const context = useContext(UserContext)
    if(context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

export { UserProvider, useUser }