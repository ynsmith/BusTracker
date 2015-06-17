var arrOfRoutes = [];
var routeDir = [];
var key = "9kNSUd8DTYKnqwLvtzafDLWJT";
//var theUrl = "http://realtime.ridemcts.com/bustime/api/v1/getroutes?key=9kNSUd8DTYKnqwLvtzafDLWJT";
var routeStops = [];
var xmlHttp = createXmlHttpRequestObject();

var theUrl = "http://192.168.1.127/?dropDownID=routes"
var arrOfRoutes = [];
var index = 0;



function addRoute(){
    document.getElementById("myRoute");
}

function createXmlHttpRequestObject() {
    var xmlHttp;

    if (window.ActiveXObject) { //test to see if user is on Internet Explorer 
        try {

            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {

            xmlHttp = false;
        }
    } else {// user is on some other browser
        try {

            xmlHttp = new XMLHttpRequest();
        } catch (e) {

            xmlHttp = false;
        }

    }

    if (!xmlHttp) {
        alert("Can't create XMLHTTP object");
    } else
        return xmlHttp;
}

function process() {

    if (xmlHttp) {
        try{
            xmlHttp.open("GET" ,theUrl,true);
            xmlHttp.onreadystatechange = handleServerResponse;
            xmlHttp.send(null);
        } catch (e) {
            e.toString;
        }
    } else {
        someDiv.innerHTML += "Error create xmlHttp object<br>";
        //setTimeout('process()', 1000);
	
    }
	
}


/**
*this function should handle the response from the server
*
**/
function handleServerResponse() {
    if (xmlHttp.readyState == 1) {
        someDiv.innerHTML += "State 1: server connection established<br>";
    } else if (xmlHttp.readyState == 2) {
        someDiv.innerHTML += "State 2: request received by the server<br>";
    } else if (xmlHttp.readyState == 3) {
        someDiv.innerHTML += "State 3: server processing<br>";
    }else if(xmlHttp.readyState==4){
        someDiv.innerHTML += "State 4: request completed by server<br>";

        if(xmlHttp.status==200){ //200 == successfull; 0==failure
            someDiv.innerHTML += "Status 200: communication successful from server<br><br><br>";
			//alert('i made past this part');
            xmlResponse = xmlHttp.responseXML;
			//alert('i made past this part2');
            xmlRootElem = xmlResponse.documentElement;
			//alert('i made past this part3');
            routes = xmlRootElem.getElementsByTagName("rt");
            routeDescript = xmlRootElem.getElementsByTagName("rtnm");
            var stringtxt=" ";
			//alert('entering the for loop');
            for (var i = 0; i < routes.length; i++) {
               // stringtxt += routes.item(i).firstChild.data + "-" + routeDescript.item(i).firstChild.data+"<br>";
			   arrOfRoutes[i] = routes.item(i).firstChild.data + "-" + routeDescript.item(i).firstChild.data;
			   
            }
			alert('populateBusRoutes');
			populateBusRoutes("myRoutes");
          
            //someDiv.innerHTML+=stringtxt;
        }else {
            alert('error receiving data from server' + xmlHttp.statusText);
        }
    }
	
	
	
	
}

/**
*function returns an xmlhttpobject to get data from the host
*
*
**/




function getArray(element_id){

    var tmp = [];

    if(element_id == "myRoutes")
    {
        tmp = arrOfRoutes;
        return tmp;
    }else if(element_id == "routeDir"){


    }

}

/**
*@param element id
*should append appropiate elements to appropiate select form in the documet
**/


function populateBusRoutes(element_id){
    // document.write("I am in the populate method<br>");
    //document.write("ArrOfRoutes Length: " + arrOfRoutes.length +"<br>");
	 
    var tmpArr = [];
	 
    tmpArr = getArray(element_id);
	 
    var doc = document.getElementById(element_id);
	alert(element_id);
//document.write(tmpArr.length);
	
    for (index = 0; index < tmpArr.length; index++){
       // document.write("I am in the for loop<br>");
        //document.write("Index: " + index + "<br>");
        var opt = document.createElement('option');
        opt.innerHTML = tmpArr[index];
        opt.value = tmpArr[index];
        doc.appendChild(opt);
        //document.write("new" +arrOfRoutes[index] + "<br />");
    }

}
