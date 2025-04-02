<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { Card, List } from "@dva3/ui";

</script>

<template>
  <div>
    <div class="bg-black text-white mb-2">playground 示例项目</div>
    <Card>
    </Card>
    <List>
    </List>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
