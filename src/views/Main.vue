<script src="./script/main">

</script>
<template>
  <div class="mx-auto">
    <div class="filters basis-1/5 m-4 p-4 flex flex-wrap shadow-xl rounded-xl">
      <div class="filter search flex-1 text-center">
        <input
          type="text"
          name=""
          id=""
          placeholder="Искать"
          class="rounded-lg p-2 border border-gray-500"
          v-model="search"
        />
      </div>

      <div class="filter roomNumber flex-1 text-center">
        <div class="form-floating">
          <select
            class="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            v-model="filter.amountFilter"
          >
            <option disabled>Количество комнат</option>
            <option value="1">1 комнатная</option>
            <option value="2">1-2 комнатная</option>
            <option value="3">2 комнатная</option>
          </select>
          <label for="floatingSelect">Количество комнат</label>
        </div>
      </div>
      <div class="filter roomNumber flex-1 text-center">
        <div class="form-floating">
          <select
            class="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            v-model="filter.free"
          >
           
            <option value="1">Да</option>
            <option value="0">Нет</option>
          </select>
          <label for="floatingSelect">Свободно</label>
        </div>
      </div>
      <div class="filter square flex-1 text-center">
        <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Общая площадь
          </button>
          <ul class="dropdown-menu">
            <li><input class="p-2" v-model="filter.square.min" placeholder="Минимальная площадь" type="text"></li>
            <li><input class="p-2" v-model="filter.square.max" placeholder="Максимальная площадь" type="text"></li>
          </ul>
      </div>
      <div class="filter date flex-1 text-center">
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Дата
          </button>
          <ul class="dropdown-menu w-fit">
            <li>
              <VueDatePicker
                v-model="date"
                range
                :clearable="false"
                @update:model-value="handleDate"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="filter price flex-1 text-center">
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Цена
          </button>
          <ul class="dropdown-menu">
            <li><input class="p-2" type="text" v-model="filter.price.min" placeholder="Минимальная цена"></li>
            <li><input class="p-2" type="text" v-model="filter.price.max" placeholder="Максимальная цена"></li>
            
          </ul>
        </div>
      </div>
      <div class="filter price flex-1 text-center">
        <div class="dropdown">
          <button @click="filterData()"
            class="btn btn-success text-white"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Применить
          </button>
          <button @click="getRooms()"
            class="btn btn-danger text-white"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>

    <div class="items basis-4/5">
      <div class="headerText text-center m-4 p-2 text-3xl">Квартиры</div>
      <div class="items flex flex-wrap flex-row m-2 p-2">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="roomItem flex bg-white rounded-xl m-2 p-2 shadow-xl"
        >
          <div class="itemImg basis-2/6">
            <v-carousel height="300" progress="primary">
              <v-carousel-item
                v-for="(item, i) in room.small_images"
                :key="i"
                :src="'http://localhost:3000/images/' + item"
              >
              </v-carousel-item>
            </v-carousel>

            <!-- <carousel :items-to-show="1.5" class="caru">
              <slide
                v-for="slide in room.small_images"
                :key="slide.id"
                class=""
              >
                <img
                  :src="'http://localhost:3000/images/' + slide"
                  alt=""
                  class="caru-img"
                />
                <img src="../assets/1.jpg" alt="" class="w-40 h-30">
              </slide>

              <template #addons >
                <navigation />
                <pagination />
              </template>
            </carousel> -->
          </div>
          <router-link
            :to="{ path: '/info', query: { id: room.id } }"
            class="info basis-4/6 p-2 decoration-neutral-50"
          >
            <div class="infoName p-2 text-center text-black font-bold">
              {{ room.title }}
            </div>
            <div class="location p-2 text-center text-black font-bold">{{ room.location }}</div>
            <div class="price p-2 text-right text-black font-bold">{{ room.price }} тг</div>
            <div
              v-if="room.status === 1"
              class="price p-2 text-right font-bold text-green-500"
            >
              Свободно
            </div>
            <div
              v-if="room.status === 0"
              class="price p-2 text-right font-bold text-red-700"
            >
              Занято
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input[type="text"] {
  border: 2px solid blacl;
}
.filter {
  cursor: pointer;
}
.itemImg {
  height: 50%;
}
.roomItem {
  width: 100%;
  height: 80%;
}
.v-btn--icon.v-btn--density-default{
  background-color: transparent;
}

@media screen and (max-width: 640px) {
  /* Styles for screens up to 640px width (mobile screens) */
  .filters {
    display: block;
    div {
      width: 100%;
      padding: 0.5rem;
      input[type="text"] {
        width: 100%;
      }
    }
  }

  .roomItem{
    display: block;
  }
}
</style>
