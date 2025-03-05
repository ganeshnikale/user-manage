export interface User {
    name: string,
    job: string,
}

export interface UserState {
    allUsers: {
        usersList: UsetsList,
        status: "loading" | "fulfilled" | "rejected",
        error: null | string
    },
    createdUser: {
        userData: UserCreateResponse,
        status: "loading" | "fulfilled" | "rejected",
        error: null | string
    }

}


export interface UserCreateResponse {
    name: string,
    job: string,
    id: string,
    createdAt: string
}




export interface UsetsList {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: userData[]
}

export interface userData {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}