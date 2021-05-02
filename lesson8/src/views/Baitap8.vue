<template>
  <div>
    <h1>Bai tap 8 - dynamic table</h1>
    <button @click='taotable'>Tao table</button>

    <button @click="xoatable">xoa table</button>
    <br>
    <button @click="themdong">Them dong moi</button>
    <br>
    <input type="text" name="" id="" v-model="idx"> <button @click="xoadong()">Xoa dong</button> | <button @click="xoacot()">Xoa cot</button>

    <table v-if="hasTabel" border="1px">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
        <tr v-for="(data, k) in table_data" :key="k">
            <td>{{data.id}}</td>
            <td>{{data.name}}</td>
            <td>{{data.email}}</td>
        </tr>
    </table>
  </div>
</template>

<script>
export default {
    data(){
        return {
            hasTabel: false,
            table_data: [{                
            }],
            idx: -1
        }
    },
    methods:{
        taotable(){
            console.log("Tao table");
            this.hasTabel = true;            
        },
        xoatable(){
            this.hasTabel = false;
            this.table_data = [];
        },
        themdong() {            
            this.table_data.push({
                id: this.table_data.length,
                name: '',
                email: ''
            });
        },
        xoadong() {            
            if (this.idx > -1) {
                this.table_data.splice(this.idx, 1);
            }
        },
        xoacot(){
            console.log("dang hien thuc");
        }
    }
};
</script>
