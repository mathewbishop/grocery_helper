<template>
    <div>
        <TheHeader />

        <div class="meals-container w-11/12 m-auto">
            <MealCard
                v-for="meal in meals"
                v-bind:key="meal._id"
                :name="meal.name"
                :category="meal.category"
                :protein="meal.protein"
            />
        </div>

        <TheFooter />
    </div>
</template>


<script>
import axios from "axios";
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import MealCard from "../components/MealCard";

export default {
    name: "Meals",
    components: {
        TheHeader,
        TheFooter,
        MealCard
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
        toggleSelected: function(meal) {
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
</style>