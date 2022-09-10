

// wrap code with variable
const input = document.querySelector(".input");
const result = document.querySelector('.result')
const deleteBtn = document.querySelector('.delete');
const keys = document.querySelectorAll('.keypad button');
const clearBtn = document.querySelector('.clear');
const ceBtn = document.querySelector(".ce")
const operators = ['+',"-","x","÷"]

// Global variables to hold my data
let operation ="";
let answer;
let decimalAdded = false;

const  handleKeyPress=(e) =>{
    const key = e.target.dataset.key
    // console.log(key);

    // variable to pick last character for calculation
    const lastChar = operation[operation.length - 1]
    

    if (key === "="){
        return;
    }
    if(key ==="." && decimalAdded){
        return;
    }
    // check if the select key value exist in the operators array
    if(operators.indexOf(lastChar) !==-1){
        decimalAdded = false
    } 
    // check for negative value first 
    if(operation.length === "0" && operators.indexOf(key) !==-1){
        input.innerHTML = operation;
        return;
    }
    // check if the operators exists as a last character in the operation String, keeypad input exist within operator array
    if(operators.indexOf(lastChar) !== -1 && operators.indexOf(key) !==-1){
        operation = operation.replace(/./, key);
        input.innerHTML = operation;
        return;
    }
    // check if the keypad is equal to period and add to operartion string
    if(key){
        if(key === ".") decimalAdded = true;
        operation +=key;
        input.innerHTML = operation;
        return;
    }
}
const evaluate = (e) =>{
    const key = e.target.dataset.key;
    const lastChar = operation[operation.length -1];
    // check if keypad is equal-to and last charater is equal to items in operators array 
    if(key === "=" && operators.indexOf(lastChar) !== -1){
        operation  = operation.slice(0,-1);  
    }
//    return nothing when there is no input or equal = 0  
    if(operation.length === "0"){
        answer = "";
        result.innerHTML = answer;
        return;

    }
    // start from second character, if the first char is equal 0 and second char does not equal to period
    try {
        if(operation[0]=== "0" && operation[1] !== "." && operation.length >1){
            operation = operation.slice(1);
        }
        const final = operation.replace(/x/, "*").replace(/÷/, "/" );
        answer = +(eval(final)).toFixed(5);

        if(key === "="){
            decimalAdded = false;
            operation = `${answer}`;
            answer = '';
            input.innerHTML = operation;
            result.innerHTML = answer;
            return;
        }
        
       
        result.innerHTML = answer;
    } catch (error) {
        if(key == "="){
            decimalAdded = false;
            input.innerHTML = `<button class="error" > ${operation} <button>`;
            result.innerHTML = `<button class="error" > Bad Expression <button>`;
        }
        console.log(error)
    }
}
const clearInput =() =>{
    operation = 0;
    answer = 0;
    result.innerHTML = answer
    input.innerHTML = operation;
}
clearBtn.addEventListener('click',clearInput)
ceBtn.addEventListener("click", clearInput)


function deleteInput(){
    operation = operation.slice(0,-1);
    input.innerHTML = operation;
}

// retrieve data from numbers data are click
deleteBtn.addEventListener("click", deleteInput);
keys.forEach(key =>{
    key.addEventListener('click', handleKeyPress);
    key.addEventListener('click', evaluate);   
}
)

