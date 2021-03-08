
const Directions = {
    n: 0, e: 1, s: 2, w: 3
}

const degQuadrantMapping = [0, 90, 180, 270]
const radQuadrantMapping = [0, Math.PI / 2, Math.PI, Math.PI * 1.5]

const orders = {
    en: {
        key: "e",
        quadrant: 0
    },
    es: {
        key: "s",
        quadrant: 1
    },
    sw: {
        key: "w",
        quadrant: 2
    },
    nw: {
        key: "n",
        quadrant: 3
    }
}

/**
 * @typedef {Object} result
 * @property {number} value - The returned value
 * @property {string} error - Error message null if not errored
 */

/**
 * Gives back Degrees from the specified String
 * @param {string} input 
 * @returns {result}
 */
function GetDegFromString(input){
    
    const total = input.length;

    if(total == 0){
        return {value: 0, error: "Empty Input Provided"};
    }
    
    const inputDirections = {};

    for(let dir of input){
        if(!(dir in Directions)){
            return {value: null, error: `Input Direction of ${dir} is not valid`};
        }
        inputDirections[dir] = inputDirections[dir] + 1 || 1;
    }

    const keys = Object.keys(inputDirections);
    
    if(keys.length == 1){
        return {value: degQuadrantMapping[Directions[keys[0]]], error: null};
    }

    if(keys.length > 2){
        return {value: null, error: `Too many Directions Provided. Only two are allowed`};
    }
    
    const percentages = {};
    for(let dir in inputDirections){
        percentages[dir] = inputDirections[dir] / total;
    }
    
    const order = orders[keys.sort().join("")];
    
    if(!order){
        return {value: null, error: "Something went wrong. Order cannot be found"};
    }
    
    const {key, quadrant} = order;
    
    return {value: degQuadrantMapping[quadrant] + (percentages[key] * 90), error: null};
}

/**
 * Gives back Radians offset by (-PI / 2) from the specified String
 * @param {string} input 
 * @returns {result}
 */
function GetRadFromString(input){
    const total = input.length;

    if(total == 0){
        return {value: 0, error: "Empty Input Provided"};
    }

    const inputDirections = {};

    for(let dir of input){
        if(!(dir in Directions)){
            return {value: null, error: `Input Direction of ${dir} is not valid`};
        }
        inputDirections[dir] = inputDirections[dir] + 1 || 1;
    }
    
    const keys = Object.keys(inputDirections);
    
    if(keys.length == 1){
        return {value: radQuadrantMapping[Directions[keys[0]]], error: null};
    }

    if(keys.length > 2){
        return {value: null, error: `Too many Directions Provided. Only two are allowed`};
    }
    
    const percentages = {};
    for(let dir in inputDirections){
        percentages[dir] = inputDirections[dir] / total;
    }
    
    const order = orders[keys.sort().join("")];
    
    if(!order){
        return {value: null, error: "Something went wrong. Order cannot be found"};
    }
    
    const {key, quadrant} = order;
    
    return {value: radQuadrantMapping[quadrant] + (percentages[key] * (Math.PI / 2)), error: null};
}