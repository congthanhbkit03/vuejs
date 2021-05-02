<template>
    <div>
        <div v-for="(task) in todoList" :key="task.id" class="card">
            <div class="card-body">
                <h5 class="card-title">{{task.title}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{task.created_at}}</h6>             
                <a href="#" class="btn btn-success">{{task.status == 1 ? "Hoan thanh" : task.status== 2 ? "Chua hoan thanh" : "Huy"}}</a>
            </div>            
        </div>
        
    </div>
</template>

<script>
export default {
    props: ["todoList"],    //todoList co duoc dua vao prop todo-list truyen tu parent la todoList
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
    }
}
</script>
