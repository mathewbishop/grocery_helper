<template>
    <div>
        <TheHeader />

        <div>
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

export default {
    name: "EditMeal",
    components: {
        TheHeader,
        TheFooter
    },
    created: function() {},
    data: function() {
        return {
            mealID: this.$route.params.mealID,
            meal: {
                user: "",
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
    methods: {}
};
</script>



<style scoped>
</style>