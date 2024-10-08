export let UserType

    ; (function (UserType) {
        UserType[(UserType["Librarian"] = 0)] = "Librarian"
        UserType[(UserType["Student"] = 1)] = "Student"
    })(UserType || (UserType = {}))

export default class FrontEndAPI {
    constructor(path) {
        this.ServerPath = path
    }

    async apiCall(path, params) {
        const response = await fetch(`${this.ServerPath}${path}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": `${this.ServerPath}`,
                "Access-Control-Allow-Headers": `${this.ServerPath}`,
            },
            rejectUnauthorized: false,
            body: JSON.stringify(params, function (key, value) {
                if (value instanceof Map) {
                    return {
                        __type: 'Map',
                        value: Object.fromEntries(value)
                    };
                } else if (this[key] instanceof Date) {
                    return {
                        value: this[key].toUTCString(),
                        __type: 'Date',
                    }
                } else if (typeof this[key] === "bigint") {
                    return {
                        value: this[key].toString(),
                        __type: "BigInt"
                    }
                }

                return value;
            }),
            credentials: "include"
        })

        return response.text().then(it => {
            return JSON.parse(it, (key, value) => {
                if (value != null && typeof value == "object") {
                    if (value.__type === 'Map') {
                        return new Map(Object.entries(value.value));
                    } else if (value.__type === 'Date') {
                        return new Date(value.value)
                    } else if (value.__type === "BigInt") {
                        return BigInt(value.value)
                    }
                }

                return value;
            })
        })
    }

    // Account-related
    async login(userType, email, password) {
        return this.apiCall("/user/login", { email, password, userType })
    }

    //ok
    async logout() {
        return this.apiCall("/user/logout", {})
    }

    async changePassword(oldPassword, newPassword) {
        return this.apiCall("/user/change-password", { oldPassword, newPassword })
    }

    async resetPassword(email) {
        return this.apiCall("/user/reset-password", { email })
    }


    returnBookItem = async (bookItemId, fee) => {
        return this.apiCall("/books/return", { bookItemId, fee })
    }

    //ok
    reserveBook = async (studentId, bookId) => {
        return this.apiCall("/books/reserve", { studentId, bookId })
    }

    //bugged but sorta ok
    cancelReservation = async reservationId => {
        return this.apiCall("/books/cancel-reservation", { reservationId })
    }

    //ok
    lendBook = async (librarianId, studentId, bookItemId) => {
        return this.apiCall("/books/lend", { librarianId, studentId, bookItemId })
    }

    //ok
    createOne = async (type, obj) => {
        return this.apiCall(`/crud/${type}/create-one`, { item: obj })
    }

    //heavily dependant
    deleteOne = async (type, id) => {
        return this.apiCall(`/crud/${type}/delete-one`, { id })
    }

    //dependant
    updateOne = async (type, id, obj) => {
        return this.apiCall(`/crud/${type}/update-one`, { id, item: obj })
    }

    //Author
    //Genre
    //Librarian
    //Student
    getOne = async (type, id) => {
        return this.apiCall(`/crud/${type}/get-one`, { id })
    }

    //Authors
    //BookItems
    //Books
    //Borrowings
    //Fees
    //Languages
    //Librarians
    //Locations
    //Reservations
    //Students
    getMany = async (type, query, range) => {
        return this.apiCall(`/crud/${type}/get-many`, { query, range })
    }

    //ok
    getCurrentUser = async () => {
        return (await this.apiCall(`/user/current-user`, {}))
    }

    //WIP
    downloadReport = async reportId => {
        return this.apiCall(`/reports/download`, { reportId })
    }

    //WIP
    getAllGeneratedReports = async reportId => {
        return this.apiCall(`/reports/get-all-generated`, { reportId })
    }

    //WIP
    requestReportGeneration = async reportId => {
        return this.apiCall(`/reports/request-creation`, { reportId })
    }



    //wywo�uje si� tak: api.getMostPopularGenres([new Date(1997, 10, 3), new Date(2030, 10, 3)], 1)
    async getMostPopularGenres(dateRange, classId) {
        return this.apiCall("/reports/get-most-popular-genres", { dateRange, classId })
    }

    async getMostReadingStudent(dateRange, classId) {
        return this.apiCall("/reports/get-most-reading-student", { dateRange, classId })
    }

}
