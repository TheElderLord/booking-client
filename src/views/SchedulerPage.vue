
  
<script setup>
import { DayPilot, DayPilotScheduler } from 'daypilot-pro-vue';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import EventContent from '../components/EventContent.vue';
import axios from 'axios';

import {  createRecord, deleteRecord, fetchBookHistory,  } from "../utils/adminRoomsHistory";
import { fetchRooms } from '../utils/adminRooms';

const currentDate = ref(new Date()); // Assuming you have the current date

const windowWidth = ref(window.innerWidth);

const config = reactive({
    locale: "ru-ru",
    timeHeaders: [
        {
            groupBy: "Month",
        },
        {
            groupBy: "Day",
            format: "d",
        },
    ],
    scale: "Day",
    days: DayPilot.Date.today().daysInMonth(),
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
        const dp = args.control;
        const modal = await DayPilot.Modal.prompt("Добавить новую запись:", "Запись 1");
        dp.clearSelection();
        if (modal.canceled) { return; }
        const object = {
            start: new Date(args.start.value).toLocaleDateString("ru-RU"),
            end: new Date(args.end.value).toLocaleDateString("ru-RU"),
            firstname: modal.result,
            lastname: ""
        }
        const id = args.resource;
        // console.log(id, object)
        createBook(object, id);
        dp.events.add({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: modal.result
        });
    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
        args.control.message("Запись изменен: " + args.e.text());
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
        args.control.message("Запись : " + args.e.text());
    },
    eventDeleteHandling: "Update",
    onEventDeleted: async (args) => {
        try {
            // Get the id of the event to delete
            const eventId = args.e.id();
            deleteHistory(eventId);

            args.control.message("Запись удалена");
        } catch (error) {
            console.error("Error deleting event:", error);
            // Show an error message if deletion fails
            args.control.message("Error deleting event");
        }
    },
    eventClickHandling: "Select",
    onEventEdited: (args) => {
        args.control.message("Запись выбрана: " + args.e.text());
    },
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
        onLoad: (args) => {
            // if the event object doesn't specify "bubbleHtml" property
            // this onLoad handler will be called to provide the bubble HTML
            args.html = "Подробности записи";
        }
    }),
    rowHeaderWidthAutoFit: false,
    rowHeaderWidth: 250,
    resources: [] // Initialize resources array
});

const events = ref([]);

const schedulerRef = ref(null);

const onResize = () => {
    //   console.log(this.showMenu)
    windowWidth.value = window.innerWidth;
    if (windowWidth.value <= 640) {
        config.rowHeaderWidth = 140
    }
    else {
        config.rowHeaderWidth = 250
    }
};
const getRooms = async () => {
    try {
        const roomsData = await fetchRooms();
        // console.log(roomsData)
        const formattedRooms = roomsData.map(room => ({
            name: room.title.split(",")[3],
            id: room.id,
        }));

        config.resources = formattedRooms;
    } catch (error) {
        console.error("Error fetching rooms:", error);
    }
};
const formatDate = (dateString) => {
    // Split the dateString by commas and take the first part (date part)
    const datePart = dateString.split(',')[0];
    // Split the date part by dots to get individual date components
    const [day, month, year] = datePart.split('.');
    // Construct a new Date object using the parsed date components (month - 1 because months are zero-based)
    return new Date(`${year}-${month}-${day}`);
};
const createBook = async (value, id) => {
    const bookbody = {
        firstname: value.firstname,
        lastname: value.lastname,
        start: value.start,
        end: value.end,

    };
    // console.log(bookbody);
    try {
        await createRecord(bookbody);
    } catch (err) {
        console.log(err);
    }

};
const deleteHistory = async (id) => {
    try {
        await deleteRecord(id);
        await getBookHistory();

    } catch (err) {
        console.log(err);
    }
};

const getBookHistory = async () => {
    try {

        const roomsData = await fetchBookHistory();
        // console.log(roomsData)

        const formattedEvents = roomsData.map(room => ({
            id: room.id,
            start: formatDate(room.startDate),
            end: formatDate(room.endDate),
            text: room.firstname,
            resource: room.roomId,
        }));

        events.value = formattedEvents
    } catch (error) {
        console.error("Error fetching rooms:", error);
    }
};

const back = () => {
    const prevMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
    currentDate.value = prevMonth;
    config.startDate = currentDate.value.toISOString().slice(0, 10);
};

const next = () => {
    const nextMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
    currentDate.value = nextMonth;
    config.startDate = currentDate.value.toISOString().slice(0, 10);
};

onMounted(() => {
    // loadEvents();
    getRooms();
    getBookHistory();
    window.addEventListener("resize", onResize);
    // schedulerRef.value?.control.message("Welcome!");
});
onUnmounted(() => {
    window.removeEventListener("resize", onResize);
});
</script>
<template>
    <v-btn @click="back()" class="m-4">Предыдущий месяц</v-btn>
    <v-btn @click="next()" class="m-4 float-end">Следующий месяц</v-btn>
    <DayPilotScheduler :config="config" :events="events" ref="schedulerRef" />
</template>
../utils/adminRoomsHistory