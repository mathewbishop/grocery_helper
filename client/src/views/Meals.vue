<template>
    <div>
        <TheHeader />

        <div class="meals-container w-11/12 m-auto">
            <div v-for="meal in meals" v-bind:key="meal._id" class="bg-green-300 w-16">
                <h1>{{meal.name}}</h1>
                <p>Category: {{meal.category}}</p>
                <p>Protein: {{meal.protein}}</p>
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
            axios.get("/api/meals").then(res => (this.meals = res.data));
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