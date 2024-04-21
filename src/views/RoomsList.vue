<script>
import axios from "axios";
export default {
    data() {
        return {
            list: [],
            createObject: {
                user_id: 0,
                room_id: 0,
            },
            users: [],
            rooms: []
        };
    },
    methods: {
        async getRoomList() {
            try {
                const result = await axios.get(`http://localhost:3000/api/v1/roomList`);
                this.list = result.data.items;
                //   console.log(result.data);
            } catch (err) {
                console.log(err);
            }
        },
        async getPaidList() {
            try {
                const result = await axios.get(
                    `http://localhost:3000/api/v1/roomList?isPaid=true`
                );
                this.list = result.data.items;
                //   console.log(result.data);
            } catch (err) {
                console.log(err);
            }
        },

        async deleteItem(id) {
            try {
                // const item = this.list.find(e=>e.id ===id);
                this.list = this.list.filter((item) => item.id !== id);
                await axios
                    .delete(`http://localhost:3000/api/v1/roomList/${id}`)

            } catch (err) {
                console.log(err);
            }
        },
        async setPaid(id) {
            try {
                const item = this.list.find((e) => e.id === id);
                console.log(item);
                item.isPaid = item.isPaid === 1 ? 0 : 1; // Toggle isPaid status

                await axios.put(`http://localhost:3000/api/v1/roomList/${id}`, {
                    isPaid: item.isPaid,
                });
            } catch (err) {
                console.log(err);
            }
        },
        async openModal() {
            try {
                const roomsResult = await axios.get(`http://localhost:3000/api/v1/roomList/rooms`);
                const rooms = roomsResult.data.items;
                this.rooms = rooms;
                const usersResult = await axios.get(`http://localhost:3000/api/v1/users`);
                const users = usersResult.data.items;
                this.users = users;
            } catch (err) {
                console.log(err);
            }

        },
        async createItem() {
            console.log(this.createObject)
            try {
                await axios.post(`http://localhost:3000/api/v1/roomList`, this.createObject);
                this.createObject = {
                    user_id: 0,
                    room_id: 0,
                };
            } catch (err) {
                console.log(err);
            }
        },
        async downloadExcel() {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/roomList/download', { responseType: 'blob' });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'generated_data.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error downloading Excel:', error);
            }
        }
    },
    mounted() {
        this.getRoomList();
    },
};
</script>

<template>
    <main>
        <div class="list-container">
            <div class="title text-center">
                <h2>Список</h2>
            </div>
            <div class="buttonBlock">
                <div class="create">
                    <button @click="openModal" type="button" class="btn btn-primary text-white" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Создать
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Создание
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <select class="form-select" aria-label="Default select example"
                                        v-model="createObject.user_id">
                                        <option selected>Выберите пользователя</option>
                                        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}
                                        </option>

                                    </select>
                                    <select class="form-select" aria-label="Default select example"
                                        v-model="createObject.room_id">
                                        <option selected>Выберите квартиру</option>
                                        <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.title }}
                                        </option>

                                    </select>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal">
                                        Закрыть
                                    </button>
                                    <button @click="createItem" type="button" class="btn btn-primary text-white">
                                        Создать
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="controls">
                    <button @click="getRoomList" type="button" class="btn btn-secondary text-white">
                        Все
                    </button>
                    <button @click="getPaidList" type="button" class="btn btn-success text-white">
                        Оплачен
                    </button>
                    <button @click="downloadExcel" type="button" class="btn btn-info text-white">
                        Excel
                    </button>
                </div>
            </div>
            <div class="list-items">
                <div class="list-item">
                    <div class="user-name">Имя</div>
                    <div class="user-lastname">Фамилия</div>
                    <div class="room-title">Квартира</div>
                    <!-- <div class="room-status">Статус</div> -->
                    <div class="room-paid">Оплачен</div>
                    <div class="room-paid">Действия</div>
                    <div class="room-paid">Дата создания</div>
                </div>
                <div class="list-item shadow-xl" v-for="it in list" :key="it.id">
                    <div class="user-name">{{ it.name }}</div>
                    <div class="user-lastname">{{ it.surname }}</div>
                    <div class="room-title">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2Disabled"
                            style="height: 100px" disabled v-model="it.title"></textarea>
                    </div>
                    <!-- <div class="room-status">{{ it.status === 0 ? "Забронирова" }}</div> -->
                    <div class="room-paid">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                            :checked="it.isPaid === 1" @change="setPaid(it.id)" />
                    </div>
                    <div @click="deleteItem(it.id)" class="room-control">
                        <button type="button" class="btn btn-danger text-white">
                            Удалить
                        </button>
                    </div>
                    <div class="user-date">{{ it.created_at }}</div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.list-container {
    margin: 1rem;

    .buttonBlock {
        .create {
            button {
                margin: 0.5rem;
            }
        }

        .controls {
            button {
                margin: 0.5rem;
            }
        }
    }

    .list-items {
        margin-top: 1rem;

        .list-item {
            margin: 1rem auto;
            display: flex;
            justify-content: space-around;
            border: 1px solid black;
            border-radius: 1rem;

            div {
                padding: 1rem;
                width: 100%;
                text-align: center;
            }
        }
    }
}
</style>
