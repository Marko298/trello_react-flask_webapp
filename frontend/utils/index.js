var Utils = (function() {
    function reduceBoards(boards) {
        let boardsObj = boards.reduce(function(accumulator, board) {
            let prop = board['reletedTo']
            if(!accumulator[prop]) {
                accumulator[prop] = {
                    teamName: prop,
                    boards: [{...board}]
                }
            } else {
                accumulator[prop] = {
                    teamName: prop,
                    boards: [...accumulator[prop].boards, {...board}]
                }
            }
            return accumulator
         
        }, {})
    
        return boardsObj
    }
    
    function boardsToArray(boardsObj) {
        let arr = []
        for (let key in boardsObj) {
            arr.push(boardsObj[key])
        }
        return arr
    }

    return {
        boardsToArray: function(boards) {
            return boardsToArray(reduceBoards(boards))
        }
    }
})()

export default Utils