<template>
    <div>
        <TheHeader />

        <section class="flex justify-start w-11/12 m-auto mb-8">
            <div>
                <input type="search" class="meal-search border-black border-2 rounded pl-1" />
            </div>
            <div class="flex ml-4">
                <p class="mr-2">Filter:</p>
                <select class="mx-1 border-black border-2 rounded">
                    <option value v-for="(name, index) in nameFilters" :key="index">{{name}}</option>
                </select>
                <select class="mx-1 border-black border-2 rounded">
                    <option value v-for="(cat, index) in categoryFilters" :key="index">{{cat}}</option>
                </select>
                <select class="mx-1 border-black border-2 rounded">
                    <option value v-for="(prot, index) in proteinFilters" :key="index">{{prot}}</option>
                </select>
            </div>
        </section>

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
    mounted: function() {},
    data: function() {
        return {
            meals: [],
            nameFilters: [],
            categoryFilters: [],
            proteinFilters: []
        };
    },
    methods: {
        getMeals: function() {
            axios.get("/api/meals").then(res => {
                res.data.forEach(item => {
                    item.checked = false;
                });
                this.meals = res.data;
                this.getFilterOptions();
            });
        },
        toggleSelected: function(meal) {
            meal.checked = !meal.checked;
        },
        getFilterOptions: function() {
            this.meals.forEach(meal => {
                if (!this.nameFilters.includes(meal.name)) {
                    this.nameFilters.push(meal.name);
                }
                if (!this.categoryFilters.includes(meal.category)) {
                    this.categoryFilters.push(meal.category);
                }
                if (!this.proteinFilters.includes(meal.protein)) {
                    this.proteinFilters.push(meal.protein);
                }
            });
        }
    },
    computed: {}
};
</script>

<style scoped>
.meals-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1rem;
}
</style>