<template>
    <span>
        <i v-if="modes.includes('osu')" class="osu-icon align-middle mb-1" />
        <i v-if="modes.includes('taiko')" class="taiko-icon align-middle mb-1" />
        <i v-if="modes.includes('catch') || modes.includes('fruits')" class="catch-icon align-middle mb-1" />
        <i v-if="modes.includes('mania')" class="mania-icon align-middle mb-1" />
        <span v-if="showAll && (!modes || modes.includes('all'))">
            <i class="osu-icon align-middle" />
            <i class="taiko-icon align-middle" />
            <i class="catch-icon align-middle" />
            <i class="mania-icon align-middle" />
        </span>
    </span>
</template>

<script>
export default {
    name: 'ModeDisplay',
    props: {
        modes: {
            type: [Array, String],
            required: true,
        },
        showAll: Boolean,
    },
};
</script>
