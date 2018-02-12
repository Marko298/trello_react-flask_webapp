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
                        boards: [{...board}],
                        
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
                    boards: [{...board}],
                    photo: ""
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


    function splitBoardsToCommand(boards) {
        return boards.reduce(function(memo, board){
    
            var teamId = board.reletedTo.teamId
            var teamTitle = board.reletedTo.teamName
            
            if(memo[teamId]) {
                memo[teamId] = {
                    _id: teamId,
                    title: teamTitle,
                    boards: [...memo[teamId].boards, board]
                }
            }
            
            if(!memo[teamId]) {
                memo[teamId] = {
                    _id: teamId,
                    title: teamTitle,
                    boards: [{...board}]
                }
            }
        
            return memo
        }, {})
    }

    function setMissedFieldsToBoardsFromTeams(boards, teams) {
        return boards.map(board => {
            var board_team_id = board._id
            var copBoard = {...board}
            teams.forEach(team => {
                if(board_team_id === team._id) {
                    copBoard = {
                        ...copBoard,
                        photo: team.photo,
                        website: team.website,
                        descrition: team.descrition
                    }
                }
            })
            return {...copBoard}
        })
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

    function flattObjectToArray(obj) {
        let arr = []
        if (!Object.keys(obj).length) {
            return arr
        }
        for (let key in obj) {
            arr.push(obj[key])
        }
        return arr
    }

    function compose(fn1, fn2) {
        return function(value) {
            return fn2(fn1(value))
        }
    }

    function pipe(...fncs) {
        return (arg) => fncs.reduce((memo, f) => f(memo), arg)
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


    function partial(fn, ...presentedArgs) {
        return function(...latesArgs) {
            return fn(...presentedArgs, ...latesArgs)
        }
    }

    function partialReverse(fn, ...latersArgs) {
        return function(...presentedArgs) {
            return fn(...presentedArgs, ...latersArgs)
        }
    }

    let composition = (data) => ({
        map: (f) => composition(f(data)),
        fold: (f) => f(data),
        chain: (f) => f(data)
    })


    function collectUniq(arr, props) {
        let uniq = []
        arr.forEach(obj => {
            if(uniq.includes(obj[props])) {
                return
            }
            uniq.push(obj[props])
        })
        return [...uniq]
    }

           
    return {
        boardsToArray: function(boards, userId) {
            const reducerBoards = reducerBoardsByUserId(userId)(boards)
            // const importantBoards = setBoardsToImportant(boards)

            // const boardReducer = {...reducerBoards, ...importantBoards}
            const boardReducer = {...reducerBoards}

            const boardsInArray = flattObjectToArray(boardReducer)
            // const boardsInArray = flattObjectToArray(reducerBoards)

            return boardsInArray
        },
        flattToArray,
        setBoardsToImportant,
        compose,
        pipe,
        returnBoardFromTeam,
        returnGroupById,
        flattObjectToArray,
        partial,
        partialReverse,
        collectUniq,
        composition,
        splitBoardsToCommand,
        setMissedFieldsToBoardsFromTeams
    }
})()

export default Utils
