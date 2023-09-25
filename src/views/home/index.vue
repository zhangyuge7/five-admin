<script setup>
import packagejson from '/package.json'
import { shallowRef } from 'vue'

const dependencies = shallowRef([])
const devDependencies = shallowRef([])

Object.keys(packagejson.dependencies).forEach((key) => {
  dependencies.value.push({
    name: key,
    version: packagejson.dependencies[key],
  })
})

Object.keys(packagejson.devDependencies).forEach((key) => {
  devDependencies.value.push({
    name: key,
    version: packagejson.devDependencies[key],
  })
})
</script>

<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-card>
            <template #header>
              版本说明
            </template>
            1
          </el-card>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-card>
            <template #header>
              <div>
                <span>相关依赖</span>
              </div>
            </template>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <ul>
                  <li style="margin-bottom: 20px;font-size: 20px;">
                    <strong>dependencies</strong>
                  </li>
                  <li v-for="item, index in dependencies" :key="index">
                    <span>{{ item.name }}</span>
                    <span class=" ml-5">{{ item.version }}</span>
                  </li>
                </ul>
              </el-col>
              <el-col :span="12" :offset="0">
                <ul>
                  <li style="margin-bottom: 20px;font-size: 20px;">
                    <strong>devDependencies</strong>
                  </li>
                  <li v-for="item, index in devDependencies" :key="index">
                    <span>{{ item.name }}</span>
                    <span class=" ml-5">{{ item.version }}</span>
                  </li>
                </ul>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
