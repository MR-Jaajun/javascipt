<?php
	include "conn.php";
	//商品ID
	$gid = isset($_GET['gid']) ? $_GET['gid'] : '';
//	//商品价格
//	$gprice = isset($_GET['gprice']) ? $_POST['gprice'] : '';
	//商品数量
//	$quantity = isset($_GET['quantity']) ? $_GET['quantity'] : '';
	
	$sql = "SELECT * from car";
	
	if($gid){
		$sql = "DELETE FROM car WHERE gid=$gid";
	}
	
	$res = $conn->query($sql);
	
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	echo json_encode($content,JSON_UNESCAPED_UNICODE);
	
?>