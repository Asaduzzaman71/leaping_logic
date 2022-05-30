<template>
  <AdminLayout>
    <div class="row mb-2">
      <div class="offset-10 col-sm-2">
        <button type="button" class="btn btn-primary">User List</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-primary">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Sl#</th>
                <th>User name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="user.id">
                <td>{{ index + 1 }}</td>
                <td>{{ user.first_name }}{{ user.last_name }}</td>
                <td>{{ user.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout.vue";
export default {
  name: "userIndex",
  components: {
    AdminLayout,
  },
  created() {
    const token = localStorage.getItem("access-token");
    axios
      .get("/users", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.users = response.data.users;
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status == 422) {
          this.unauthorized = false;
          this.errors = error.response.data.error;
        } else if (error.response.status == 401) {
          this.unauthorized = true;
          this.errors = error.response.data.error;
        }
      });
  },

  data() {
    return {
      users: [],
      isLoading: false,
      errors: [],
      unauthorized: false,
    };
  },

  methods: {},
};
</script>

<style></style>
