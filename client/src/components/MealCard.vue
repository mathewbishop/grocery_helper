<template>
    <div>
        <div
            class="meal-card border-solid border-orange-300 border-2 rounded-lg p-4 cursor-pointer m-auto"
            @click="toggleSelected()"
            v-bind:class="{selected: isSelected}"
        >
            <h1 class="font-semibold pb-2">{{name}}</h1>
            <p class="text-xs">Category: {{category}}</p>
            <p class="text-xs">Protein: {{protein}}</p>
            <div class="mt-4" v-show="isSelected">
                <router-link :to="{ name: 'meal-detail', params: {mealID: mealID}}">
                    <button class="w-1/3">
                        <i class="fas fa-eye fa-lg text-blue-600" title="View"></i>
                    </button>
                </router-link>
                <router-link :to="{ name: 'edit-meal', params: {mealID: mealID}}">
                    <button class="w-1/3">
                        <i class="far fa-edit fa-lg text-green-600" title="Edit"></i>
                    </button>
                </router-link>
                <button class="w-1/3">
                    <i
                        @click="deleteMeal(mealID)"
                        class="fas fa-trash fa-lg text-red-600"
                        title="Delete"
                    ></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "MealCard",
    components: {},
    props: {
        name: String,
        category: String,
        protein: String,
        mealID: String
    },
    data: function() {
        return {
            isSelected: false
        };
    },
    methods: {
        toggleSelected: function() {
            this.isSelected = !this.isSelected;
            this.$emit("mealSelected", this.mealID, this.isSelected);
        },
        deleteMeal: function(id) {
            if (confirm("Are you sure you want to delete this meal?")) {
                axios
                    .delete(`/api/meals/${id}`)
                    .then(res => {
                        console.log(res);
                        this.$router.go();
                    })
                    .catch(err => console.log(err));
            }
        }
    }
};
</script>

<style scoped>
.selected {
    border-color: green;
}
.meal-card {
    background-color: rgba(211, 211, 211, 0.3);
    max-width: 251px;
}
</style>