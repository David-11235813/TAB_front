export let UserType

;(function(UserType) {
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
      body: JSON.stringify(params, function(key, value) {
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

  reserveBook = async (studentId, bookId) => {
    return this.apiCall("/books/reserve", { studentId, bookId })
  }

  cancelReservation = async reservationId => {
    return this.apiCall("/books/cancel-reservation", { reservationId })
  }

  lendBook = async (librarianId, studentId, bookItemId) => {
    return this.apiCall("/books/lend", { librarianId, studentId, bookItemId })
  }

  createOne = async (type, obj) => {
    return this.apiCall(`/crud/${type}/create-one`, { item: obj })
  }

  deleteOne = async (type, id) => {
    return this.apiCall(`/crud/${type}/delete-one`, { id })
  }

  updateOne = async (type, id, obj) => {
    return this.apiCall(`/crud/${type}/update-one`, { id, item: obj })
  }

  getOne = async (type, id) => {
    return this.apiCall(`/crud/${type}/get-one`, { id })
  }

  getMany = async (type, query, range) => {
    return this.apiCall(`/crud/${type}/get-many`, { query, range })
  }

  getCurrentUser = async () => {
    return (await this.apiCall(`/user/current-user`, {})).data
  }

  downloadReport = async reportId => {
    return this.apiCall(`/reports/download`, { reportId })
  }

  getAllGeneratedReports = async reportId => {
    return this.apiCall(`/reports/get-all-generated`, { reportId })
  }

  requestReportGeneration = async reportId => {
    return this.apiCall(`/reports/request-creation`, { reportId })
  }
}
