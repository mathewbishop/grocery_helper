<template>
    <div class="home">
        <header class="site-header">
            <i class="fas fa-bars fa-2x mobile-navtoggle"></i>
            <h1 class="text-5xl text-orange-400">
                Grocery
                <i class="fas fa-shopping-cart text-2xl text-orange-400"></i> Helper
            </h1>
            <section>
                <i class="far fa-user-circle fa-2x" @click="showUserMenu = !showUserMenu"></i>
                <ul class="user-menu" v-show="showUserMenu">
                    <li>
                        <a href>Account Info</a>
                    </li>
                    <li>
                        <a href>Logout</a>
                    </li>
                </ul>
            </section>
        </header>

        <section class="w-3/4 m-auto main-content-container">
            <div class="h-64 w-auto" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48">
                    <i class="fas fa-book fa-4x mt-16"></i>
                </div>
                <router-link to="meals">
                    <button
                        class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                    >Manage Meals</button>
                </router-link>
            </div>
            <div class="h-64 w-auto" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48">
                    <i class="fas fa-list-ol fa-4x mt-16"></i>
                </div>
                <button
                    class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                >Grocery List</button>
            </div>
            <div class="h-64 w-auto" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48">
                    <i class="far fa-calendar-alt fa-4x mt-16"></i>
                </div>
                <button
                    class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                >Meal Plan</button>
            </div>
            <div class="h-64 w-auto" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48">
                    <i class="fas fa-carrot fa-4x mt-16"></i>
                </div>
                <button
                    class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                >Seasonal Veggies</button>
            </div>
        </section>

        <footer class="h-32 bg-gray-500 mt-12" style="background-color: rgba(211,211,211, 1);"></footer>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "home",
    components: {},
    data: function() {
        return {
            showUserMenu: false,
            meals: []
        };
    },
    methods: {}
};
</script>


<style scoped>
.main-content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
}
.site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 25px;
    padding-right: 25px;
    background-color: gray;
    margin-bottom: 60px;
}

.mobile-navtoggle {
    visibility: hidden;
}

.far.fa-user-circle {
    cursor: pointer;
    margin-right: 25px;
}

.user-menu {
    position: absolute;
    right: 20px;
}

.main-content-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    grid-gap: 1rem;
}
</style>