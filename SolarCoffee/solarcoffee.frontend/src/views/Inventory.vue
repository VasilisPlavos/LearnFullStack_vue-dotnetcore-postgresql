<template>
  <div class="inventory-container">
    <h1 id="inventoryTitle">inventory</h1>
    <table id="inventoryTable" class="table">
      <tr>
        <th>item</th>
        <th>Quantity</th>
        <th>Unit price</th>
        <th>Taxable</th>
        <th>Delete</th>
      </tr>
      <tr v-for="item in inventory" :key="item.id">
          <td>{{ item.product.name }}</td>
          <td>{{ item.quantityOnHand }}</td>
          <td>{{ item.product.price }}</td>
          <td>
              <span v-if="item.product.isTaxable">Yes</span>
              <span v-else>No</span>
            </td>
          <td><div>x</div></td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProductInventory } from "@/types/Product";

@Component({
  name: "Inventory",
  components: {}
})
export default class Inventory extends Vue {
  inventory: IProductInventory[] = [
    {
      id: 1,
      product: {
          id: 1,
          name: 'name',
          description: 'descr',
          price: 100,
          createdOn: new Date(),
          updatedOn: new Date(),
          isTaxable: false,
          isArchived: true
      },
      quantityOnHand: 100,
      idealQuantity: 100,
    },
        {
      id: 2,
      product: {
          id: 2,
          name: 'name2',
          description: 'descr2',
          price: 200,
          createdOn: new Date(),
          updatedOn: new Date(),
          isTaxable: true,
          isArchived: true
      },
      quantityOnHand: 10,
      idealQuantity: 10,
    }
  ];
}
</script>

<style>
</style>