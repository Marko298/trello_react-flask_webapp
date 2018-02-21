
class API {
    constructor() {
        // this.url = 'http://localhost:4004'
        this.url = ''
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
    
    get get_users() {
        return `${this.url}/users/get_by_ids`
    }

    get user_update_photo() {
        return `${this.url}/user/update_photo`
    }

    get user_update() {
        return `${this.url}/users/update`
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

    update_board_data(boardId) {
        return `${this.url}/boards/update/${boardId}`
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

    set_image_for_team(teamId) {
        return `${this.url}/team/upload_photo/${teamId}`
    }

    update_team(teamId) {
        return `${this.url}/team/update/${teamId}`
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

    update_list(listId) {
        return `${this.url}/list/update/${listId}`
    }

     /**
    |--------------------------------------------------
    | CARDS ENDPOINTS
    |--------------------------------------------------
    */
    
    create_card(listId) {
        return `${this.url}/card/create_card_for_list/${listId}`
    }
    
    get get_card_schema() {
        return `${this.url}/card/card_schema`
    }
    
    get_cards_by_boardId(boardId) {
        return `${this.url}/card/get_all_cards/${boardId}`
    }
    
    update_card(cardId) {
        return `${this.url}/card/update_card/${cardId}`
    }

    add_attachemnt(cardId) {
        return `${this.url}/card/add_attachment/${cardId}`
    }

    get_attachment(cardId) {
        return `${this.url}/card/get_attachments/${cardId}`
    }

    remove_attachment(cardId) {
        return `${this.url}/card/remove_attachment/${cardId}`
    }

    /**
    |--------------------------------------------------
    | COMMENT ENDPOINTS
    |--------------------------------------------------
    */
    
    create_comment(cardId) {
       return `${this.url}/comment/add_comment/${cardId}`
   }

   get_comments_for_card(cardId) {
       return `${this.url}/comment/get_comments_for_card/${cardId}`
   }

   edit_comment(commentId) {
       return `${this.url}/comment/edit_comment/${commentId}`
   }

   remove_comment(commentId) {
       return `${this.url}/comment/delete_comment/${commentId}`
   }

    /**
    |--------------------------------------------------
    | CHECKLISTS ENDPOINTS
    |--------------------------------------------------
    */

    create_checklist(cardId) {
        return `${this.url}/card/checklist/create/${cardId}`
    }

    remove_checklist(checklistId) {
        return `${this.url}/card/checklist/remove/${checklistId}`
    }

    add_item(checklistId) {
        return `${this.url}/card/checklist/add_item/${checklistId}`
    }

    update_item(checklistId, itemId) {
        return `${this.url}/card/checklist/update_item/${checklistId}/${itemId}`
    }

    update_checklist(checklistId) {
        return `${this.url}/card/checklist/update/${checklistId}`
    }

    




}

const api = new API

export default api