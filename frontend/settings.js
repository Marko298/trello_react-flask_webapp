
class API {
    constructor() {
        this.url = 'http://localhost:4000'
    }
    
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

    delete_board(boardId) {
        return `${this.url}/boards/remove_board/${boardId}`
    }

    /**
    |--------------------------------------------------
    | TEAMS ENDPOINTS
    |--------------------------------------------------
    */
    get create_team() {
        return `${this.url}/team/create_team`
    }

    get get_teams() {
        return `${this.url}/teams`
    }

     /**
    |--------------------------------------------------
    | LISTS ENDPOINTS
    |--------------------------------------------------
    */

    create_list(boardId){
        return `${this.url}/list/create_list_for_board/${boardId}`
    }

    get_lists_for_board(boardId) {
        return `${this.url}/list/get_releted_lists/${boardId}`
    }

    get get_list_schema() {
        return `${this.url}/list/list_schema`
    }

}

const api = new API

export default api