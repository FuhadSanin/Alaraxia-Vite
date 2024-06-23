// services.js
import http from "../http-common"

class Services {
  signIn(data, config) {
    return http.post("auth/login", data, config)
  }

  getProfile(authToken) {
    return http.get("api/v1/me", {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
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
  getCustomersByCustomerIdAndName(authToken, id, name) {
    return http.get(`api/v1/customers/?customer_id=${id}&name=${name}`, {
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

  getTicketsByLocations(authToken, location) {
    return http.get(`api/v1/tickets/?location=${location}`, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  getTickets(authToken, data) {
    return http.get(`api/v1/tickets/`, {
      headers: {
        Authorization: `${authToken.token}`,
      },
      params: {
        customer_id: data.customer_id,
        search: data.search,
        location: data.location,
        limit: data.limit,
        created_at_before: data.created_at_before,
        created_at_after: data.created_at_after,
        ticket_status: data.ticket_status,
        with_happy_code: data.with_happy_code,
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
  getTicketsById(authToken, id) {
    return http.get(`api/v1/tickets/${id}`, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }
  getTicketsByStatus(authToken, status) {
    return http.get(`api/v1/tickets/?ticket_status=${status}`, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }
  cancelTickets(authToken, id, data) {
    return http.patch(`api/v1/tickets/${id}/cancel/`, data, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }
  markAsPending(authToken, id, data) {
    return http.patch(`api/v1/tickets/${id}/pending/`, data, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  assignTech(authToken, id, data) {
    return http.patch(`api/v1/tickets/${id}/assign/`, data, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  visits(authToken, id, data) {
    return http.patch(`api/v1/tickets/visits/?ticket=${id}/`, data, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  closeTickets(authToken, id, data, user) {
    return http.patch(`api/v1/tickets/${id}/${user}/`, data, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }
  // ---------------User Management----------------
  getUsers(authToken, kind) {
    return http.get(`api/v1/users/?kind=${kind}`, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }

  getUsersById(authToken, id) {
    return http.get(`api/v1/users/${id}`, {
      headers: {
        Authorization: `${authToken.token}`,
      },
    })
  }
}

export default new Services()
