<template>
    <div class="home">
        <header class="site-header">
            <i class="fas fa-bars fa-2x mobile-navtoggle"></i>
            <h1 class="site-header--title">
                Grocery
                <i class="fas fa-shopping-cart" style="color: orange; font-size: 1.5rem;"></i> Helper
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
        <div class="main-content-wrapper">
            <section class="home--module-row-first">
                <div class="home--module-card"></div>
                <div class="home--module-card"></div>
            </section>
            <section class="home--module-row-second">
                <div class="home--module-card"></div>
            </section>
        </div>
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

.site-header--title {
    font-size: 3rem;
    color: orange;
}

.far.fa-user-circle {
    cursor: pointer;
    margin-right: 25px;
}

.user-menu {
    position: absolute;
    right: 20px;
}

.home--module-row-first {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1100px;
    margin: 0 auto 40px auto;
}

.home--module-row-second {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
}

.home--module-card {
    width: 31.25rem;
    min-height: 15rem;
    border: 2px solid lightgray;
    border-radius: 4px;
}
</style>