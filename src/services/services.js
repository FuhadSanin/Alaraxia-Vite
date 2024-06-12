// services.js
import http from "../http-common"

class Services {
  signIn(data, config) {
    return http.post("auth/login", data, config)
  }

  getLocations(authToken) {
    return http.get("api/v1/locations", {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  getCustomers(authToken) {
    return http.get("api/v1/customers", {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }
  getCustomersById(authToken, id) {
    return http.get(`api/v1/customers/${id}`, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  createCustomers(authToken, data) {
    return http.post("api/v1/customers/", data, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  editCustomers(authToken, id, data) {
    return http.patch(`api/v1/customers/${id}/`, data, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  getProducts(authToken) {
    return http.get("api/v1/products", {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  getProductsById(authToken, id) {
    return http.get(`api/v1/products/${id}`, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  getTickets(authToken) {
    return http.get("api/v1/tickets", {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }
  createTickets(authToken, data) {
    return http.post("api/v1/tickets/", data, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }
}

export default new Services()
