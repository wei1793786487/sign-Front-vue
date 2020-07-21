<template>
    <userform :is-edit="false" />
</template>

<script>
import userform from './component/form'

export default {
   name: 'CreateUser',
   components: { userform }
}
</script>

<style>

</style>