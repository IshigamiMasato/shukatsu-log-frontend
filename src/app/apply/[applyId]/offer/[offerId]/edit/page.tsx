import BackLink from "@/components/navigations/BackLink";
import { getOffer } from "@/features/apply/offer/api/getOffer";
import OfferEditForm from "@/features/apply/offer/components/OfferEditForm";

export const metadata = {
	title: `内定情報編集 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

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
