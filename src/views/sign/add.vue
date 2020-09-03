<template>
  <el-card  >
    <el-autocomplete
      style="width:400px "
      popper-class="my-autocomplete"
      v-model="searchMeetingList"
      :fetch-suggestions="querySearchAsync"
      placeholder="请选择会议"
      @select="handleSelect"
      @clear="clearHandle"
      clearable
    >
      <template slot="prepend">会议选择</template>
      <template slot-scope="{ item }">
        <div class="name">名称：{{ item.meetingName }}</div>
        <span class="addr">地点：{{ item.meetingAddress + item.addressName}}</span>
      </template>
    </el-autocomplete>
    <br />
    <br />
    <br />

    <el-transfer
      :titles="['非会议人员', '会议人员']"
      :button-texts="['移除人员', '添加人员']"
      @change="handleChange"
      v-model="value"
      filterable
      filter-placeholder="请输入人员姓名"
      :data="data"
    ></el-transfer>
    <!-- {{choseMid}} -->
    <!-- {{meetingList}} -->
    <!--<br>
    {{value}}-->
  </el-card>
</template>

<script>
import { getMeetingList, addPersonToMeeting,removePersonToMeeting } from "@/api/meeting";
import { getBelongList } from "@/api/person";
export default {
  data() {
    return {
      data: [],
      value: [],
      searchMeetingList: "",
      meetingList: "",
      choseMid: "",
      belongPerson: "",
      unBelongPerson: "",
      persons: "",
      
      //原本的右侧的数据
      leftData: ""
    };
  },
  created() {
    // this.initPerson();
  },
  methods: {
    querySearchAsync(qs, cb) {
      getMeetingList({ meetingName: qs || "" })
        .then(res => {
          this.meetingList = res.data;
          cb(this.meetingList);
        })
        .catch(res => {
          cb("");
        });
    },
    clearHandle() {
      this.data = [];
      this.value = [];
    },
    handleSelect(data) {
      this.data = [];
      this.value = [];
      this.choseMid = data.id;
      // //不属于会议的人员
      // this.getBelongList(0);
      //属于会议的人员
      this.getBelongList(1);
      //属于改会议的所有人员
      this.getBelongList(2);
    },
    handleChange(value, direction, movedKeys) {
      console.log(direction);
      if (direction === "right") {
        addPersonToMeeting(
          this.$qs.stringify(
            { mid: this.choseMid, pids: movedKeys },
            { arrayFormat: "repeat" }
          )
        ).then(res => {
          console.log(res);
        });
      }
      if (direction === "left") {
        removePersonToMeeting(
          this.$qs.stringify(
            { mid: this.choseMid, ids: movedKeys },
            { arrayFormat: "repeat" }
          )
        ).then(res => {
          console.log(res);
        });
        console.log(movedKeys);
      }
    },
    getBelongList(type) {
      getBelongList({ type: type, mid: this.choseMid }).then(res => {
        if (type === 2) {
          this.persons = res.data;
          this.persons.forEach(element => {
            this.data.push({
              key: element.id,
              label: element.personName,
              disabled: false
            });
          });
        } else if (type === 0) {
          this.unBelongPerson = res.data;
        } else {

          this.belongPerson = res.data;
          console.log(res.data);
          
          this.belongPerson.forEach(element => {

            this.value.push(element.id);
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.line {
  text-align: center;
}
.el-divider__text {
  font-size: 20px;
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>

