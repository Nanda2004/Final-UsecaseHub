/**
 * Generate a custom use case ID in the format KUH000, KUH001, etc.
 * @param {number} usecaseId - The numeric use case ID
 * @returns {string} Formatted use case ID (e.g., "KUH000" for ID 1, "KUH001" for ID 2)
 */
export function generateUsecaseId(usecaseId) {
    // Subtract 1 so that ID 1 becomes KUH000, ID 2 becomes KUH001, etc.
    const adjustedId = usecaseId - 1;
    // Pad the ID with leading zeros to make it 3 digits
    const paddedId = String(adjustedId).padStart(3, '0');
    return `KUH${paddedId}`;
}
