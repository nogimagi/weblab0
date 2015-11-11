"use strict"
window.onload = function () {
    var stack = [];
    var displayVal = "0";
    var dec_flag = 0;
    var fac_flag = 0;
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
            if(0<=value && value<=9){
                if(fac_flag == 1) return;
                if(displayVal != "0"){
                    displayVal = displayVal + value;
                    document.getElementById('result').innerHTML = displayVal;
                }
                else{
                    displayVal = value;
                    document.getElementById('result').innerHTML = displayVal;
                }
            }
            else if(value == "AC"){
                dec_flag=0;
                fac_flag=0;
                displayVal = "0";
                stack = [];
                document.getElementById('expression').innerHTML = "0";
                document.getElementById('result').innerHTML = "0"; 
            }
            else if(value=="."){
                if(fac_flag == 1) return;
                if(!dec_flag){
                    dec_flag=1;
                    displayVal = displayVal + value;
                    document.getElementById('expression').innerHTML +=value;
                }           
            }
            else{ //operand
                if(value == "!"){
                    if(fac_flag == 1) return;
                    if(document.getElementById('expression').innerHTML == "0") document.getElementById('expression').innerHTML= "";
                     document.getElementById('expression').innerHTML += displayVal;
                     document.getElementById('expression').innerHTML += value;
                     displayVal = factorial(displayVal);
                    fac_flag = 1;
                    return;
                }

                if(document.getElementById('expression').innerHTML == "0") document.getElementById('expression').innerHTML= "";
                document.getElementById('expression').innerHTML += displayVal;
                document.getElementById('expression').innerHTML += value;
                
                if(stack[stack.length -1] == "*" || stack[stack.length -1] =="/" || stack[stack.length -1] == "^"){
                    highPriorityCalculator(stack,displayVal);
                }
                else{ 
                    stack.push(parseFloat(displayVal));
                }
                fac_flag = 0;
                stack.push(value);
                displayVal = 0;
                document.getElementById('result').innerHTML = displayVal;
                if(value == "="){
                    stack.pop();
                    stack.push(parseFloat(displayVal));
                    displayVal = calculator(stack);
                    document.getElementById('result').innerHTML = displayVal;
                    stack = [];
                    return;

                }
            }
        };
    }
};
function factorial (x) {
    if(x <= 1) return 1;
    return x * factorial(x-1);
}
function highPriorityCalculator(s, val) {

    var operator = s.pop();
    var operand = s.pop();
    if(operator == "*"){
        s.push(val * operand);
    }
    else if(operator =="/"){
        s.push(operand / val);
    }
    else if(operator =="^"){
        s.push(Math.pow(operand,val));
    }

}
function calculator(s) {
    var operand1, operand2;
    var operator;
    while(s.length != 1){
        operand1 = s.pop();
        operator = s.pop();
        operand2 = s.pop();
        if(operator == "+"){
            s.push(operand1 + operand2);
        }
        else{
            s.push(operand2 - operand1);
        }
    }
    return s.pop();
}
