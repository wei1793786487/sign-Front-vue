<template>
  <div class="components-container">
    <aside>
       请上传您要添加的人脸，注意照片的名称为人员的名称。<br>
       无法上传姓名过长用户。
    </aside>
    <div class="editor-container">
      <dropzone id="myVueDropzone"  url="https://www.hqgml.com/api/upload/person" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
    </div>
  </div>
</template>

<script>
import Dropzone from '@/components/Dropzone'
import {deleteByUrl} from "@/api/person";
export default {
  name: 'DropzoneDemo',
  components: { Dropzone },
  methods: {
    dropzoneS(file) {
  
   },
    dropzoneR(file) {
      //   let res= JSON.parse(file.xhr.response)
      //   deleteByUrl(this.$qs.stringify({url:res.data})).then(res=>{
      //   if(res.data==200){
      //   // this.$message({ message: '删除成功', type: 'success' })
      //   }else if(res.code!=400){
      //     // console.log(res.code);
          
      //   // this.$message.error(res.data);
      //   }      
      // })
    }
  }
}
</script>

<style scoped >
.components-container {
  margin: 30px 50px;
  position: relative;
}
aside {
  background: #eef1f6;
  padding: 8px 24px;
  margin-bottom: 20px;
  border-radius: 2px;
  display: block;
  line-height: 32px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>
