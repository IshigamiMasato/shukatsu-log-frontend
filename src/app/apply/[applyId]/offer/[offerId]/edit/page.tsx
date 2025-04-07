import BackLink from "@/components/navigations/BackLink";
import { getOffer } from "@/features/apply/offer/api/getOffer";
import OfferEditForm from "@/features/apply/offer/components/OfferEditForm";
import verifyAuth from "@/server/utils/verifyAuth";

export const metadata = {
	title: `内定情報編集 | ${process.env.NEXT_PUBLIC_APP_NAME}`,
}

const OfferEditPage = async ({ params } : { params : Promise<{ applyId: number, offerId: number }> }) => {
    await verifyAuth();

    const { applyId, offerId } = await params;
    const offer = await getOffer(applyId, offerId);

    return (
        <>
            <BackLink />
            <OfferEditForm offer={offer} />
        </>
    )
}

export default OfferEditPage;
