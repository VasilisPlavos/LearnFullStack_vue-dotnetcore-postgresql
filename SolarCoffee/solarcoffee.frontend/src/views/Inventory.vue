<template>
  <div class="inventory-container">
    <h1 id="inventoryTitle">Inventory Dashboard</h1>
    <hr />

    <div class="inventory-actions">
      <solar-button @click.native="showNewProductModal" id="addNewBtn">Add New Item</solar-button>

      <solar-button @click.native="showShipmentModal" id="receiveShipmentBtn">Receive Shipment</solar-button>
    </div>

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
        <td>{{ item.product.price | price }}</td>
        <td>
          <span v-if="item.product.isTaxable">Yes</span>
          <span v-else>No</span>
        </td>
        <td>
          <div>x</div>
        </td>
      </tr>
    </table>
    <new-product-modal v-if="isNewProductVisible" @save:product="saveNewProduct" @close="closeModals" />
    <shipment-modal v-if="isShipmentVisible" :inventory="inventory" @save:shipment="saveNewShipment"  @close="closeModals" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProductInventory, IProduct } from "@/types/Product";
import { IShipment } from '../types/Shipment';
import SolarButton from "@/components/SolarButton.vue";
import NewProductModal from "@/components/modals/NewProductModal.vue";
import ShipmentModal from "@/components/modals/ShipmentModal.vue";

@Component({
  name: "Inventory",
  components: { SolarButton, NewProductModal, ShipmentModal }
})
export default class Inventory extends Vue {
  isNewProductVisible: boolean = false;
  isShipmentVisible: boolean = false;

  inventory: IProductInventory[] = [
    {
      id: 1,
      product: {
        id: 1,
        name: "name",
        description: "descr",
        price: 100,
        createdOn: new Date(),
        updatedOn: new Date(),
        isTaxable: false,
        isArchived: true
      },
      quantityOnHand: 100,
      idealQuantity: 100
    },
    {
      id: 2,
      product: {
        id: 2,
        name: "name2",
        description: "descr2",
        price: 200,
        createdOn: new Date(),
        updatedOn: new Date(),
        isTaxable: true,
        isArchived: true
      },
      quantityOnHand: 10,
      idealQuantity: 10
    }
  ];

  closeModals() {
    this.isShipmentVisible = false;
    this.isNewProductVisible = false;

  }

  showNewProductModal() {
    this.isNewProductVisible = true;
  }

  showShipmentModal() {
    this.isShipmentVisible = true;
  }

  saveNewProduct(newProduct: IProduct) {
    console.log('saveNewProduct:');
    console.log(newProduct);

  }

  saveNewShipment(shipment: IShipment) {
    console.log('saveNewShipment:');
    console.log(shipment);
  }
}
</script>

<style>
</style>