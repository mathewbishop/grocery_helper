<template>
    <div>
        <TheHeader />
        <section class="flex flex-row justify-start items-center flex-wrap w-11/12 m-auto mb-8">
            <ol class="meal-plan-list list-decimal">
                <li>{{ mealPlan.one ? mealPlan.one.name : ""}}</li>
                <li>{{ mealPlan.two ? mealPlan.two.name : ""}}</li>
                <li>{{ mealPlan.three ? mealPlan.three.name : ""}}</li>
                <li>{{ mealPlan.four ? mealPlan.four.name : ""}}</li>
                <li>{{ mealPlan.five ? mealPlan.five.name : ""}}</li>
            </ol>
        </section>

        <section class="flex justify-start items-center flex-wrap w-11/12 m-auto mb-8">
            <div>
                <input
                    type="search"
                    class="meal-search border-black border-2 rounded pl-1"
                    placeholder="Search..."
                    v-model="searchString"
                />
            </div>
            <div class="flex items-center ml-4 my-8">
                <select class="mx-1 border-black border-2 rounded" v-model="selectedCategoryFilter">
                    <option
                        :value="cat"
                        v-for="(cat, index) in categoryFilters"
                        :key="index"
                    >{{index === 0 ? "Choose category.." : cat}}</option>
                </select>
                <select class="mx-1 border-black border-2 rounded" v-model="selectedProteinFilter">
                    <option
                        :value="prot"
                        v-for="(prot, index) in proteinFilters"
                        :key="index"
                    >{{index === 0 ? "Choose protein.." : prot}}</option>
                </select>
            </div>
            <button class="ml-4 rounded-full p-2 bg-orange-600">
                <i class="fas fa-cart-plus fa-lg mr-1"></i>Start New Meal Plan
            </button>
        </section>

        <section class="meals-container w-11/12 m-auto">
            <div
                class="meal-card border-solid border-orange-300 border-2 rounded-lg p-4 cursor-pointer m-auto"
                v-for="(meal, index) in meals"
                :key="index"
            >
                <h1 class="font-semibold pb-2">{{meal.name}}</h1>
                <p class="text-xs">Category: {{meal.category}}</p>
                <p class="text-xs">Protein: {{meal.protein}}</p>
            </div>
        </section>
        <TheFooter />
    </div>
</template>


<script>
import axios from "axios";
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

export default {
    name: "MealPlan",
    components: {
        TheHeader,
        TheFooter
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
            searchString: "",
            mealPlan: {
                one: {},
                two: {},
                three: {},
                four: {},
                five: {}
            }
        };
    },
    methods: {
        getMeals: function() {
            axios
                .get("/api/meals")
                .then(res => {
                    this.meals = res.data;
                    this.getFilterOptions();
                })
                .catch(err => console.log(err));
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
.meal-card {
    background-color: rgba(211, 211, 211, 0.3);
    width: 251px;
}
.meal-plan-list {
    max-width: 400px;
    margin: 0 auto;
}
.meal-plan-list li {
    margin: 10px 0 10px 0;
    font-size: 18px;
}
</style>