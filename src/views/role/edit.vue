<template>
    <roleform :is-edit="true" />
</template>

<script>
import roleform from './component/form'

export default {
   name: 'CreateRole',
   components: { roleform }
}
</script>

<style>

</style>