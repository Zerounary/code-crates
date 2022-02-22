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
    const activeIndex = ref('1');
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
      if (key == 'log-sql') {
        let text = monacoEditor.getValue();
        console.log(
          '🚀 ~ file: Index.vue ~ line 38 ~ handleSelect ~ text',
          text,
        );
        let sql = transfrom(text);
        let sqlModel = editor.createModel(sql, 'sql');
        monacoEditor.setModel(sqlModel);
      }
    },
    getMybatisLogSql(logText: string) {
      return transfrom(logText);
    },
    log() {
      console.log(this.code);
    },
  },
});
</script>
<template>
  <div class="text-black bg-gray-300">
    <el-menu
      :default-active="activeIndex"
      @select="handleSelect"
      mode="horizontal"
      menu-trigger="click"
    >
      <el-menu-item index="1">{{ t('app') }}</el-menu-item>
      <el-sub-menu index="mybatis">
        <template #title>
          <img src="brands/mybatis.svg" class="w-16px" />
          <span>{{ t('mybatis') }}</span>
        </template>
        <el-menu-item index="log-sql">
          {{ t('mybatis-log-sql-transform') }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
  <div class="h-[calc(100vh-60px)] w-screen" id="textEditor"></div>
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
