<template>
    <div class="container">
        <div class="form-group search-bar">
            <input type="text" class="form-control bg-white box-3d"  placeholder="Tìm kiếm">
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

        <div class="taskList mx-3">
            <TaskList :todo-list="todoList" />
        </div>
    </div>
</template>

<script>
import TaskList from '@/components/Shared/TaskList';
export default {
    data(){
        return {
            categories: [
                {id: 1, text: 'Chung chung'},
                {id: 2, text: 'Cong viec'},
                {id: 3, text: 'Phai hoan thanh'},
                {id: 4, text: 'So thich'},
            ],
            statusList: [
                {
                    id: 1, text: 'Hoan thanh'
                },
                {
                    id: 2, text: 'Dang thuc hien'
                },
                {
                    id: 3, text: 'Huy'
                }
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
            //cho hien thi loadding
            loadingButton: false
        }       
        
    },
    components:{
        TaskList
    },
    methods:{
        handleSubmit(){
            //console.log(this.formData);
            this.loadingButton = true;
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
        }
    }
};
</script>

<style>

</style>