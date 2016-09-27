import leftBox from './leftBox.vue';
import rightBox from './rightBox.vue';
import drag from './drag';
import input from './input';
import text from './text';
import code from './common/code';

Vue.config.debug = true;

const vm = new Vue({
	el:'#wrapper',
	components:{
		"construct":{
			template:'<p>证明在此也能写组件</p>'
		},
		leftBox,
		rightBox
	},
	data:{

	},
	methods:{

	}
});

drag.init();
input.init();
text.init();
code.init();

(function(){
	$("#wrapper").click(function(){
		$(".creatInput").remove();
		$(".toolbox").remove();
	});
	$("#wrapper").on("click",".flags",function(e){
		e.stopPropagation();
	});

	$(".review-code textarea").click(function(e){
		e.stopPropagation();
	});
	$(".review-code").click(function(){
		$(this).hide();
	});
})();



