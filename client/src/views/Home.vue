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
        <section class="w-11/12 m-auto main-content-container">
            <div class="h-64 w-auto" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48"></div>
                <button
                    class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                >Manage Meals</button>
            </div>
            <div class="h-64 w-auto" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48"></div>
                <button
                    class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                >Grocery List</button>
            </div>
            <div class="h-64 w-auto" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48"></div>
                <button
                    class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                >Meal Plan</button>
            </div>
            <div class="h-64 w-auto" style="background-color: rgba(211,211,211, .4);">
                <div class="h-48"></div>
                <button
                    class="bg-orange-400 rounded-full p-3 font-bold my-1 hover:bg-orange-300 w-40 text-sm"
                >Seasonal Veggies</button>
            </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    components: {},
    data: function() {
        return {
            showUserMenu: false
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