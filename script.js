"use strict";
// ZMIANY:

// ADRES POCZTOWY zamiast KOD POCZTOWY
// zmienione - możliwość wprowadzania > 1 spacja albo >= 0 spacja między elementami

// Możliwość wstawiania więcej niż raz pod rząd tego samego pliku


// postfix poprawiony
// usuwa za dużo znaków po działaniu poprawiony

window.onload = function() {
    var fileInput = document.getElementById("fileInput");
    var results = new Array();

    var signPosition = 0;
    var sign;

// REGULAR EXPRESSIONS
    var regExp = /[0-9]{2}-[0-9]{3}(\s*[A-ZĆŻŹŁŚ][a-ząćśęńłóźż]+)((\s*|\s*-\s*)[A-ZĆŻŹŁŚ][a-ząćśęńłóźż]+)*\s*,\s*((ul|[Aa]l)?\s*\.)(\s*[A-ZĆŻŹŁŚ][a-ząćśęńłóźż]+)((\s+|\s*-\s*)[A-ZĆŻŹŁŚ][a-ząćśęńłóźż]+)*\s+[0-9]+[a-z]*(\s*\/\s*[0-9]+[a-z]*)*/g;
    
    var changeSpace = /\s*/g;
    var changeDot = /\./g;
    var changeComma = /,/g;
    var changePostalCodeDist = /-[0-9]{3}/g;
    var changeAdressNumberDist = /[a-z][0-9]/g;
    var changeLocalityDist = /[a-z][A-Z]/g;
    
// show/hide buttons/info
    $("#resultDisplayArea h1").show();
    hideSign();
    showTestButtons(1);
    
// INPUT FILES
    fileInput.addEventListener("change", function(e) {
        var files = fileInput.files;
        var textType = /text/;            
        
        for(var i = 0, length = files.length; i < length; i++) {
            if(files[i].type.match(textType)) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    if(!e.target.result.match(regExp)){
                        alert("This set is empty!");
                    }
                    else {
                    var liText = document.createElement("li");
                    var liResult = document.createElement("li");
                    
                    var expression = e.target.result.match(regExp);
                    expression = removeMultiWhitespaces(expression);
                    expression = removeDuplicates(expression);
                    
                    liText.innerText = e.target.result;
                    liResult.innerText = expression;
                    
                    $("#resultDisplayArea ul").append(liResult);
                    results.push(expression);
                    
                    $("#resultDisplayArea h1").hide();
                    if(isLength2()) showSign();
                    document.getElementById("fileInput").value = "";
                    }
                };
                reader.readAsText(files[i]);
            }
        }
    });
    
// INPUT OPERATORS (SIGN)
    $("#plus").click(function(e) {
        if(!isLength2()) {}
        else {
            var li = document.createElement("li");
            li.innerText = "+";
            $("#resultDisplayArea ul").append(li);
            results.push($(li).text());
            showInput();
        }
        console.log(results);
    });
    
    $("#minus").click(function(e) {
        if(!isLength2()) {}
        else {
            var li = document.createElement("li");
            li.innerText = "-";
            $("#resultDisplayArea ul").append(li);
            results.push($(li).text());
            showInput();
        }
        console.log(results);
    });
    
    $("#multi").click(function(e) {
        if(!isLength2()) {}
        else {
            var li = document.createElement("li");
            li.innerText = "*";
            $("#resultDisplayArea ul").append(li);
            results.push($(li).text());
            showInput();
        }
        console.log(results);
    });
    
// SUBMIT BUTTON
    $("#submitButton").click(function(e) {
        checkSignPosition();
        if(isTwoNumbersFirst()) {
            switch(sign) {
                case "+": totalArrays(results[signPosition - 2], results[signPosition - 1]);
                    break;
                case "-": differenceArrays(results[signPosition - 2], results[signPosition - 1]);
                    break;
                case "*": productArrays(results[signPosition - 2], results[signPosition - 1]);
                    break;  
            }
        }
        if(!isTwoNumbersFirst()) hideSign();
        if(results[0] == "+" &&
               results[0] == "-" &&
               results[0] == "*") {
                $('#selectButton').prop('disabled','true');
        } else if(results[1] == "+" &&
               results[1] == "-" &&
               results[1] == "*") {
                $('#selectButton').prop('disabled','true');
        }
    });
    
// TESTS
    var testN = 0;
    
    $("#test").click(function(e) {
        console.log(signPosition);
        console.log(results);
        console.log(document.getElementById("resultDisplayArea"));
    });
    
    $("#test2").click(function(e) {
        checkSignPosition();
        console.log(signPosition);
        console.log(results);
    });
    
    $("#test3").click(function(e) {
        results[results.length-1].splice(1,1);
    });

// OPERATIONS
    function totalArrays(set1, set2) {    
        var outcome = new Array();
        var flag;
        var li = document.createElement("li");
        
        for(var i = 0; i < set1.length; i++) {
            outcome.push(set1[i]);
        }
        
        for(var i = 0; i < set2.length; i++) {
            flag = 0;
            for(var j = 0; j < set1.length; j++) {
                if(set2[i] == set1[j]) {
                    flag = 1;
                    j = set1.length;
                }
            }
            if(flag == 0) outcome.push(set2[i]);
        }
        deleteE();
        if(!outcome.length) {
            li.innerText += "This array is empty";
            if(!results.length) $("#resultDisplayArea h1").show();
            else {
                console.log(signPosition);
                var li2 = li.cloneNode(true);
                if(signPosition>2){
                    $("#resultDisplayArea ul li:eq("+(signPosition-3)+")").after(li2);
//                    $("#resultDisplayArea ul li:eq("+(signPosition-3)+")").append(li2);
                } else {
                    $("#resultDisplayArea ul").prepend(li2);
                }
                results.splice(signPosition-2,0,outcome);
            }
        } else {
            li.innerText = outcome;
            var li2 = li.cloneNode(true);
            
            console.log(signPosition);
            if(signPosition>2) {
                $("#resultDisplayArea ul li:eq("+(signPosition-3)+")").after(li2);
            } else {
                $("#resultDisplayArea ul").prepend(li2);
            }
            results.splice(signPosition-2,0,outcome);          
        }
        $("#totalDisplayArea ul").append(li); 
    }
    
    function differenceArrays(set1, set2) {
        var outcome = new Array();
        var flag;
        var li = document.createElement("li");
        
        for(var i = 0; i < set1.length; i++) {
            flag = 0;
            for(var j = 0; j < set2.length; j++) {
                if(set1[i] == set2[j]) {
                    flag = 1;
                    j = set2.length;
                }
            }
            if(flag == 0) outcome.push(set1[i]);
        }
        deleteE();
        if(!outcome.length) {
            li.innerText += "This array is empty";
            if(!results.length)
                $("#resultDisplayArea h1").show();
            else {
                console.log(signPosition);
                var li2 = li.cloneNode(true);
                if(signPosition>2){
                    $("#resultDisplayArea ul li:eq("+(signPosition-3)+")").after(li2);
                } else {
                    $("#resultDisplayArea ul").prepend(li2);
                }
                results.splice(signPosition-2,0,outcome);

            }
        } else {
            li.innerText = outcome;
            var li2 = li.cloneNode(true);
            
            console.log(signPosition);
            if(signPosition>2){
                $("#resultDisplayArea ul li:eq("+(signPosition-3)+")").after(li2);
                results.splice(signPosition-2,0,outcome);
            } else {
                $("#resultDisplayArea ul").prepend(li2);
                results.splice(0,0,outcome);
            }
            console.log(outcome);
        }
        $("#differenceDisplayArea ul").append(li);
    }
    
    function productArrays(set1, set2) {
        var outcome = new Array();
        var li = document.createElement("li");
        
        for(var i = 0; i < set1.length; i++) {
            for(var j = 0; j < set2.length; j++) {
                if(set1[i] == set2[j]) {
                    outcome.push(set1[i]);
                    j = set2.length;
                }
            }
        }
        
        li.innerText = outcome;
        var li2 = li.cloneNode(true);
        deleteE();
        if(!outcome.length) {
            li.innerText += "This array is empty";
            if(!results.length)
                $("#resultDisplayArea h1").show();
            else {
                
                var li2 = li.cloneNode(true);
                if(signPosition>2){
                    results.splice(signPosition-2,0,outcome);
                    console.log(signPosition);
                    $("#resultDisplayArea ul li:eq("+(signPosition-3)+")").after(li2);
                } else {
                    results.splice(0,0,outcome);
                    $("#resultDisplayArea ul").prepend(li2);
                }
            }
        } else {
            if(signPosition>2){
                $("#resultDisplayArea ul li:eq("+(signPosition-3)+")").after(li2);
            } else 
                $("#resultDisplayArea ul").prepend(li2);
            results.splice(signPosition-2,0,outcome);
        }
        $("#productDisplayArea ul").append(li);   
    }
    
// REMOVES
    function removeResult() {
        results.splice(signPosition-2,1);
    }
    
    function removeResultText() {
        $("#resultDisplayArea ul li:eq(" + (signPosition-2) + ")").remove();
    }
    
// OTHER FUNCTIONS
    function isLength2() {
        if(results.length < 2) return false;
        return true;
    }
    
    function isOperatorLast() {
        if(results[results.length-1] == "+") return  "+";
        else if(results[results.length-1] == "-") return  "-";
        else if(results[results.length-1] == "*") return  "*";
        return false;
    }
    
    function hideInput() {
        $("#fileInput").prop("disabled", true);
    }
    
    function showInput() {
        $("#fileInput").prop("disabled", false);
    }
    
    function hideSign() {
        $(".sign").prop("disabled", true);
    }
    
    function showSign() {
        $(".sign").prop("disabled", false);
    }
    
    function showTestButtons(test) {
        test == 0 ? $("#testButtons").css("visibility","hidden")
            : $("#testButtons").css("visibility","visible");
    }
    
    function isTwoNumbersFirst() {   
        if(!isLength2()){ return 0;}
        else {
            if(results[0] == "+" &&
               results[0] == "-" &&
               results[0] == "*") {
                return 0;
            }
            if(results[1] == "+" &&
               results[1] == "-" &&
               results[1] == "*") {
                return 0;
            }
            else return 1;
        }
    }
    
    function deleteE() {
        checkSignPosition();
            for(var i = 0; i < 3; i++) {
                removeResult();
                removeResultText();
            }
    }
    
    function checkSignPosition() {
        var count = 2;
        while(count < results.length) {
            if(results[count] == "+" ||
               results[count] == "-" ||
               results[count] == "*") {
                sign = results[count];
                signPosition = count;
                return signPosition;
                break;
            }
            count++;
        }
        signPosition = 0;
        return 0;
    }
    
    function removeDuplicates(e) {
        var temp;
        for(var i = 0; i < e.length; i++) {
            temp = e[i];
            for(var j = i+1; j < e.length; j++) {
                if(temp == e[j]) {
                    e.splice(j,1);
                    --j;
                }
            }
        }
        return e;
    }
    
    function removeMultiWhitespaces(e) {
        for(var i = 0, length = e.length; i < length; i++) {
            e[i] = e[i].replace(changeSpace, "");
            e[i] = e[i].replace(changeDot, ". ");
            e[i] = e[i].replace(changeComma, ", ");
            e[i] = e[i].replace(changePostalCodeDist, function(match) {
                return match + " ";
            } );
            e[i] = e[i].replace(changeAdressNumberDist, function(match) {
                return e[i].match(changeAdressNumberDist)[0][0] + " " +  e[i].match(changeAdressNumberDist)[0][1];
            });
            e[i] = e[i].replace(changeLocalityDist, function(match) {
                return e[i].match(changeLocalityDist)[0][0] + " " +  e[i].match(changeLocalityDist)[0][1];
            });
        }
        return e;
    }
}