<?php
	include "conn.php";
	$sql = "DELETE FROM car";
	$res = $conn->query($sql);
	if($res){
		echo 'yes';//删除成功
	}
	
	
	
?>