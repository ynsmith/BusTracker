<?php
header('Content-Type: text/xml');
//header('Content-Type: text/xml');
header('Access-Control-Allow-Origin: *');
		
//$file = 'txt.xml';
//echo 'file found';
$routes = 'routes';
$routeDir = 'routeDir';
$routeStop ='routeStop';


$xml = new DOMDocument("1.0");
$root = $xml->createElement("data");


$id = $xml->createElement("id");
$idTextData = $xml->createTextNode('1');
$id->appendChild($idTextData);
$root->appendChild($id);
$xml->appendChild($root);



//$param1= $_GET['dropDownID'];
//if (file_exists($file)) {
  //  $xml = simplexml_load_file($file);
	//$xml = new SimpleXMLElement($xml);
   // echo $xml->asXML();
//} else {
  //  exit('Failed to open '.$file);
//
//$url='http://realtime.ridemcts.com/bustime/api/v1/getroutes?key=9kNSUd8DTYKnqwLvtzafDLWJT';
//$xmlinfo = simplexml_load_file($url);
//$dom = new DOMDocument();
//$dom->load('txt.xml');
//echo 'saving..';
//$dom->save('filename.xml');
//echo 'saved';
//$file = 'filename.xml';
//if (file_exists($file)) {
   //$xml = simplexml_load_file($file);
	//$/xml = new SimpleXMLElement($xml);
    //echo $xml->asXML();
//} else {
   //exit('Failed to open '.$file);
//}
//echo $xmlinfo->asXML();
//echo '<?xml version= "1.0" encoding="UTF-8" standalone = "yes"
//echo '<response>';


/**
	// $param1 = $_GET['dropDownID'];
	// if(strcmp($param1,$routes) == 0){
	// $file = 'txt.xml';
	// 	if (file_exists($file)) {
	// 		$xml = simplexml_load_file($file);
	// 		 echo ($xml->asXML());
	// 	} else {
	// 			exit('Failed to open '.$file);
	// 	}
		

	// }else if(strcmp($param1,$routeDir) == 0){
	// 	$file = 'directions.xml';
	// 	if (file_exists($file)) {
	// 		$xml = simplexml_load_file($file);
	// 		$param2 = $_GET['rt'];
	// 		//echo $param2;
	// 		echo '<?xml version="1.0" ?>';
	// 		echo '<dir>';
	// 		 echo htmlentities($xml->$param2->dir[0]);
	// 		 echo '</dir>';
	// 		 echo '<dir>';
	// 		 echo htmlentities($xml->$param2->dir[1]);
	// 		 echo '</dir>';
	// 	} else {
	// 			exit('Failed to open '.$file);
	// 	}
		
	// }else{	
	// 	echo 'This is param1 '.$param1;
	// }
	
**/

?>
