<script setup>
import { onMounted, reactive, ref } from 'vue'
import { menuTreeApi } from '@/api/system/menu'
import SvgIcon from '@/components/SvgIcon/index.vue'

const queryForm = ref()
const state = reactive({
  queryForm: {
    key: '',
  },
  tableData: [],
})
const methods = {
  async doQuery() {
    const { data, ok } = await menuTreeApi()
    console.log(data)
    if (ok)
      state.tableData = data
  },
  resetForm(formEl) {
    if (!formEl)
      return
    formEl.resetFields()
  },
}
onMounted(() => {
  methods.doQuery()
})
</script>

<template>
  <el-container>
    <el-main>
      <el-card>
        <el-form ref="queryForm" :model="state.queryForm" label-width="80px" inline>
          <el-form-item label="关键字" prop="key">
            <el-input v-model="state.queryForm.key" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="methods.doQuery">
              查询
            </el-button>
            <el-button @click="methods.resetForm(queryForm)">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="mt-5">
        <el-table
          :data="state.tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="menuId"
          border
          default-expand-all
        >
          <el-table-column prop="title" label="标题" />
          <el-table-column label="图标" width="60">
            <template #default="{ row }">
              <el-icon>
                <SvgIcon :name="row.icon" />
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column prop="perm" label="权限标识" width="160" />
          <el-table-column prop="component" label="组件路径" />
          <el-table-column prop="orderNo" label="排序" width="60" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="createTime" label="创建时间" width="180" />
          <el-table-column label="操作" width="120">
            <template #default="{ row }">
              <el-button type="primary" link>
                编辑
              </el-button>
              <el-button type="danger" link>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>
  </el-container>
</template>
