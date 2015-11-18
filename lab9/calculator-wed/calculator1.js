"use strict"
window.onload = function () {
    var stack = [];
    var displayVal = "0";
    var dec_flag = 0;
    var fac_flag = 0;
    var first_flag = 0;
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            if(first_flag == 0){first_flag = 1; document.getElementById('expression').innerHTML = "0";}
            var value = this.innerHTML;
            if(0<=value && value<=9){
                dec_flag = 0;
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
                first_flag = 0;
                document.getElementById('expression').innerHTML = "0";
                document.getElementById('result').innerHTML = "0"; 
            }
            else if(value=="."){
                if(!dec_flag){
                    dec_flag=1;
                    displayVal = displayVal + value;
                }           
            }
            else{ //operand
                if(fac_flag == 1 && value == "!") return;
                if(fac_flag == 0){
                    if(document.getElementById('expression').innerHTML == "0") document.getElementById('expression').innerHTML = displayVal;
                    else document.getElementById('expression').innerHTML += displayVal;}
                   document.getElementById('expression').innerHTML += value;
                


                if(stack[stack.length-1]=="*" || stack[stack.length-1]=="/" || stack[stack.length-1]=="^"){
                    highPriorityCalculator(stack,displayVal);
                }
                else{
                    if(value == "!") {
                        if(fac_flag == 1) return;
                        displayVal = factorial(parseFloat(displayVal));
                        stack.push(displayVal);
                        fac_flag = 1;
                    }
                    else{
                        stack.push(parseFloat(displayVal));
                        displayVal = 0;
                        fac_flag = 0;
                    } 
                }
                stack.push(value);
                displayVal = 0;
                document.getElementById('result').innerHTML = displayVal;
                if(value=="="){
                    displayVal = calculator(stack);
                    document.getElementById('result').innerHTML = displayVal;
                    stack = [];
                    displayVal = 0;
                    first_flag = 0;
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
    var result = s[0], i;
    for(i=0;i<s.length;i++){
        if(s[i] == "+") result += s[i+1];
        else if(s[i] == "-") result -= s[i+1];
    }
    return result;
}
