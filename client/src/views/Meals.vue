<template>
    <div>
        <TheHeader />

        <section class="flex justify-start w-11/12 m-auto mb-8">
            <div>
                <input
                    type="search"
                    class="meal-search border-black border-2 rounded pl-1"
                    placeholder="Search..."
                    v-model="searchString"
                />
            </div>
            <div class="flex ml-4">
                <p class="mr-2">Filter:</p>
                <select class="mx-1 border-black border-2 rounded" v-model="selectedCategoryFilter">
                    <option
                        :value="cat"
                        v-for="(cat, index) in categoryFilters"
                        :key="index"
                    >{{cat}}</option>
                </select>
                <select class="mx-1 border-black border-2 rounded" v-model="selectedProteinFilter">
                    <option
                        :value="prot"
                        v-for="(prot, index) in proteinFilters"
                        :key="index"
                    >{{prot}}</option>
                </select>
            </div>
        </section>

        <div class="meals-container w-11/12 m-auto">
            <MealCard
                v-for="meal in filteredMeals"
                v-bind:key="meal._id"
                :name="meal.name"
                :category="meal.category"
                :protein="meal.protein"
                v-show="filterByCategory(meal.category) && filterByProtein(meal.protein)"
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
            meals: [],
            categoryFilters: [""],
            proteinFilters: [""],
            selectedCategoryFilter: "",
            selectedProteinFilter: "",
            searchString: ""
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
                if (!this.categoryFilters.includes(meal.category)) {
                    this.categoryFilters.push(meal.category);
                }
                if (!this.proteinFilters.includes(meal.protein)) {
                    this.proteinFilters.push(meal.protein);
                }
            });
        },
        filterByCategory: function(category) {
            if (
                this.selectedCategoryFilter === category ||
                !this.selectedCategoryFilter
            ) {
                return true;
            } else {
                return false;
            }
        },
        filterByProtein: function(protein) {
            if (
                this.selectedProteinFilter === protein ||
                !this.selectedProteinFilter
            ) {
                return true;
            } else {
                return false;
            }
        }
    },
    computed: {
        filteredMeals: function() {
            if (this.searchString) {
                return this.meals.filter(meal => {
                    return meal.name
                        .toLowerCase()
                        .includes(this.searchString.toLowerCase());
                });
            } else {
                return this.meals;
            }
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