<script setup>
import { DayPilot } from 'daypilot-pro-vue';

const props = defineProps({
  event: DayPilot.Event,
});

</script>

<template>
<div class="scheduler-event">
  <div >{{ event.text() }}</div>
  <div>{{ event.duration().totalDays() }} дней</div>
  <div style="position: absolute; top: 5px; right: 5px;"><svg width='17' height='17' xmlns='http://www.w3.org/2000/svg'><path d='m 5,8 3,3 5,-5' style='fill:none;stroke:#ffffff;stroke-width:2;stroke-linejoin:round;stroke-linecap:butt' /></svg></div>
</div>
</template>

<style scoped>
.scheduler-event {
  position: absolute;
  inset: 0;
  padding: 5px;
  background-color: #4CAF50;
  color: white;
}
</style>
