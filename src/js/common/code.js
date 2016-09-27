export default{
	init(){
		var _this = this;
		$(".js-code").click(function(){
			let wrapperBox = $(".right-box").find(".item-child-text");
			if(wrapperBox.length > 0){

				/*外层块的位置信息*/
				let point = _this.calcPosition(wrapperBox);

				let ic = $(".right-box").find(".item-child");
				let tags = [];
				let tagsPoint = []; //获得在内层元素的属性，包括元素字符串和样式
				if(ic.length > 1){ //包含需要的标签
					$.each(ic,function(index,ele){
						if($(ele).hasClass("item-child-text")){
							return;
						}
						tags.push(ele);
					});

					//计算出最大框的point坐标区间
					let y = point.leftTop[1];
					let x = point.leftTop[0];
					let by = point.rightBottom[1];
					let bx = point.rightBottom[0];

					//外层块包含的标签的位置信息
					tags.map(function(value){
						let valEle = $(value);
						let temp = _this.calcPosition(valEle);

						let _ay = temp.leftTop[1];
						let _ax = temp.leftTop[0];
						let _by = temp.rightTop[1];
						let _bx = temp.rightTop[0];
						let _cy = temp.leftBottom[1];
						let _cx = temp.leftBottom[0];
						let _dy = temp.rightBottom[1];
						let _dx = temp.rightBottom[0];

						if( _ay > y && 
							_ax > x && 

							_by > y && 
							_bx > x && 

							_cy > y && 
							_cx > x && 

							_dy > y && 
							_dx > x && 

							_ay < by && 
							_ax < bx && 

							_by < by && 
							_bx < bx && 

							_cy < by && 
							_cx < bx && 

							_dy < by && 
							_dx < bx

							){

							let tempEle = _this.reviewCode(valEle)
							
							tagsPoint.push(tempEle);
						}
					});
					
					(function(){
						console.log(tagsPoint);
						$(".review-code textarea").html("");
						//计算相对外层的位置
						let out = _this.reviewCode(wrapperBox);
						let top = +out.style.top.replace('px','');
						let left = +out.style.left.replace('px','');

						//得到相对位置
						tagsPoint.map(function(value,index){
							let _top = +value.style.top.replace('px','');
							let _left = +value.style.left.replace('px','');

							tagsPoint[index].style.top = (_top - top)+"px";
							tagsPoint[index].style.left = (_left - left)+"px";


							let style = `
								width:${tagsPoint[index].style.width};
								top:${tagsPoint[index].style.top};
								padding:${tagsPoint[index].style.padding};
								left:${tagsPoint[index].style.left};
								height:${tagsPoint[index].style.height};
								display:${tagsPoint[index].style.display};
								box-sizing:${tagsPoint[index].style["box-sizing"]};
								border:${tagsPoint[index].style.border};
							`;
							let ele = tagsPoint[index].aa.replace(/data-style/,`style=${style}`);
							console.log(ele);
							$(".review-code textarea").html($(".review-code textarea").html()+ele);
						});
						$(".review-code").show();
						
						// tagsPoint.aa.indexOf("")

						// $(".review-code textarea").html(`
						// 	tagsPoint.aa.

						// `);
					})();
					


				}else{
					alert("请拖入你需要的标签");
				}

			}else{
				alert("请拖拉框框把你生成的标签包含住");
			}
		});
	},
	calcPosition(wrapperBox){
		const left = wrapperBox.css("left").replace("px","")-0;
		const top = wrapperBox.css("top").replace("px","")-0;
		const width = wrapperBox.css("width").replace("px","")-0;
		const height = wrapperBox.css("height").replace("px","")-0;

		//计算出框框的4个角的坐标
		let point = {
			leftTop: [left,top],
			rightTop: [left+width,top],
			leftBottom:[left,top+height],
			rightBottom:[left+width,top+height]
		};
		return point;
	},
	reviewCode(arg){  //这个arg是jquery对象，arg[0]有outerHTML来获取元素的字符串形式
		// let aa = arg[0].outerHTML.replace(/(class="[^"]+")|(style="[^"]+")/g,"");
		let aa = arg[0].outerHTML.replace(/class="[^"]+"/g,"data-style");
		aa = aa.replace(/style="[^"]+"/g,"");
		aa = aa.replace(/[\s]+>/g,">");
		let style = {
			"width":arg.css("width"),
			"height":arg.css("height"),
			"top":arg.css("top"),
			"left":arg.css("left"),
			"display":arg.css("display"),
			"border":arg.css("border"),
			"padding":arg.css("padding"),
			"box-sizing":arg.css("boxSizing")
		}
		return {
			aa,
			style
		}
	}
}