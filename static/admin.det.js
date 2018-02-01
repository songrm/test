$(function(){
	$('.btn-danger').click(function(e){
		var target=$(e.target)
		var id=target.data('id')
		var tr=$('.item-id-'+id)

		$.ajax({
			type:'DELETE',
			url:'/'+id
		})
		.done(function(results){
			if(results.success===1){
				//成功
				console.log(tr.length)
				if(tr.length>0){
					$(tr).remove()
				}
			}
		})
	})
})