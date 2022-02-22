<script lang="ts">
import { useI18n } from 'vue-i18n';

import { defineComponent, ref } from 'vue';
import { transfrom } from '../common/java';

import { editor } from 'monaco-editor';

let monacoEditor: editor.IStandaloneCodeEditor;

export default defineComponent({
  name: 'Home',
  setup() {
    const { t } = useI18n();
    const activeIndex = ref('mybatis');
    return {
      activeIndex,
      t,
    };
  },
  data() {
    return {
      code: 'this',
    };
  },
  mounted() {
    monacoEditor = editor.create(
      document.getElementById('textEditor') as HTMLElement,
      {
        value: '',
        language: 'text',
      },
    );
  },

  methods: {
    handleSelect(key: string, keyPath: string[]) {
      console.log(key, keyPath);
      this.activeIndex = keyPath[0];
    },
    mybatisLog2Sql() {
      let text = monacoEditor.getValue();
      let sql = transfrom(text);
      let sqlModel = editor.createModel(sql, 'sql');
      monacoEditor.setModel(sqlModel);
    },
  },
});
</script>
<template>
  <div class="h-60px text-black bg-gray-300">
    <el-menu
      :default-active="activeIndex"
      @select="handleSelect"
      mode="horizontal"
      menu-trigger="click"
    >
      <el-menu-item index="1">{{ t('app') }}</el-menu-item>
      <el-menu-item index="mybatis">
        <template #title>
          <img :src="'brands/mybatis.svg'" class="w-16px" />{{ t('mybatis') }}
        </template>
      </el-menu-item>
    </el-menu>
  </div>
  <el-button-group class="m-1 space-x-1" v-show="activeIndex == 'mybatis'">
    <el-button type="primary" @click="mybatisLog2Sql">
      {{t('mybatis-log-sql-transform')}}
      <!-- <el-tooltip
        placement="bottom-start"
        show-after="1000"
        :content="t('mybatis-log-sql-transform')"
      >
        <div class="h-full flex justify-center items-center">
          <span class="iconify" data-width="24" data-icon="mdi:math-log"></span>
          <span
            class="iconify"
            data-width="24"
            data-icon="bxs:arrow-to-right"
          ></span>
          <span class="iconify" data-width="24" data-icon="carbon:sql"></span>
        </div>
      </el-tooltip> -->
    </el-button>
  </el-button-group>
  <div class="h-[calc(100vh-120px)] w-screen" id="textEditor"></div>
</template>

<style>
a,
.footer-link {
  @apply transition-all ease-out duration-100;
}

.footer-link {
  opacity: 0.8;
}
</style>
