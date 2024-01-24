import apiConnector from '@metajob/api-connector';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    let connect; // Declare the variable outside the try block

    try {
        connect = await apiConnector;
        // Connect to the database
        await connect.connectDB();

        switch (req.method) {
            case 'GET':
                // Fetch categories
                const categories = await connect.getCategories();

                // Send successful response
                res.status(200).json({
                    message: 'Successfully fetched all categories',
                    data: categories,
                });
                break;

            default:
                res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: (error as Error).message, // Type assertion
        });
    } finally {
        // Check if connect is defined before attempting to disconnect
        if (connect) {
            // Close the database connection
            await connect.disconnectDB();
        }
    }
}
