$(function(){
	var table=$(".table");
	table.delegate('a','click',function(e){
		e.preventDefault();
		if(!confirm("确认要删除？")){
			return;
		}
		var target=$(e.target),
			userid=target.attr('href');

		$.ajax({
			url:'/userlist?userid='+userid,
			type:'DELETE',
			success:function(data){
				if(data.msg=="OK"){
					target.parents('tr').remove();
				}
			}

		});


	});
});