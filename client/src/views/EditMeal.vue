<template>
    <div>
        <TheHeader />

        <div
            class="edit-meal-form w-11/12 lg:w-7/12 border-solid border-orange-300 border-2 rounded-lg p-4 cursor-pointer m-auto bg-gray-200"
        >
            <form class="w-11/12 lg:w-7/12 m-auto">
                <div class="flex flex-col my-4">
                    <label class="font-bold mb-2">Meal Name:</label>
                    <input v-model="meal.name" type="text" />
                </div>
                <div class="flex flex-col my-4">
                    <label class="font-bold mb-2">Category:</label>
                    <input v-model="meal.category" type="text" />
                </div>
                <div class="flex flex-col my-4">
                    <label class="font-bold mb-2">Main Protein Source:</label>
                    <input v-model="meal.protein" type="text" />
                </div>
                <div class="flex flex-col my-4">
                    <label class="font-bold mb-2">Cook Time (mins):</label>
                    <input v-model="meal.cookTime" type="number" />
                </div>
                <div class="my-6 flex">
                    <div class="w-full pr-2">
                        <label class="block font-bold mb-2">Ingredients:</label>
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
                <div class="my-6 flex">
                    <div class="w-full pr-2">
                        <label class="block font-bold mb-2">Instructions:</label>
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
                <div class="flex flex-col my-4">
                    <label class="font-bold mb-2">Notes:</label>
                    <textarea v-model="meal.notes" cols="30" rows="10"></textarea>
                </div>
                <button
                    @click.prevent="submit()"
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

export default {
    name: "EditMeal",
    components: {
        TheHeader,
        TheFooter
    },
    created: function() {
        this.getMeal();
    },
    data: function() {
        return {
            mealID: this.$route.params.mealID,
            meal: {
                user: "mattyb",
                name: String,
                category: String,
                protein: String,
                cookTime: Number,
                ingredients: Array,
                instructions: Array,
                notes: String
            }
        };
    },
    methods: {
        getMeal: function() {
            axios.get(`/api/meals/${this.mealID}`).then(res => {
                console.log(res);
                this.meal.name = res.data.name;
                this.meal.category = res.data.category;
                this.meal.protein = res.data.protein;
                this.meal.cookTime = res.data.cookTime;
                this.meal.ingredients = res.data.ingredients;
                this.meal.instructions = res.data.instructions;
                this.meal.notes = res.data.notes;
            });
        },
        submit: function() {
            let obj = this.meal;
            axios
                .put(`/api/meals/${this.mealID}`, {
                    data: obj
                })
                .then(res => {
                    console.log(res);
                    alert("Meal edit successful!");
                })
                .catch(err => console.log(err));
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
        }
    }
};
</script>



<style scoped>
</style>