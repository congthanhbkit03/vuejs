<template>
    <div class="container">
        <div class="form-group search-bar">
            <input @keyup.enter="timKiemtheoText(textQuery)" type="text" class="form-control bg-white box-3d" v-model="textQuery" placeholder="Tìm kiếm">
        </div>
        <div class="form-group search-bar row">
            <div class="col-6">
                <label for="tieude" >Tiêu đề</label>
                <input id="tieude" type="text" class="form-control bg-white box-3d" v-model="formData.title" placeholder="Nhập tiêu đề">
            </div>
            <div class="col-6">
                <label for="danhmuc">Danh mục</label>
                <select id="danhmuc" class="form-control" v-model="selectedCat" >
                    <option v-for="(cat, idx) in categories" :value="cat.id" :key="idx">{{cat.text}}</option>                  
                </select>
            </div>
            <div class="col-12">
                <label for="noidung">Nội dung</label>
                <textarea id="noidung" type="text" class="form-control bg-white box-3d" rows="3"  placeholder="Nội dung" v-model="formData.content">
                </textarea>
            </div>
            <div class="col-12">                
                <button @click="handleSubmit" class="btn btn-success w-100" :disabled="loadingButton">Thêm công việc</button>
            </div>
            
        </div>
        <!-- hien thi error tai day -->
        <div class="col-12" v-if="formErrors.length">
            {{formErrors.length}}
            <p>De nghi chinh lai cac loi sau</p>
            <ul>
                <li v-for="(err, idx) in formErrors" :key="idx">{{err}}</li>
            </ul>
        </div>
        <div class="catList">
            <CatListShow :categories="categories" :filter-by-cat="filterByCat"/>
        </div>
        <div class="taskList mx-3">
            <TaskList :todo-list="filterList || todoList" :categories="categories" :handle-update-task="handleUpdateTask"/>
        </div>
    </div>
</template>

<script>
import TaskList from '@/components/Shared/TaskList';
import CatListShow from '@/components/Shared/CatListShow';

export default {
    data(){
        return {
            textQuery: "",
            categories: [
                {id: 1, text: 'Chung chung'},
                {id: 2, text: 'Cong viec'},
                {id: 3, text: 'Phai hoan thanh'},
                {id: 4, text: 'So thich'},
            ],
            statusList: [
                {
                    id: 1, text: 'Dang thuc hien'
                },
                {
                    id: 2, text: 'Hoan thanh'
                },
                // {
                //     id: 3, text: 'Huy'
                // }
            ],
            formData: {},
            formErrors: [], //for validation form
            selectedCat: null,
            // todoList: [
            //     {
            //         id: 1,
            //         title: 'Cong viec thu nhat',
            //         status: 1,
            //         category: 3,
            //         created_at: '2021-04-30 00:00:00'
            //     },                
            // ],
            todoList: [],
            filterList: null,
            //cho hien thi loadding
            loadingButton: false
        }       
        
    },
    components:{
        TaskList, CatListShow
    },
    methods:{
        handleSubmit(){
            //console.log(this.formData);
            this.loadingButton = true;
            this.filterList = null;
            //validateioin
            this.validateForm();
            if (this.formErrors){
                
                //xu ly du lieu tu form truoc khi goi len server
                let params = {...this.formData}; //ES6
                params.id = new Date().getTime();
                params.status = 1;
                params.category = this.selectedCat;
                params.created_at = new Date();
                // console.log(params);
                
                //fake call to server - cho 1s
                setTimeout(()=>{
                    this.loadingButton = false;
                    //random trang thai server - true / false
                    let randomResponse = Math.floor(Math.random() * 10) % 2;
                    if (randomResponse == 0){
                        //ThanhBC: tu sua - params la object - gan vay todoList la object -> sai
                        //this.todoList = params;
                        this.todoList.push(params);
                        this.resetForm();
                        console.log("call API thanh cong - this.todoList luc nay: ");
                        console.log(this.todoList);
                        this.resetForm();
                    } else {
                        console.log("call API that bai");
                    }
                }, 1000); 
            }
                      

        },
        
        resetForm(){
            this.formData = {};
            this.selectedCat = null
        },

        validateForm(){
            this.formErrors = [];
            if (!this.formData.title )
                this.formErrors.push("Khong duoc de tieu de trong");
            if (!this.formData.content )
                this.formErrors.push("Khong duoc de noi dung trong");
            if (!this.selectedCat)
                this.formErrors.push("Ban chua chon danh muc");
        },

        handleUpdateTask(type, payload){
            //kien truc FLUX - statement management
            switch(type){
                case "finish":
                    this.chuyenTTsangFinish(payload);
                    break;
                case "redo":
                    this.redoTask(payload);
                    break;
                case "remove":
                    this.removeTask(payload);
                    break;
                default:
                    break;
            }
        },

        //todoList la state ben view nay - prop ben TaskList nen can CRUD thi phai ben nay
        chuyenTTsangFinish(_task){
            if (!_task){
                return;
            }
            let arrT = [...this.todoList];
            arrT.forEach(element => {
                if (_task.id === element.id){
                    element.status = 2; //chuyen sang hoan thanh
                    // break;
                }
            });
            //cap nhat todoList de thay doi dien ra tren view
            // this.todoList = [...arrT];
            this.todoList = arrT;
        },
        redoTask(_task){
            if (!_task){
                return;
            }
            let arrT = [...this.todoList];
            arrT.forEach(element => {
                if (_task.id === element.id){
                    element.status = 1; 
                    // break;
                }
            });
            //cap nhat todoList de thay doi dien ra tren view
            // this.todoList = [...arrT];
            this.todoList = arrT;
        },
        removeTask(_task){
            // if (!_task){
            //     return;
            // }
            
            // this.todoList = [...arrT];
            this.todoList = [...this.todoList.filter(o=> {
                return o.id !== _task.id;
            })];
        },
        timKiemtheoText(_text){
            if (!_text){
                this.filterList = null;
                return;
            }
            this.filterList = [...this.todoList.filter(o=>{
                return o.title.includes(_text);
            })];
        },
        filterByCat(_cat){
            this.filterList = null;
            this.filterList = [...this.todoList.filter(i=>{
                return i.category === _cat.id;
            })];
            console.log("co goi o parent filterbycat");
            console.log(this.todoList);
        }
    }
};
</script>

<style>

</style>