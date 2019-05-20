<?php
	include 'conn.php';
	//排序
	$typ = isset($_GET['typ']) ? $_GET['typ'] : '';
	
	$order = isset($_GET['order']) ? $_GET['order'] : '';
	
//	//筛选
	$find = isset($_GET['find']) ? $_GET['find'] : '';
	//传id到详情页
	$gid = isset($_GET['gid']) ? $_GET['gid'] : '';
	
	$num = isset($_GET['num']) ? $_GET['num'] : '';
	
	$page = isset($_GET['page']) ? $_GET['page'] : '';
	
	$index = ($page - 1) * $num;
	
	
	if($typ){
		//有排序
		$sql = "SELECT * FROM listinf ORDER BY $typ $order LIMIT $index,$num";
	}else{
		$sql = "SELECT * FROM listinf LIMIT $index,$num";	
	}
	
	if($find){
		//模糊查询
		$sql = "SELECT * FROM listinf WHERE ginfo LIKE '%$find%'";
	}
	
	if($find && $typ && $order){
		//模糊查询
		$sql = "SELECT * FROM listinf WHERE ginfo LIKE '%$find%' ORDER BY $typ $order";
	}
	if($gid){
		$sql = "SELECT * FROM listinf WHERE gid=$gid";
	}
	
	$res = $conn->query($sql);
	
	$content = $res->fetch_all(MYSQLI_ASSOC);
	
	$sql2 = "SELECT * FROM listinf";
	
	$res2 = $conn->query($sql2);

	$data = array(
		
		'total' => $res2->num_rows,//总共有多少条数据
		'glist' => $content,
		'page' => $page,
		'num' => $num
	);
	
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
	
?>