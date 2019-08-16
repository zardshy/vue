<template>
  <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="日期" :label-width="formLabelWidth">
        <el-input v-model="form.date1" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.region" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return{
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods:{
    openDialog(v){
      console.log(v)
      this.dialogFormVisible=true;
      this.form.name=v.name;
      this.form.region=v.address;
      this.form.date1=v.date;
    }
  }
}
</script>