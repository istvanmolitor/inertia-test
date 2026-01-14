<script setup lang="ts">
import { trans } from 'laravel-vue-i18n';

interface Props {
    currentPage: number;
    lastPage: number;
}

defineProps<Props>();
</script>

<template>
    <div class="text-sm text-muted-foreground">
        {{ trans('admin::pagination.info', { current: currentPage, last: lastPage }) !== 'admin::pagination.info'
            ? trans('admin::pagination.info', { current: currentPage, last: lastPage })
            : trans('pagination.info', { current: currentPage, last: lastPage }) }}
    </div>
</template>
