// import axios from 'axios';

// export default async function handler(req, res) {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ error: 'Email is required' });
//   }

//   try {
//     // Create a new customer in Shopify
//     const response = await axios.post(
//       `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL}/admin/api/2023-10/customers.json`,
//       {
//         customer: {
//           email: email,
//           tags: ['Newsletter Signup'], // Optional: Helps categorize these customers.
//           accepts_marketing: true, // Optional: Marks the customer as accepting marketing emails.
//         },
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_KEY,
//         },
//       }
//     );

//     return res
//       .status(200)
//       .json({ message: 'Email successfully added to Shopify customers!' });
//   } catch (error) {
//     console.error(
//       'Error adding email to Shopify:',
//       error.response?.data || error.message
//     );
//     return res.status(500).json({ error: 'Failed to add email to Shopify.' });
//   }
// }
