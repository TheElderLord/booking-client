
import axios from "axios";
export default {
    name: "users-page",
    data() {
        return {
            users: [],
            search: "",

            actionToggle: false,
            createToggle: false,
            darken: false,

            userForm: {
                name: "",
                surname: "",
                iin: "",
                phone: "",
                status: "",
                all_comments: "",
            },

            headers: [
                {
                    align: "start",
                    key: "name",
                    sortable: false,
                    title: "Имя",
                },
                { key: "surname", title: "Фамилия" },
                { key: "iin", title: "ИИН" },
                { key: "number", title: "Номер телефона" },
                { key: "status", title: "Статус" },
                { key: "date_created", title: "Дата создания" },
                { key: "all_comments", title: "Комментарий" },
                { key: "action", title: "Действия" },
            ],
            desserts: [],
        };
    },
    methods: {
        async createUser() {
            try {
                const result = await axios.post(
                    `http://localhost:3000/api/v1/admin/users`,
                    this.userForm
                );
                const des = this.userForm;
                const ratingBut = document.createElement("button");
                ratingBut.innerHTML = "Изменить";
                des.action = ratingBut;

                this.desserts.push(des);
                this.userForm = {
                    name: "",
                    surname: "",
                    iin: "",
                    phone: "",
                    status: "",
                };
                this.crToggle();
            } catch (err) {
                console.log(err);
            }
        },
        async getUsers() {

            try {
                const result = await axios.get("http://localhost:3000/api/v1/admin/users");
                const resultObject = result.data.items;

                console.log(resultObject);

                this.desserts = resultObject;
                this.desserts = result.data.items.map((e) => {
                    const ratingBut = document.createElement("button");
                    ratingBut.innerHTML = "Изменить";
                    e.action = ratingBut;
                    return e;
                });
            } catch (err) {
                console.log(err);
            }

        },
        toggleDiv(item) {
            this.darken = !this.darken;
            this.actionToggle = !this.actionToggle;
            if (item === 0) {
                this.userForm = {
                    name: "",
                    surname: "",
                    iin: "",
                    phone: "",
                    status: "",
                    all_comments:"",
                                };
                return;
            }
            this.userForm = {
                name: item.name,
                surname: item.surname,
                iin: item.iin,
                status: item.status,
                phone: item.number,

            }
            this.userForm.all_comments = item.all_comments;
            this.userForm.id = item.id;
            console.log(this.userForm)
        },
        crToggle() {
            this.darken = !this.darken;
            this.createToggle = !this.createToggle;
        },

        async updateUser(id) {
            try {

                const result = await axios.patch(
                    `http://localhost:3000/api/v1/admin/users/${id}`,
                    this.userForm
                );

                // Find the index of the element to be updated in desserts array
                const indexToUpdate = this.desserts.findIndex(e => e.id === id);

                if (indexToUpdate !== -1) {
                    // Update the existing element with the new data
                    this.desserts[indexToUpdate] = {
                        id: this.userForm.id,
                        name: this.userForm.name,
                        surname: this.userForm.surname,
                        iin: this.userForm.iin,
                        number: this.userForm.phone,
                        status: this.userForm.status,
                        date_created: this.desserts[indexToUpdate].date_created,
                        all_comments: this.userForm.all_comments,
                        // Assuming other properties are present in your data
                    };

                    // Clear userForm after successful update
                    // this.userForm = {
                    //     name: "",
                    //     surname: "",
                    //     iin: "",
                    //     phone: "",
                    //     status: "",
                    // };

                    // Close the update form
                    // this.actionToggle(0);
                } else {
                    console.error("User not found in desserts array");
                }
            } catch (err) {
                console.log(err);
            }
        },
        async deleteUser(id) {
            try {
                const result = await axios.delete(
                    `http://localhost:3000/api/v1/admin/users/${id}`
                );
                if (result.status === 200) {
                    // If the deletion is successful, remove the user from the desserts array
                    this.desserts = this.desserts.filter(user => user.id !== id);
                    this.toggleDiv(0);
                }
                
            
    

            } catch (err) {
                console.log(err)
            }
        }
    },
    mounted() {
        this.getUsers();
    },
};
