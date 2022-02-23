<script lang="ts">
import { useI18n } from 'vue-i18n';

import { defineComponent, ref } from 'vue';
import { transfrom } from '../common/java';
import {diff_left_example, diff_right_example} from "../common/text";
import { editor } from 'monaco-editor';

let monacoEditor: editor.IStandaloneCodeEditor;

let originalModel: editor.ITextModel;
let modifiedModel: editor.ITextModel;
let diffEditor: editor.IStandaloneDiffEditor;

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
    return {};
  },
  mounted() {
    this.createEditor(this.eidtorTypeOf(this.activeIndex), 'textEditor');
  },

  methods: {
    createEditor(type = 'editor', id = 'textEditor') {
      if (type == 'editor') {
        if (diffEditor) {
          originalModel.dispose();
          modifiedModel.dispose();
          diffEditor.dispose();
        }
        monacoEditor = editor.create(
          document.getElementById(id) as HTMLElement,
          {
            value: '',
            language: 'json',
          },
        );
      } else if (type == 'diffEditor') {
        if (monacoEditor) {
          monacoEditor.getModel()?.dispose();
          monacoEditor.dispose();
        }
        originalModel = editor.createModel(diff_left_example, 'text/plain');
        modifiedModel = editor.createModel(diff_right_example, 'text/plain');
        diffEditor = editor.createDiffEditor(
          document.getElementById(id) as HTMLElement,
          {
            originalEditable: true,
            readOnly: false,
          },
        );
        diffEditor.setModel({
          original: originalModel,
          modified: modifiedModel,
        });
      }
    },
    eidtorTypeOf(key: string) {
      if (['diff'].includes(key)) {
        return 'diffEditor';
      }
      return 'editor';
    },
    formatCode() {
      let lang = 'json';
      this.changeLanguage(lang);
      monacoEditor.getAction('editor.action.formatDocument').run();
    },
    changeLanguage(lang: string = 'text') {
      editor.setModelLanguage(
        monacoEditor.getModel() as editor.ITextModel,
        lang,
      );
    },
    handleSelect(key: string, keyPath: string[]) {
      console.log(key, keyPath);
      this.activeIndex = keyPath[0];
      this.createEditor(this.eidtorTypeOf(this.activeIndex), 'textEditor');
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
      <el-menu-item index="diff">
        <template #title>
          <span
            class="iconify"
            data-icon="carbon:compare"
            data-width="16"
          ></span
          >{{ t('diff-comparing') }}
        </template>
      </el-menu-item>
    </el-menu>
  </div>
  <div class="h-[calc(100vh-120px)] w-screen" id="textEditor"></div>
  <el-button-group class="my-2 mx-3" v-show="activeIndex == 'mybatis'">
    <el-button @click="formatCode">
      {{ t('format-json') }}
    </el-button>
    <el-button type="primary" @click="mybatisLog2Sql">
      {{ t('mybatis-log-sql-transform') }}
    </el-button>
  </el-button-group>
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
