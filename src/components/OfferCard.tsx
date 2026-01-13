import type { Offer } from "../objects/offer";
import "../css/AllOffers.css"

type Props = {
    offer: Offer;
};

export default function OfferCard({ offer }: Props) {
    return (
        <div className="offer-card">
            <div className="image-placeholder" />

            <div className="offer-content">
                <div className="posted">posted by user</div>
                <div className="item-name">{offer.itemName}</div>
                <div className="item-desc">{offer.itemDescription}</div>
            </div>
        </div>
    );
}
