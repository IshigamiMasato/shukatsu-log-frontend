import OfferEditForm from "@/features/apply/offer/components/OfferEditForm";

const OfferEditPage = async ({ params } : { params : Promise<{ applyId: number, offerId: number }> }) => {
    const { applyId, offerId } = await params;

    return (
        <OfferEditForm applyId={applyId} offerId={offerId} />
    )
}

export default OfferEditPage;
