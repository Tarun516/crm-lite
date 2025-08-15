/**
 * Returns a badge based on the next follow-up date and status.
 * @param nextFollowup - The date of the next follow-up.
 * @param status - The status of the item.
 * @returns A badge string or null if no badge is applicable.
 */

const getBadge = (nextFollowup: Date | null, status: string): string | null => {
  if (!nextFollowup) return null;

  if (status === "Won" || status === "Lost") {
    return null;
  }

  const today = new Date().toISOString().split("T")[0] || "";
  const nextFollowupDate = nextFollowup.toISOString().split("T")[0] || "";

  if (nextFollowupDate === today) {
    return "Today";
  }
  if (nextFollowupDate < today) {
    return "Overdue";
  }
  return null;
};

export default getBadge;
