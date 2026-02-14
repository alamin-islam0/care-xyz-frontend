import BookingDetails from "@/components/BookingDetails";

export default async function BookingDetailsPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  
  return (
    <BookingDetails bookingId={bookingId} />
  );
}
