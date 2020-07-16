<template>
    <meetingform :is-edit="true" />
</template>

<script>
import meetingform from './component/form'

export default {
   name: 'CreateMeeting',
   components: { meetingform }
}
</script>

<style>

</style>