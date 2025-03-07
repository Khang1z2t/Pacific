import AnimatedContent from '~/component/Animation/AnimatedUI/AnimatedContent';

const TravelCard = ({ imageSrc, altText, title, description, icon }) => {
    return (
        <div
            className="relative rounded-lg overflow-hidden shadow-md hover:transform transition-transform hover:scale-105">
            {/* Hình ảnh */}
            <img
                src={imageSrc}
                alt={altText}
                className="w-full h-56 object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            {/* Nội dung */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    );
};

const TravelCards = ({ cards }) => {
    return (
        <AnimatedContent
            distance={150}
            direction="horizontal"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
        >
            <div className="grid grid-cols-2 gap-6 lg:gap-8 lg:grid-cols-2">
                {cards.map((card, index) => (
                    <TravelCard
                        key={index}
                        imageSrc={card.imageSrc}
                        altText={card.altText}
                        title={card.title}
                        description={card.description}
                        icon={card.icon}
                    />
                ))}
            </div>
        </AnimatedContent>
    );
};
export default TravelCards;