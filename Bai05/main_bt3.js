const statusArray = [
	{id: 1, showText: 'Dang hoc'},
	{id: 2, showText: 'Da ngu'}
]
var app = new Vue({
  el: '#root',
  data() {
  	return {
  		bill: 0, //bill hien tai
      listBills: []
  	};    
  },
  computed: {
  	//method khong nhan bien
  	//dau vao la data hay computed khac
  	//do no ko nhan vao tham so
  	getTip(){
     // return 0.1*this.bill;
  		if (this.bill < 50)
        return 0.2 * this.bill;
      if (this.bill < 200)
        return 0.15 * this.bill;
      return 0.1 * this.bill;
  		// return ar.length ? ar[0].showText : 'Khong ro trang thai';
  	},
  	getResult(){
  		// let ar = statusArray.filter(o => {
  		// 	return this.currentStatus === o.id
  		// });
  		// return ar.length ? ar[0].showText.length : 0;
  		return "Tong " + this.bill + " gom ca " + this.getTip;
  	}
  },
  methods: {
    onSubmitBill(){
      this.listBills.push({
        amount: this.bill
      });
      this.bill = 0;
      console.log(this.listBills);
    }
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
