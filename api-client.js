// API Base URL
const API_BASE_URL = 'http://localhost:3000/api';

// API Client for Property Listings
const PropertyAPI = {
  // Get all properties with optional filters
  async getProperties(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${API_BASE_URL}/properties?${params}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch properties');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  // Get single property by ID
  async getProperty(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch property');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  },

  // Create new property listing
  async createProperty(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        body: formData // FormData object with files
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to create property');
      }
      
      return data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  // Update property listing
  async updateProperty(id, formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'PUT',
        body: formData
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update property');
      }
      
      return data;
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  },

  // Delete property listing
  async deleteProperty(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete property');
      }
      
      return data;
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API health check failed:', error);
      return { success: false, error: error.message };
    }
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PropertyAPI;
}
