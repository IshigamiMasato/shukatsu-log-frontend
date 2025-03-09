import BackLink from "@/components/BackLink";
import { getOffer } from "@/features/apply/offer/api/getOffer";
import OfferEditForm from "@/features/apply/offer/components/OfferEditForm";

const OfferEditPage = async ({ params } : { params : Promise<{ applyId: number, offerId: number }> }) => {
    const { applyId, offerId } = await params;

    const offer = await getOffer(applyId, offerId);

    // トークンリフレッシュが必要な場合
    if ( offer === null ) return;

    return (
        <>
            <BackLink />
            <OfferEditForm offer={offer} />
        </>
    )
}

export default OfferEditPage;
