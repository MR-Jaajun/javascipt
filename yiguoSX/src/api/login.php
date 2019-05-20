<?php
	include 'conn.php';
	
	$name = isset($_POST['name']) ? $_POST['name'] : '';
	$pwd = isset($_POST['pwd']) ? $_POST['pwd'] : '';
	
	$sql = "SELECT * FROM userinf WHERE username='$name' AND pwd='$pwd'";
	
	$res = $conn->query($sql);
	
	if($res->num_rows){
		//允许登录
		echo 'yes';
	}else{
		echo 'no';
	}
?>