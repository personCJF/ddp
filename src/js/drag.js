export default {
	init(){
		var lockDrag = false;
		$(".item-child").draggable({  //左项 拖动元素
			scroll:true,
			helper:"clone",
			revert:"invalid",
			appendTo:"body",
			start:function(event,ui){
				lockDrag = true;
			},
			stop:function(event,ui){
				lockDrag = false;
			}
		});
		
		$(".right-box").droppable({ 
			accept: ":not(.ui-sortable-helper)",
			drop:function(event,ui){

				if(!lockDrag){
					return false;
				}

				const _this = $(this);

				var style = {
					left:ui.offset.left+"px",
					top:ui.offset.top+"px",
					position:"absolute"
				}
				var resultELe = ui.draggable[0].outerHTML.replace("ui-draggable ui-draggable-handle","");
				if(/item-child-input/.test(resultELe)){ //如果是输入框
					resultELe = '<input type="text" class="flags item-child-input item-child" style="width:180px;height:30px;">'

					$(resultELe).css(style).draggable({
						helper:"original",
						containment:".right-box"
					}).resizable().appendTo(this);

				}else if(/item-child-txt/.test(resultELe)){ //如果是文本框
					resultELe = '<textarea class="flags item-child-txt item-child" style="width:180px;height:50px;"></textarea>';

					$(resultELe).css(style).draggable({
						helper:"original",
						containment:".right-box"
					}).resizable().appendTo(this);
					
				}
				else{
					$(resultELe).css(style).draggable({
						helper:"original",
						containment:".right-box"
					}).resizable().appendTo(this);
				}
			}
		})

	}
}

