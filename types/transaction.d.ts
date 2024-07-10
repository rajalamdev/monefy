interface TransactionInterface {
    amount: number | string;
    category: string;
    description: string;
    type: string;
    ownerId?: string;
    createdAt: Timestamp;
    docId?: string
};