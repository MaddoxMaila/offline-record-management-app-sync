<script lang="ts">
import { QTableColumn } from 'quasar';
import { useRecordStore } from '../stores/record.auth';
import { defineComponent, onMounted } from 'vue';


    export default defineComponent({
        name: "TableView",
        setup(){

            const recordStore = useRecordStore()

            const columns: QTableColumn[] = [
                { name: 'id', label: 'ID', field: 'id', sortable: true, required: true },
                { name: 'title', label: 'Title', field: 'title', sortable: true, required:true },
                { name: 'description', label: 'Description', field: 'description', sortable: true, required:true },
                { name: 'barcode', label: 'Barcode', field: 'barcode', sortable: true },
                { name: 'updated_at', label: 'Updated At', field: 'updated_at', sortable: true, required: true },
            ]

            onMounted(async () => {
                await recordStore.getRecords();
            });


            return{
                columns,
                records: recordStore.records
            }
        }
    })

</script>

<template>
    <!-- <Suspense> -->
        <QTable
        title="Records"
        :rows="records"
        :columns="columns"
        :loading="false"
        :filter="false"
        row-key="id"
        flat
        bordered
      >

      <template v-slot:top-left>
          <QBtn color="white" text-color="black" :disable="false" label="Add row" @click="false" />
          <QBtn v-if="records.length !== 0" class="q-ml-sm" :disable="false" color="white" text-color="black" label="Remove row" @click="false" />
        <QSpace />
      </template>

      <!-- <template v-slot:top-right>
        <QBtn color="white" :disable="loading" text-color="black" label="Save" @click="save" />
        <QBtn color="white" :disable="loading" id="Sync" class="q-ml-sm" text-color="black" label="Sync" @click="sync" />
        <QSpace />
      </template> -->

      <!-- <template v-slot:body-cell="props">
        <QTd :props="props">
            <QInput
                v-model.number="props.row[ props.col.name ]"
                input-class="text-right"
                type="text"
                dense
                borderless
            />
        </QTd>
      </template> -->
      </QTable>
    <!-- </Suspense> -->
</template>