<template>
    <header class="site-header">
        <i class="fas fa-bars fa-2x invisible"></i>
        <h1 class="text-5xl text-orange-400">
            Grocery
            <i class="fas fa-shopping-cart text-2xl text-orange-400"></i> Helper
        </h1>
        <section>
            <i
                class="far fa-user-circle fa-2x cursor-pointer mr-12"
                @click="showUserMenu = !showUserMenu"
            ></i>
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
</template>


<script>
export default {
    name: "TheHeader",
    data: function() {
        return {
            showUserMenu: false
        };
    }
};
</script>


<style scoped>
.site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 25px;
    padding-right: 25px;
    background-color: gray;
    margin-bottom: 60px;
}
.user-menu {
    position: absolute;
    right: 20px;
}
</style>