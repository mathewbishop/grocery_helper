<template>
    <div>
        <TheHeader />
        <section class="w-11/12 m-auto mb-8">
            <h1 class="text-2xl">Current Meal Plan</h1>
            <ol class="meal-plan-list list-decimal">
                <li v-for="meal in mealPlan" :key="meal._id" class="flex justify-start">
                    <span>{{meal.name}}</span>
                    <i
                        @click="removeFromPlan(meal._id)"
                        class="fas fa-minus-circle fa-lg text-red-600 cursor-pointer ml-auto"
                    ></i>
                </li>
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
            <button @click="newMealPlan()" class="ml-4 rounded-full p-2 bg-orange-600">
                <i class="fas fa-cart-plus fa-lg mr-1"></i>Start New Meal Plan
            </button>
            <button @click="addSelectedToPlan()" class="ml-4 rounded-full p-2 bg-green-600">
                <i class="fas fa-plus-circle fa-lg fa-lg mr-1"></i>Add Selected to Plan
            </button>
        </section>

        <section class="meals-container w-11/12 m-auto">
            <MealCard
                v-for="meal in filteredMeals"
                v-bind:key="meal._id"
                :name="meal.name"
                :category="meal.category"
                :protein="meal.protein"
                :mealID="meal._id"
                v-on:mealSelected="handleMealSelected"
                v-show="filterByCategory(meal.category) && filterByProtein(meal.protein)"
            />
        </section>
        <TheFooter />
    </div>
</template>


<script>
import axios from "axios";
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";
import MealCard from "../components/MealCard";

export default {
    name: "MealPlan",
    components: {
        TheHeader,
        TheFooter,
        MealCard
    },
    created: function() {
        this.getMeals();
        this.getMealPlan();
    },
    data: function() {
        return {
            meals: [],
            categoryFilters: [""],
            proteinFilters: [""],
            selectedCategoryFilter: "",
            selectedProteinFilter: "",
            searchString: "",
            mealPlan: [],
            selectedMeals: []
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
        getMealPlan: function() {
            axios.get("/api/meal-plan").then(res => {
                this.mealPlan = res.data.map(x => x);
            });
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
            return this.selectedCategoryFilter === category ||
                !this.selectedCategoryFilter
                ? true
                : false;
        },
        filterByProtein: function(protein) {
            return this.selectedProteinFilter === protein ||
                !this.selectedProteinFilter
                ? true
                : false;
        },
        handleMealSelected: function(mealID, isSelected) {
            if (isSelected) {
                this.selectedMeals.push(mealID);
            } else {
                this.selectedMeals = this.selectedMeals.filter(
                    x => x !== mealID
                );
            }
            console.log(this.selectedMeals);
        },
        addSelectedToPlan: function() {
            axios
                .put("/api/meal-plan", {
                    data: this.selectedMeals
                })
                .then(res => {
                    console.log(res);
                    this.getMealPlan();
                })
                .catch(err => console.log(err));
        },
        removeFromPlan: function(id) {
            if (
                confirm(
                    "Are you sure you want to remove this meal from the current meal plan?"
                )
            ) {
                axios
                    .put(`/api/meal-plan/remove/${id}`)
                    .then(res => {
                        console.log(res);
                        // this.$router.go();
                        this.getMealPlan();
                    })
                    .catch(err => console.log(err));
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
    margin-left: 50px;
}
.meal-plan-list li {
    margin: 10px 0 10px 0;
    font-size: 18px;
}
</style>