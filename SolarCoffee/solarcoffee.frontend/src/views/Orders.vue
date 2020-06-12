<template>
  <div>
    <h1 id="ordersTitle"></h1>
    <hr />
    <table id="sales-orders" class="table" v-if="orders.length">
      <thead>
        <tr>
          <th>CustomerId</th>
          <th>OrderId</th>
          <th>Order Total</th>
          <th>Order Status</th>
          <th>Mark Complete</th>
        </tr>
      </thead>
      <tr v-for="order in orders" :key="order.id">
        <td>
          {{ order.customer.id }}
        </td>
        <td>
          {{ order.id }}
        </td>
        <td>
          {{ getTotal(order) | price }}
        </td>
        <td :class="{ green: order.isPaid }">
          {{ getStatus(order.isPaid) }}
        </td>
        <td
          class="lni lni-checkmark-circle green order-complete"
          v-if="!order.isPaid"
          @click="markComplete(order.id)"
        ></td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { OrderService } from '../services/order-service';
  import { SalesOrder } from '../types/SalesOrder';

  const orderService = new OrderService();

  @Component({ name: 'Orders' })
  export default class Orders extends Vue {
    orders: SalesOrder[] = [];

    getTotal(order: SalesOrder) {
      return order.salesOrderItems.reduce(
        (a, b) => a + b.quantity * b.product.price ,
        0
      );
    }

    getStatus(isPaid: boolean) {
      return isPaid ? 'Paid in Full' : 'Unpaid';
    }

    async markComplete(orderId: number) {
      await orderService.markOrderComplete(orderId);
      this.initialize();
    }

    async initialize(): Promise<void> {
      this.orders = await orderService.getOrders();
    }

    async created() {
      this.initialize();
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/scss/global.scss';

  .green {
    font-weight: bold;
    color: $solar-green;
  }

  .inventory-actions {
    display: flex;
    margin-bottom: 0.8rem;
  }

  .order-complete {
    cursor: pointer;
    text-align: center;
  }
</style>
