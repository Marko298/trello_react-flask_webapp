
class API {
    constructor() {
        this.url = 'http://localhost:4000'
    }
    // get headers () {
    //     return {
    //         headers: {
    //             "Access-Control-Allow-Headers": "*",
    //             "Content-Type": "application/json"
    //         }, "withCredentials": true
    //     }
    // }

    headers = () => ({
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json"
    })

    /**
    |--------------------------------------------------
    | USER ENDPOINTS
    |--------------------------------------------------
    */
    get register_user () {
        return `${this.url}/users/register`
    }
    get login_user() {
        return `${this.url}/users/login`
    }
    get logout_user() {
        return `${this.url}/users/logout`
    }
    /**
    |--------------------------------------------------
    | BOARDS ENDPOINTS
    |--------------------------------------------------
    */
    create_board(teamId) {
        return `${this.url}/boards/add_board/${teamId}`
    }
    get get_boards() {
        return `${this.url}/boards`
    }
    toggle_important_board(userId, boardId) {
        return `${this.url}/user/${userId}/${boardId}/toggle_board_settings`
    }

}

const api = new API

export default api