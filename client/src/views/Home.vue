<template>
    <div>
        <TheHeader />

        <section class="w-3/4 m-auto main-content-container">
            <div class="h-64 w-auto text-center" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48">
                    <i class="fas fa-book fa-4x mt-16"></i>
                </div>
                <router-link to="meals">
                    <button
                        class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                    >Manage Meals</button>
                </router-link>
            </div>
            <div class="h-64 w-auto text-center" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48">
                    <i class="fas fa-list-ol fa-4x mt-16"></i>
                </div>
                <router-link to="grocery-list">
                    <button
                        class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                    >Grocery List</button>
                </router-link>
            </div>
            <div class="h-64 w-auto text-center" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48">
                    <i class="far fa-calendar-alt fa-4x mt-16"></i>
                </div>
                <router-link to="meal-plan">
                    <button
                        class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                    >Meal Plan</button>
                </router-link>
            </div>
            <div class="h-64 w-auto text-center" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48">
                    <i class="fas fa-carrot fa-4x mt-16"></i>
                </div>
                <button
                    class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                >Seasonal Veggies</button>
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
    name: "Home",
    components: {
        TheHeader,
        TheFooter
    },
    data: function() {
        return {
            meals: []
        };
    },
    methods: {}
};
</script>


<style scoped>
.main-content-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    grid-gap: 1rem;
}
</style>