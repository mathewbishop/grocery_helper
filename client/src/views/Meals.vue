<template>
    <div>
        <TheHeader />

        <div class="meals-container w-11/12 m-auto">
            <div
                v-for="meal in meals"
                v-bind:key="meal._id"
                class="meal-card border-solid border-orange-300 border-2 p-4 cursor-pointer"
            >
                <!-- <div class="flex justify-start">
                    <div
                        class="checkbox w-5 h-5 border-solid border-black border-2 rounded text-center"
                        @click="toggleCheckbox(meal)"
                    >
                        <i
                            v-show="meal.checked"
                            class="fas fa-check fa-lg text-green-500"
                            style="position: relative; bottom: 5px;"
                        ></i>
                    </div>
                </div>-->
                <h1 class="font-semibold pb-2">{{meal.name}}</h1>
                <p class="text-xs">Category: {{meal.category}}</p>
                <p class="text-xs">Protein: {{meal.protein}}</p>
            </div>
        </div>

        <TheFooter />
    </div>
</template>


<script>
import axios from "axios";
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

export default {
    name: "Meals",
    components: {
        TheHeader,
        TheFooter
    },
    created: function() {
        this.getMeals();
    },
    data: function() {
        return {
            meals: []
        };
    },
    methods: {
        getMeals: function() {
            axios.get("/api/meals").then(res => {
                res.data.forEach(item => {
                    item.checked = false;
                });
                this.meals = res.data;
            });
        },
        toggleCheckbox: function(meal) {
            meal.checked = !meal.checked;
        }
    }
};
</script>

<style scoped>
.meals-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1rem;
}
.meal-card {
    background-color: rgba(211, 211, 211, 0.3);
}
.checkbox {
    position: relative;
    bottom: 12px;
    right: 12px;
}
</style>