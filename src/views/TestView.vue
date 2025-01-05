<template>
    <div>
        <div id="map" style="height: 500px; width: 100%;"></div>
    </div>
</template>

<script>
export default {
    name: 'YandexMap',
    data() {
        return {
            map: null,
            searchControl: null,
            marker: null
        };
    },
    mounted() {
        this.initializeMap();
    },
    methods: {
        initializeMap() {
            ymaps.ready(() => {
                var inputSearch = new ymaps.control.SearchControl({
                    options: {
                        // Пусть элемент управления будет
                        // в виде поисковой строки.
                        size: 'large',
                        // Включим возможность искать
                        // не только топонимы, но и организации.
                        provider: 'yandex#search'
                    }
                });
                    // Добавим поисковую строку на карту. 
                    // myMap = new ymaps.Map('map', {
                    //     zoom: 12,
                    //     center: [55.76, 37.64],
                    //     controls: [inputSearch]
                    // });
                this.map = new ymaps.Map('map', {
                    center: [43.262901, 76.910731], // Default center (Moscow)
                    zoom: 10,
                    controls: [inputSearch]
                });

                
            });
        }
    }
};
</script>

<style scoped>
#map {
    height: 500px;
    width: 100%;
}
</style>