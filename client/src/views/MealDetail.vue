<template>
    <div>
        <TheHeader />
        <section class="w-11/12 lg:w-1/2 m-auto">
            <div></div>
            <div>
                <div
                    class="meal-primary-info mb-8 py-2 px-8 border-solid border-orange-300 border-2 rounded-lg flex justify-between items-center"
                >
                    <h1 class="text-4xl">{{name}}</h1>
                    <div>
                        <p class="text-sm">
                            <span class="font-semibold">Category:</span>
                            {{category}}
                        </p>
                        <p class="text-sm">
                            <span class="font-semibold">Protein:</span>
                            {{protein}}
                        </p>
                    </div>
                </div>
                <div class="mt-2 p-2 px-8 border-solid border-orange-300 border-2 rounded-lg">
                    <h1 class="text-3xl border-black border-solid border-b-2 mb-2">Recipe</h1>
                    <p class="mb-8">
                        <i class="far fa-clock fa-lg"></i>
                        {{cookTime}}
                    </p>
                    <h2 class="text-lg font-medium">Ingredients</h2>
                    <ul class="list-disc pl-8 mb-4">
                        <li v-for="(ing, index) in ingredients" :key="index">{{ing}}</li>
                    </ul>
                    <h2 class="text-lg font-medium">Instructions</h2>
                    <ol class="list-decimal pl-8">
                        <li v-for="(ins, index) in instructions" :key="index">{{ins}}</li>
                    </ol>
                    <br />
                    <h2 class="text-lg font-medium">Notes:</h2>
                    <p class="mb-4">{{notes}}</p>
                </div>
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
    name: "MealDetail",
    components: {
        TheHeader,
        TheFooter
    },
    created: function() {
        this.getMealDetail();
    },
    data: function() {
        return {
            name: String,
            category: String,
            protein: String,
            cookTime: Number,
            ingredients: Array,
            instructions: Array,
            notes: String,
            mealID: this.$route.params.mealID
        };
    },
    methods: {
        getMealDetail: function() {
            axios.get(`/api/meals/${this.mealID}`).then(res => {
                console.log(res);
                this.name = res.data.name;
                this.category = res.data.category;
                this.protein = res.data.protein;
                this.cookTime = res.data.cookTime;
                this.ingredients = res.data.ingredients;
                this.instructions = res.data.instructions;
                this.notes = res.data.notes;
            });
        }
    }
};
</script>

<style scoped>
</style>