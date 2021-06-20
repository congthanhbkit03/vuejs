<template>
  <table class="table">
  <thead>
    <tr>
      <th scope="col" v-for="(header, idx) in listField" :key="header.id">
        <span>{{header.title}}</span>
        
        <input v-if="header.queryType === 'text'" type="text" v-model="filters[idx].value" @blur="filterForm" class="header-filter-input"/>
        
        <div v-if="header.queryType === 'picker'">
          <select @change="filterForm" v-model="filters[idx].value">
          <!-- <select @change="(e) => {handleChangeSelect(header.value, e);}"> -->
            <option selected value="">-- Mac dinh--</option>
            <option v-for="ite in header.listItem" :key="ite.id" :value="ite.title">{{ite.title}}</option>

          </select>
        </div>
        
        <div class="dt" v-if="header.queryType === 'datepicker'">
          <date-picker @change="filterForm" v-model="filters[idx].value" range type="date" format="YYYY-MM-DD"></date-picker>        
        </div>
        <div class="dt" v-if="header.queryType === 'timepicker'" >
          <date-picker @change="filterForm" v-model="filters[idx].value" range type="time" format="hh:mm:ss a"></date-picker>
        </div>
        
      </th>     
    </tr>
  </thead>
  <tbody>
    <tr v-for="rec in filterData" :key="rec.id">
      <td v-for="field in listField" :key="rec.id + field.id">{{rec[field.fieldName]}}</td>      
    </tr>    
  </tbody>
</table>
</template>

<script>
import  DatePicker  from 'vue2-datepicker'
import 'vue2-datepicker/index.css';
import axios from 'axios'
import moment from 'moment'
export default {
  props: [ "demoData", "listField" ],
  data(){
    return {
      filters: {},  //filters chua thong tiin can filter
      filterData: null
    }
  },
  components: {
    DatePicker
  },
  created(){
    this.filters = [...this.listField.map(obj => {
        return {title: obj.title, fieldName: obj.fieldName, queryType: obj.queryType, value: ''}
    })];
    this.filterData = [...this.demoData];
    console.log(this.filters);
  },
  computed: {
    // filters(){
    //   return this.listField.map(obj => {
    //     return {title: obj.title, id: obj.id, field_name: obj.fieldName}
    //   })
    // },
  },
  methods: {
    filterForm(){
      console.log(this.filters);
      
      axios.get('', 
        {params: this.filters})
        .then((res)=> {
          console.log('du lieu fake tra ve res');
          this.filterData = [...this.locDuLieu(this.demoData, this.filters)]; 
        })
    },
    locDuLieu(demoData, filters){
      console.log(filters)
      let result = [...demoData]
      //duyet qua tung field trong filters va loc
      filters.forEach((filter, idx) => {
        // console.log(filter);
        if (filter.queryType === "text" || filter.queryType ==="picker"){
          // result = result.filter( item => {

          // })
          result = [...this.filterByTextContains(result, filter.fieldName, filter.value)]
          console.log(idx + " result:")
          console.log(result)
        }

        if (filter.queryType === "datepicker" && filter.value.length > 1){
          result = [...this.filterByDateBetween(result, filter.fieldName, filter.value[0], filter.value[1], "YYYY-MM-DD")]
        }

        if(filter.queryType === "timepicker" && filter.value.length > 1){
          result = [...this.filterByTimeBetween(result, filter.fieldName, filter.value[0], filter.value[1])]
        }
      });
      return result;
    },

    //kiem tra item co trong
    thoaman (item, filters) {
      console.log('Filters: ')
      console.log(filters);
      console.log('-----item-----')
      console.log(item);
      // filters.for (const key in filters) {
      //   if (Object.hasOwnProperty.call(object, key)) {
      //     const element = object[key];
          
      //   }
      // }
    },

    filterByTextContains (list, fieldName, fieldValue) {
      // console.log('list')
      // console.log(list)
      // console.log('fieldName')
      // console.log(fieldName)
      return list.filter(item => {
      //  console.log('item')
      //console.log(item[fieldName])
          if(item[fieldName] !== undefined && item[fieldName] !== null) {
              return item[fieldName].match(fieldValue)
          } else {
              return true
          }
      })
    },

    filterByDateBetween (list, fieldName, fieldValue1, fieldValue2, format) {
        // format = format || this.dateFilterFormat
        return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return moment(item[fieldName]).isBetween(moment(fieldValue1, format), moment(fieldValue2, format), 'day', '[]')
            } else {
                return true
            }
        })
    },

    filterByTimeBetween(list, fieldName, fieldValue1, fieldValue2){
      const format = 'hh:mm:ss A'
      return list.filter(item => {
            if(item[fieldName] !== undefined) {
                return moment(item[fieldName], format).isBetween(moment(fieldValue1, format), moment(fieldValue2, format))
            } else {
                return true
            }
        })
    }
  }
}
</script>

<style>
  input.header-filter-input, thead tr th span{
    display: block;
  }

  .dt .mx-datepicker-range{
    width: 200px;
  }
</style>