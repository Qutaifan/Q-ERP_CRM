const DOLIBARR_API_URL = 'https://erp.qutaifan.com/api/index.php';

/**
 * Create a new lead (Third Party) in Dolibarr
 * @param {Object} data - { name, email, phone, message }
 */
export const createLead = async (data) => {
  try {
    const response = await fetch(`${DOLIBARR_API_URL}/thirdparties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'DOLAPIKEY': import.meta.env.VITE_DOLIBARR_API_KEY, // We will need to set this
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        client: 1, // 1 = Prospect
        code_client: -1, // Auto-generate
        note_private: data.message,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};
