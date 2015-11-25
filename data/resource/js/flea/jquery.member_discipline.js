$(document).ready(function(){
	//列表下拉
	$('img[nc_type="flex"]').click(function(){
		var status = $(this).attr('status');
		if(status == 'open'){
			var pr = $(this).parent('td').parent('tr');
			var id = $(this).attr('fieldid');
			var obj = $(this);
			$(this).attr('status','none');
			//ajax
			$.ajax({
				url: 'index.php?act=member_discipline&op=member_discipline&ajax=1&discipline_parent_id='+id,
				dataType: 'json',
				success: function(data){
					var src='';
					for(var i = 0; i < data.length; i++){
						var tmp_vertline = "<img class='preimg' src='"+ADMIN_TEMPLATES_URL+"/images/vertline.gif'/>";
						src += "<tr class='"+pr.attr('class')+" row"+id+"'>";
						src += "<td class='w36'><input type='checkbox' name='check_discipline_id[]' value='"+data[i].discipline_id+"' class='checkitem'>";
						//图片
						if(data[i].have_child == 1){
							src += " <img fieldid='"+data[i].discipline_id+"' status='open' nc_type='flex' src='"+ADMIN_TEMPLATES_URL+"/images/tv-expandable.gif' />";
						}else{
							src += " <img fieldid='"+data[i].discipline_id+"' status='none' nc_type='flex' src='"+ADMIN_TEMPLATES_URL+"/images/tv-item.gif' />";
						}
						src += "</td><td class='w48 sort'>";						
						//排序
						src += " <span title='可编辑下级学科排序' ajax_branch='discipline_sort' datatype='number' fieldid='"+data[i].discipline_id+"' fieldname='discipline_sort' nc_type='inline_edit' class='editable tooltip'>"+data[i].discipline_sort+"</span></td>";
						//名称
						src += "<td class='w50pre name'>";
						
						
						for(var tmp_i=1; tmp_i < (data[i].deep-1); tmp_i++){
							src += tmp_vertline;
						}
						if(data[i].have_child == 1){
							src += " <img fieldid='"+data[i].discipline_id+"' status='open' nc_type='flex' src='"+ADMIN_TEMPLATES_URL+"/images/tv-item1.gif' />";
						}else{
							src += " <img fieldid='"+data[i].discipline_id+"' status='none' nc_type='flex' src='"+ADMIN_TEMPLATES_URL+"/images/tv-expandable1.gif' />";
						}
						src += " <span title='可编辑下级学科名称' required='1' fieldid='"+data[i].discipline_id+"' ajax_branch='goods_class_name' fieldname='discipline_name' nc_type='inline_edit' class='editable tooltip'>"+data[i].discipline_name+"</span>";
						//新增下级
						if(data[i].deep < 3){
							src += "<a class='btn-add-nofloat marginleft' href='index.php?act=member_discipline&op=member_discipline_add&discipline_parent_id="+data[i].discipline_id+"'><span>新增下级</span></a>";
						}
						src += "</td>";
						//显示状态
						src += "<td class='align-center power-onoff'>";
						if(data[i].discipline_show == 0){
							src += "<a href='JavaScript:void(0);' class='tooltip disabled' fieldvalue='0' fieldid='"+data[i].discipline_id+"' ajax_branch='discipline_show' fieldname='discipline_show' nc_type='inline_edit' title='可编辑该学科是否显示'><img src='"+ADMIN_TEMPLATES_URL+"/images/transparent.gif'></a>"
						}else {
							src += "<a href='JavaScript:void(0);' class='tooltip enabled' fieldvalue='1' fieldid='"+data[i].discipline_id+"' ajax_branch='discipline_show' fieldname='discipline_show' nc_type='inline_edit' title='可编辑该学科是否显示'><img src='"+ADMIN_TEMPLATES_URL+"/images/transparent.gif'></a>"
						}
						src += "</td>";

						//操作
						src += "<td class='w84'>";
						src += "<a href='index.php?act=member_discipline&op=member_discipline_edit&discipline_id="+data[i].discipline_id+"'>编辑</a>";
						src += " | <a href=\"javascript:if(confirm('删除该学科将会同时删除该学科的所有下级学科，您确定要删除吗'))window.location = 'index.php?act=member_discipline&op=member_discipline_del&discipline_id="+data[i].discipline_id+"';\">删除</a>";
						src += "</td>";
						src += "</tr>";
					}
					//插入
					pr.after(src);
					obj.attr('status','close');
					obj.attr('src',obj.attr('src').replace("tv-expandable","tv-collapsable"));
					$('img[nc_type="flex"]').unbind('click');
					$('span[nc_type="inline_edit"]').unbind('click');
					//重现初始化页面
                    $.getScript(RESOURCE_SITE_URL+"/js/flea/jquery.edit.js");
					$.getScript(RESOURCE_SITE_URL+"/js/flea/jquery.member_discipline.js");
					$.getScript(RESOURCE_SITE_URL+"/js/admincp.js");
				},
				error: function(){
					alert('获取信息失败');
				}
			});
		}
		if(status == 'close'){
			$(".row"+$(this).attr('fieldid')).remove();
			$(this).attr('src',$(this).attr('src').replace("tv-collapsable","tv-expandable"));
			$(this).attr('status','open');
		}
	})
});