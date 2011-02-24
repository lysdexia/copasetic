// copacetic.js - barebones ajax lib
// http://www.urbandictionary.com/define.php?term=copacetic
// REQUIRES json2.js for child function to parse json
// Be sure and read json2.js comments before deployment!
// REMOVE example at bottom before deployment!
// if you are having troubles, try sticking an alert in the catches in 
// the ie and moz_webkit functions
// Released under http://creativecommons.org/licenses/by-sa/1.0/legalcode 
// Have fun!
// dougdawtshawhanahtgmaildaetcom

var COPACETIC = (function () {
    var ms_xmlhttp = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP" ]; 

    return {

        // discover our browser type and return needed xmlhttp object
        // the usual method, nothing fancy
        // POST only at this point.
        connect: function (URL, Args, ChildFunction) {
            var xmlhttp = this.get_xmlhttp();
            if (xmlhttp === false) {
                return null;
            }

            var complete = false;
            xmlhttp.open("POST", URL, true);
            xmlhttp.setRequestHeader("Method", "POST" + URL + " HTTP/1.1");
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // run the ChildFunction when data recieved
            // need some actual error handling
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && !complete) {
                    complete = true;
                    ChildFunction(xmlhttp);
                }
            };

            xmlhttp.send(Args);
        },

        get_xmlhttp: function () {
            var xmlhttp = false;

            xmlhttp = this.moz_webkit();
            if (xmlhttp !== false) {
                return xmlhttp;
            }

            xmlhttp = this.ie();
            if (xmlhttp !== false) {
                return xmlhttp;
            }
            return false;
        },

        ie: function () {
            var con, ie_con = false;
            for (con in ms_xmlhttp) {
                try {
                    ie_con = new ActiveXOBject(ms_xmlhttp[con]);
                    return ie_con;
                } catch (e) {} ;
            }
            return false;
        }, 

        moz_webkit: function () {
            try {
                var mw_con = new XMLHttpRequest();
                return mw_con;
            }
            catch (e) {};
            return false;
        }
    };
}());

var CHILD = (function () {
    return {
        blab: function (XML) { 
            var crud;
            var json = XML.responseText;
            var response = JSON.parse(json);
            for (crud in response) {
                document.write(response[crud]);
            }
        }
    };
}());

// example! remove before use!
document.addEventListener("DOMContentLoaded",
    function () {
        COPACETIC.connect("toss.cgi", "foo=bar", CHILD.blab);
    }, true);
