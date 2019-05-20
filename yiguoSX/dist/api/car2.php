<?php
	include "conn.php";
	
	$gid = isset($_POST['gid']) ? $_POST['gid'] : '';
	$gimg = isset($_POST['gimg']) ? $_POST['gimg'] : '';
	$ginfo = isset($_POST['ginfo']) ? $_POST['ginfo'] : '';
	$gprice = isset($_POST['gprice']) ? $_POST['gprice'] : '';//商品价格
	$quantity = isset($_POST['quantity']) ? $_POST['quantity'] : '';//商品数量
//	$sumprice = isset($_POST['sumprice']) ? $_POST['sumprice'] : '';//总价
	$sumprice = $quantity * $gprice;
//	$sql = "SELECT * FROM car";
	$sql = "UPDATE car SET quantity=$quantity,sumprice=$sumprice WHERE gid=$gid";
	$res = $conn->query($sql);

	
	if($res){
		$sql2 = "SELECT * FROM car";
		$res2 = $conn->query($sql2);
	}
	
	$content = $res2->fetch_all(MYSQLI_ASSOC);
	
	echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>