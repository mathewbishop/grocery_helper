<template>
    <div>
        <TheHeader />
        <div>
            <section class="notComplete">
                <ul>
                    <li></li>
                </ul>
            </section>
            <section class="complete">
                <ul>
                    <li></li>
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
    created: function() {},
    data: function() {
        return {
            incomplete: [],
            completed: [],
            todo: {
                user: "mattyb",
                content: String,
                isCompleted: Boolean
            }
        };
    },
    methods: {
        getTodos: function() {
            axios
                .get(`/api/grocery-list`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        },
        postTodo: function() {
            let obj = this.todo;
            axios
                .post("/api/grocery-list", {
                    data: obj
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        },
        editTodoContent: function() {},
        toggleTodoComplete: function() {}
    }
};
</script>


<style scoped>
</style>