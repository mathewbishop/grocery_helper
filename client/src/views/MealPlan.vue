<template>
    <div>
        <TheHeader />

        <TheFooter />
    </div>
</template>


<script>
import axios from "axios";
import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

export default {
    name: "MealPlan",
    components: {
        TheHeader,
        TheFooter
    },
    data: function() {
        return {};
    }
};
</script>


<style scoped>
</style>