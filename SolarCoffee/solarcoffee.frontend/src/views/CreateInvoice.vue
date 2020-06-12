<template>
  <div>
    <h1 id="invoiceTitle">Create Invoice</h1>
    <hr />
    <div class="invoice-step" v-if="invoiceStep === 1">
      <h2>Step 1: Select a Customer</h2>
      <div v-if="customers.length" class="invoice-step-detail">
        <label for="customer">Customer:</label>
        <select v-model="selectedCustomerId" class="invoiceCustomers" id="customer">
          <option disabled value>Please select a Customer</option>
          <option
            v-for="c in customers"
            :key="c.id"
            :value="c.id"
          >{{c.firstName + " " + c.lastName}}</option>
        </select>
      </div>
    </div>
    <div class="invoice-step" v-if="invoiceStep === 2">
      <h2>Step 1: Select a Product</h2>
      <div v-if="inventory.length" class="invoice-step-detail">
        <label for="product">Product:</label>
        <select v-model="newItem.product" class="invoiceLineItem" id="product">
          <option disabled value>Please select a Product</option>
          <option v-for="i in inventory" :key="i.product.id" :value="i.product">{{ i.product.name }}</option>
        </select>
        <label for="quantity">Quantity:</label>
        <input v-model="newItem.quantity" id="quantity" type="number" min="0" />
      </div>
      <div class="invoice-item-actions">
        <solar-button
          :disabled="!newItem.product || !newItem.quantity"
          @button:click="addLineItem"
        >Add Line Item</solar-button>
        <solar-button :disabled="!lineItems.length" @button:click="finalizeOrder">Finalize Order</solar-button>
      </div>
      <div class="invoice-order-list" v-if="lineItems.length">
        <div class="runningTotal">
          <h3>Running Total:</h3>
          {{ runningTotal | price }}
        </div>
        <table class="table">
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
          <tr v-for="lineItem in lineItems" :key="`index_${lineItem.product.id}`">
            <td>{{ lineItem.product.name }}</td>
            <td>{{ lineItem.product.description }}</td>
            <td>{{ lineItem.quantity }}</td>
            <td>{{ lineItem.product.price }}</td>
            <td>{{ lineItem.product.price * lineItem.quantity | price }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="invoice-step" v-if="invoiceStep === 3">
      <h2>Step 3: Review and Submit</h2>
      <solar-button @button:click="submitInvoice">Submit Invoice</solar-button>
      <hr />
      <div class="invoice-step-detail" id="invoice" ref="invoice">
        <div class="invoice-logo">
          <img id="imgLogo" alt="Solar Coffee Logo" src="@/assets/images/solar_coffee_logo.png" />
          <h3>1337 Solar Lane</h3>
          <h3>San Fancisco, CA 90000</h3>
          <h3>USA</h3>
          <div class="invoice-order-list" v-if="lineItems.length">
            <div class="invoice-header">
              <h3>Invoice: {{ new Date() | humanizeDate }}</h3>
              <h3>Customer: {{ this.selectedCustomer.firstName + " " +this.selectedCustomer.lastName }}</h3>
              <h3>Address: {{ this.selectedCustomer.primaryAddress.addressLine1 }}</h3>
              <h3
                v-if="this.selectedCustomer.primaryAddress.addressLine2"
              >{{ this.selectedCustomer.primaryAddress.addressLine1 }}</h3>
              <h3>
                {{ this.selectedCustomer.primaryAddress.city }}
                {{ this.selectedCustomer.primaryAddress.state }}
                {{ this.selectedCustomer.primaryAddress.postalCode }}
              </h3>
              <h3>{{ this.selectedCustomer.primaryAddress.country }}</h3>
            </div>
            <table class="table">
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
              <tr v-for="lineItem in lineItems" :key="`index_${lineItem.product.id}`">
                <td>{{ lineItem.product.name }}</td>
                <td>{{ lineItem.product.description }}</td>
                <td>{{ lineItem.quantity }}</td>
                <td>{{ lineItem.product.price }}</td>
                <td>{{ lineItem.product.price * lineItem.quantity | price }}</td>
              </tr>
              <tr>
                <th colspan="4"></th>
                <th>Grand Total</th>
              </tr>
              <tfoot>
                <td colspan="4" class="due">Balance due upon reciept:</td>
                <td class="price-final">{{ runningTotal | price }}</td>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="invoice-step-action">
      <solar-button @button:click="prev" :disabled="!canGoPrev">Previous</solar-button>
      <solar-button @button:click="next" :disabled="!canGoNext">Next</solar-button>
      <solar-button @button:click="startOver">Start Over</solar-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IInvoice, { ILineItems } from "../types/Invoice";
import { ICustomer } from "../types/Customer";
import { IProductInventory, IProduct } from "../types/Product";
import CustomerService from "../services/customer-service";
import { InventoryService } from "../services/inventory-service";
import { InvoiceService } from "../services/invoice-service";
import SolarButton from "@/components/SolarButton.vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const customerService = new CustomerService();
const inventoryService = new InventoryService();
const invoiceService = new InvoiceService();
@Component({
  name: "CreateInvoice",
  components: { SolarButton }
})
export default class CreateInvoice extends Vue {
  $refs!: {
    vue: Vue;
    invoice: HTMLBodyElement;
    vues: Vue[];
    elements: HTMLInputElement[];
  };
  invoiceStep = 1;
  invoice: IInvoice = {
    createdOn: new Date(),
    updatedOn: new Date(),
    lineItems: [],
    customerId: 0
  };
  customers: ICustomer[] = [];
  selectedCustomerId = 0;
  inventory: IProductInventory[] = [];
  lineItems: ILineItems[] = [];
  newProduct: IProduct = {
    id: 0,
    createdOn: new Date(),
    updatedOn: new Date(),
    name: "",
    description: "",
    price: 0,
    isTaxable: false,
    isArchived: false
  };
  newItem: ILineItems = {
    product: this.newProduct,
    quantity: 0
  };
  addLineItem() {
    const newItem: ILineItems = {
      product: this.newItem.product,
      quantity: this.newItem.quantity
    };
    const existingItems = this.lineItems.map(item => item.product.id);
    if (existingItems.includes(this.newItem.product.id)) {
      const lineItem = this.lineItems.find(
        item => item.product.id === newItem.product.id
      );
      if (lineItem) {
        const currentQuantity = lineItem.quantity;
        const updatedQuantity =
          Number(currentQuantity) + Number(newItem.quantity);
        lineItem.quantity = updatedQuantity;
      }
    } else {
      this.lineItems.push(this.newItem);
    }
    this.newItem = {
      product: this.newProduct,
      quantity: 0
    };
  }
  finalizeOrder() {
    this.invoiceStep = 3;
  }
  get canGoNext() {
    if (this.invoiceStep === 1) {
      return this.selectedCustomerId !== 0;
    }
    if (this.invoiceStep === 2) {
      return this.lineItems.length > 0;
    }
    if (this.invoiceStep === 3) {
      return false;
    }
    return false;
  }
  get canGoPrev() {
    return this.invoiceStep !== 1;
  }
  get runningTotal() {
    return this.lineItems.reduce((a, b) => a + b.product.price * b.quantity, 0);
  }
  get selectedCustomer() {
    return this.customers.find(c => c.id === this.selectedCustomerId);
  }
  startOver(): void {
    this.invoice = {
      customerId: 0,
      lineItems: [],
      createdOn: new Date(),
      updatedOn: new Date()
    };
    this.invoiceStep = 1;
  }
  async submitInvoice(): Promise<void> {
    try {
      this.invoice = {
        customerId: this.selectedCustomerId,
        lineItems: this.lineItems,
        createdOn: new Date(),
        updatedOn: new Date()
      };
      await invoiceService.newInvoiceGeneration(this.invoice);
      await this.downloadPdf();
      await this.$router.push("/orders");
    } catch (error) {
      console.error(`Error Occured while generating invoice ${error}`);
    }
  }
  async downloadPdf() {
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const invoice = document.getElementById("invoice");
    const width = this.$refs.invoice.clientWidth;
    const height = this.$refs.invoice.clientHeight;
    if (invoice !== null) {
      const canvas = await html2canvas(invoice);
      const image = canvas.toDataURL("image/png");
      pdf.addImage(image, "PNG", 0, 0, width * 0.55, height * 0.55);
      pdf.save("invoice");
    }
  }
  async intialize(): Promise<void> {
    try {
      this.customers = await customerService.getAllCustomers();
      this.inventory = await inventoryService.getInventory();
    } catch (error) {
      console.error("Error Occured", error);
    }
  }
  async created() {
    await this.intialize();
  }
  prev() {
    if (this.invoiceStep === 1) {
      return;
    }
    this.invoiceStep - 1;
  }
  next() {
    if (this.invoiceStep === 3) {
      return;
    }
    this.invoiceStep += 1;
  }
}
</script>

<style lang="scss">
@import "@/scss/global.scss";
.invoice-step-action {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.invoice-step {
}
.invoice-step-detail {
  margin: 1.2rem;
}
.invoice-order-list {
  margin-top: 1.2rem;
  padding: 0.8rem;
  .invoice-header {
    padding-bottom: 0.8rem;
  }
  .line-item {
    display: flex;
    border-bottom: 1px dashed #ccc;
    padding: 0.8rem;
  }
  .item-col {
    flex-grow: 1;
  }
}
.invoice-item-actions {
  display: flex;
}
.price-pre-tax {
  font-weight: bold;
}
.price-final {
  font-weight: bold;
  color: $solar-green;
}
.due {
  font-weight: bold;
}
.invoice-logo {
  padding-top: 1.4rem;
  text-align: center;
  img {
    width: 280px;
  }
}
</style>