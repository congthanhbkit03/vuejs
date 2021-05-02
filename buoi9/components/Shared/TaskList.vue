<template>
    <div>
        <div v-for="(task) in todoList" :key="task.id" class="card" :class="task.status === 1 ? 'alert-primary' : 'alert-success'">
            <div class="card-body">
                <h5 class="card-title">{{task.title}} - Danh muc:<a href="#"> {{getCateById(task.category)}} </a></h5>
                <h6 class="card-subtitle mb-2 text-muted">{{task.created_at}}</h6>             
                <button v-if="task.status==1" class="btn btn-success" @click="chuyenFinish(task)">Hoan thanh</button> &nbsp;
                <button v-else class="btn btn-secondary" @click="redoTask(task)">Chua hoan thanh</button> &nbsp;
                <button @click="removeTask(task)" class="btn btn-danger">Xoa</button>
            </div>            
        </div>
        
    </div>
</template>

<script>
export default {
    props: ["todoList", "categories", "handleUpdateTask"],
    data(){
        return {
            // todoList: [
            //     {
            //         id: 1,
            //         title: 'DEV TEST',
            //         created_at: new Date(),
            //         status: 1
            //     }
            // ]
        }
    },
    methods: {
        getCateById(_id){
            return this.categories.filter(o=>{
                return o.id == _id;
            }).length ? this.categories.filter(o=>{
                return o.id == _id;
            })[0].text : "Chua gan danh muc";
        },
        chuyenFinish(_task){
           // console.log(this.chuyenSangFinish);
            this.handleUpdateTask("finish", _task);
           // console.log("XXXXXXx");
           //console.log(_task);
        },
        redoTask(_task){
            this.handleUpdateTask("redo", _task);
        },
        removeTask(_task){
            this.handleUpdateTask("remove", _task);
        }
    }
}
</script>
