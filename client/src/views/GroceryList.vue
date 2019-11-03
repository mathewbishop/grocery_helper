<template>
    <div>
        <TheHeader />
        <div class="w-11/12 m-auto">
            <section class="text-center">
                <input
                    v-model="listItem.content"
                    class="border-black border rounded w-64 pl-1"
                    type="text"
                    placeholder="Add item..."
                />
                <div v-show="listItem.content">
                    <p>Qty:</p>
                    <input
                        class="border-black border rounded w-12"
                        v-model="listItem.quantity"
                        type="number"
                    />
                </div>
                <div class="mt-2">
                    <button
                        class="rounded-full px-2 py-1 bg-green-600"
                        v-show="listItem.content"
                        @click="postlistItem()"
                    >Add To List</button>
                </div>
            </section>
            <section class="my-12">
                <ul class="notComplete max-w-xl m-auto">
                    <li
                        v-for="listItem in notComplete"
                        :key="listItem._id"
                        class="py-4 px-1 border-b border-black flex items-center"
                    >
                        <i
                            @click="togglelistItemComplete(listItem)"
                            class="far fa-square fa-lg mr-2 cursor-pointer"
                        ></i>
                        <div
                            @click="listItem.listItemEditMode = true"
                            v-show="!listItem.listItemEditMode"
                            class="cursor-pointer flex items-center"
                        >
                            <span>{{listItem.content}}</span>
                            <span class="pl-2" v-show="listItem.quantity">({{listItem.quantity}})</span>
                        </div>
                        <div
                            v-show="listItem.listItemEditMode"
                            class="flex justify-start items-center"
                        >
                            <input
                                v-model="listItem.content"
                                type="text"
                                class="border-black border rounded mx-2"
                            />
                            <input
                                v-model="listItem.quantity"
                                type="number"
                                class="border-black border rounded w-12 mx-2"
                            />
                            <button
                                @click="confirmListItemContentEdit(listItem)"
                                class="rounded-full px-2 py-1 bg-green-600 cursor-pointer"
                            >Confirm</button>
                        </div>
                        <i
                            @click="listItem.listItemEditMode = true"
                            v-show="!listItem.listItemEditMode"
                            class="far fa-edit fa-lg text-green-600 ml-auto pr-4 cursor-pointer"
                            title="Edit"
                        ></i>
                    </li>
                </ul>
            </section>
            <section class="mt-32 mb-32">
                <div class="max-w-xl mx-auto mb-1">
                    <button
                        v-show="complete.length > 0"
                        @click="deleteAllCompleted()"
                        class="bg-red-600 rounded-lg p-2"
                    >
                        <i class="fas fa-trash fa-lg pr-2"></i>Delete All Completed
                    </button>
                </div>
                <ul class="complete max-w-xl mx-auto">
                    <li
                        class="py-4 px-1 border-t border-black flex items-center"
                        v-for="listItem in complete"
                        :key="listItem._id"
                    >
                        <i
                            @click="togglelistItemComplete(listItem)"
                            class="far fa-check-square fa-lg mr-2 cursor-pointer"
                        ></i>
                        <span class="line-through">{{listItem.content}}</span>
                        <span class="pl-2" v-show="listItem.quantity">({{listItem.quantity}})</span>
                        <i
                            @click="deleteListItem(listItem)"
                            class="fas fa-trash fa-lg text-red-600 ml-auto pr-4 cursor-pointer"
                        ></i>
                    </li>
                </ul>
            </section>
        </div>
        <TheFooter />
    </div>
</template>


<script>
import axios from "axios";
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

export default {
    name: "GroceryList",
    components: {
        TheHeader,
        TheFooter
    },
    created: function() {
        this.getlistItems();
    },
    data: function() {
        return {
            notComplete: [],
            complete: [],
            listItem: {
                user: "mattyb",
                content: "",
                quantity: 0,
                isCompleted: false
            }
        };
    },
    methods: {
        getlistItems: function() {
            axios
                .get(`/api/grocery-list`)
                .then(res => {
                    console.log(res);
                    res.data.forEach(item => {
                        item.listItemEditMode = false;
                        if (item.isCompleted) {
                            this.complete.push(item);
                        } else {
                            this.notComplete.push(item);
                        }
                    });
                })
                .catch(err => console.log(err));
        },
        postlistItem: function() {
            let obj = this.listItem;
            axios
                .post("/api/grocery-list", {
                    data: obj
                })
                .then(res => {
                    console.log(res);
                    this.$router.go();
                })
                .catch(err => console.log(err));
        },
        confirmListItemContentEdit: function(listItem) {
            axios
                .put(`/api/grocery-list/${listItem._id}`, {
                    data: listItem
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
            this.notComplete.forEach(item => {
                if (item._id === listItem._id) {
                    item.content = listItem.content;
                    item.quantity = listItem.quantity;
                    item.listItemEditMode = false;
                }
            });
        },
        togglelistItemComplete: function(listItem) {
            switch (listItem.isCompleted) {
                case false:
                    listItem.isCompleted = true;
                    axios
                        .put(`/api/grocery-list/${listItem._id}`, {
                            data: listItem
                        })
                        .then(res => {
                            console.log(res);
                        })
                        .catch(err => console.log(err));
                    this.notComplete = this.notComplete.filter(
                        item => item._id !== listItem._id
                    );
                    this.complete.push(listItem);
                    break;
                case true:
                    listItem.isCompleted = false;
                    axios
                        .put(`/api/grocery-list/${listItem._id}`, {
                            data: listItem
                        })
                        .then(res => {
                            console.log(res);
                        })
                        .catch(err => console.log(err));
                    this.complete = this.complete.filter(
                        item => item._id !== listItem._id
                    );
                    this.notComplete.push(listItem);
                    break;
            }
        },
        deleteListItem: function(listItem) {
            if (confirm("Are you sure you want to delete this list item?")) {
                axios
                    .delete(`/api/grocery-list/${listItem._id}`)
                    .then(res => {
                        console.log(res);
                        this.$router.go();
                    })
                    .catch(err => console.log(err));
            }
        },
        deleteAllCompleted: function() {
            if (
                confirm(
                    "Are you sure you want to delete all completed list items?"
                )
            ) {
                axios
                    .delete("/api/grocery-list", {
                        data: this.complete
                    })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
            this.complete = [];
        }
    }
};
</script>


<style scoped>
.complete li {
    background-color: rgb(128, 128, 128, 0.2);
    color: rgb(128, 128, 128, 0.7);
}
</style>