// function curry(fn, arity = fn.length ) {
//     // fn == add, arity == 2
//     (function nextCurried(prevArgs){

//         return function curried(nextArg){
//             var args = [ ...prevArgs, nextArg ];

//             if (args.length >= arity) {
//                 return fn( ...args );
//             }
//             else {
//                 return nextCurried( args );
//             }
//         };

//     })( [] );

// }

// function add(x, y) {
//     return x + y
// }

// [1,2,3,4,5].map( curry( add )( 3 ) );


function compose(fn1, fn2) {
    return function composed(value) {
        return fn2( fn1( value ) )
    }
}

var num = 5

function addFive(num) {
    return num + 5
}

function halve(num) {
    return num / 2
}

var result = compose(addFive, halve)(10)

console.log(result)