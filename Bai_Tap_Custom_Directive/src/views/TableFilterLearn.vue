<template>
  <div>
    <DemoTable :demo-data="demoData" :list-field="listField" />
  </div>
</template>

<script>
import DemoTable from '@/components/Tables/DemoTable';
import { mapState } from 'vuex'
export default {

    components: { DemoTable },
    mounted(){
      console.log(this);
    },
    data(){
      return {
        //cau hinh cac cot cho table
        listField: [
          {
            id: 1,
            title: 'ROUTE',
            fieldName: 'route',
            queryType: 'picker',
            listItem: [{id: 1, title:"AAA-AAA"}, {id: 2, title: "BBB-BBB"}, {id: 3, title: "CCC-CCC"}, {id: 4, title: "VVV-VVV"}]
          },
          {
            id: 2,
            title: 'Truck No',
            fieldName: 'truck_name',
            queryType: 'text'
          },
          {
            id: 3,
            title: 'Driver',
            fieldName: 'driver',
            queryType: 'text'
          },
          {
            id: 4,
            title: 'Date',
            fieldName: 'date',
            queryType: 'datepicker'
          },
          {
            id: 5,
            title: 'NBA',
            fieldName: 'nba',
            queryType: 'timepicker'
          },
        ]
      }
    },
    computed:{
    ...mapState({
      demoData: state => state.demoTableData
    })
  }

}
</script>

<style>

</style>