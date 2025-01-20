import React from "react";

const TravelCard = ({ imageSrc, altText }) => {
    return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
        {/* Hình ảnh */}
        <img
            src={imageSrc}
            alt={altText}
            className="w-full h-56 object-cover hover:scale-105 transition-transform"
        />

    </div>
    );
};

const TravelCards = ({ cards }) => {
    return (
        <div className="grid grid-cols-2 gap-6 lg:gap-8 lg:grid-cols-2">
            {cards.map((card, index) => (
                <TravelCard
                    key={index}
                    imageSrc={card.imageSrc}
                    altText={card.altText}
                />
            ))}
        </div>
    );
};

export default TravelCards;
