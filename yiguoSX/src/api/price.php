<?php
	include 'conn.php';
	
	$sql = "SELECT SUM(sumprice) FROM car;";//所有商品总价格
	$sql2 = "SELECT SUM(quantity) FROM car;";//所有商品总数量
	
	$res = $conn->query($sql);
	$res2 = $conn->query($sql2);
	
	$content = $res->fetch_all(MYSQLI_ASSOC);
	$content2 = $res2->fetch_all(MYSQLI_ASSOC);
	
	
	$data = array(
		'sPrice' => $content,//所有商品总价格
		'total' => $content2//所有商品总数量
	);
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>