<?php
	include 'conn.php';
	
	$gid = isset($_POST['gid']) ? $_POST['gid'] : '';
	$gimg = isset($_POST['gimg']) ? $_POST['gimg'] : '';
	$ginfo = isset($_POST['ginfo']) ? $_POST['ginfo'] : '';
	$gprice = isset($_POST['gprice']) ? $_POST['gprice'] : '';//商品价格
	$quantity = isset($_POST['quantity']) ? $_POST['quantity'] : '';//商品数量
	$sumprice = isset($_POST['sumprice']) ? $_POST['sumprice'] : '';//总价
	
	$sel = "SELECT * FROM car where gid=$gid";

	$res = $conn->query($sel);
	$sumprice = $quantity * $gprice;
	if($res->num_rows){
		$sql = "UPDATE car SET quantity=quantity+$quantity,sumprice=quantity*$gprice WHERE gid=$gid";

	}else{
		$sql = "INSERT into car(gid,gimg,ginfo,gprice,quantity,sumprice) VALUES ('$gid','$gimg','$ginfo','$gprice','$quantity',$sumprice)";	
		
	}
	
	$res2 = $conn->query($sql);
	
	$sum = "SELECT SUM(sumprice) FROM car;";//所有商品总价格
	$quantitys = "SELECT SUM(quantity) FROM car;";//所有商品总数量
	
	
	$res3 = $conn->query($sum);
	$res4 = $conn->query($quantitys);
	
	
	$content3 = $res3->fetch_all(MYSQLI_ASSOC);
	$content4 = $res4->fetch_all(MYSQLI_ASSOC);
	
	
	$data = array(
		'sPrice' => $content3,//所有商品总价格
		'total' => $content4//所有商品总数量

	);
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>