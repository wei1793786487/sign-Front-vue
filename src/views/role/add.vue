<template>
    <roleform :is-edit="false" />
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