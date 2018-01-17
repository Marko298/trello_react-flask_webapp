var Utils = (function() {

    /**
    |--------------------------------------------------
    | REDUCERS
    |--------------------------------------------------
    */

    var reducerBoardsByUserId = (userId) => (boards) => {

        let initialValue = {}
        
        let result = boards.reduce(function(acum, board) {

            let reletedTo = board["reletedTo"]
            let teamName = reletedTo["teamName"]
            let teamId = reletedTo["teamId"]

            if(teamId === userId) {
                if(!acum["__PRIVATE__"]) {
                    acum["__PRIVATE__"] = {
                        status: "__PRIVATE__",
                        title: teamName,
                        _id: userId,
                        boards: [{...board}]
                    }
                } else {
                    acum["__PRIVATE__"].boards = [ ...acum["__PRIVATE__"].boards, {...board} ]
                }
            }
    
            if(!acum[teamId] && teamId !== userId ) {
                acum[teamId] = {
                    status: "__COMAND__",
                    title: teamName,
                    _id: teamId,
                    boards: [{...board}]
                }
            } else {
                if( teamId !== userId ) {
                    acum[teamId].boards = [ ...acum[teamId].boards, {...board} ]
                }
            }
            return acum

        }, initialValue)

        return result
    }

    var setBoardsToImportant = function(boards) {

        let initialValue = {}

        const result = boards.reduce(function(acum, board) {
            if(!acum["__IMPORTANT__"]) {
                acum["__IMPORTANT__"] = {
                    status: "__IMPORTANT__",
                    title: "__IMPORTANT__",
                    _id: null,
                    boards: board.isImportant ? [{...board}] : []
                }
            }
            if(board.isImportant) {
                acum["__IMPORTANT__"].boards = [ ...acum['__IMPORTANT__'].boards, {...board} ]
            }

            return acum

        }, initialValue)
        return result
    }

    

    /**
    |--------------------------------------------------
    | RECOMPOSE HELPERS
    |--------------------------------------------------
    */

    function flattToArray(array, prop) {
        let box = []

        array.forEach(function(comand){
            let props = comand[prop].map(p => p)

            box.push(...props)
        })
        
        return box
    }

    function flattObjectToArray(boardsObj) {
        let arr = []
        for (let key in boardsObj) {
            arr.push(boardsObj[key])
        }
        return arr
    }

    function compose(fn1, fn2) {
        return function(value) {
            return fn2(fn1(value))
        }
    }

    /**
    |--------------------------------------------------
    | SEARCH HELPERS
    |--------------------------------------------------
    */
    function returnGroupById(boards, teamId) {
        let currentTeam = boards.filter(group => {
            if(group._id === teamId) {
                return group
            }
        })

        return currentTeam

    }
    function returnBoardFromTeam(boardsGroup, teamId, id) {
        let group = returnGroupById(boardsGroup, teamId)

        let findBoard = group[0]['boards'].filter(board => {
            if(board._id == id) {
                return board
            }
        })[0]

        return findBoard
    }

    /**
    |--------------------------------------------------
    | RESULT 
    |--------------------------------------------------
    */

           
    return {
        boardsToArray: function(boards, userId) {
            const reducerBoards = reducerBoardsByUserId(userId)(boards)
            const importantBoards = setBoardsToImportant(boards)

            const boardReducer = {...reducerBoards, ...importantBoards}

            const boardsInArray = flattObjectToArray(boardReducer)
            // const boardsInArray = flattObjectToArray(reducerBoards)

            return boardsInArray
        },
        flattToArray,
        setBoardsToImportant,
        compose,
        returnBoardFromTeam,
        returnGroupById,
        flattObjectToArray
    }
})()

export default Utils
