import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Meals from "../views/Meals.vue";
import MealDetail from "../views/MealDetail";
import EditMeal from "../views/EditMeal";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/meals",
        name: "meals",
        component: Meals
    },
    {
        path: "/meals/:mealID",
        name: "meal-detail",
        component: MealDetail,
        props: true
    },
    {
        path: "/edit/:mealID",
        name: "edit-meal",
        component: EditMeal
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
