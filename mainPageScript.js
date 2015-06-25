
var inProcessDiv2 = false;
var prevDivContents;
var arrOfRoutes = [];
var arrDir = [];
var arrStops = [];
var xmlHttp = createXmlHttpRequestObject();
var rtListId = "rtList";
var dirListId = "dirList";
var stpListId = "stpList";
var addedRoutes = [];
var theUrl;
var ind = 0;

function process(){
if(typeof(Storage) !== "undefined") {
		
		
		//alert("in the stored part");
		//alert(localStorage["myRoutes"]);
		//localStorage.clear();
		alert("made it here");
		if(localStorage.getItem("myRoutes") != null){
				alert("in the if");
				var storedData = JSON.parse(localStorage["myRoutes"]);
				
				creatTable(storedData);
				
			
		//alert(localStorage["myRoutes"]);
		}else{
			alert("could not find any stored data");
			var busDisplay = document.getElementById("busDisplay");
			center = document.createElement('center');
			center.appendChild(document.createTextNode("You do not have any routes selected"));
			busDisplay.appendChild(center);
		}
	
	
	} else {
		
		
		
}




}


function creatTable(storedData){
	var tableRow;
	var tableCol;
	var busDisplay = document.getElementById("busDisplay");
	//alert("in creatTable");
	//alert(storedData[1]);
	var tableRoot = document.createElement('table');
	tableRoot.id = "rtDis";
	//alert("created table root");
	
		tableRow = document.createElement('tr');
		tableCol = document.createElement('td');
		tableCol.appendChild(document.createTextNode('BusRoute'));
		tableRow.appendChild(tableCol);
		tableCol = document.createElement('td');
		tableCol.appendChild(document.createTextNode("Arrival Time"));
		tableRow.appendChild(tableCol);
		tableRoot.appendChild(tableRow);
		
		for(var i = 0; i < storedData.length; i++){
			tableRow = document.createElement('tr');
			//alert("created table row");
			//for(var j = 0; j < 1; j++){
				tableCol = document.createElement('td');
				//alert("created table td");
				tableCol.appendChild(document.createTextNode(storedData[i]));
				//alert("appendChild ");
				tableRow.appendChild(tableCol);
				tableCol = document.createElement('td');
				tableCol.appendChild(document.createTextNode(i));
				tableRow.appendChild(tableCol);
			//}
			tableRoot.appendChild(tableRow);
		}
		//alert("before appending child");
	busDisplay.appendChild(tableRoot); 
	document.getElementById("rtDis").border = "1px solid red";
	
}


function processSomeDiv2(){
	if(inProcessDiv2 == false){
		inProcessDiv2 = true;
	//alert("in the processSomeDiv2");
	br = document.createElement('br');
	var someDiv2 = document.getElementById("someDiv2");
	prevDivContents = someDiv2.innerHTML;
	someDiv2.innerHTML  = " ";
	someDiv2.appendChild(br);
	
	formRoot = document.createElement('form');
	selectInput = document.createElement('select');
	selectInput.id = "rtList";
	selectInput.onchange = getDirList;
	alert("created first select box");
	formRoot.appendChild(selectInput);
	selectInput = document.createElement('select');
	selectInput.id = "dirList";
	selectInput.onchange = getStpList;
	formRoot.appendChild(selectInput);
	selectInput = document.createElement('select');
	selectInput.id = "stpList";
	formRoot.appendChild(selectInput);
	alert("before some div appends child");
	someDiv2.appendChild(formRoot);
	
	//someDiv2.appendChild(br);
	//someDiv2.appendChild(br);
	br = document.createElement('br');
	//someDiv2.appendChild(br);
	someDiv2.appendChild(br);
	
	button = document.createElement('button');
	button.id = "selButt";
	button.onclick = addRoute;
	//button.value = "Select Route";
	button.appendChild(document.createTextNode("Select Route"));
	someDiv2.appendChild(button);
	button = document.createElement('button');
	button.id = "storButt";
	button.onclick = cacheData;
	//button.value = "Store Route(s)";
	button.appendChild(document.createTextNode("Store Route(s)"));
	someDiv2.appendChild(button);
	
	br = document.createElement('br');
	someDiv2.appendChild(br);
	br = document.createElement('br');
	someDiv2.appendChild(br);
	
	button = document.createElement('button');
	button.id = "donButt";
	button.onclick = unProcessDiv2;
	//button.value = "Store Route(s)";
	button.appendChild(document.createTextNode("Done"));
	someDiv2.appendChild(button);
	
	getRtList();
	
	}
	
	
}



function unProcessDiv2(){
	
	someDiv2 = document.getElementById("someDiv2");
	someDiv2.innerHTML = prevDivContents;
	inProcessDiv2 = false;
	
}




function getRtList(){
	theUrl = "http://192.168.1.127/index.php?dropDownID=routes"; 
	sendRequest();
}

function getDirList(){

	//alert("in get dirlist");
		var rtList = document.getElementById(rtListId); 
		document.getElementById('dirList').options.length = 0;
		var rtChosen = rtList.options[rtList.selectedIndex].text;
	
	//theUrl = "http://192.168.1.127/index.php?dropDownID=" + rtChosen;
	theUrl = "http://192.168.1.127/index2.php?dropDownID=routes"; //f
	sendRequest();
}

function getStpList(){
		var dirList = document.getElementById(dirListId);
		document.getElementById('stpList').options.length = 0;
		var dirChosen = rtList.options[rtList.selectedIndex].text;
	
	//theUrl = "http://192.168.1.127/index2.php?dropDownID=" + dirChosen;
	theUrl = "http://192.168.1.127/index3.php?dropDownID=routes";
	
	sendRequest();
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

function sendRequest() {

    if (xmlHttp) {
        try {
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.onreadystatechange = handleServerResponse;
            xmlHttp.send(null);
        } catch (e) {
            e.toString;
        }
    } else {
        someDiv2.innerHTML += "Error creating xmlHttp object<br>";
        //setTimeout('process()', 1000);

    }
	//return 1;

}


/**
*this function should handle the response from the server
*
**/
function handleServerResponse() {
    //if (xmlHttp.readyState == 1) {
        //someDiv2.innerHTML += "State 1: server connection established<br>";
   // } else if (xmlHttp.readyState == 2) {
       // someDiv2.innerHTML += "State 2: request received by the server<br>";
   // } else if (xmlHttp.readyState == 3) {
        //someDiv2.innerHTML += "State 3: server processing<br>";
     if (xmlHttp.readyState == 4) {
        //someDiv2.innerHTML += "State 4: request completed by server<br>";

        if (xmlHttp.status == 200) { //200 == successfull; 0==failure
          //  someDiv2.innerHTML += "Status 200: communication successful from server<br><br><br>";
            //alert('i made past this part');
            xmlResponse = xmlHttp.responseXML;
            //alert('i made past this part2');
            xmlRootElem = xmlResponse.documentElement;
            //alert('i made past this part3');
			//alert(xmlRootElem.tagName);
            if (xmlRootElem.tagName == "bustime-response") {
				//alert('in bustime-response');
                routes = xmlRootElem.getElementsByTagName("rt");
                routeDescript = xmlRootElem.getElementsByTagName("rtnm");
                //var stringtxt = " ";
                
                for (var i = 0; i < routes.length; i++) {
                    // stringtxt += routes.item(i).firstChild.data + "-" + routeDescript.item(i).firstChild.data+"<br>";
                    arrOfRoutes[i] = routes.item(i).firstChild.data + "-" + routeDescript.item(i).firstChild.data;

                }
               // alert('populateBusRoutes');
                populateDropMenu("rtList");
				//someDiv2.innerHTML += "before get dir";
				getDirList();
                //someDiv.innerHTML+=stringtxt;
            }else if (xmlRootElem.tagName == "rtDir") {
			//alert('in rtDir')
            tagDir = xmlRootElem.getElementsByTagName("dir");

            for (var i = 0; i < tagDir.length; i++) {
                // stringtxt += routes.item(i).firstChild.data + "-" + routeDescript.item(i).firstChild.data+"<br>";
                arrDir[i] = tagDir.item(i).firstChild.data;

            }
            //alert('populateBusRoutes');
            populateDropMenu("dirList");
			getStpList();

        } else if (xmlRootElem.tagName == "bus-stops") {
			//alert("in bus-stops");
            tagStops = xmlRootElem.getElementsByTagName("stpnm");

            for (var i = 0; i < tagStops.length; i++) {
                // stringtxt += routes.item(i).firstChild.data + "-" + routeDescript.item(i).firstChild.data+"<br>";
                arrStops[i] = tagStops.item(i).firstChild.data;

            }
			//alert(ro);
            populateDropMenu("stpList");


        }else{
			alert('no match'); 
        } 
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





/**
* Function should build the array of whatever routes they want listed on the main page.
*I doubt we would need to grab everything to work with it but I just did it just because
**/
function addRoute() {
	alert("in the addRoute");
	var tmpString = '';
	var menuElem;
	menuElem = document.getElementById(rtListId);
	listElem = menuElem.options[menuElem.selectedIndex].text;
	
	tmpString += listElem + " ";
	menuElem = document.getElementById("dirList");
	listElem = menuElem.options[menuElem.selectedIndex].text;
	tmpString += listElem + " ";
	//alert("got dirList " + menuElem.id + " " + tmpString);
	
	menuElem = document.getElementById("stpList");
	listElem = menuElem.options[menuElem.selectedIndex].text;
	tmpString += listElem + " ";
	//alert("got stp " + menuElem.id + " " + tmpString);
	
	
	document.getElementById("someDiv3").innerHTML += tmpString;
	document.getElementById("someDiv3").innerHTML += document.createElement('br');
	alert(ind);
	addedRoutes[ind] = tmpString;
	ind++;
	//cacheData();
	alert(addedRoutes.length);
	
    
}


//still being tested

function cacheData(){
	if(typeof(Storage) !== "undefined") {
		alert(addedRoutes[1]);
		localStorage["myRoutes"] = JSON.stringify(addedRoutes);
		alert("in the stored part");
		var storedData = JSON.parse(localStorage["myRoutes"]);
		alert(storedData[1]);
	
	
	
	} else {
}
}


//populateBusRoutes helper functon
function getArray(element_id) {
	// string = rtListID + " " + element_id;
	
	//alert('in getArray');
    var tmp = [];

    if (element_id == "rtList") {
        tmp = arrOfRoutes;

    } else if (element_id == "dirList") {
        tmp = arrDir;


    } else if (element_id == "stpList") {
        tmp = arrStops;

    } else
        tmp = null;

    return tmp;

}

/**
*@param element id
*should append appropiate elements to appropiate select form in the documentt
*the function is generic enough to work with all menus
**/


function populateDropMenu(element_id) {
	
	//alert('in populate');
    var tmpArr = [];

    tmpArr = getArray(element_id);

    if (tmpArr != null) {

        var doc = document.getElementById(element_id);
        alert(element_id);
        //document.write(tmpArr.length);

        for (index = 0; index < tmpArr.length; index++) {
            // document.write("I am in the for loop<br>");
            //document.write("Index: " + index + "<br>");
            var opt = document.createElement('option');
            opt.innerHTML = tmpArr[index];
            opt.value = tmpArr[index];
            doc.appendChild(opt);
            //document.write("new" +arrOfRoutes[index] + "<br />");
        }
    }else
        alert ('cannot populate dropDown menu ' + element_id);

    
   

}
