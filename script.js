'use strict';

window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    var resultDisplayArea = document.getElementById('resultDisplayArea');
    var i, j, k ;
    
    
    
    fileInput.addEventListener('change',
        function(e) {
            var files = fileInput.files;
            var textType = /text/;
            var regExp = /[0-9]{2}-[0-9]{3}/g;
            var table = new Array();
        
        fileDisplayArea.innerText = "";
        resultDisplayArea.innerText = "";
        
        
    for(i = 0; i < files.length; i++) {
        console.log(i);
        table.push(new FileReader());
        
        
        if(files[i].type.match(textType)) {
            
            table[i].onload = function(e) {
                consol.log(i);
                fileDisplayArea.innerText += table[i].result;
                resultDisplayArea.innerText += table[i].result.match(regExp);
            }
            table[i].readAsText(files[i]);

        } else {
            fileDisplayArea.innerText = "File not supported!";
        }
    }
    });
}