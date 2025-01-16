<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRecordStore } from "../stores/record.auth";

export default defineComponent({
  name: "AddRecord",
  setup() {
    const recordStore = useRecordStore();
    const newRecord = reactive({
      id: "",
      title: "",
      description: "",
      barcode: "",
    });

    const addNewRecord = async () => {
      await recordStore.addRecord({ ...newRecord });
      Object.keys(newRecord).forEach((key) => (newRecord[key as keyof typeof newRecord] = ""));
    };

    return {
      newRecord,
      addNewRecord,
    };
  },
});
</script>

<template>
    
    <div class="row">
        <div class="col-8">
            <TableView></TableView>
        </div>
        <div class="col-5">
            <h4>Add New Record</h4>
            <QForm @submit.prevent="addNewRecord">
                <QInput v-model="newRecord.id" label="ID" required />
                <QInput v-model="newRecord.title" label="Title" required />
                <QInput v-model="newRecord.description" label="Description" required />
                <QInput v-model="newRecord.barcode" label="Barcode" required />
                <QBtn type="submit" label="Add Record" color="primary" />
            </QForm>

        </div>
    </div>

</template>