<template>
    <div>
        <TheHeader />
        <section class="w-11/12 m-auto">
            <div></div>
            <div>
                <div>
                    <h1>{{name}}</h1>
                    <p>Category: {{category}}</p>
                    <p>Protein: {{protein}}</p>
                </div>
                <div>
                    <h1>Recipe</h1>
                    <p>Cook Time: {{cookTime}}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        <li v-for="(ing, index) in ingredients" :key="index">{{ing}}</li>
                    </ul>
                    <h2>Instructions</h2>
                    <ol>
                        <li v-for="(ins, index) in instructions" :key="index">{{ins}}</li>
                    </ol>
                    <br />
                    <h2>Notes</h2>
                    <p>{{notes}}</p>
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