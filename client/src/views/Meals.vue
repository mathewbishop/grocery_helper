<template>
    <div>
        <TheHeader />

        <section class="flex justify-start items-center w-11/12 m-auto mb-8">
            <div>
                <input
                    type="search"
                    class="meal-search border-black border-2 rounded pl-1"
                    placeholder="Search..."
                    v-model="searchString"
                />
            </div>
            <div class="flex items-center ml-4">
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
            <button
                class="btn-add-meal ml-4 rounded-full p-2 bg-green-600"
                @click="toggleAddMealForm()"
            >
                <i class="fas fa-plus-circle fa-lg mr-1"></i>Add Meal
            </button>
        </section>

        <div class="meals-container w-11/12 m-auto">
            <MealCard
                v-for="meal in filteredMeals"
                v-bind:key="meal._id"
                :name="meal.name"
                :category="meal.category"
                :protein="meal.protein"
                :mealID="meal._id"
                v-show="filterByCategory(meal.category) && filterByProtein(meal.protein)"
            />
        </div>

        <div
            v-if="addMealFormOpen"
            class="add-meal-form w-11/12 lg:w-1/2 border-solid border-orange-300 border-2 rounded-lg p-4 bg-gray-200"
        >
            <button class="btn-close bg-red-600 w-6" @click="toggleAddMealForm()">X</button>
            <form class="w-7/12 m-auto">
                <!-- <h2>General Info</h2> -->
                <div class="flex flex-col my-2">
                    <label>Meal Name</label>
                    <input type="text" />
                </div>
                <div class="flex flex-col my-2">
                    <label>Category</label>
                    <input type="text" />
                </div>
                <div class="flex flex-col my-2">
                    <label>Main Protein Source</label>
                    <input type="text" />
                </div>
                <!-- <h2>Recipe Info</h2> -->
                <div class="flex flex-col my-2">
                    <label>Cook Time</label>
                    <input type="text" />
                </div>
                <div class="flex flex-col my-2">
                    <label>Ingredients</label>
                    <input type="text" />
                    <i class="fas fa-plus-circle fa-lg"></i>
                </div>
                <div class="flex flex-col my-2">
                    <label>Instructions</label>
                    <input type="text" />
                </div>
                <div class="flex flex-col my-2">
                    <label>Notes</label>
                    <textarea cols="30" rows="10"></textarea>
                </div>
            </form>
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
            searchString: "",
            addMealFormOpen: false
        };
    },
    methods: {
        getMeals: function() {
            axios.get("/api/meals").then(res => {
                this.meals = res.data;
                this.getFilterOptions();
            });
        },
        toggleAddMealForm: function() {
            this.addMealFormOpen = !this.addMealFormOpen;
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
.add-meal-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: calc(100vh - 210px);
    overflow-y: auto;
}
.btn-close {
    border-radius: 50%;
}
</style>