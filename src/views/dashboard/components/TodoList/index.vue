<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="大哥要不你写点啥" @keyup.enter="addTodo" />
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input
        id="toggle-all"
        :checked="allChecked"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll({ done: !allChecked })"
      />
      <label for="toggle-all" />
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="todos.length" class="footer">
      <span class="todo-count">
        共
        <strong>{{ remaining }}</strong>
        条未完成
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">
            <template v-if="key=='all'">所有</template>
            <template v-else-if="key=='active'">未完成</template>
            <template v-else>已完成</template>
          </a>
        </li>
      </ul>
    </footer>
  </section>
</template>

<script>
import Todo from "./Todo.vue";
import { getTodo, deleteTodo, putTodo, addTodo } from "@/api/todos";

const STORAGE_KEY = "todos";
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
};

export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : w + "s"),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data() {
    return {
      visibility: "all",
      filters,
      todos: []
    };
  },
  created() {
    this.getTodolists();
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done);
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      
   
      return this.todos.filter(todo => todo.done===0).length;
    }
  },

  methods: {
    //请求todos
    async getTodolists() {
      const { data } = await getTodo();
      this.todos = data;
    },
    //添加事件
    addTodo(e) {
      const text = e.target.value;
      if (text.trim()) {
        addTodo(this.$qs.stringify({ things: text })).then(res => {
          this.getTodolists();
        });
      }
      e.target.value = "";
    },
    //修改状态
    toggleTodo(val) {
      let done;
      if (val.done === 1) {
        done = 0;
      } else {
        done = 1;
      }
      putTodo(val.id,this.$qs.stringify({done})).then(res=>{
          this.getTodolists()
      })
    },

    deleteTodo(todo) {
      deleteTodo(this.$qs.stringify({ids:todo.id})).then(res=>{
          this.getTodolists()
     })
    },
    //编辑
    editTodo({ todo, value }) {
       putTodo(todo.id,this.$qs.stringify({things:value})).then(res=>{
          this.getTodolists()
      })
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done);
      this.setLocalStorage();
    },
    toggleAll({ done }) {
      done=1;
      this.todos.forEach(todo => {
      putTodo(todo.id,this.$qs.stringify({done})).then(res=>{
          this.getTodolists()
      })
      });
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
