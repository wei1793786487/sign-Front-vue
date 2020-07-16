<template>
    <meetingform :is-edit="false" />
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