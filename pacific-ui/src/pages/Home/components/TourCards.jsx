import { Card, Rate } from 'antd';
import { useEffect, useState } from 'react';
import config from '~/config';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { message } from 'antd';
import WishlistServices from '~/services/WishlistServices';
import { useAuth } from '~/config/AuthContext';
import { useTranslation } from 'react-i18next';

export const TourCards = ({ data }) => {
    const [wishlist, setWishlist] = useState([]);
    const { currentUser } = useAuth();
    const { t, i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    useEffect(() => {
        setSelectedLang(i18n.language);
    }, [i18n.language]);

    const handleAddToWishlist = async (id) => {
        await WishlistServices.AddToWishlist(id, localStorage.getItem('accessToken')).then((res) => {
            setWishlist(res.data);
            console.log(res.data);
            message.success(t("tourCard.ti1"));
        }).catch((err) => {
            console.error('Error:', err);
        });
    };
    return (
        <div
            className={
                'w-72 max-h-fit rounded-lg shadow-lg hover:scale-105 overflow-hidden transition-transform hover:cursor-pointer hover:border-orange-500 hover:border-2'
            }
        >
            <Link to={config.routes.tourDetail + `${data.id}`}>
                <img
                    alt={data.title}
                    src={`${config.imageConfig.getImage(data.thumbnail)}`}
                    className={'w-full h-48 object-cover rounded-t-lg'}
                />
                <div className={'p-4'}>
                    <h3 className={'text-lg font-semibold overflow-ellipsis text-gray-800 mb-2'}>{data.title}</h3>
                    <p className={'text-sm text-gray-600 line-clamp-2 mb-4'}>{data.description}</p>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span className={'font-semibold'}>{data.duration} {t("tourCard.ti2")} {data.duration - 1} {t("tourCard.ti3")}</span>
                    </div>
                </div>
                <div className="flex flex-col justify-start border-t p-3">
                    <Rate disabled defaultValue={4} />
                    <div className={'flex flex-wrap gap-2 items-center'}>
                        <p className="text-lg font-bold text-gray-800">{config.webConfig.getCurrency(data.maxPrice)}</p>
                    </div>
                </div>
            </Link>
            <div className={'flex justify-end items-end -mt-14 p-4'}>
                <Heart
                    onClick={() => handleAddToWishlist(data.id)}
                    className={'text-red-500 transition-all hover:cursor-pointer hover:fill-red-500'}
                    size={24}
                />
            </div>
        </div>
    );
};
  