import { Card } from 'antd';
import AnimatedContent from '~/component/Animation/AnimatedUI/AnimatedContent';

export const TourCards = ({ price, img, date, title, location, description, ...props }) => {
    return (
        <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
        >
            <Card
                className={'rounded-lg shadow-lg hover:scale-105 max-h-fit overflow-ellipsis overflow-hidden transition-transform hover:cursor-pointer hover:border-yellow-400 hover:border-2'}>
                <img alt={title} src={img} className={'w-full h-72 object-cover rounded-t-lg'} />
                <div className={'p-4'}>
                    <h3 className={'text-xl font-semibold'}>{title}</h3>
                    <p className={'text-sm text-gray-500'}>{location}</p>
                    <p className={'text-sm text-gray-500'}>{date}</p>
                    <p className={'text-sm text-gray-500'}>{price}</p>
                    <p className={'text-sm line-clamp-3'}>{description}</p>
                </div>
            </Card>
        </AnimatedContent>
    );
};
  