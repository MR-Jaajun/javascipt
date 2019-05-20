<?php
	//连接数据库
	$severname = 'localhost';//主机名
	$username = 'root';//登录数据库名
	$dbpwd = '';//数据库密码
	$dbname = 'yiguo';//数据库名字
	
	//创建连接
	$conn = new mysqli($severname,$username,$dbpwd,$dbname);
	
	//检测是否连接成功
	if($conn->connect_error){
		die("连接失败: " . $conn->connect_error);
	}

?>