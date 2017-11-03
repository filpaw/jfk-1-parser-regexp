'use strict';

window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var results = new Array();
    
    var signPosition = 0;
    var sign;
    
// SHOW 'Empty Array'
    $('#resultDisplayArea h1').show();
    
// INPUT FILES
    fileInput.addEventListener('change',
        function(e) {
        
            var files = fileInput.files;
            var textType = /text/;
            var regExp = /[0-9]{2}-[0-9]{3}/g;
            var max2 = files.length;
        
        if(files.length > 2) max2 = 2;
        if(results.length == 1) max2 = 1;
        for(var i = 0; i < max2; i++) {
            if(files[i].type.match(textType)) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    
                    var liText = document.createElement('li');
                    var liResult = document.createElement('li');
                    var removedDuplicates = removeDuplicates(e.target.result.match(regExp));
                    liText.innerText = e.target.result;
                    liResult.innerText = removedDuplicates;
                    $('#resultDisplayArea ul').append(liResult);
                    results.push(removedDuplicates);
                    $('#resultDisplayArea h1').hide();
                    
                    if(isTwoNumbersLast() == 2) hideInput();
                };
                reader.readAsText(files[i]);
            }
        }
    });
    
// INPUT OPERATORS (SIGN)
    $('#plus').click(function(e) {
        if(!isLength2() || isOperatorLast()) {}
        else {
            var li = document.createElement('li');
            li.innerText = "+";
            $('#resultDisplayArea ul').append(li);
            results.push($(li).text());
            showInput();
        }
        }
    )
    
    $('#minus').click(function(e) {
        if(!isLength2() || isOperatorLast()) {}
        else {
            var li = document.createElement('li');
            li.innerText = "-";
            $('#resultDisplayArea ul').append(li);
            results.push($(li).text());
            showInput();
        }
        }
    )
    
    $('#multi').click(function(e) {
        if(!isLength2() || isOperatorLast()) {}
        else {
            var li = document.createElement('li');
            li.innerText = "*";
            $('#resultDisplayArea ul').append(li);
            results.push($(li).text());
            showInput();
        }
        }
    )
    
// SUBMIT BUTTON
    $('#submitButton').click(function(e) {
        checkSignPosition();
            if(results.length > 2){
            switch(sign) {
                case "+": totalArrays(results[signPosition - 2], results[signPosition - 1]);
                    break;
                case "-": differenceArrays(results[signPosition - 2], results[signPosition - 1]);
                    break;
                case "*": productArrays(results[signPosition - 2], results[signPosition - 1]);
                    break;  
            }
        }  
    });
    
// TESTS
    var testN = 0;
    
    $('#test').click(function(e) {
        checkSignPosition();
        var li = document.createElement('li');
        li.innerHTML = testN++;
        $('#resultDisplayArea ul li:eq('+(signPosition-2)+')').prepend(li);
    });
    
    $('#test2').click(function(e) {
        checkSignPosition();
        console.log(signPosition);
        console.log(results);
    });
    
    $('#test3').click(function(e) {
        results[results.length-1].splice(1,1);
    });

// OPERATIONS
    function totalArrays(zbior1, zbior2) {    
        var outcome = new Array();
        var flag;
        var li = document.createElement('li');
        
        for(var i = 0; i < zbior1.length; i++) {
            outcome.push(zbior1[i]);
        }
        
        for(var i = 0; i < zbior2.length; i++) {
            flag = 0;
            for(var j = 0; j < zbior1.length; j++) {
                if(zbior2[i] == zbior1[j]) {
                    flag = 1;
                    j = zbior1.length;
                }
            }
            if(flag == 0) outcome.push(zbior2[i]);
        }
        deleteE();
        if(!outcome.length) {
            li.innerText += "This array is empty";
        } else {
            li.innerText = outcome;
            var li2 = li.cloneNode(true);
            
            console.log(signPosition);
            if(signPosition>2){
                $('#resultDisplayArea ul li:eq('+(signPosition-3)+')').append(li2);
            } else 
                $('#resultDisplayArea ul').prepend(li2);
            results.splice(signPosition-2,0,outcome);          
        }
        $('#totalDisplayArea ul').append(li); 
    }
    
    function differenceArrays(zbior1, zbior2) {
        var outcome = new Array();
        var flag;
        var li = document.createElement('li');
        
        for(var i = 0; i < zbior1.length; i++) {
            flag = 0;
            for(var j = 0; j < zbior2.length; j++) {
                if(zbior1[i] == zbior2[j]) {
                    flag = 1;
                    j = zbior2.length;
                }
            }
            if(flag == 0) outcome.push(zbior1[i]);
        }
        deleteE();
        if(!outcome.length) {
            li.innerText += "This array is empty";
            if(!results.length)
                $('#resultDisplayArea h1').show();
            else {
                results.splice(0,0,outcome);
                var li2 = li.cloneNode(true);
                if(signPosition>2){
                    $('#resultDisplayArea ul li:eq('+(signPosition-3)+')').append(li2);
                } else 
                    $('#resultDisplayArea ul').prepend(li2);
            }
        } else {
            li.innerText = outcome;
            var li2 = li.cloneNode(true);
            
            console.log(signPosition);
            if(signPosition>2){
                $('#resultDisplayArea ul li:eq('+(signPosition-3)+')').append(li2);
            } else 
                $('#resultDisplayArea ul').prepend(li2);
            results.splice(signPosition-2,0,outcome);  
        }
        $('#differenceDisplayArea ul').append(li);
    }
    
    function productArrays(zbior1, zbior2) {
        var outcome = new Array();
        var li = document.createElement('li');
        
        for(var i = 0; i < zbior1.length; i++) {
            for(var j = 0; j < zbior2.length; j++) {
                if(zbior1[i] == zbior2[j]) {
                    outcome.push(zbior1[i]);
                    j = zbior2.length;
                }
            }
        }
        
        li.innerText = outcome;
        var li2 = li.cloneNode(true);
        deleteE();
        if(!outcome.length) {
            li.innerText += "This array is empty";
            if(!results.length)
                $('#resultDisplayArea h1').show();
            else {
                results.splice(0,0,outcome);
                var li2 = li.cloneNode(true);
                if(signPosition>2){
                    $('#resultDisplayArea ul li:eq('+(signPosition-3)+')').append(li2);
                } else 
                    $('#resultDisplayArea ul').prepend(li2);
            }
        } else {
            if(signPosition>2){
                $('#resultDisplayArea ul li:eq('+(signPosition-3)+')').append(li2);
            } else 
                $('#resultDisplayArea ul').prepend(li2);
            results.splice(signPosition-2,0,outcome);
        }
        $('#productDisplayArea ul').append(li);   
    }
    
// REMOVES
    function removeResult() {
        results.splice(signPosition-2,1);
    }
    
    function removeFileText() {
        $('#fileDisplayArea ul').children(':eq(' + signPosition + ')').remove();
    }
    
    function removeResultText() {
        $('#resultDisplayArea ul').children(':eq(' + (signPosition-2) + ')').remove();
    }
    
// OTHER FUNCTIONS
    function isLength2() {
        if(results.length < 2) return false;
        return true;
    }
    
    function isOperatorLast() {
        if(results[results.length-1] == '+') return  "+";
        else if(results[results.length-1] == '-') return  "-";
        else if(results[results.length-1] == '*') return  "*";
        return false;
    }
    
    function hideInput() {
        $('#fileInput').prop('disabled', true);
    }
    
    function showInput() {
        $('#fileInput').prop('disabled', false);
    }
    
    function isTwoNumbersLast() {   
        if(!isLength2()){ return 0;}
        else {
            if(results[results.length-1] != '+' &&
               results[results.length-1] != '-' &&
               results[results.length-1] != '*') {
                if(results[results.length-2] != '+' &&
                   results[results.length-2] != '-' &&
                   results[results.length-2] != '*') {
                    return 2;
                }
                else return 1;
            }
            else return 0;
        }
    }
    
    function deleteE() {
            for(var i = 0; i < 3; i++) {
                removeResult();
                removeResultText();
            }
    }
    
    function checkSignPosition() {
        var count = 2;
        while(count < results.length) {
            if(results[count] == '+' ||
               results[count] == '-' ||
               results[count] == '*') {
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
}