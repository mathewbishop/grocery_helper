<template>
    <div>
        <TheHeader />

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
                    <input v-model="meal.name" type="text" />
                </div>
                <div class="flex flex-col my-2">
                    <label>Category</label>
                    <input v-model="meal.category" type="text" />
                </div>
                <div class="flex flex-col my-2">
                    <label>Main Protein Source</label>
                    <input v-model="meal.protein" type="text" />
                </div>
                <!-- <h2>Recipe Info</h2> -->
                <div class="flex flex-col my-2">
                    <label>Cook Time (mins)</label>
                    <input v-model="meal.cookTime" type="number" />
                </div>
                <div class="my-2 flex">
                    <div class="w-full pr-2">
                        <label class="block">Ingredients</label>
                        <div v-for="(ing, index) in meal.ingredients" :key="index" class="flex">
                            <input
                                v-model="meal.ingredients[index]"
                                class="block w-full mr-1 my-2"
                                type="text"
                            />
                            <i
                                @click="addIngredientInput()"
                                v-if="index === meal.ingredients.length - 1"
                                class="fas fa-plus-circle fa-lg self-end pb-3 ml-1 cursor-pointer text-green-600"
                            ></i>
                            <i
                                @click="removeIngredientInput(index)"
                                v-if="index !== 0"
                                class="fas fa-minus-circle fa-lg self-end pb-3 ml-2 cursor-pointer text-red-600"
                            ></i>
                        </div>
                    </div>
                </div>
                <div class="my-2 flex">
                    <div class="w-full pr-2">
                        <label class="block">Instructions</label>
                        <div class="flex" v-for="(ins, index) in meal.instructions" :key="index">
                            <input
                                v-model="meal.instructions[index]"
                                class="block w-full mr-1 my-2"
                                type="text"
                            />
                            <i
                                @click="addInstructionInput()"
                                v-if="index === meal.instructions.length - 1"
                                class="fas fa-plus-circle fa-lg self-end pb-3 ml-1 cursor-pointer text-green-600"
                            ></i>
                            <i
                                @click="removeInstructionInput(index)"
                                v-if="index !== 0"
                                class="fas fa-minus-circle fa-lg self-end pb-3 ml-2 cursor-pointer text-red-600"
                            ></i>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col my-2">
                    <label>Notes</label>
                    <textarea v-model="meal.notes" cols="30" rows="10"></textarea>
                </div>
                <button
                    @click.prevent="submitMeal()"
                    class="p-2 my-4 w-24 rounded bg-green-500 m-auto block"
                >Submit</button>
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
            addMealFormOpen: false,
            meal: {
                user: "mattyb",
                name: "",
                category: "",
                protein: "",
                cookTime: 0,
                ingredients: [""],
                instructions: [""],
                notes: ""
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
        },
        addIngredientInput: function() {
            this.meal.ingredients.push("");
        },
        removeIngredientInput: function(index) {
            this.meal.ingredients.splice(index, 1);
        },
        addInstructionInput: function() {
            this.meal.instructions.push("");
        },
        removeInstructionInput: function(index) {
            this.meal.instructions.splice(index, 1);
        },
        submitMeal: function() {
            let obj = this.meal;
            console.log(obj);
            axios
                .post("/api/meals", {
                    data: obj
                })
                .then(res => {
                    console.log(res);
                    this.$router.go();

                    this.meal.user = "mattyb";
                    this.meal.name = "";
                    this.meal.category = "";
                    this.meal.protein = "";
                    this.meal.cookTime = 0;
                    this.meal.ingredients = [""];
                    this.meal.instructions = [""];
                    this.meal.notes = "";
                })
                .catch(err => console.log(err));
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