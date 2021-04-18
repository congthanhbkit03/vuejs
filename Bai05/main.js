const statusArray = [
	{id: 1, showText: 'Dang hoc'},
	{id: 2, showText: 'Da ngu'}
]
var app = new Vue({
  el: '#root',
  data() {
  	return {
  		name: 'Thanh',
  		currentStatus: 3
  	};    
  },
  computed: {
  	//method khong nhan bien
  	//dau vao la data hay computed khac
  	//do no ko nhan vao tham so
  	getCurrentStatus(){
  		let ar = statusArray.filter(o => {
  			return this.currentStatus === o.id
  		});
  		return ar.length ? ar[0].showText : 'Khong ro trang thai';
  	},
  	getTextLength(){
  		// let ar = statusArray.filter(o => {
  		// 	return this.currentStatus === o.id
  		// });
  		// return ar.length ? ar[0].showText.length : 0;
  		return this.getCurrentStatus === 'Khong ro trang thai' ? 0 : this.getCurrentStatus.length;
  	}
  },
  methods: {

  }
});

//computed: 1 function co cac dac diem
//khong nhan bien
//data input la 1 state, 1 computed, props hoac 1 bien khai bao trong scope
//duoc coi nhu la 1 data binh thuong
//bat buoc phai tra ve 1 gia tri

//nhung cach su dung trong thuc te:
//dung computed thay data khi data duoc lay ve ma phai qua qua trinh xu ly
//dung computed de xu ly tiep 1 computed khac
