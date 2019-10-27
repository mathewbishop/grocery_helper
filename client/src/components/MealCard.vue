<template>
    <div>
        <div
            class="meal-card border-solid border-orange-300 border-2 p-4 cursor-pointer"
            @click="toggleSelected()"
            v-bind:class="{selected: isSelected}"
        >
            <h1 class="font-semibold pb-2">{{name}}</h1>
            <p class="text-xs">Category: {{category}}</p>
            <p class="text-xs">Protein: {{protein}}</p>
            <div class="mt-4" v-show="isSelected">
                <button class="w-1/2 text-black">
                    <i class="far fa-edit fa-lg text-green-600" title="Edit"></i>
                </button>
                <button class="w-1/2 text-black">
                    <i class="fas fa-trash fa-lg text-red-600" title="Delete"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MealCard",
    components: {},
    props: {
        name: String,
        category: String,
        protein: String
    },
    data: function() {
        return {
            isSelected: false
        };
    },
    methods: {
        toggleSelected: function() {
            this.isSelected = !this.isSelected;
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
}
</style>