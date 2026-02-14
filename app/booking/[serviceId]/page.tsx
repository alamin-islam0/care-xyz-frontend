import BookingForm from "@/components/BookingForm";

export default async function BookingPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  
  return (
    <BookingForm serviceId={serviceId} />
  );
}
