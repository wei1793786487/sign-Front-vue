<template>
    <roleform :is-edit="true" />
</template>

<script>
import meetingform from './component/form'

export default {
   name: 'CreateRole',
   components: { roleform }
}
</script>

<style>

</style>