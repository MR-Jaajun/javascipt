<?php
	include 'conn.php';
	
	$name = isset($_POST['name']) ? $_POST['name'] : '';
	$pwd = isset($_POST['pwd']) ? $_POST['pwd'] : '';
	
	$sql = "INSERT into userinf(username,pwd) VALUES ('$name','$pwd')";
	
	$res = $conn->query($sql);
	
	if($res){
		echo 'yes';
	}else{
		echo 'no';
	}
?>