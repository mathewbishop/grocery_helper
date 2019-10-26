<template>
    <div class="meals">
        <div></div>
    </div>
</template>


<script>
import axios from "axios";

export default {
    name: "meals",
    created: function() {
        this.getMeals();
    },
    data: function() {
        return {
            meals: []
        };
    },
    methods: {
        getMeals: function() {
            axios.get("/api/meals").then(res => console.log(res.data));
        }
    }
};
</script>

<style scoped>
</style>