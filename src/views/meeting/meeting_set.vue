<template>
    <meetingform :is-edit="true" />
</template>

<script>
import meetingform from './component/form'

export default {
   name: 'EditMeeting',
   components: { meetingform }
}
</script>

<style>

</style>