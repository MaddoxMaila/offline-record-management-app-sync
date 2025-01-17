<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRecordStore } from "../stores/record.auth";
import TableView from "../components/TableView.vue";
import { QCard, QCardSection, QSeparator } from "quasar";

export default defineComponent({
  name: "HomeView",
  components: {
    TableView
  },
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
    
    <div class="row ">
        <div class="col-8 view-table">
            <TableView></TableView>
        </div>
        <div class="col-4 new-record">
            <QCard class="">
                <QCardSection>
                    <div class="text-h6">Add New Record</div>
                </QCardSection>
                
                <QSeparator dark />

                <QCardSection>

                    <QForm @submit.prevent="addNewRecord">
                        <QInput v-model="newRecord.id" label="ID" required :disabled="true"/>
                        <QInput v-model="newRecord.title" label="Title" required />
                        <QInput v-model="newRecord.description" label="Description" required />
                        <QInput v-model="newRecord.barcode" label="Barcode" required />
                        <QSeparator dark />
                        <QSeparator dark />
                        <QBtn type="submit" label="Add Record" color="primary" />
                    </QForm>

                </QCardSection>
                
            </QCard>
            

        </div>
    </div>

</template>

<style lang="scss" scoped>

.new-record {
    padding-top: 5%;
    
}

.view-table{
    padding: 0 10px 0 10px;
}
</style>