<template>
  <!-- 
  Biết cách quản lý state
  Tạo, truyền components
  Sử dụng event bus

 -->
  <div class="container">
    <p>{{ myText }}</p>
    <div class="form-group search-bar">
      <input v-model="formQuery.textQuery" type="text" class="form-control bg-white box-3d" placeholder="Tìm kiếm nhanh ghi chú của bạn" />
    </div>
    <div class="form-group search-bar row">
      <div class="col-6">
        <label for="title" class="label-for-input font-weight-bold text-left d-block">Tiêu đề</label>
        <input id="title" v-model="formData.title" type="text" class="form-control bg-white box-3d" placeholder="Tiêu đề" />
      </div>
      <div class="col-6">
        <label class="label-for-input font-weight-bold text-left d-block">Danh mục</label>
        <select v-model="selectedCate" class="custom-select mb-3 box-3d">
          <option v-for="(item, idx) in categories" :key="idx" :value="item.id">{{ item.text }}</option>
        </select>
      </div>
      <div class="col-12">
        <label for="content" class="label-for-input font-weight-bold text-left d-block">Nội dung</label>
        <textarea id="content" v-model="formData.content" class="form-control bg-white box-3d" rows="3" placeholder="Nội dung"></textarea>
      </div>
      <div class="col-12 mt-3">
        <button v-if="!isEditForm" type="button" class="btn btn-success w-100" @click="handleSubmit" :disabled="loadingBtn">Thêm mới</button>
        <button v-else type="button" class="btn btn-success w-100" @click="handleEditSaveSubmit" :disabled="loadingBtn">Cap nhat</button>
      </div>
      <div class="col-12 mt-3 d-flex align-items-center">
        <div v-for="(item, idx) in categories" :key="idx" :value="item.id">
          <input type="checkbox" v-model="formQuery.cateQuery" :value="item.id" :id="`cate-${item.id}`" />
          <label :for="`cate-${item.id}`" class="mb-0 mr-3">{{ item.text }}</label>
        </div>
      </div>
      <div class="taskList mt-4 col-12">
        <TaskList :todo-list="filterList || todoList" :categories="categories" :handle-finish-task="handleFinishTask" :handle-update-task="handleUpdateTask" @handleUpdateText="setText" />
      </div>
    </div>
  </div>
</template>

<script>
  // l1 : search local - search phía client
  // l2 : search sever
  // watching data
  // 1 : search nhưng xài computed
  // 2 : improve search module - 1 : không phân biệt hoa thường . 2 : giảm số lần search
  // 3 : tạo components để lọc theo categories - lọc kiểu &&
  import TaskList from "@/components/Shared/TaskList";
  export default {
    data() {
      return {
        categories: [
          {
            id: 1,
            text: "Không có",
          },
          {
            id: 2,
            text: "Sở thích",
          },
          {
            id: 3,
            text: "Công việc",
          },
          {
            id: 4,
            text: "Du lịch",
          },
        ],
        statusList: [
          {
            id: 1,
            text: "Mới",
          },
          {
            id: 2,
            text: "Đã xong",
          },
          {
            id: 3,
            text: "Hủy",
          },
        ],
        formData: {},
        isEditForm: false,
        selectedCate: null,
        loadingBtn: false,
        todoList: [],
        filterList: null,
        myText: "Hello todo list",
        textQuery: "",
        cateQuery: [],
        formQuery: {
          textQuery: "",
          cateQuery: [],
        },
        listCounter: [{ a: 1 }],
        refQuery: null, // coi như 1 cái cờ (flag)
        // string number boolean  thì thay đổi nghĩa là giá trị thay đổi vd : 1 -> 2
        // Object, array  ... thì thay đổi nghĩa là địa chỉ ô nhớ thay đổi. shallow watch
        // vd a = { a:"1"} -> a = {a:"2"} || a = { a: "1"} -> a.a = "2" . deep watch,
      };
    },
    // watching data / subscribe
    components: {
      TaskList,
    },
    watch: {
      //  c1 : methods --- key : fn()
      // textQuery(newValue, oldValue) {
      //   // cung cấp 2 biến : optional
      //   console.log(newValue, oldValue);
      //   // param1 : newValue - giá trị mới - sau thay đổi
      //   // param2 : oldValue - giá trị cũ - trước thay đổi

      //   if (this.refQuery) {
      //     clearTimeout(this.refQuery);
      //   }

      //   this.refQuery = setTimeout(() => {
      //     this.handleFilterTaskByText(this.textQuery);
      //     this.refQuery = null;
      //   }, 700);
      // },
      formQuery: {
        deep: true,
        handler() {
          if (this.refQuery) {
            clearTimeout(this.refQuery);
          }

          this.refQuery = setTimeout(() => {
            this.handleFilterTask();
            this.refQuery = null;
          }, 700);
        },
      },

      // listCounter() {
      //   console.log(this.listCounter);
      // },
      // c2 : object --- key : Object
      // listCounter: {
      //   deep: true, // deep watch or not
      //   handler() {
      //     console.log(this.listCounter);
      //   },
      // },
    },
    methods: {
      handleSubmit() {
        this.loadingBtn = true;
        let params = { ...this.formData }; // spread ES6
        params.category = this.selectedCate;
        params.created_at = new Date();
        params.status = 1;
        // 1 : mới - 2 : Đã hoàn thành
        params.id = new Date().getTime();
        //  Mọi người tự valid data

        // Fake call api lên sever với khoảng chờ là 1s
        setTimeout(() => {
          this.loadingBtn = false;
          let randomResponse = 1;// Math.floor(Math.random() * 10) % 2;
          if (randomResponse) {
            this.resetForm();
            this.todoList.push(params);
            console.log("call api thành công");
          } else {
            console.log("call api thất bại");
          }
        }, 1000);

        console.log(`todoList luc nay ${this.todoList}`);
      },
      handleEditSaveSubmit(){ //xu ly khi luu form trong truong hop Edit form
        console.log("Luu form khi edit");

        if (!this.formData) {
          return;
        }
        let ar1 = [...this.todoList];
        // copy -> filter -> thay đổi phần tử đó -> filter -> change
        // copy -> tìm index -> splice tại vị trí đó
        ar1.forEach(o => {
          if (o.id === this.formData.id) {
            o.title = this.formData.title;
            o.content = this.formData.content;
            o.category = this.selectedCate;
            o.updated_at = new Date().getTime();
          }
        });
        this.todoList = [...ar1];
        console.log("todolist sau khi cap nhat");
        console.log(this.todoList);
        //hoan thanh thi reset form 
        this.resetForm();
        this.isEditForm = false;
      },
      resetForm() {
        this.formData = {};
        this.selectedCate = null;
      },
      handleUpdateTask(type, payload) {
        // ví dụ cực kì cơ bản của kiến trúc flux - được sử dụng nhiều trong các state management
        // combine vào 1 hàm và xử lý
        switch (type) {
          case "finish":
            this.handleFinishTask(payload);
            break;
          case "redo":
            this.handleRedoTask(payload);
            break;
          case "remove":
            this.handleRemoveTask(payload);
            break;
          case "edit":
            this.handleEditTask(payload);
            break;
          default:
            break;
        }
      },
      handleEditTask(_task){
        console.log(_task);
        console.log(this.todoList);
        
        //dua du lieu cu len form
        this.formData.id = _task.id;
        this.formData.title = _task.title;
        this.formData.content = _task.content;
        this.selectedCate = _task.category;

        //thiet lap isEditForm = true
        this.isEditForm = true;
      },
      handleFinishTask(_task) {
        if (!_task) {
          return;
        }
        let ar1 = [...this.todoList];
        // copy -> filter -> thay đổi phần tử đó -> filter -> change
        // copy -> tìm index -> splice tại vị trí đó
        ar1.forEach(o => {
          if (o.id === _task.id) {
            o.status = 2;
          }
        });
        this.todoList = [...ar1];
      },
      handleRedoTask(_task) {
        console.log("on redo");
        if (!_task) {
          return;
        }
        let ar1 = [...this.todoList];
        ar1.forEach(o => {
          if (o.id === _task.id) {
            o.status = 1;
          }
        });
        this.todoList = [...ar1];
      },
      handleRemoveTask(_task) {
        if (!_task) {
          return;
        }
        this.todoList = [
          ...this.todoList.filter(o => {
            return o.id !== _task.id;
          }),
        ];
      },
      setText(_value) {
        this.myText = _value;
        console.log(_value);
      },
      // debounce - 1 function sẽ được thực thi sau 1 khoảng thời gian nếu không bị trigger lại lần nữa.
      // throttle
      handleFilterTaskByText() {
        // 700 - 1200 ms
        //
        // let result = null;
        console.log("filter triggered");
        if (!this.formQuery.textQuery) {
          // result = null;
          return;
        }
        this.filterList = [
          ...this.filterList.filter(o => {
            return o.title.includes(this.formQuery.textQuery);
          }),
        ];        
      },
      handleFilterTaskByCats() {
        
        console.log("handleFilterTaskByCats");
        if (!this.formQuery.cateQuery.length) {
          // result = null;
          return;
        }
        this.filterList = [
          ...this.filterList.filter(o => {
            return this.formQuery.cateQuery.includes(o.category);
          }),
        ];
        
      },
      onPushRandomNumber() {
        console.log(Math.random());
        this.listCounter[0].a = Math.random();
      },

      handleFilterTask() {
        this.filterList = [...this.todoList];
        console.log("imma filting task with ", this.formQuery);
        this.handleFilterTaskByText();
        this.handleFilterTaskByCats();
      },
      handleResetFilter() {
        this.formQuery = {
          textQuery: "",
          cateQuery: [],
        };
      },
      handleCurrentCateFilter(event) {
        let index = this.cateQuery.findIndex(o => {
          return o === event.target.value;
        });
        index === -1 ? this.cateQuery.push(event.target.value) : this.cateQuery.splice(index, 1);

        console.log(this.cateQuery);
      },
    },
  };
</script>

<style>
  .box-3d {
    box-shadow: 1px 2px 1px 1px rgb(163 160 160);
  }
  .label-for-input {
    font-size: 18px;
  }
  .text-left {
    text-align: left;
  }
</style>
