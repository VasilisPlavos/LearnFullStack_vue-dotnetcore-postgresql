<template>
  <div>
    <h1 id="customersTitle">
      Manage Customers
    </h1>
    <hr />
    <div class="customer-actions">
      <solar-button @button:click="showNewCustomerModal">
        Add Customer
      </solar-button>
    </div>
    <table id="customers" class="table">
      <tr>
        <th>
          Customer
        </th>
        <th>Address</th>
        <th>State</th>
        <th>Since</th>
        <th>Delete</th>
      </tr>
      <tr v-for="customer in customers" :key="customer.id">
        <td>
          {{ customer.firstName + " " + customer.lastName }}
        </td>
        <td>
          {{
            customer.primaryAddress.addressLine1 +
              " " +
              customer.primaryAddress.addressLine2
          }}
        </td>
        <td>
          {{ customer.primaryAddress.state }}
        </td>
        <td>
          {{ customer.createdOn }}
        </td>
        <td>
          <div
            class="lni lni-cross-circle customer-delete"
            @click="deleteCustomer(customer.id)"
          ></div>
        </td>
      </tr>
    </table>

    <new-customer-modal
      @close="closeModal"
      @save:customer="saveNewCustomer"
      v-if="isCustomerModalVisible"
    ></new-customer-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SolarButton from "../components/SolarButton.vue";
import { ICustomer } from "../types/Customer";
import CustomerService from "../services/customer-service";
import NewCustomerModal from "../components/modals/NewCustomerModal.vue";

const customerService = new CustomerService();

@Component({
  name: "Customers",
  components: { SolarButton, NewCustomerModal }
})
export default class Customers extends Vue {
  customers: ICustomer[] = [];
  isCustomerModalVisible = false;

  showNewCustomerModal() {
    this.isCustomerModalVisible = true;
  }

  closeModal() {
    this.isCustomerModalVisible = false;
  }

  async initialize() {
    const res = await customerService.getAllCustomers();
    this.customers = res;
  }

  async created() {
    await this.initialize();
  }

  async saveNewCustomer(newCustomer: ICustomer) {
    await customerService.createCustomer(newCustomer);
    this.isCustomerModalVisible = false;
    await this.initialize();
  }

  async deleteCustomer(id: number) {
    await customerService.deleteCustomer(id);
    await this.initialize();
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/global.scss";
.customer-actions {
  display: flex;
  margin-bottom: 0.8rem;

  div {
    margin-right: 0.8rem;
  }
}

.customer-delete {
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  color: $solar-red;
}
</style>
